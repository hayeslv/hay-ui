import type { ExtractPropTypes } from "vue";

// interface IModel {

// }
// export interface IFieldItem {
//   label: string;
//   prop?: string;
//   span?: number;
//   full?: boolean;
//   render?: (...args: any[]) => JSX.Element;
// }

export const formItemProps = {
  span: { type: Number, default: 12 },
  full: { type: Boolean, default: false },
  label: { type: String, default: "" },
  prop: { type: String, default: null },
} as const;
export type FormItemProps = ExtractPropTypes<typeof formItemProps>;
