# Input

:::demo 基础用法

```vue
<template>
  <HInput v-model="input" type="number" placeholder="请输入"></HInput>
</template>
<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
  setup() {
    const input = ref("")
    return { input }
  },
});
</script>
```

:::





## 属性

| 属性                 | 说明   | 类型            | 可选值                   | 默认值 |      |
| -------------------- | ------ | --------------- | ------------------------ | ------ | ---- |
| type                 | 类型   | string          | text / password / number | text   |      |
| modelValue / v-model | 绑定值 | string / number | —                        | —      |      |