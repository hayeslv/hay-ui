import type { Ref, SetupContext } from "vue";
import { computed, defineComponent, inject, toRefs } from "vue";
import type { FormItemProps } from "./form-item-type";
import { formItemProps } from "./form-item-type";
import "../style/form-item.scss";
import type { FormItemRule } from "../../../tokens";
import { ensureArray } from "../../../utils";

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
    const formContext: any = inject("FromContext", {});
    const { label, prop } = toRefs(props);

    const _rules = computed(() => {
      const rules: FormItemRule[] = props.rules ? ensureArray(props.rules) : [];
      // 将form表单中的rules合进来
      const formRules = formContext?.rules;
      if (formRules && props.prop) {
        const _rules = formRules[props.prop];
        if (_rules) {
          rules.push(...ensureArray(_rules));
        }
      }
      return rules;
    });
    const isRequired = computed(() =>
      _rules.value.some(rule => rule.required === true),
    );

    const formItemClasses = computed(() => [
      "h-form-item",
      `h-form-item__${formContext.type}`,
      isRequired.value && "required",
    ]);

    return () => {
      const viewDefaultContent = () => formContext.model[prop.value] || "";
      const editDefaultContent = (form: Record<string, any>, prop: Ref<string>) => (
        <el-input v-model={form[prop.value]} />
      );
      const contentRender = (form: Record<string, any>, prop: Ref<string>) => {
        if (formContext.type === "view") return viewDefaultContent();
        return editDefaultContent(form, prop);
      };

      return <div class={formItemClasses.value} style={{ width: getColWidth(props) }}>
        <div class={["h-form-item__label"]}>{label.value || ""}</div>
        <div class={["h-form-item__content"]}>
          {
            ctx.slots.default
              ? ctx.slots.default({ ...formContext.model })
              : contentRender(formContext.model, prop)
          }
        </div>
      </div>;
    };
  },
});
