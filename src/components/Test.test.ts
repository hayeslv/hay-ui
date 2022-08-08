import Test from "./Test";
import { render } from "@testing-library/vue";

test("Test.tsx should work", () => {
  // 测试渲染组件---getByText：通过组件的一部分文本，来获取dom元素
  const { getByText } = render(Test);
  // 断言输出结果
  getByText("test: 0");
});
