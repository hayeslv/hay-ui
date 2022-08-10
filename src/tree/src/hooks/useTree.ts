import type { Ref } from "vue";
import { computed, ref, unref } from "vue";
import type { IInnerTreeNode, ITreeNode } from "../tree-type";
import { generateInnerTree } from "../utils";

export default function useTree(node: Ref<ITreeNode[]> | ITreeNode[]) {
  const innerData = ref(generateInnerTree(unref(node)));
  console.log(innerData.value);

  const toggleNode = (node: IInnerTreeNode) => {
    node.expanded = !node.expanded;
  };
  // 获取那些展开的节点列表
  const expandedTree = computed(() => {
    let excludedNodes: IInnerTreeNode[] = [];
    const result = [];

    // 循环列表，找出那些 !expanded 的节点
    for (const item of innerData.value) {
    // 如果当前遍历的节点在排除列表中，则直接跳出本次循环
      if (excludedNodes.includes(item)) continue;

      // 当前节点处于折叠状态，它的子节点应该被排除
      if (item.expanded !== true) {
      // 获取需要排除的children
        excludedNodes = getChildren(item);
      }
      result.push(item);
    }
    return result;
  });

  /**
   * @param {IInnerTreeNode} node 获取node下的子节点
   * @param {boolean} recursive 是否递归
   * @returns
   */
  const getChildren = (node: IInnerTreeNode, recursive = true) => {
    const result = [];
    // 找到node在列表中的索引
    const startIndex = innerData.value.findIndex(item => item.id === node.id);
    // 找到他后面所有的子节点（level比当前节点大）
    for (let i = startIndex + 1; i < innerData.value.length && node.level < innerData.value[i].level; i++) {
      if (recursive) {
        result.push(innerData.value[i]);
      } else if (node.level === innerData.value[i].level - 1) {
        // 直接子节点
        result.push(innerData.value[i]);
      }
    }
    return result;
  };
  const getParent = (node: IInnerTreeNode): IInnerTreeNode => {
    const parentNode = innerData.value.find(item => item.id === node.parentId);
    return parentNode as IInnerTreeNode;
  };
  const toggleCheckNode = (node: IInnerTreeNode) => {
    // 避免初始化的时候，node中没有checked设置
    node.checked = !node.checked;

    // 1.父->子：获取子节点，并同步他们的选中状态和父节点一致
    getChildren(node).forEach(child => {
      child.checked = node.checked;
    });

    // 2.子->父：根据父节点获取兄弟节点，判断是否全部是选中状态
    // 获取父节点
    const partentNode = getParent(node);
    if (!partentNode) return;
    // 获取兄弟节点：相当于获取parentNode的直接子节点
    const siblingNodes = getChildren(partentNode, false);
    // 过滤出所有选中的兄弟节点
    const checkedSiblingNodes = siblingNodes.filter(item => item.checked);
    if (siblingNodes.length === checkedSiblingNodes.length) {
      // 所有兄弟节点均被选中了，此时父节点应该被选中
      partentNode.checked = true;
    } else {
      partentNode.checked = false;
    }
  };

  return {
    innerData,
    expandedTree,
    toggleNode,
    getChildren,
    toggleCheckNode,
  };
}
