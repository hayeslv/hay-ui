// 真正的源码

import { defineComponent, toRefs } from "vue";
import { buttonProps } from "./button-type";

export default defineComponent({
  name: "HButton",
  props: buttonProps,
  setup(props, { slots }) {
    const { type, size, disabled } = toRefs(props);

    return () => {
      const defaultSlot = slots.default ?  slots.default() : "按钮";
      return <button disabled={disabled.value} class={`h-btn h-btn--${type.value} h-btn--${size.value}`}>{defaultSlot}</button>;
    };
  },
});
