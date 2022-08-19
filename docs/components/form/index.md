# Form

:::demo 基本用法

```vue
<template>
  <HForm :model="formModel">
    <HFormItem v-for="item in fields" :key="item.prop" v-bind="item"></HFormItem>
  </HForm>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const formModel = ref({
      name: "张三",
      sex: "男",
      age: "18",
      phone: "13000000000",
      address: "长沙市天心公安分局坡子街派出所"
    })

    const fields = ref([
      { label: "姓名", prop: "name" },
      { label: "性别", prop: "sex" },
      { label: "地址", prop: "address", full: true },
      { label: "年龄", prop: "age" },
      { label: "联系电话", prop: "phone" },
    ])

    setTimeout(() => {
      formModel.value = {
        name: "张三1",
        sex: "男",
        age: "18",
        phone: "13000000000",
        address: "长沙市天心公安分局坡子街派出所"
      }
    }, 1000);

    return { formModel, fields }
  },
});
</script>
```

:::