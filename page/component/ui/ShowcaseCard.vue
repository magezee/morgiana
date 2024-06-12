<template>
  <div class="showcase-card">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  boxShadowColor: string
}>()

const boxShadowColor = computed(() => props.boxShadowColor)

</script>

<style lang="less" scoped>
.showcase-card {
  padding: 20px;
  border: 2px solid #817b7b;
  border-radius: 20px;
  background:#fff repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02) 13px, transparent 0, transparent 26px);
  box-shadow: 0 -4px inset v-bind(boxShadowColor);
}
</style>