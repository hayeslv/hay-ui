import Theme from "vitepress/dist/client/theme-default";
import HelloWorld from "../../../src/components/HelloWorld.vue";

export default {
  ...Theme,
  // 扩展应用程序实例
  enhanceApp({ app }) {
    // 注册组件
    app.component("HelloWorld", HelloWorld);
  },
};
