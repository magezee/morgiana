<template>
  <Tip>最后更新 - 2024.07.12</Tip>
  <Title>#技巧</Title>
  <Text>这里主要介绍一些在代码里常用的技巧</Text>
  <Line></Line>
  <Title>##解构</Title>
  <Text>解构赋值允许从数组或对象中提取值，并将它们赋值给新的变量</Text>
  <List>解构数组时，按其顺序依次赋值</List>
  <List>解构对象时，按同名属性名赋值</List>
  <Code>{{`
    ---ts(基本)
      // 数组解构
      const numbers = [1, 2, 3]
      const [first, second, third] = numbers
      console.log(first, second, third)        //  1 2 3

      // 对象解构
      const person = { name: 'jack', age: 24 }
      const { name, age } = person
      console.log(name, age)                   // jack 24
    ---
    ---ts(解构默认值)
      // 数组解构
      const numbers = [1, 2]
      const [first, second, third = 3] = numbers
      console.log(first, second, third)        //  1 2 3

      // 对象解构
      const person = { name: 'jack' }
      const { name, age = 24 } = person
      console.log(name, age)                   // jack 24
    ---
    ---ts(剩余参数解构)
      // 数组解构
      const numbers = [1, 2, 3]
      const [first, ...rest] = numbers
      console.log(first, rest)               // 1 [ 2, 3 ]

      // 对象解构
      const person = { name: 'jack', age: 24, sex: 'man' }
      const { name, ...other } = person
      console.log(name, other)               // jack { age: 24, sex: 'man' }
    ---
    ---ts(其他)
      // 数组忽略元素解构
      const numbers = [1, 2, 3]
      const [first, ,third] = numbers
      console.log(first, third)               // 1 3

      // 对象重命名解构
      const person = { name: 'jack', age: 24}
      const { name: personName, age } = person
      console.log(personName, age)               // jack 24
    ---
  `}}</Code>
  <Line></Line>

  <Title>##闭包</Title>
  <Text>当一个函数返回另一个函数时，内部函数会保留对其外部函数作用域的**引用**，这个引用即为闭包</Text>
  <Text>通常执行完一个函数后，该函数从执行上下文中移除，然后会被垃圾回收，但是如果使用闭包，即使该函数从上下文中移除，但是内部函数已知保持着对外部作用域的引用，因此不会被移除</Text>
  <Text>使用闭包的场景：</Text>
  <List>防抖：用于处理高频事件，即事件有冷却时间，冷却时间内再次触发重置冷却时间</List>
  <List>节流：用于处理高频事件，即在一段时间内，只能触发一次事件</List>
  <List>科里化函数：把接收多个参数的函数变换成接收单一参数的函数，直到所有参数都被使用时才返回最终结果</List>
  <List>懒计算：可以传入任意个数的参数，通过一个内部定义方法才返回结果</List>
  <Code>{{`
    ---ts(防抖)
      const debounce = (fn, delay) => {
        let timeoutId

        return (...args) => {
          if(timeoutId) {
            clearTimeout(timeoutId)
          }

          timeoutId = setTimeout(() => {
            fn(...args)
          }, delay)
        }
      }

      // 例如一个根据当前搜索关键字请求接口智能推荐函数
      const handleInput = debounce((event) => {
        fetchApi(event.target.value)
      }, 300)

    ---
    ---ts(节流)
      const throttle = (fn, delay) => {
        let timeoutId
        return (...args) => {
          if(timeoutId) return

          timeoutId = setTimeout(() => {
            fn(...args)
            timeoutId = null
          }, delay)
        }
      }

      // 例如处理滚动事件
      const handleScroll = throttle((event) => {  
        console.log(window.scrollY)
      }, 100)
    ---
    ---ts(科里化)
      const curry = (fn) => {
        const nextFn = (...args) => {
          // 这里对args这个变量保持持续引用，并在通过每次传入参数增加来不断更改
          if(args.length === fn.length) {
            return fn(...args)
          } 
          else {
            return (newArgs) => {
              return nextFn(...args, newArgs)
            }
          }
        }
        return nextFn
      }

      const add = (a, b, c) => {
        return a + b + c
      }
      add(1, 2, 3)

      const curryAdd = curry(add)
      curryAdd(1)(2)(3)   // 调用方式变化

      // 相当于将add变化成了如下函数
      const curryAddLike = (a) => {
        return (b) => {
          return (c) => {
            return a + b + c
          }
        }
      }

    ---
    ---ts(懒计算)
      const lazySum = (...args) => {
        let result = args.reduce((pre, cur) => {
          return pre + cur
        })

        const add = (...args) => {
          result = args.reduce((pre, cur) => {
            return pre + cur
          }, result)

          return add 
        }

        add.getResult = () => {
          console.log(result)
          return result
        }

        return add
      }

      lazySum(1, 2)(3)(4, 5, 6).getResult()   // 21
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