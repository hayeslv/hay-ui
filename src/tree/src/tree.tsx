import {  defineComponent, toRefs } from "vue";
import { useTree } from "./composables/use-tree";
import type { TreeProps } from "./tree-type";
import { treeProps } from "./tree-type";

export default defineComponent({
  name: "HTree",
  props: treeProps,
  setup(props: TreeProps) {
    const { data } = toRefs(props);
    const { expandedTree, toggleNode } = useTree(data);

    return () => {
      return <div class="h-tree">
        {
          expandedTree.value.map(treeNode => <div class="h-tree-node" style={{
            paddingLeft: `${24 * (treeNode.level - 1)}px`,
          }}>
            {/* 折叠图标 */}
            {/* 判断当前节点是否为叶子节点 */}
            {
              treeNode.isLeaf
                ? <span style={{ display: "inline-block", width: "18px" }}></span>
                : <svg
                  onClick={() => toggleNode(treeNode)}
                  style={{
                    width: "18px",
                    height: "18px",
                    display: "inline-block",
                    transform: treeNode.expanded ? "rotate(90deg)" : "",
                  }}
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M384 192v640l384-320.064z"></path>
                </svg>
            }
            {/* 标签 */}
            {treeNode.label}
          </div>)
        }
      </div>;
    };
  },
});
