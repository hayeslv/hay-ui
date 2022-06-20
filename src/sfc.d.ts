declare module "*.vue" {
  // import Vue from "vue";
  // export default Vue;
  import type { defineComponent } from "vue";
  const component: ReturnType<typeof defineComponent>;
  export default component;
}
