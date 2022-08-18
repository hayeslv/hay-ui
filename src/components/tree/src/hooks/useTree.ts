import type { Ref } from "vue";
import { ref, unref } from "vue";
import type { IInnerTreeNode, ITreeNode } from "../tree.type";
import { generateInnerTree } from "../utils";
import { useTreeCheck } from "./useTreeCheck";
import { useCore } from "./useTreeCore";

export default function useTree(
  node: Ref<ITreeNode[]> | ITreeNode[],
  // ctx: SetupContext,
) {
  const innerData = ref(generateInnerTree(unref(node)));

  const core = useCore(innerData);
  const { toggleCheckNode } = useTreeCheck(core);

  const toggleNode = (node: IInnerTreeNode) => {
    node.expanded = !node.expanded;
  };

  return {
    ...core,
    treeData: innerData,
    toggleNode,
    toggleCheckNode,
  };
}
