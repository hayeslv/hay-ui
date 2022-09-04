import { defineComponent, inject, toRefs } from "vue";
import type { TreeNodeProps } from "./TreeNode.type";
import { treeNodeProps } from "./TreeNode.type";

const NODE_HEIGHT = 32; // 节点高度
const NODE_INDENT = 24; // 节点缩进大小

export default defineComponent({
  name: "HTreeNode",
  props: treeNodeProps,
  setup(props: TreeNodeProps, { slots }) {
    const { treeNode, checkable } = toRefs(props);
    const { getChildren, getExpandedChildren, toggleCheckNode } = inject("TREE_CONTEXT") as any; // TODO 添加类型

    return () => <div
      class="h-tree-node relative leading-[32px] hover:bg-slate-100"
      style={{
        paddingLeft: `${NODE_INDENT * (treeNode.value.level - 1)}px`,
      }}>
      {/* 连接线显示：1.不是叶子节点，2.展开状态 */}
      {
        !treeNode.value.isLeaf && treeNode.value.expanded &&
        <span
          class="h-tree-node__vline absolute w-px bg-gray-300"
          style={{
            height: `${NODE_HEIGHT * getExpandedChildren(treeNode).length}px`,
            left: `${NODE_INDENT * (treeNode.value.level - 1) + 12}px`,
            top: `${NODE_HEIGHT}px`,
          }}
        ></span>
      }
      {/* 折叠图标 */}
      {/* 判断当前节点是否为叶子节点 */}
      {
        treeNode.value.isLeaf
          ? <span style={{ display: "inline-block", width: "18px" }}></span>
          : slots.icon!()
      }
      {/* 复选框 */}
      {
        checkable.value &&
      <span class={`relative mr-[8px] ${treeNode.value.partChecked ? "h-tree__part_checked" : ""}`}>
        {
          treeNode.value.partChecked
            ? <span class="h-tree-checkbox__inner cursor-pointer" onClick={() => toggleCheckNode(treeNode)}>-</span>
            // TODO 将input修改为span
            : <input type="checkbox" v-model={treeNode.value.checked} onClick={() => toggleCheckNode(treeNode)}></input>
        }
      </span>
      }
      {/* 标签 */}
      {
        slots.content
          ? slots.content(treeNode)
          : treeNode.value.label
      }
    </div>;
  },
});
