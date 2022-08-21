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
    const { model, type } = toRefs(props);
    provide("FORM_MODEL", model);
    provide("FORM_TYPE", type);

    return () => {
      return <div class={["h-form", type.value === "edit" && "h-form-edit"]}>
        {ctx.slots.default ? ctx.slots.default() : ""}
      </div>;
    };
  },
});
