<template>
  <Tip>最后更新 - 2024.06.24</Tip>
  <Title>#模块化</Title>
  <List>
    1111
    <List>2222</List>
    <List>
      22222
      <List>2222</List>
      <List>2222</List>
    </List>
  </List>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Code, Line, Title, Text, Table, Image, List, Refer, Quote, Tip, Api } from '../../../../page/component/note/'

const emits = defineEmits([ 'noteContentMounted' ])

onMounted(() => {
  emits('noteContentMounted')
})

// 动态加载组件


</script>



<style lang="less">

</style>