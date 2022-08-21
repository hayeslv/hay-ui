import type { SetupContext } from "vue";
import { reactive, provide, toRefs, defineComponent } from "vue";
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
    provide(
      "FromContext",
      reactive({
        ...toRefs(props),
      }),
    );

    return () => {
      return <div class={["h-form", type.value === "edit" && "h-form-edit"]}>
        {ctx.slots.default ? ctx.slots.default() : ""}
      </div>;
    };
  },
});
