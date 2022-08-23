import Theme from "vitepress/theme";

import "./demo-block.scss";
import DemoBlock from "vitepress-theme-demoblock/components/DemoBlock.vue";
import Demo from "vitepress-theme-demoblock/components/Demo.vue";
// import ElementPlus from "element-plus";
import type { App } from "vue";

// import "element-plus/dist/index.css";
// import "../../../src/index.scss";
import "../../styles/app.scss";

import { HTree } from "../../../src/components/tree";
import { HForm } from "../../../src/components/form";
import { HFormItem } from "../../../src/components/form-item";
import { HInput } from "../../../src/components/input";
import { HCard } from "../../../src/components/card";

export default {
  ...Theme,
  // 扩展应用程序实例
  enhanceApp({ app }: { app: App }) {
    // 注册组件
    // app.use(ElementPlus);
    app.component("DemoBlock", DemoBlock);
    app.component("Demo", Demo);

    app.component("HTree", HTree);
    app.component("HForm", HForm);
    app.component("HFormItem", HFormItem);
    app.component("HInput", HInput);
    app.component("HCard", HCard);
  },
};
