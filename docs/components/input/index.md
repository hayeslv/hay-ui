# Input

:::demo 基础用法

```vue
<template>
  <HInput v-model="input" placeholder="请输入"></HInput>
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