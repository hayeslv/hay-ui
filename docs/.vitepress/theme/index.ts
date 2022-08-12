import Theme from "vitepress/theme";
import HelloWorld from "../../../src/components/HelloWorld.vue";
import Test from "../../../src/components/Test";

import "./demo-block.scss";
import DemoBlock from "vitepress-theme-demoblock/components/DemoBlock.vue";
import Demo from "vitepress-theme-demoblock/components/Demo.vue";
import type { App } from "vue";

import "../../../src/index.scss";

import { HTree } from "../../../src/tree";

export default {
  ...Theme,
  // 扩展应用程序实例
  enhanceApp({ app }: { app: App }) {
    // 注册组件
    app.component("DemoBlock", DemoBlock);
    app.component("Demo", Demo);

    app.component("HelloWorld", HelloWorld);
    app.component("Test", Test);

    app.component("HTree", HTree);
  },
};
