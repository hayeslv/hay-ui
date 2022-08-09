import { upperFirst } from "./utils";

// 创建组件核心文件模板
export default function genCoreTemplate(name: string) {
  const compName = "H" + upperFirst(name);
  const propsTypeName = upperFirst(name) + "Props";
  const propsName = name + "Props";
  const propsFileName = name + "-type";
  const className = `h-${name}`;

  return `\
import { defineComponent } from "vue";
import { ${propsName}, ${propsTypeName} } from "./${propsFileName}";

export default defineComponent({
  name: "${compName}",
  props: ${propsName},
  setup(props: ${propsTypeName}) {
    
    return () => {
      return <div class="${className}"></div>
    };
  },
});
`;
}
