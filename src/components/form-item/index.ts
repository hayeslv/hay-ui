import type { App } from "vue";
import FormItem from "./src/form-item";

// 具名导出
export { FormItem as HFormItem };

// 导出插件
export default {
  install(app: App) {
    app.component(FormItem.name, FormItem);
  },
};
