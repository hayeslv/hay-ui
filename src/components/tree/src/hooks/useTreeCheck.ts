import type { Ref } from "vue";
import { unref } from "vue";
import type { IInnerTreeNode } from "../tree.type";
import type { IUseTreeCheck, IUseTreeCore } from "./useTree.type";

export function useTreeCheck(
  innerData: Ref<IInnerTreeNode[]>,
  { getChildren, getParent }: IUseTreeCore,
): IUseTreeCheck {
  const toggleCheckNode = (treeNode: IInnerTreeNode | Ref<IInnerTreeNode>) => {
    const node = unref(treeNode);
    // 避免初始化的时候，node中没有checked设置
    node.checked = !node.checked;
    node.partChecked = false; // 重置部分选中状态

    // 1.父->子：获取子节点，并同步他们的选中状态和父节点一致
    getChildren(node).forEach(child => {
      child.checked = node.checked;
    });

    // 2.子->父：根据父节点获取兄弟节点，判断是否全部是选中状态
    setParentCheck(node);

    function setParentCheck(node: IInnerTreeNode) {
      // 获取父节点
      const partentNode = getParent(node);
      if (!partentNode) return; // 如果没有父节点，则没必要处理子到父的联动
      // 获取兄弟节点：相当于获取parentNode的直接子节点
      const siblingNodes = getChildren(partentNode, false);
      // ==兄弟节点是否全部选中状态==
      const siblingCheckStatus = siblingNodes.every(item => item.checked);
      partentNode.checked = siblingCheckStatus;
      // ==兄弟节点是否部分选中==
      const siblingPartCheckStatus = siblingNodes.some(item => item.checked || item.partChecked);

      if (!siblingCheckStatus && siblingPartCheckStatus) {
        // 不是全选中，也不是一个都没选中
        partentNode.partChecked = true;
      } else {
        partentNode.partChecked = false;
      }

      // 如果父节点还有父节点：node.parent.parent，则需要判断 node.parent这一层的兄弟节点是否也都全选了，如果全选的话 node.parent.parent 也需要被选中
      if (partentNode.parentId) setParentCheck(partentNode);
    }
  };
  return {
    toggleCheckNode,
  };
}
