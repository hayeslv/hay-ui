import type { App } from "vue";
import Drawer from "./src/drawer";

// 具名导出
export { Drawer as HDrawer };

// 导出插件
export default {
  install(app: App) {
    app.component(Drawer.name, Drawer);
  },
};
