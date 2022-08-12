// 入口文件
// 1、引入实现的组件，并批量导出
import type { App } from "vue";
import * as pkg from "../package.json";
import ButtonPlugin, { HButton } from "../src/button";
import TreePlugin, { HTree } from "../src/tree";

// 2、导出这些组件
export {
  HButton,
  HTree,
};

const installs = [ButtonPlugin, TreePlugin];

// 3、导出一个vue插件
export default {
  version: pkg.version,
  install(app: App): void {
    installs.forEach(p => app.use(p));
  },
};
