module.exports = {
  "/guide/": getGuideSidebar(),
  "/components/": getComponentsSidebar(),
};

function getGuideSidebar() {
  return [
    {
      text: "基础",
      items: [
        {
          text: "安装",
          link: "/guide/install",
        },
      ],
    },
  ];
}

function getComponentsSidebar() {
  return [
    {
      text: "Basic 基础组件",
      items: [
        {
          text: "Button 按钮",
          link: "/components/button/index",
        },
        {
          text: "Text 文本",
          link: "/components/text/index",
        },
      ],
    },
  ];
}

// const sidebar = {
//   "/": [
//     // { text: "快速开始", link: "/", items: [] },
//     {
//       text: "通用",
//       items: [{ text: "Button 按钮", link: "/components/button/" }],
//     },
//     // { text: "导航", items: [] },
//     // { text: "反馈", items: [] },
//     {
//       text: "数据录入",
//       items: [
//         { text: "Input 输入框", link: "/components/input/" },
//         { text: "Form", link: "/components/form/" },
//       ],
//     },
//     {
//       text: "数据展示",
//       items: [
//         { text: "Tree", link: "/components/tree/" },
//         { text: "Card", link: "/components/card/" },
//       ],
//     },
//     // {
//     //   text: "布局",
//     //   items: [
//     //     // { text: "Space 间距", link: "/components/space/" },
//     //   ],
//     // },
//     {
//       text: "反馈组件",
//       items: [
//         { text: "Drawer 抽屉", link: "/components/drawer/" },
//       ],
//     },
//     {
//       text: "业务组件",
//       items: [
//         { text: "PicCard", link: "/components/card/pic-card.md" },
//       ],
//     },
//   ],
// };
