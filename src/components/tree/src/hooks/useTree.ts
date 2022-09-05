import type { Ref } from "vue";
import { ref, unref } from "vue";
import type { ITreeNode } from "../tree.type";
import { generateInnerTree } from "../utils";
import type { TreeUtils } from "./useTree.type";
import { useTreeCheck } from "./useTreeCheck";
import { useCore } from "./useTreeCore";
import { useTreeOperate } from "./useTreeOperate";
import { useTreeToggle } from "./useTreeToggle";

export default function useTree(
  node: Ref<ITreeNode[]> | ITreeNode[],
  // ctx: SetupContext,
): TreeUtils {
  const innerData = ref(generateInnerTree(unref(node)));

  const core = useCore(innerData);
  const plugins = [useTreeToggle, useTreeCheck, useTreeOperate];

  // 聚合插件
  const pluginMethods = plugins.reduce((acc, plugin) => {
    return { ...acc, ...plugin(innerData, core) };
  }, {});

  return {
    ...core,
    ...pluginMethods,
    treeData: innerData,
  } as TreeUtils;
}
