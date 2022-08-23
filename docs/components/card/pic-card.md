# PicCard

## 基础用法

卡片可以只有内容区域

:::demo 基础用法

```vue
<template>
  <HPicCard 
    style="width: 250px;"
    pic="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
  ></HPicCard>
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