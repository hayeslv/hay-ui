// 入口文件
// 1、引入实现的组件，并批量导出
import type { App } from "vue";
import * as pkg from "../package.json";
import ButtonPlugin, { HButton } from "../src/components/button";
import TreePlugin, { HTree } from "../src/components/tree";
import FormPlugin, { HForm } from "../src/components/form";
import FormItemPlugin, { HFormItem } from "../src/components/form-item";
import InputPlugin, { HInput } from "../src/components/input";

// 2、导出这些组件
export {
  HButton,
  HTree,
  HForm,
  HFormItem,
  HInput,
};

const installs = [ButtonPlugin, TreePlugin, FormPlugin, FormItemPlugin, InputPlugin];

// 3、导出一个vue插件
export default {
  version: pkg.version,
  install(app: App): void {
    installs.forEach(p => app.use(p));
  },
};
