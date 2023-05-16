import { defineConfig } from "vitepress";
import { demoBlockPlugin } from "vitepress-theme-demoblock";

// base是我们的发布路径，默认为/，可以在环境变量中自行配置
const base = process.env.BASE || "/";
// nav导航我们抽离在configs下面nav.js文件，方便管理
const nav = require("./configs/nav");
const sidebar = require("./configs/sidebar");

export default defineConfig({
  title: "HayUI",
  base: base,
  themeConfig: {
    nav,
    sidebar,
    // editLink: true,
    // editLinkText: '在 GitHub 上编辑此页',
    // lastUpdated: '上次更新',
  },
  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
  ],
  markdown: {
    config(md) {
      // 这里可以使用markdown-it插件

      md.use(demoBlockPlugin, {
        cssPreprocessor: "scss",
      });
    },
  },
});
