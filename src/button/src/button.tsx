// 真正的源码

import { defineComponent, toRefs } from "vue";
import { buttonProps } from "./button-type";

export default defineComponent({
  name: "HButton",
  props: buttonProps,
  setup(props, { slots }) {
    console.log(props);
    const { type } = toRefs(props);
    console.log(type);

    return () => {
      const defaultSlot = slots.default ?  slots.default() : "按钮";
      return <button class={`h-btn h-btn--${type.value}`}>{defaultSlot}</button>;
    };
  },
});
