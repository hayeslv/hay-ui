import Theme from "vitepress/theme";
import HelloWorld from "../../../src/components/HelloWorld.vue";
import Test from "../../../src/components/Test";

import DemoBlock from "vitepress-theme-demoblock/components/DemoBlock.vue";
import Demo from "vitepress-theme-demoblock/components/Demo.vue";

export default {
  ...Theme,
  // 扩展应用程序实例
  enhanceApp({ app }) {
    // 注册组件
    app.component("DemoBlock", DemoBlock);
    app.component("Demo", Demo);

    app.component("HelloWorld", HelloWorld);
    app.component("Test", Test);
  },
};
