<template>
  <Tip>最后更新 - 2024.06.22</Tip>
  <Title>#Github Action</Title>
  <Text>整理中...</Text>
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