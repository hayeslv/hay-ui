import type { ExtractPropTypes, PropType } from "vue";

export type ISizeType = "mini" | "small" | "default" | "medium";

export const drawerProps = {
  modelValue: { type: Boolean, default: false },
  size: { type: String as PropType<ISizeType>, default: "default" },
} as const;
export type DrawerProps = ExtractPropTypes<typeof drawerProps>;
