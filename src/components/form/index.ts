import type { App } from "vue";
import Form from "./src/form";

// 具名导出
export { Form as HForm };

// 导出插件
export default {
  install(app: App) {
    app.component(Form.name, Form);
  },
};
