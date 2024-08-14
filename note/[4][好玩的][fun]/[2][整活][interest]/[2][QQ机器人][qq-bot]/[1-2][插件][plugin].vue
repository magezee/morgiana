<template>
  <Tip>最后更新 - 2024.08.03</Tip>
  <Title>#插件</Title>
  <Refer :source="[
    { desc: '插件开发文档', url: 'https://koishi.chat/zh-CN/guide/develop/workspace.html'}
  ]"></Refer>
  <Text>在 koishi 中，机器人的每个独立功能都分成一个单独的插件去管理，需要编写插件来为机器人添加功能</Text>
  <Text></Text>
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