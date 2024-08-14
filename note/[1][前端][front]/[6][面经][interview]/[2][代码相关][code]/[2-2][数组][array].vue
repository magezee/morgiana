<template>
  <Tip>最后更新 - 2024.07.30</Tip>
  <Title>#数组相关</Title>
  <Quote></Quote>
  <Title>###两数之和</Title>
  <Image :width="650" src="https://morgiana.oss-cn-beijing.aliyuncs.com/note/leetcode-array-01.png"></Image>
  <Text>思路：直接强行解会增加复杂度，考虑引入`Map`数据结构降低循环层数</Text>
  <List>操作数组的思路是拿到当前值，然后仅在剩余数组中再次遍历，找出满足条件的数据</List>
  <List>操作键值对思路是先遍历的同时将各项预存进键值对，后续在键值对里找满足条件的数据</List>
  <Code>{{`
    ---ts(直接解)
      function twoSum(nums: number[], target: number): number[] {
        for(let index in nums) {
          const numIndex = Number(index)
          const otherIndex = nums.indexOf(target - nums[index], numIndex + 1)   // 这里又嵌套了一层循环

          if (otherIndex !== -1) {
            return [numIndex, otherIndex]
          }
        }
      }
    ---
    ---ts(优化)
      function twoSum(nums: number[], target: number): number[] {
        const numMap = new Map()
        for(let index in nums) {
          const otherNum = target - nums[index]

          if (numMap.get(otherNum)) {
            return [Number(numMap.get(otherNum)) , Number(index)]
          }
          
          numMap.set(nums[index], index)
        }
      }
    ---
  
  `}}</Code>
  <Line></Line>

  <Title>###合并两个有序数组</Title>
  <Image :width="650" src="https://morgiana.oss-cn-beijing.aliyuncs.com/note/leetcode-array-02.png"></Image>
  <Text>思路</Text>
  <List>目前 js 中已经有内置的插入和排序方法，直接用就行，但是这样实际上没有用到**有序数组**的条件</List>
  <List>使用双指针：在两个数组中同时操作，而不是先合并数组后再操作</List>
  <Image :width="550" src="https://morgiana.oss-cn-beijing.aliyuncs.com/note/leetcode-array-03.png"></Image>
  <Code>{{`
    ---ts(使用api)
      function merge(nums1: number[], m: number, nums2: number[], n: number): void {
        nums1.splice(m, n, ...nums2)
        nums1.sort((a,b) => {
          return a - b
        })
      }
    ---
    ---ts(使用双指针)
      function merge(nums1: number[], m: number, nums2: number[], n: number): void {
        // 声明指针，采取从后往前塞的方式
        let p = m + n - 1
        let p1 = m - 1
        let p2 = n - 1
        
        // 这里不使用p而使用p2的原因是使用p就一定会全部都遍历一遍，而使用p2可以在某些情况下提前结束循环
        while (p2 >= 0) { 
          if (p1 >= 0 && nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1]    // 填入 nums1[p1]
            p--
            p1--
          } else {
            nums1[p] = nums2[p2]    // 填入 nums2[p1]
            p--
            p2--
          }
        }
      }

      // 当[1,2,3,0,0,0]和[4,5,6]排序时，只需直接插入就可以完成
      // 当[4,5,6,0,0,0]和[1,2,3]排序时，由于p1指针内容一直比p2大，所以此时为[4,5,6,4,5,6]，后面将[1,2,3]插入覆盖[-,-,-,4,5,6]即可
      // 当[1,3,5,0,0,0]和[2,4,6]排序时，结合前面两点可知排序到一半时为[1,3,5,4,5,6]
    ---
  `}}</Code>
  <Line></Line>

  <Title>###移除元素</Title>
  <Image :width="650" src="https://morgiana.oss-cn-beijing.aliyuncs.com/note/leetcode-array-04.png"></Image>
  <Text>思路：</Text>
  <List>有内置的`array.splice`方法可以解决按索引刪除指定元素的功能</List>
  <List>如果不使用 api，需要用指针的方式操作，这里的诀窍是当满足条件时，控制指针不动，这样即可让下一个元素实现原位覆盖来达到刪除目的</List>
  <Code>{{`
    ---ts(内置方法)
      function removeElement(nums: number[], val: number): number {
        for(let i=nums.length - 1; i>=0; i--) {
          if(nums[i] === val) {
            nums.splice(i, 1)
          }
        }

        return nums.length
      }
    ---
    ---ts(指针方式)
      function removeElement(nums: number[], val: number): number {
        let p = 0
        for(const num of nums) {
          if(num != val) {
            nums[p] = num
            p++
          }
        }
        nums.length = p
        return p
      }
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>###刪除有序数组重复项</Title>
  <Image :width="650" src="https://morgiana.oss-cn-beijing.aliyuncs.com/note/leetcode-array-05.png"></Image>
  <Text>思路：和上一题一样，换汤不换药~</Text>
  <Code>{{`
    ---ts(指针解法)
      function removeDuplicates(nums: number[]): number {
        let p = 0
        const map = new Map()
        
        for(let num of nums) {
          if (!map.get(num)) {
            map.set(num, true)
            nums[p] = num
            p++
          }
        }

        nums.length = p
        return p
      }
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