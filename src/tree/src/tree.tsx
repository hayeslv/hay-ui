import { defineComponent, toRefs } from "vue";
import type { TreeProps } from "./tree-type";
import { treeProps } from "./tree-type";

export default defineComponent({
  name: "HTree",
  props: treeProps,
  setup(props: TreeProps) {
    const { data: innerData } = toRefs(props);
    return () => {
      return <div class="h-tree">{
        innerData.value.map(treeNode => treeNode.label)
      }</div>;
    };
  },
});
