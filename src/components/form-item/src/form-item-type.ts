import type { ExtractPropTypes } from "vue";

export const formItemProps = {
  span: { type: Number, default: 12 },
  full: { type: Boolean, default: false },
  label: { type: String, default: "" },
  prop: { type: String, default: null },
} as const;
export type FormItemProps = ExtractPropTypes<typeof formItemProps>;
