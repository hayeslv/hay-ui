# drawer





:::demo 基础用法

```vue
<template>
	<el-button @click="visible = true">open</el-button>
  <HDrawer v-model="visible"></HDrawer>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
</script>
```

:::