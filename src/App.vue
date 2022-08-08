<script setup lang="ts">
import Test from "./components/Test";
import HelloWorld from "./components/HelloWorld.vue";

const confirm = () => {
  console.log(123);
};
</script>

<template>
  <Test />
  <HelloWorld msg="hello-world" />
  <HButton type="primary" size="large" @click="confirm">哈哈</HButton>
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
