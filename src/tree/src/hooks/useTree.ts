import type { Ref, SetupContext } from "vue";
import { computed, ref, unref } from "vue";
import type { IInnerTreeNode, ITreeNode } from "../tree.type";
import { generateInnerTree } from "../utils";

export default function useTree(node: Ref<ITreeNode[]> | ITreeNode[], ctx: SetupContext) {
  const innerData = ref(generateInnerTree(unref(node)));

  const toggleNode = (node: IInnerTreeNode) => {
    console.log(123);
    node.expanded = !node.expanded;
  };
  // 获取那些展开的节点列表
  const expandedTree = computed(() => {
    let excludedNodes: IInnerTreeNode[] = [];
    const result = [];

    // 循环列表，找出那些 !expanded 的节点
    for (const item of innerData.value) {
      // 如果当前遍历的节点在排除列表中，则直接跳出本次循环
      if (excludedNodes.map(node => node.id).includes(item.id)) continue;

      // 当前节点处于折叠状态，它的子节点应该被排除
      if (item.expanded !== true) {
      // 获取需要排除的children
        excludedNodes = getChildrenExpanded(item);
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
  const getChildrenExpanded = (node: IInnerTreeNode, recursive: boolean = true) => {
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
    node.partChecked = false; // 重置部分选中状态

    // 1.父->子：获取子节点，并同步他们的选中状态和父节点一致
    getChildrenExpanded(node).forEach(child => {
      child.checked = node.checked;
    });

    // 2.子->父：根据父节点获取兄弟节点，判断是否全部是选中状态
    setParentCheck(node);

    function setParentCheck(node: IInnerTreeNode) {
      // 获取父节点
      const partentNode = getParent(node);
      if (!partentNode) return; // 如果没有父节点，则没必要处理子到父的联动
      // 获取兄弟节点：相当于获取parentNode的直接子节点
      const siblingNodes = getChildrenExpanded(partentNode, false);
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
    treeData: innerData,
    expandedTree,
    toggleNode,
    getChildrenExpanded,
    toggleCheckNode,
  };
}
