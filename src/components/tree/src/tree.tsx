import type { SetupContext } from "vue";
import {  defineComponent, provide, toRefs } from "vue";
import useTree from "./hooks/useTree";
import type { IInnerTreeNode, TreeProps } from "./tree.type";
import { treeProps } from "./tree.type";
import "../style/tree.scss";
import TreeNode from "./components/TreeNode";
import TreeNodeToggle from "./components/TreeNodeToggle";

export default defineComponent({
  name: "HTree",
  props: treeProps,
  setup(props: TreeProps, ctx: SetupContext) {
    const { data } = toRefs(props);
    const { slots } = ctx;
    const treeContext = useTree(data.value, props, ctx);
    provide("TREE_CONTEXT", treeContext);

    return () => {
      return <div class="h-tree">
        {
          treeContext.expandedTree.value.map((treeNode: IInnerTreeNode) => (
            <TreeNode {...props} treeNode={treeNode}>
              {{
                content: () => slots.content ? slots.content(treeNode) : treeNode.label,
                icon: () => slots.icon
                  ? slots.icon({ nodeData: treeNode, toggleNode: treeContext.toggleNode })
                  : <TreeNodeToggle
                    expanded={!!treeNode.expanded}
                    onClick= {() => treeContext.toggleNode(treeNode)}
                  ></TreeNodeToggle>,
              }}
            </TreeNode>
          ))
        }
      </div>;
    };
  },
});
