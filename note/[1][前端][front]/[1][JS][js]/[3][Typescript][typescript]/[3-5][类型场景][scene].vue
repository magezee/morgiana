<template>
  <Tip>最后更新 - 2024.07.12</Tip>
  <Title>#类型场景</Title>
  <Text>待补充</Text>
  <Line></Line>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const emits = defineEmits([ 'noteContentMounted' ])

onMounted(() => {
  emits('noteContentMounted')
})

</script>



<style lang="less">

</style>