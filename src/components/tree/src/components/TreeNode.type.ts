import { treeProps } from "../tree.type";
import type { IInnerTreeNode  } from "../tree.type";
import type { ExtractPropTypes, PropType } from "vue";

export const treeNodeProps = {
  ...treeProps,
  treeNode: {
    type: Object as PropType<IInnerTreeNode>,
    required: true,
  },
} as const;

export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>;
