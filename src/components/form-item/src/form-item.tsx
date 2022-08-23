import type { Ref, SetupContext } from "vue";
import { provide, reactive, computed, defineComponent, inject, toRefs } from "vue";
import type { FormItemProps } from "./form-item-type";
import { formItemProps } from "./form-item-type";
import "../style/form-item.scss";
import type { FormItemRule } from "../../../tokens";
import { ensureArray } from "../../../utils";
import type { RuleItem } from "async-validator";
import AsyncValidator from "async-validator";

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
    const formContext: any = inject("FromContext", undefined);
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
    const propString = computed(() => {
      if (!props.prop) return "";
      return props.prop;
    });
    const fieldValue = computed(() => {
      const model = formContext?.model;
      if (!model || !props.prop) return;
      return model[props.prop];
    });

    const formItemClasses = computed(() => [
      "h-form-item",
      `h-form-item__${formContext.type}`,
      isRequired.value && "required",
    ]);

    const doValidate = async(rules: RuleItem[]): Promise<true> => {
      const modelName = propString.value;
      const validator = new AsyncValidator({
        [modelName]: rules,
      });
      return validator
        .validate({ [modelName]: fieldValue.value }, { firstFields: true })
        .then(() => {
          console.log("成功");
          return true as const;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    };
    const validate = async(trigger: string, callback?: Function) => {
      const rules = getFilteredRule(trigger);
      if (rules.length === 0) {
        callback?.(true);
        return true;
      }
      return doValidate(rules)
        .then(() => {
          callback?.(true);
          return true as const;
        })
        .catch((err) => {
          const { fields } = err;
          console.log("错误提示！！！");
          callback?.(false, fields);
          return callback ? false : Promise.reject(fields);
        });
    };

    const getFilteredRule = (trigger: string) => {
      const rules = _rules.value;
      return rules.filter(rule => {
        if (!rule.trigger || !trigger) return true;
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.includes(trigger);
        } else {
          return rule.trigger === trigger;
        }
      });
    };

    const context = reactive({
      ...toRefs(props),
      validate,
    });
    provide("FromItemContext", context);

    ctx.expose({
      validate,
    });

    return () => {
      const viewDefaultContent = () => (prop?.value && formContext.model[prop.value]) || "";
      const editDefaultContent = (form: Record<string, any>, prop?: Ref<string | undefined>) => (
        prop?.value && <h-input v-model={form[prop?.value]} />
      );
      const contentRender = (form: Record<string, any>, prop?: Ref<string | undefined>) => {
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
