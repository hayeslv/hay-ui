# Form


## Form表单（查看模式）

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

## Form表单（查看模式）--自定义插槽

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

## Form表单（编辑模式）

:::demo type="edit"，form-item 的内容默认是 input，也可以使用插槽

```vue
<template>
  <HForm :model="formModel" type="edit">
    <HFormItem label="姓名" prop="name">
      <el-input v-model="formModel.name" />
    </HFormItem>
    <HFormItem label="性别" prop="sex"></HFormItem>
    <HFormItem label="地址" prop="address" full></HFormItem>
    <HFormItem label="年龄" prop="age"></HFormItem>
    <HFormItem label="联系电话" prop="phone"></HFormItem>
  </HForm>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const formModel = ref({
      name: "",
      sex: "",
      age: "",
      phone: "",
      address: ""
    })

    setTimeout(() => { // 模拟接口调用
      formModel.value = {
        name: "张三",
        sex: "男",
        age: "18",
        phone: "13000000000",
        address: "长沙市天心公安分局坡子街派出所"
      }
    }, 1000);

    return { formModel }
  },
});
</script>
```

:::

## 表单验证

:::demo Form组件提供了表单验证的功能，只需要通过 `rules` 属性传入约定的验证规则，并将 Form-Item 的 `prop` 属性设置为需要校验的字段名即可

```vue
<template>
  <HForm :model="formModel" :rules="rules" type="edit">
    <HFormItem label="姓名" prop="name"></HFormItem>
    <HFormItem label="性别" prop="sex"></HFormItem>
    <HFormItem label="地址" prop="address" full></HFormItem>
    <HFormItem label="年龄" prop="age"></HFormItem>
    <HFormItem label="联系电话" prop="phone"></HFormItem>
  </HForm>
</template>
<script>
import { defineComponent, ref, reactive } from 'vue';
export default defineComponent({
  setup() {
    const formModel = ref({
      name: "",
      sex: "",
      age: "",
      phone: "",
      address: ""
    })

    const rules = reactive({
      name: [
        { required: true, message: "请输入姓名", trigger: "blur" },
        { min: 3, max: 5, message: "长度应该在3~5之间", trigger: "blur" }
      ]
    })

    return { formModel, rules }
  },
});
</script>
```

:::