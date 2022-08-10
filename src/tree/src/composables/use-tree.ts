import type { Ref } from "vue";
import { computed, ref, unref } from "vue";
import type { IInnerTreeNode, ITreeNode } from "../tree-type";
import { generateInnerTree } from "../utils";

export function useTree(node: Ref<ITreeNode[]> | ITreeNode[]) {
  const innerData = ref(generateInnerTree(unref(node)));

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
  const getChildren = (node: IInnerTreeNode) => {
    const result = [];
    // 找到node在列表中的索引
    const startIndex = innerData.value.findIndex(item => item.id === node.id);
    // 找到他后面所有的子节点（level比当前节点大）
    for (let i = startIndex + 1; i < innerData.value.length && node.level < innerData.value[i].level; i++) {
      result.push(innerData.value[i]);
    }
    return result;
  };

  return {
    innerData,
    expandedTree,
    toggleNode,
    getChildren,
  };
}
