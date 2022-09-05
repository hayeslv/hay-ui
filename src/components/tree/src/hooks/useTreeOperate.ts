import type { Ref } from "vue";
import { ref } from "vue";
import { randomId } from "../../../../utils";
import type { IInnerTreeNode } from "../tree.type";
import type { IUseTreeCore, IUseTreeOperate } from "./useTree.type";

export function useTreeOperate(
  innerData: Ref<IInnerTreeNode[]>,
  { getChildren, getParent, getIndex }: IUseTreeCore,
): IUseTreeOperate {
  const append = (parent: IInnerTreeNode, node: IInnerTreeNode) => {
    // 1.获取parent的最后一个子节点
    const children = getChildren(parent, false);
    const lastChild = children[children.length - 1];

    // 2.确定将要插入的新节点的索引（默认在parent后面）
    let insertedIndex = getIndex(parent) + 1;
    if (lastChild) {
      // 如果该节点没有子节点，则新节点插入在该节点（parent）的后面
      // 否则插入在最后一个子节点的后面
      insertedIndex = getIndex(lastChild) + 1;
    }

    // 确保parent是展开、非叶子节点状态
    parent.expanded = true;
    parent.isLeaf = false;

    // 新增节点初始化
    const currentNode: Ref<IInnerTreeNode> = ref({
      ...node,
      level: parent.level + 1,
      parentId: parent.id,
      isLeaf: true,
    });

    // 设置新节点ID
    if (currentNode.value.id === undefined) {
      currentNode.value.id = randomId();
    }

    // 插入新增节点
    innerData.value.splice(insertedIndex, 0, currentNode.value);
  };

  const remove = (node: IInnerTreeNode) => {
    const parent = getParent(node);
    const childrenIds = getChildren(node).map(v => v.id);
    // 过滤掉node和其子节点之外的节点
    innerData.value = innerData.value.filter(v => v.id !== node.id && !childrenIds.includes(v.id));
    if (!parent) return;
    // 过滤完成后，看看删除节点的parent是否还有子节点，如果没有的话，将其置为叶子节点
    const childrens = getChildren(parent);
    if (childrens.length === 0) parent.isLeaf = true;
  };

  return {
    append,
    remove,
  };
}
