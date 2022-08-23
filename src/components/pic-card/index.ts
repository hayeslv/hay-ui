import type { App } from "vue";
import PicCard from "./src/pic-card";

// 具名导出
export { PicCard as HPicCard };

// 导出插件
export default {
  install(app: App) {
    app.component(PicCard.name, PicCard);
  },
};
