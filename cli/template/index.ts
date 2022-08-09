import { upperFirst } from "./utils";

export default function genIndexTemplate(name: string) {
  const compName = upperFirst(name);
  return `\
import type { App } from "vue";
import ${compName} from "./src/${name}";

// 具名导出
export { ${compName} };

// 导出插件
export default {
  install(app: App) {
    app.component(${compName}.name, ${compName});
  },
};
`;
}
