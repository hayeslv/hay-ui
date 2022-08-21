import type { ExtractPropTypes, PropType } from "vue";

export const formProps = {
  model: { type: Object as PropType<Record<string, any>>, required: true },
  type: { type: String as PropType<"view"|"edit">, default: "view" },
} as const;
export type FormProps = ExtractPropTypes<typeof formProps>;
