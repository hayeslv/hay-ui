// 指南默认跳转到我们guide目录下的install也就是安装页面
module.exports = [
  { text: "指南", link: "/guide/install", activeMatch: "^/guide/" },
  {
    text: "组件",
    link: "/components/button/index.md",
    activeMatch: "^/components/",
  },
];
