import { defineComponent } from "vue";

export default defineComponent({
  name: "HayButton",
  setup(props, { slots }) {
    return () => {
      const defaultSlot = slots.default ? slots.default() : "按钮";

      return <button>{defaultSlot}</button>;
    };
  },
});
