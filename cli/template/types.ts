import { upperFirst } from "./utils";

// 创建组件类型声明文件文件模板
export default function genTypesTemplate(name: string) {
  // 属性类型声明和属性类型
  const propsTypeName = upperFirst(name) + "Props";
  const propsName = name + "Props";

  return `\
import type { ExtractPropTypes, PropType } from "vue";

export const ${propsName} = {} as const;
export type ${propsTypeName} = ExtractPropTypes<typeof ${propsName}>;
`;
}
