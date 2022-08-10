// 入口文件
// 1、引入实现的组件，并批量导出
import type { App } from "vue";
import * as pkg from "../package.json";
import ButtonPlugin, { Button } from "../src/button";
import TreePlugin, { Tree } from "../src/tree";

// 2、导出这些组件
export {
  Button,
  Tree,
};

const installs = [ButtonPlugin, TreePlugin];

// 3、导出一个vue插件
export default {
  version: pkg.version,
  install(app: App): void {
    installs.forEach(p => app.use(p));
  },
};
