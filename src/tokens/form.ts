import type { RuleItem } from "async-validator";
import type { Arrayable } from "./";

export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>;
}

export type FormRules = Partial<Record<string, Arrayable<FormItemRule>>>;
