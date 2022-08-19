import type { ExtractPropTypes, PropType } from "vue";

export interface ITreeNode {
  label: string;
  id?: string;
  children?: ITreeNode[];

  selected?: boolean; // 点击选中
  checked?: boolean; // 勾选
  partChecked?: boolean; // 部分选中
  expanded?: boolean; // 展开

  disableSelect?: boolean;
  disableCheck?: boolean;
  disableToggle?: boolean;
}

export interface IInnerTreeNode extends ITreeNode {
  parentId?: string; // 父节点ID
  level: number; // 节点层级
  isLeaf?: boolean; // 是否叶子节点
}

export const treeProps = {
  data: {
    type: Object as PropType<ITreeNode[]>,
    required: true,
  },
  checkable: {
    type: Boolean,
    default: false,
  },
} as const;
export type TreeProps = ExtractPropTypes<typeof treeProps>;