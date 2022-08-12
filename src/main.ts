import { createApp } from "vue";
// import "./style.css";
import App from "./App.vue";

import "./index.scss";

// import Button from "./button";

// 使用全量导出
import HayUI from "../build/hay-ui.esm.js";

createApp(App)
  .use(HayUI)
  .mount("#app");
