import type { SetupContext } from "vue";
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
    const formModel = inject("FORM_MODEL") as Record<string, any>;
    const { label, prop } = toRefs(props);

    return () => {
      return <div class="h-form-item h-form-item__read" style={{ width: getColWidth(props) }}>
        <div class="h-form-item__read-label">{label.value || ""}</div>
        <div class="h-form-item__read-content">
          {
            ctx.slots.default
              ? ctx.slots.default({ ...formModel.value })
              : formModel.value[prop.value] || ""
          }
        </div>
      </div>;
    };
  },
});
