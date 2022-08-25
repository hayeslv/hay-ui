import type { SetupContext } from "vue";
import { ref, defineComponent, inject, useAttrs } from "vue";
import type { InputProps } from "./input-type";
import { inputProps } from "./input-type";
import "../style/input.scss";

const useFormItem = () => {
  const formItem: any = inject("FromItemContext", undefined);
  return {
    formItem,
  };
};

export default defineComponent({
  name: "HInput",
  inheritAttrs: false,
  props: inputProps,
  setup(props: InputProps, ctx: SetupContext) {
    const { formItem } = useFormItem();

    const attrs = useAttrs();
    const focused = ref(false);

    const handleFocus = (event: FocusEvent) => {
      focused.value = true;
      ctx.emit("focus", event); // 上抛事件
    };
    const handleBlur = (event: FocusEvent) => {
      focused.value = false;
      ctx.emit("blur", event); // 上抛事件
      formItem?.validate?.("blur"); // 表单校验
    };
    return () => {
      return <div class="h-input">
        <div class={["h-input__wrapper", focused.value && "is-focus"]}>
          <input
            class="h-input__inner"
            onBlur={handleBlur}
            onFocus={handleFocus}
            {...attrs}
          ></input>
        </div>
      </div>;
    };
  },
});
