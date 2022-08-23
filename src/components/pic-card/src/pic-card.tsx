import type { SetupContext } from "vue";
import { toRefs, defineComponent } from "vue";
import type { PicCardProps } from "./pic-card-type";
import { picCardProps } from "./pic-card-type";
import "../style/pic-card.scss";
import Card from "../../card/src/card";
import defaultPic from "../image/error.svg";

export default defineComponent({
  name: "HPicCard",
  props: picCardProps,
  setup(props: PicCardProps, ctx: SetupContext) {
    const { pic } = toRefs(props);

    return () => {
      return <div class="h-pic-card">
        <Card {...ctx.attrs}>
          <div class="h-pic-card__image">
            <img src={pic?.value || defaultPic} alt="image" />
          </div>
        </Card>
      </div>;
    };
  },
});
