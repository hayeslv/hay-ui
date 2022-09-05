import type { Ref } from "vue";
import type { IInnerTreeNode } from "../tree.type";
import type { IUseTreeToggle } from "./useTree.type";

export function useTreeToggle(
  innerData: Ref<IInnerTreeNode[]>,
): IUseTreeToggle {
  const toggleNode = (node: IInnerTreeNode) => {
    node.expanded = !node.expanded;
  };

  return {
    toggleNode,
  };
}
