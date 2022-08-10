import {  defineComponent, toRefs } from "vue";
import useTree from "./hooks/useTree";
import type { IInnerTreeNode, TreeProps } from "./tree-type";
import { treeProps } from "./tree-type";
import "../style/tree.scss";

const NODE_HEIGHT = 28;
const NODE_INDENT = 24;

export default defineComponent({
  name: "HTree",
  props: treeProps,
  setup(props: TreeProps, { slots }) {
    const { data, checkable } = toRefs(props);
    const { expandedTree, toggleNode, getChildren, toggleCheckNode } = useTree(data);

    return () => {
      const defaultIconSlot = (treeNode: IInnerTreeNode) => <svg
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
      </svg>;

      return <div class="h-tree">
        {
          expandedTree.value.map(treeNode => (
            <div
              class="h-tree-node relative leading-[24px] hover:bg-slate-100"
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
                  : slots.icon // 判断插槽
                    ? slots.icon({ nodeData: treeNode, toggleNode })
                    : defaultIconSlot(treeNode)
              }
              {/* 复选框 */}
              {
                checkable.value &&
                <span class={`relative mr-[8px] ${treeNode.partChecked ? "h-tree__part_checked" : ""}`}>
                  {
                    treeNode.partChecked
                      ? <span class="h-tree-checkbox__inner cursor-pointer" onClick={() => toggleCheckNode(treeNode)}>-</span>
                      // TODO 将input修改为span
                      : <input type="checkbox" v-model={treeNode.checked} onClick={() => toggleCheckNode(treeNode)}></input>
                  }
                </span>
              }
              {/* 标签 */}
              {
                slots.content
                  ? slots.content(treeNode)
                  : treeNode.label
              }
            </div>
          ))
        }
      </div>;
    };
  },
});
