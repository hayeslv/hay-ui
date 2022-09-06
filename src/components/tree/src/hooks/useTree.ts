import type { Ref, SetupContext } from "vue";
import { ref, unref } from "vue";
import type { ITreeNode, TreeProps } from "../tree.type";
import { generateInnerTree } from "../utils";
import type { TreeUtils } from "./useTree.type";
import { useTreeCheck } from "./useTreeCheck";
import { useCore } from "./useTreeCore";
import { useTreeDragDrop } from "./useTreeDragDrop";
import { useTreeOperate } from "./useTreeOperate";
import { useTreeToggle } from "./useTreeToggle";

export default function useTree(
  tree: ITreeNode[] | Ref<ITreeNode[]>,
  treeProps: TreeProps,
  ctx: SetupContext,
): TreeUtils {
  const data = unref(tree);
  const innerData = ref(generateInnerTree(data));

  const core = useCore(innerData);
  const plugins = [useTreeToggle, useTreeCheck, useTreeOperate];
  const dragdropPlugin = useTreeDragDrop(treeProps.draggable, innerData, core);

  // 聚合插件
  const pluginMethods = plugins.reduce((acc, plugin) => {
    return { ...acc, ...plugin(innerData, core) };
  }, {});

  return {
    ...core,
    ...pluginMethods,
    ...dragdropPlugin,
    treeData: innerData,
  } as TreeUtils;
}
