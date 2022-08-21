import type { Ref, SetupContext } from "vue";
import { defineComponent, inject, toRefs } from "vue";
import type { FormItemProps } from "./form-item-type";
import { formItemProps } from "./form-item-type";
import "../style/form-item.scss";

const fullColPart = 24;
const defaultColPart = 12;

const getColWidth = (field: FormItemProps) => {
  if (field.full) return "100%";
  // 获取span大小
  let span = defaultColPart;
  if (field.span !== undefined) {
    span = field.span;
  }
  // 计算百分比
  const width = (span * 100 / fullColPart).toFixed(2);
  return `${width}%`;
};

export default defineComponent({
  name: "HFormItem",
  props: formItemProps,
  slots: ["default"],
  setup(props: FormItemProps, ctx: SetupContext) {
    const formModel = inject("FORM_MODEL") as Ref<Record<string, any>>;
    const formType = inject("FORM_TYPE") as Ref<"view" | "edit">;
    const { label, prop } = toRefs(props);

    return () => {
      const viewDefaultContent = () => formModel.value[prop.value] || "";
      const editDefaultContent = (form: Ref<Record<string, any>>, prop: Ref<string>) => (
        <el-input v-model={form.value[prop.value]} />
      );
      const contentRender = (form: Ref<Record<string, any>>, prop: Ref<string>) => {
        if (formType.value === "view") return viewDefaultContent();
        return editDefaultContent(form, prop);
      };

      return <div class={["h-form-item", `h-form-item__${formType.value}`]} style={{ width: getColWidth(props) }}>
        <div class={[`h-form-item__${formType.value}-label`]}>{label.value || ""}</div>
        <div class={[`h-form-item__${formType.value}-content`]}>
          {
            ctx.slots.default
              ? ctx.slots.default({ ...formModel.value })
              : contentRender(formModel, prop)
          }
        </div>
      </div>;
    };
  },
});
