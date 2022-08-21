import { defineComponent, inject } from "vue";
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
  props: inputProps,
  setup(props: InputProps) {
    const { formItem } = useFormItem();
    const handleBlur = (event: FocusEvent) => {
      formItem?.validate?.("blur");
    };
    return () => {
      return <div class="h-input">
        <div class="h-input__wrapper">
          <input
            class="h-input__inner"
            onBlur={handleBlur}
          ></input>
        </div>
      </div>;
    };
  },
});
