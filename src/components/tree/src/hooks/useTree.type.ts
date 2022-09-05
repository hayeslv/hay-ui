import type { ComputedRef, Ref } from "vue";
import type { IInnerTreeNode } from "../tree.type";

export interface IUseTreeCore {
  expandedTree: ComputedRef<IInnerTreeNode[]>;
  getChildren: (node: IInnerTreeNode, recursive?: boolean) => IInnerTreeNode[];
  getExpandedChildren: (node: IInnerTreeNode | Ref<IInnerTreeNode>, result?: IInnerTreeNode[]) => IInnerTreeNode[];
  getIndex: (node: IInnerTreeNode) => number;
  getParent: (node: IInnerTreeNode) => IInnerTreeNode | undefined;
}

export interface IUseTreeToggle {
  toggleNode: (treeNode: IInnerTreeNode) => void;
}

export interface IUseTreeCheck {
  toggleCheckNode: (treeNode: IInnerTreeNode | Ref<IInnerTreeNode>) => void;
}

export interface IUseTreeOperate {
  append: (parent: IInnerTreeNode, node: IInnerTreeNode) => void;
  remove: (node: IInnerTreeNode) => void;
}

export type TreeUtils = {
  treeData: Ref<IInnerTreeNode[]>;
} & IUseTreeCore
& IUseTreeToggle
& IUseTreeCheck
& IUseTreeOperate;
