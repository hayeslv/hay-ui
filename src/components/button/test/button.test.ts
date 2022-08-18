import { render } from "@testing-library/vue";
import Button from "../src/button";

describe("按钮", () => {
  // 基础功能
  test("should work", () => {
    const { getByRole } = render(Button);
    getByRole("button"); // 看看是否有一个button按钮被生成了
  });

  // 插槽
  test("default slot should be 按钮", () => {
    const { getByText } = render(Button);
    getByText("按钮");
  });
  test("slot should be work", () => {
    const { getByText } = render(Button, {
      slots: {
        default() {
          return "确定";
        },
      },
    });
    getByText("确定");
  });

  // 类型
  test("default type should be secondary", () => {
    const { getByRole } = render(Button);
    const button = getByRole("button");
    // 默认有h-btn--secondary这个class样式
    expect(button.classList.contains("h-btn--secondary")).toBe(true);
  });
  test("prop type should be work", () => {
    const { getByRole } = render(Button, {
      props: {
        type: "primary",
      },
    });
    const button = getByRole("button");
    expect(button.classList.contains("h-btn--primary")).toBe(true);
  });
});
