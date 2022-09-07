import { defineConfig } from "vitepress";
import { demoBlockPlugin } from "vitepress-theme-demoblock";

const sidebar = {
  "/": [
    // { text: "快速开始", link: "/", items: [] },
    {
      text: "通用",
      items: [{ text: "Button 按钮", link: "/components/button/" }],
    },
    // { text: "导航", items: [] },
    // { text: "反馈", items: [] },
    {
      text: "数据录入",
      items: [
        { text: "Input 输入框", link: "/components/input/" },
        { text: "Form", link: "/components/form/" },
      ],
    },
    {
      text: "数据展示",
      items: [
        { text: "Tree", link: "/components/tree/" },
        { text: "Card", link: "/components/card/" },
      ],
    },
    // {
    //   text: "布局",
    //   items: [
    //     // { text: "Space 间距", link: "/components/space/" },
    //   ],
    // },
    {
      text: "反馈组件",
      items: [
        { text: "Drawer 抽屉", link: "/components/drawer/" },
      ],
    },
    {
      text: "业务组件",
      items: [
        { text: "PicCard", link: "/components/card/pic-card.md" },
      ],
    },
  ],
};

export default defineConfig({
  title: "HayUI",
  themeConfig: {
    sidebar,
  },
  markdown: {
    config(md) {
      // 这里可以使用markdown-it插件

      md.use(demoBlockPlugin, {
        cssPreprocessor: "scss",
      });
    },
  },
});
