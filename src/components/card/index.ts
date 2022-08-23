import type { App } from "vue";
import Card from "./src/card";

// 具名导出
export { Card as HCard };

// 导出插件
export default {
  install(app: App) {
    app.component(Card.name, Card);
  },
};
