import type { SetupContext } from "vue";
import { computed, defineComponent, toRefs } from "vue";
import type { CardProps } from "./card-type";
import { cardProps } from "./card-type";
import "../style/card.scss";

export default defineComponent({
  name: "HCard",
  props: cardProps,
  setup(props: CardProps, ctx: SetupContext) {
    const { shadow } = toRefs(props);

    const cardClass = computed(() => [
      "h-card",
      `is-${shadow.value}-shadow`,
    ]);

    return () => {
      return <div class={cardClass.value}>
        <div class="h-card__body">
          {
            ctx.slots.default
              ? ctx.slots.default()
              : <></>
          }
        </div>
      </div>;
    };
  },
});
