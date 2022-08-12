import type { ITreeNode } from "../src/tree.type";
import { generateInnerTree } from "../src/utils";

// 数据
// const tree: ITreeNode[] = [
//   {
//     label: "docs",
//     id: "docs",
//   },
//   {
//     label: "packages",
//     id: "packages",
//     expanded: true,
//     children: [
//       {
//         label: "plugin-vue",
//         id: "plugin-vue",
//       },
//       {
//         label: "vite",
//         id: "vite",
//         expanded: true,
//         children: [
//           {
//             label: "src",
//             id: "src",
//           },
//           {
//             label: "README.md",
//             id: "README.md",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     label: "scripts",
//     id: "scripts",
//     children: [
//       {
//         label: "release.ts",
//         id: "release.ts",
//       },
//       {
//         label: "verifyCommit.ts",
//         id: "verifyCommit.ts",
//       },
//     ],
//   },
//   {
//     label: "pnpm-workspace.yaml",
//     id: "pnpm-workspace.yaml",
//   },
// ];
describe("generateInnerTree", () => {
  test("节点的isLeaf需要是true", () => {
    const tree: ITreeNode[] = [
      { label: "node1", id: "node-1" },
      { label: "node2", id: "node-2" },
      { label: "node3", id: "node-3" },
    ];

    const nodeList = generateInnerTree(tree);
    nodeList.forEach(node => {
      expect(node.isLeaf).toBe(true);
      expect(node.level).toBe(1);
    });
  });
  test("节点的level", () => {
    const tree: ITreeNode[] = [
      {
        label: "node1",
        id: "node-1",
        children: [
          {
            label: "node1-1",
            id: "node1-1",
            children: [
              { label: "node1-1-1", id: "node1-1-1" },
            ],
          },
        ],
      },
    ];
    const nodeList = generateInnerTree(tree);
    nodeList.forEach((node, index) => {
      expect(node.level).toBe(index + 1);
    });
  });
  test("打平后不再有children项", () => {
    const tree: ITreeNode[] = [
      { label: "node1", id: "node1" },
      {
        label: "node2",
        id: "node2",
        expanded: true,
        children: [
          { label: "node-2-1", id: "node-2-1" },
          {
            label: "node-2-2",
            id: "node-2-2",
            children: [
              { label: "node-2-2-1", id: "node-2-2-1" },
            ],
          },
        ],
      },
    ];
    const nodeList = generateInnerTree(tree);
    nodeList.forEach(node => {
      expect(node.children).toBe(undefined);
    });
  });
  test("111", () => {
    // const tree: ITreeNode[] = [
    //   {
    //     label: "docs",
    //     id: "docs",
    //   },
    //   {
    //     label: "packages",
    //     id: "packages",
    //     expanded: true,
    //     children: [
    //       {
    //         label: "plugin-vue",
    //         id: "plugin-vue",
    //       },
    //       {
    //         label: "vite",
    //         id: "vite",
    //         expanded: true,
    //         children: [
    //           {
    //             label: "src",
    //             id: "src",
    //           },
    //           {
    //             label: "README.md",
    //             id: "README.md",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     label: "scripts",
    //     id: "scripts",
    //     children: [
    //       {
    //         label: "release.ts",
    //         id: "release.ts",
    //       },
    //       {
    //         label: "verifyCommit.ts",
    //         id: "verifyCommit.ts",
    //       },
    //     ],
    //   },
    //   {
    //     label: "pnpm-workspace.yaml",
    //     id: "pnpm-workspace.yaml",
    //   },
    // ];
    // const nodeList = generateInnerTree(tree);
    // console.log(nodeList);
  });
});
