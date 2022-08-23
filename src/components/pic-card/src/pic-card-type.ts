import type { ExtractPropTypes, PropType } from "vue";
import type { IShadowType } from "../../card/src/card-type";

export const picCardProps = {
  shadow: { type: String as PropType<IShadowType>, default: "always" },
  pic: { type: String, default: undefined },
} as const;
export type PicCardProps = ExtractPropTypes<typeof picCardProps>;
