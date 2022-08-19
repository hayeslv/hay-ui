import type { SetupContext } from "vue";
import { provide, toRefs, defineComponent } from "vue";
import type { FormProps } from "./form-type";
import { formProps } from "./form-type";
import "../style/form.scss";

export default defineComponent({
  name: "HForm",
  props: formProps,
  slots: ["default"],
  setup(props: FormProps, ctx: SetupContext) {
    const { model } = toRefs(props);
    provide("FORM_MODEL", model);

    return () => {
      return <div class="h-form">
        {ctx.slots.default ? ctx.slots.default() : ""}
      </div>;
    };
  },
});
