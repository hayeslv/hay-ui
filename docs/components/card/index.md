# Card

## 基础用法

卡片可以只有内容区域

:::demo 基础用法

```vue
<template>
  <HCard>
    <div v-for="item in 4" :key="item">{{ `列表内容 ${item}` }}</div>
  </HCard>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {}
  },
});
</script>
```

:::

## 阴影效果

你可以定义什么时候展示卡片的阴影效果。

:::demo 通过 `shadow` 属性设置卡片阴影出现的时机。该属性的值可以是：`always`（默认）、`hover`或`never`。

```vue
<template>
  <HCard shadow="always">Always</HCard>
  <HCard shadow="hover">Hover</HCard>
  <HCard shadow="never">Never</HCard>
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {}
  },
});
</script>
```

:::

## 属性

| 属性   | 说明             | 类型   | 可选值                 | 默认值 |
| ------ | ---------------- | ------ | ---------------------- | ------ |
| shadow | 设置阴影显示时机 | string | always / hover / never | always |

