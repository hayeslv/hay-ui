<script setup lang="ts">
import { ref } from "vue";
// import { HButton, HTree } from "../build/hay-ui.esm.js";

const confirm = () => {
  console.log(123);
};

const data = ref([
  {
    label: "docs",
    id: "docs",
  },
  {
    label: "packages",
    id: "packages",
    expanded: true,
    children: [
      {
        label: "plugin-vue",
        id: "plugin-vue",
      },
      {
        label: "vite",
        id: "vite",
        expanded: true,
        children: [
          {
            label: "src",
            id: "src",
          },
          {
            label: "README.md",
            id: "README.md",
          },
        ],
      },
    ],
  },
  {
    label: "scripts",
    id: "scripts",
    children: [
      {
        label: "release.ts",
        id: "release.ts",
      },
      {
        label: "verifyCommit.ts",
        id: "verifyCommit.ts",
      },
    ],
  },
  {
    label: "pnpm-workspace.yaml",
    id: "pnpm-workspace.yaml",
  },
]);
</script>

<template>
  <HButton type="primary" size="large" @click="confirm">哈哈</HButton>
  <HTree :data="data" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
