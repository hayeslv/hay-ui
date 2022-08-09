import { computed, defineComponent, ref, toRefs } from "vue";
import type { IInnerTreeNode, TreeProps } from "./tree-type";
import { treeProps } from "./tree-type";
import { generateInnerTree } from "./utils";

export default defineComponent({
  name: "HTree",
  props: treeProps,
  setup(props: TreeProps) {
    const { data } = toRefs(props);
    const innerData = ref(generateInnerTree(data.value));

    const toggleNode = (node: IInnerTreeNode) => {
      node.expanded = !node.expanded;
    };
    // 获取那些展开的节点列表
    const expandedTree = computed(() => {
      let excludedNodes: IInnerTreeNode[] = [];
      const result = [];

      // 循环列表，找出那些 !expanded 的节点
      for (const item of innerData.value) {
        // 如果当前遍历的节点在排除列表中，则直接跳出本次循环
        if (excludedNodes.includes(item)) continue;

        // 当前节点处于折叠状态，它的子节点应该被排除
        if (item.expanded !== true) {
          // 获取需要排除的children
          excludedNodes = getChildren(item);
        }
        result.push(item);
      }
      return result;
    });
    const getChildren = (node: IInnerTreeNode) => {
      const result = [];
      // 找到node在列表中的索引
      const startIndex = innerData.value.findIndex(item => item.id === node.id);
      // 找到他后面所有的子节点（level比当前节点大）
      for (let i = startIndex + 1; i < innerData.value.length && node.level < innerData.value[i].level; i++) {
        result.push(innerData.value[i]);
      }
      return result;
    };

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
