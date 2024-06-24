<template>
  <Tip>最后更新 - 2024.06.24</Tip>
  <Title>#事件循环</Title>
  <Text>
    本质上 js 是一个单线程语言，即同一时刻只能有一个代码在运行，但不影响它宿主环境是多线程的（浏览器、Node），可以将耗时的任务放在另外一个线程上运行，
    等待任务结束后再重新放回 js 线程中，这便成为`异步`，同步和异步代码的执行顺序由事件循环`event loop`来控制
  </Text>
  <Line></Line>

  <Title>##异步</Title>
  <Text>以浏览器环境为例，一个浏览器至少需要常驻三个线程工作：</Text>
  <List>JS 引擎线程：单线程运行，一直等待任务队列并处理</List>
  <List>UI 渲染线程：负责渲染页面，当页面触发`重绘/回流`时则重新执行，和其他线程互斥，即会阻塞或被阻塞其他线程的运行</List>
  <List>异步处理线程：指包括事件触发线程、网络请求线程、定时器触发线程等多个异步线程的总称，当被触发时会将任务添加至任务队列等待 js 线程处理</List>
  <Quote>虽然 Node 和浏览器的事件循环实现略有不同，但基本处理异步任务的原则是相同的</Quote>
  <Line></Line>

  <Title>##任务队列</Title>
  <Text>事件循环背后的基本思想是将多个任务分为同步任务和异步任务，同时异步任务又分为微任务和宏任务</Text>
  <List>常见微任务类型：`Promise`</List>
  <List>常见宏任务类型：`setTimeout`、`setInterval`</List>
  <Text>代码的执行顺序为`同步任务 → 异步任务[ 微任务 → 宏任务 ]`，具体过程如下：</Text>
  <Text>1. 代码按顺序执行，如果是同步任务，则放入执行栈中执行，如果是微任务，放入微任务队列，宏任务则放入宏任务队列</Text>
  <Text>2. 同步任务都执行完毕，执行栈为空时，将微任务按队列顺序依次放入执行栈执行</Text>
  <Text>3. 微任务都执行完毕，执行栈为空时，将宏任务按队列顺序依次放入执行栈执行</Text>
  <Code>{{`
    ---js(执行顺序)
      // 打印顺序：1 2 3 4 5 6
      // 同步任务：声明promise、调用fn_2、调用fn_1
      // 微任务：fn_2中执行promise
      // 宏任务：fn_2中执行setTimeout
      const promise = new Promise(resolve => {
        console.log(1)
        resolve(4)
      })

      const fn_1 = () => {
        console.log(2)
      }

      const fn_2 = () => {
        setTimeout(() => {
          console.log(6)
        })

        fn_1()

        console.log(3)

        promise
          .then(resolve => {
            console.log(resolve)
          })
          .then(() => {
            console.log(5)
          })
      }

      fn_2()
    ---
    ---js(setTimeout是并行的吗)
      // 打印顺序 3 2 1，且2 1的打印顺序几乎同时
      setTimeout(() => {
        console.log(1)
      }, 1001)

      setTimeout(() => {
        console.log(2)
      }, 1000)

      setTimeout(() => {
        console.log(3)
      }, 0)
    ---
  `}}</Code>
  <Text>
    上面例子有一个比较反直觉的是，看起来`setTimeout`并非按任务队列运行且是并行执行的，但是事实并不是如此，
    其本质上是声明`setTimeout`是同步的，每个声明都会开启一个定时器，在所有微任务队列清空后，所有定时器会同时启动计时并按照时间顺序依次将回调推入执行栈中执行
  </Text>
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