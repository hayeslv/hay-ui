import type { ComputedRef, Ref } from "vue";
import type { IInnerTreeNode } from "../tree.type";

export interface IUseTreeCore {
  expandedTree: ComputedRef<IInnerTreeNode[]>;
  getChildren: (node: IInnerTreeNode, recursive?: boolean) => IInnerTreeNode[];
  getParent: (node: IInnerTreeNode) => IInnerTreeNode | undefined;
}

export interface TreeUtils { treeData: Ref<IInnerTreeNode[]> }
