import { defineComponent, ref, withModifiers } from "vue";

export default defineComponent({
  directives: {
    focus: {
      mounted(el) {
        el.focus();
      },
    },
  },
  setup() {
    const count = ref(0);
    const inc = () => {
      count.value++;
    };

    return () => {
      return <div onClick={withModifiers(inc, ["self"])}>
        test:{count.value}
        <input type="text" v-focus={[count.value, "abc", ["modifier"]]} v-model={count.value} />
        {/* <ul>
          {list.value.map(str => <li key={str}>{str}</li>)}
        </ul> */}
      </div>;
    };
  },
});
