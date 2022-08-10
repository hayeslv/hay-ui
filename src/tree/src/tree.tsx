import {  defineComponent, toRefs } from "vue";
import { useTree } from "./composables/use-tree";
import type { TreeProps } from "./tree-type";
import { treeProps } from "./tree-type";

const NODE_HEIGHT = 28;
const NODE_INDENT = 24;

export default defineComponent({
  name: "HTree",
  props: treeProps,
  setup(props: TreeProps) {
    const { data } = toRefs(props);
    const { expandedTree, toggleNode, getChildren } = useTree(data);

    return () => {
      return <div class="h-tree">
        {
          expandedTree.value.map(treeNode => (
            <div
              class="h-tree-node relative leading-8 hover:bg-slate-100"
              style={{
                paddingLeft: `${NODE_INDENT * (treeNode.level - 1)}px`,
              }}>
              {/* 连接线显示：1.不是叶子节点，2.展开状态 */}
              {
                !treeNode.isLeaf && treeNode.expanded &&
                <span
                  class="h-tree-node__vline absolute w-px bg-gray-300"
                  style={{
                    height: `${NODE_HEIGHT * getChildren(treeNode).length}px`,
                    left: `${NODE_INDENT * (treeNode.level - 1) + 9}px`,
                    top: `${NODE_HEIGHT}px`,
                  }}
                ></span>
              }
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
            </div>
          ))
        }
      </div>;
    };
  },
});
