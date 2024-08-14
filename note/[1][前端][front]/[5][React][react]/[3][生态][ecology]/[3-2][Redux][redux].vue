<template>
  <Tip>最后更新 - 2024.07.29</Tip>
  <Title>#Redux</Title>
  <Refer :source="[
    { desc: 'redux 官网', url: 'https://redux.js.org/' },
    { desc: 'redux 中文官网', url: 'https://cn.redux.js.org/' },
  ]"></Refer>
  <Text>虽然现在市面上有很多应用全局状态管理库如`zastand`和`recoil`等，但是基本都是基于 redux 的思想，所以还是有必要学 redux 的</Text>
  <Quote>现在有官方小工具包`Redux Toolkit`来简化 redux 来优化累赘的代码写法，不过这里仅介绍原始写法，找个机会再补充这个库的内容</Quote>
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