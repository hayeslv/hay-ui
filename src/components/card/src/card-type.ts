import type { ExtractPropTypes, PropType } from "vue";

export type IShadowType = "always" | "hover" | "never";

export const cardProps = {
  shadow: { type: String as PropType<IShadowType>, default: "always" },
} as const;
export type CardProps = ExtractPropTypes<typeof cardProps>;
