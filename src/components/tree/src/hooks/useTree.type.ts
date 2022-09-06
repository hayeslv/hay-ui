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

// 拖拽
export type IDragDrop = boolean | IDropType;
export interface IDropType {
  dropPrev?: boolean;
  dropNext?: boolean;
  dropInner?: boolean;
}
export interface IUseTreeDraggable {
  onDragstart: (event: DragEvent, treeNode: IInnerTreeNode) => void;
  onDragover: (event: DragEvent) => void;
  onDragleave: (event: DragEvent) => void;
  onDragend: (event: DragEvent) => void;
  onDrop: (event: DragEvent, treeNode: IInnerTreeNode) => void;
}
export interface DragState {
  dropType?: keyof Required<IDropType>;
  draggingNode?: HTMLElement | null;
  draggingTreeNode?: IInnerTreeNode | null;
}

export type TreeUtils = {
  treeData: Ref<IInnerTreeNode[]>;
} & IUseTreeCore
& IUseTreeToggle
& IUseTreeCheck
& IUseTreeOperate
& IUseTreeDraggable;
