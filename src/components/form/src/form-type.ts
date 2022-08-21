import type { ExtractPropTypes, PropType } from "vue";
import type { FormRules } from "../../../tokens";

export const formProps = {
  model: { type: Object as PropType<Record<string, any>>, required: true },
  rules: { type: Object as PropType<FormRules> },
  type: { type: String as PropType<"view"|"edit">, default: "view" },
} as const;
export type FormProps = ExtractPropTypes<typeof formProps>;
