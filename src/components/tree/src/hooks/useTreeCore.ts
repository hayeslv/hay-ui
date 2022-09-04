import type { Ref } from "vue";
import { unref, computed } from "vue";
import type { IInnerTreeNode } from "../tree.type";
import type { IUseTreeCore } from "./useTree.type";

export function useCore(innerData: Ref<IInnerTreeNode[]>): IUseTreeCore {
  // 获取展开的节点列表
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
  const getChildren = (treeNode: IInnerTreeNode | Ref<IInnerTreeNode>, recursive: boolean = true): IInnerTreeNode[] => {
    const node = unref(treeNode);
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

  /**
   * 获取当前节点下的所有“已展开”的子节点
   *
   * @param {(IInnerTreeNode | Ref<IInnerTreeNode>)} treeNode
   * @param {IInnerTreeNode[]} [result=[]]
   * @returns {IInnerTreeNode[]}
   */
  const getExpandedChildren = (
    treeNode: IInnerTreeNode | Ref<IInnerTreeNode>,
    result: IInnerTreeNode[] = [],
  ): IInnerTreeNode[] => {
    const node = unref(treeNode);
    // 获取当前子节点下的直接子节点
    const childrenNodes = getChildren(node, false);
    result.push(...childrenNodes);
    childrenNodes.forEach(n => {
      if (n.expanded) {
        getExpandedChildren(n, result);
      }
    });

    return result;
  };

  const getParent = (node: IInnerTreeNode): IInnerTreeNode | undefined => {
    const parentNode = innerData.value.find(item => item.id === node.parentId);
    return parentNode as IInnerTreeNode | undefined;
  };

  return {
    expandedTree,
    getChildren,
    getExpandedChildren,
    getParent,
  };
}
