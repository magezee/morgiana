<template>
  <Tip>最后更新 - 2024.08.12</Tip>
  <Title>#字符串</Title>
  <Title>###数组字母组合排序</Title>
  <Text>有一组固定格式的字符数组，要求先按数组排序，然后再按字母顺序排序</Text>
  <Code>{{`
    ---ts(示例)
      const customSort = (arr) => {
        return arr.sort((a, b) => {
          const [aChar, aNum] = [a[0], a.slice(1)]
          const [bChar, bNum] = [b[0], b.slice(1)]

          if (aNum !== bNum) {
            return aNum - bNum
          } else {
            if (aChar < bChar) return -1
            if (aChar > bChar) return 1
          }
        })
      }

      const result = customSort(['A6', 'Z19', 'A1', 'B0', 'C1'])
      console.log(result)     // [ 'B0', 'A1', 'C1', 'A6', 'Z19' ]

    ---
  
  
  `}}</Code>
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