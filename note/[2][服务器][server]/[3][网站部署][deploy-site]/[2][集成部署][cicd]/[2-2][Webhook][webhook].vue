<template>
  <Tip>最后更新 - 2024.06.20</Tip>
  <Title>#Webhook</Title>
  <Text>1111</Text>
  <Text>1111</Text>
  <Text>1111</Text>
  <Text>1111</Text>
  <Text>1111</Text>
  <Text>1111</Text>
  <Text>1111</Text>
  <Text>1111</Text>
  <Text>1111</Text>
  <Text>1111</Text>
  <Image src="https://morgiana.oss-cn-beijing.aliyuncs.com/note/webhook-01.png" :width="500"></Image>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Code, Line, Title, Text, Table, Image, List, Refer, Quote, Tip } from '../../../../page/component/note'

const emits = defineEmits([ 'noteContentMounted' ])

onMounted(() => {
  emits('noteContentMounted')
})

</script>



<style lang="less">

</style>