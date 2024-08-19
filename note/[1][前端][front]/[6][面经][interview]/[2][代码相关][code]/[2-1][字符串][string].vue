<template>
  <Tip>最后更新 - 2024.08.16</Tip>
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

  <Title>###处理大数字精度</Title>
  <Text>有两个大数字相加，要求结果不会因精度收到影响</Text>
  <Text>思路：在大数字运算中，只要转为`number`格式计算都是不安全的，因此需要用字符串来处理，用每一位的字符串相加，记录进制，然后逐个相加</Text>
  <Code>{{`
    ---ts(示例)
      function bigNumberAddition(num1, num2) {  
        // 反转字符串以便从低位开始计算  
        let reversedNum1 = num1.split('').reverse()  
        let reversedNum2 = num2.split('').reverse()  
        
        let result = []  
        let carry = 0  
        let maxLength = Math.max(reversedNum1.length, reversedNum2.length)  
        
        for (let i = 0; i < maxLength; i++) {  
            let digit1 = i < reversedNum1.length ? parseInt(reversedNum1[i], 10) : 0  
            let digit2 = i < reversedNum2.length ? parseInt(reversedNum2[i], 10) : 0  
            
            let total = digit1 + digit2 + carry  
            carry = Math.floor(total / 10)  
            result.push((total % 10).toString())  
        }  
        
        // 如果最后还有进位，记入结果  
        if (carry > 0) {  
            result.push(carry.toString())  
        }  
        
        // 反转结果并拼接成字符串  
        return result.reverse().join('')  
      }  

      // 示例使用  
      let num1 = "88888888888888"  
      let num2 = "11111111111102"  

      console.log(bigNumberAddition(num1, num2)) // 输出: 100000000000990

    ---
  
  `}}</Code>
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