import type { ExtractPropTypes, PropType } from "vue";
import type { Arrayable, FormItemRule } from "../../../tokens";

export const formItemProps = {
  span: { type: Number, default: 12 },
  full: { type: Boolean, default: false },
  label: { type: String, default: "" },
  prop: { type: String, default: null },
  rules: { type: [Object, Array] as PropType<Arrayable<FormItemRule>> },
} as const;
export type FormItemProps = ExtractPropTypes<typeof formItemProps>;
