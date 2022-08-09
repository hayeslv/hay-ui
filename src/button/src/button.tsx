// 真正的源码

import { defineComponent, toRefs } from "vue";
import type { ButtonProps } from "./button-type";
import { buttonProps } from "./button-type";

export default defineComponent({
  name: "HButton",
  props: buttonProps,
  setup(props: ButtonProps, { slots }) {
    const { type, size, disabled, block } = toRefs(props);

    return () => {
      const defaultSlot = slots.default ?  slots.default() : "按钮";
      const blockClass = block.value ? "h-btn--block" : "";

      return <button
        disabled={disabled.value}
        class={`h-btn h-btn--${type.value} h-btn--${size.value} ${blockClass}`}
      >{defaultSlot}</button>;
    };
  },
});
