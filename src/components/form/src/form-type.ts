import type { ExtractPropTypes, PropType } from "vue";

export const formProps = {
  model: { type: Object as PropType<Record<string, any>>, required: true },
} as const;
export type FormProps = ExtractPropTypes<typeof formProps>;
