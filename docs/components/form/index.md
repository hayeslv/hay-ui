# Form

### Form表单（查看模式）

:::demo 查看模式的Form组件，每一项都由一个 Form-Item 组件构成

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

    return { formModel, fields }
  },
});
</script>
```

:::

### Form表单（查看模式）--自定义插槽

:::demo 如果不满意默认的显示内容，可以通过插槽的形式修改 Form-Item 组件中的内容

```vue
<template>
  <HForm :model="formModel">
    <HFormItem v-for="item in fields" :key="item.prop" v-bind="item">
      <template #default="scope">
        <div>你好，{{scope[item.prop]}}</div>
      </template>
    </HFormItem>
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

    return { formModel, fields }
  },
});
</script>
```

:::