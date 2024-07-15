<template>
  <Tip>最后更新 - 2024.07.12</Tip>
  <Title>#符号</Title>
  <Text>这里主要介绍一些在代码里常用的符号</Text>
  <Line></Line>

  <Title>##...</Title>
  <Text>运算符`...`也称为扩展运算符或剩余运算符，主要涵盖以下几个功能：</Text>
  <List>数组展开：将一个数组展开成数组元素</List>
  <List>对象展开：将一个对象展开成对象属性</List>
  <List>剩余参数：在函数定义中，收集剩余实参</List>
  <Code>{{`
    ---ts(数组展开)
      // 数组合并
      const array1 = [1, 2, 3]
      const array2 = [4, 5, 6]
      const combinedArray = [...array1, ...array2]
      console.log(combinedArray)    // [1, 2, 3, 4, 5, 6]

      // 数组复制
      const originalArray = [1, 2, 3]
      const copiedArray = [...originalArray]
      console.log(copiedArray)      // [1, 2, 3]
    ---
    ---ts(对象展开)
      // 对象合并
      const obj1 = { a: 1, b: 2 }
      const obj2 = { b: 3, c: 4 }
      const mergedObj = { ...obj1, ...obj2 }
      console.log(mergedObj)    // { a: 1, b: 3, c: 4 }

      // 对象复制
      const originalObj = { x: 1, y: 2 }
      const copiedObj = { ...originalObj }
      console.log(copiedObj)     // { x: 1, y: 2 }
    ---
    ---ts(剩余参数)
      // 函数剩余参数
      function sum(...numbers: number[]): number {
        return numbers.reduce((acc, curr) => acc + curr, 0)
      }
      console.log(sum(1, 2, 3, 4))          // 10

      // 拆分参数和剩余参数
      function multiply(multiplier: number, ...numbers: number[]): number[] {
        return numbers.map((num) => num * multiplier)
      }
      console.log(multiply(2, 1, 2, 3, 4))  // [2, 4, 6, 8]
    ---
  `}}</Code>
  <Line></Line>

  <Title>##!和?</Title>
  <Text>! 的用法：</Text>
  <List>用在变量前，表示取反</List>
  <List>用在变量后，使`null`和`undefined`类型可以赋值给其他类型并通过编译，表示断言非空</List>
  <Code>{{`
    ---ts(断言非空)
      let x:number

      x = null         // 无法通过编译
      x = undefined    // 无法通过编译

      x = null!
      x = undefined!
    ---
    ---ts(用于可选数据中)
      function fn(params?: number) {
        const x: number = params     // 报错:因为params可选，因此类型实际为number|undefined,不能直接传给number
        const y: number = params!
      }
    ---
  `}}</Code>
  <Text>? 的用法：</Text>
  <List>用于类型和方法参数时，表示可选</List>
  <List>用于链式访问时，表示仅存在值才向下访问，确保引用安全</List>
  <Code>{{`
    ---ts(可选)
      interface Iobj {
        x: number,
        y?: string      // 表示y为非必须值
      }

      const fn = (a: number, b?: number) => { }

      const obj: Iobj = { x: 1 }
      fn(1)
    ---
    ---ts(链式访问)
      function fn(params?: { x: number }) {
        let m = params.x              // 报错:由于paramas可选,因此可能为undefined,undefined.x会导致报错
        let n = params?.x

        let x: number = params?.x     // 报错:不能将类型number|undefined赋值number
        let y: number = params?.x!
      }
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