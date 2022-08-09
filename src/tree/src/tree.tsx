import { defineComponent, ref, toRefs } from "vue";
import type { TreeProps } from "./tree-type";
import { treeProps } from "./tree-type";
import { generateInnerTree } from "./utils";

export default defineComponent({
  name: "HTree",
  props: treeProps,
  setup(props: TreeProps) {
    const { data } = toRefs(props);
    const innerData = ref(generateInnerTree(data.value));
    return () => {
      return <div class="h-tree">{
        innerData.value.map(treeNode => treeNode.label)
      }</div>;
    };
  },
});
