import { ensureDirSync } from "fs-extra";
import { resolve } from "path";
import { lightBlue, lightGreen } from "kolorist";

export interface ComponentMeta {
  name: string;
  title: string;
  category: string;
}

export default function createComponent(meta: ComponentMeta) {
  const { name } = meta;

  // 这里name需要做一些规范

  // 拼接组件目录：希望创建的目录 src/xxx/
  const componentDir = resolve("../src", name);

  // 其他核心文件目录：组件源文件、类型、样式、测试
  const compSrcDir = resolve(componentDir, "src");
  const styleDir = resolve(componentDir, "style");
  const testDir = resolve(componentDir, "test");

  ensureDirSync(compSrcDir);
  ensureDirSync(styleDir);
  ensureDirSync(testDir);
}
