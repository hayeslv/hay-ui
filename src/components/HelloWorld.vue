<template>
  <h1 class="text-3xl font-bold underline">{{ msg }}</h1>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const msg = ref("hello");
</script>

<style scoped lang="scss">
.my-button {
   appearance: none;
   padding: 5px 10px;
   background: lightskyblue;
   border: none;
   border-radius: 4px;
   color: #fff;
 &:active {
    background: rgb(92, 185, 243);
 }
 &:not(:last-child) {
    margin-right: 15px;
 }
}
</style>
