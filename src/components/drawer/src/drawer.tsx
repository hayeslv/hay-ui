import type { SetupContext } from "vue";
import { computed, defineComponent, toRefs, Transition } from "vue";
import type { DrawerProps, ISizeType } from "./drawer-type";
import { drawerProps } from "./drawer-type";
import "../style/drawer.scss";

const options: Record<ISizeType, string> = {
  mini: "334px",
  small: "608px",
  default: "800px",
  medium: "1070px",
};

export default defineComponent({
  name: "HDrawer",
  props: drawerProps,
  setup(props: DrawerProps, { emit }: SetupContext) {
    const { modelValue, size } = toRefs(props);

    const wapperStyle = computed(() => ({
      width: modelValue.value ? "100%" : options[size.value],
      height: "100%",
      backgroundColor: modelValue.value ? "rgba(0, 0, 0, 0.5)" : "transparent",
    }));

    const close = () => {
      emit("update:modelValue", false);
    };

    return () => {
      // return <div class="h-drawer">drawer</div>;
      return <Transition name="fade">
        {modelValue.value && (
          <div class="h-drawer"
            style={wapperStyle.value}
            onClick={close}
          >123</div>
        )}
      </Transition>;
    };
  },
});
