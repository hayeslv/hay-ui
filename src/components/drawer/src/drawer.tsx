import type { SetupContext } from "vue";
import { ref, watch, computed, defineComponent, toRefs, Transition } from "vue";
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
  setup(props: DrawerProps, { emit, slots }: SetupContext) {
    const { modelValue, size, zIndex } = toRefs(props);

    const wapperStyle = computed(() => ({
      zIndex: zIndex.value,
    }));
    const modalStyle = computed(() => ({
      backgroundColor: modelValue.value ? "rgba(0, 0, 0, 0.5)" : "transparent",
    }));
    const containerStyle = computed(() => ({
      width: options[size.value],
      top: 0,
    }));
    const containerBodyStyle = computed(() => ({
      height: `calc(100% - ${slots.header ? "66px" : "0px"} - ${slots.footer ? "64px" : "0px"})`,
    }));

    const close = () => {
      animate.value = false;
      setTimeout(() => {
        emit("update:modelValue", false);
      }, 1000);
    };

    const animate = ref(false);
    watch(() => modelValue.value, (newVal) => {
      if (newVal) {
        setTimeout(() => {
          animate.value = true;
        }, 0);
      } else {
        animate.value = false;
      }
    });

    return () => {
      const bodySlotRender = () => {
        if (slots.default) return slots.default();
        if (slots.body) return slots.body();
        return "请添加内容！";
      };

      return <div>
        {modelValue.value && (
          <div class="h-drawer" style={wapperStyle.value} onClick={close}>
            <div class="h-drawer_modal" style={modalStyle.value}>
              <div class={["h-drawer_container", animate.value ? "show" : "hide"]} style={containerStyle.value}>
                {/* 头部 */}
                {/* 主体内容 */}
                <div class="h-drawer_container_body" style={containerBodyStyle.value}>
                  { bodySlotRender() }
                </div>
              </div>
            </div>
          </div>
        )}
      </div>;
    };
  },
});
