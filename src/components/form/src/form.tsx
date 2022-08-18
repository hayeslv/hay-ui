import { defineComponent } from "vue";
import type { FormProps } from "./form-type";
import { formProps } from "./form-type";

export default defineComponent({
  name: "HForm",
  props: formProps,
  setup(props: FormProps) {
    return () => {
      return <div class="h-form"></div>;
    };
  },
});
