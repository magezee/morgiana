<template>
  <div class="app">{{ demo }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const demo = ref(1222)

</script>

<style lang="less">
.app {
  background-color: red;
}
</style>