// 在这个文件将组件暴露出去：插件或单个组件的形式
import type { App } from "vue";
import Button from "./src/button";

// 具名导出
export { Button };

// 导出插件
export default {
  install(app: App) {
    app.component(Button.name, Button);
  },
};
