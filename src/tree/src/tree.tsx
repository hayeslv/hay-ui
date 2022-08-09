import { defineComponent } from "vue";
import type { TreeProps } from "./tree-type";
import { treeProps } from "./tree-type";

export default defineComponent({
  name: "HTree",
  props: treeProps,
  setup(props: TreeProps) {
    return () => {
      return <div class="h-tree"></div>;
    };
  },
});
