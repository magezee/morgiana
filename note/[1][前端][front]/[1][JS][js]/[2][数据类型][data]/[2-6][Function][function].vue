<template>
  <Tip>最后更新 - 2024.07.01</Tip>
  <Title>#Function</Title>
  <Text>普通的函数中有几种特殊形式</Text>
  <List>匿名函数：即时声明即时使用，以便于提高效率，常见于回调函数</List>
  <List>纯函数：多次执行函数，相同的输入一定会具有相同的输出，且不会影响到外界非输入和非接受返回值</List>
  <Code>{{`
    ---ts(匿名函数)
      // 立即执行的匿名函数
      (() => {
        console.log('立即执行')
      })()

      // 充当回调的匿名函数
      const fn = (callback) => {
        callback()
      }

      fn(() => {
        console.log('回调函数')
      })
    ---
    ---ts(纯函数)
      // 无论执行多少次都是相同结果，且不会影响外部
      const pureFn = (x, y) => {
        return x + y
      }

      // 每次调用都会影响到外界的值
      let num = 0
      const fn = (x, y) => {
        num += 1
        return x + y
      }
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>##形参</Title>
  <Text>在一个函数中，有以下几种方式可以获取到传入参数的信息：</Text>
  <List>`arguments`：一个类数组对象，在函数被调用时传入其作用域中，因此可以直接调用该变量</List>
  <List>`rest`：一个数组，用于存储未被显式接收的参数，需要显式声明才能使用</List>
  <Code>{{`
    ---ts(arguments)
      function fn(x, y, z) {
        console.log(arguments)    // [Arguments] { '0': 1, '1': 2 }
      }

      fn(1, 2)
    ---
    ---ts(rest)
      function fn(x, ...rest) {
        console.log(rest)
      }

      fn(1, 2, 3)   // [ 2, 3 ]
    ---
  `}}</Code>
  <Text>在声明形参时，可以指定默认参数和可选参数</Text>
  <Code>{{`
    ---ts(默认/可选参数)
      // 默认参数
      const fn1 = (x, y=1) => {
        console.log(x + y)
      }

      // 可选参数(仅ts中可用，因为js根本不在乎你传了多少参数进来~)
      const fn2 = (x, y?) => {
        if(y) return x + y
        return x
      }

      console.log(fn1(1))       // 2
      console.log(fn2(1))       // 1
    ---
  `}}</Code>
  <Line></Line>

  <Title>##箭头函数</Title>
  <Text>之前在[作用域](/note/front--js--env--context#anchor-9)和[构造函数](/note/front--js--data--constructor)中已经对箭头函数有了介绍，这里仅继续补充一下其特性：</Text>
  <List>不绑定this</List>
  <List>没有原型对象</List>
  <List>没有`arguments`对象，通过`rest`获取形参信息</List>
  <List>不能充当`Generator`函数</List>
  <List>可以简写返回值</List>
  <Code>{{`
    ---ts(箭头函数)
      // 普通值直接返回
      const fn = (x, y) => x + y

      // 返回一个对象简写
      const method = (x, y) => ({ result: x + y })

      console.log(fn(1, 2))       // 3
      console.log(method(1, 2))   // { result: 3 }
    ---
  `}}</Code>
  <Line></Line>

  <Title>##生成器函数</Title>
  <Text>可以使用关键字`function*`声明生成器函数，又称为`Generator`函数，有如下特征：</Text>
  <List>调用该函数时不会执行函数体，而是返回一个迭代器对象</List>
  <List>迭代器调用`next`方法以执行函数体，从函数起始或上一次中断点开始执行持续至`yield`声明中断或`return`直接跳出函数</List>
  <List>生成器函数中调用另一生成器函数时，可以使用`yield*`将调用的生成器函数自动执行完毕</List>
  <List>迭代器在被遍历时会自动执行内部任务并将结果返回</List>
  <Code>{{`
    ---ts(生成器函数)
      function* fn() {
        console.log('task 1')
        yield
        console.log('task 2')
        yield 2
        console.log('task 3')
        return 3
      }

      const g = fn()
      const t1 = g.next()
      const t2 = g.next()
      const t3 = g.next()

      // next返回的是一个对象，value表示该过程的返回值，done表示是否全部执行完该生成器函数
      console.log(t1)   // { value: undefined, done: false }
      console.log(t2)   // { value: 2, done: false }
      console.log(t3)   // { value: 3, done: true }

    ---
    ---ts(传递参数)
      function* fn() {
        console.log('开始计算')

        let x = yield
        console.log('接受到参数：', x)

        let y = yield
        console.log('接受到参数：', y)

        return x + y
      }

      // yield接收参数时，上一次中断会在赋值前，即调用next才开始真正赋值
      let g = fn()
      let t1 = g.next()    // 开始计算
      let t2 = g.next(3)   // 接收参数x: 3
      let t3 = g.next(5)   // 接收参数y: 5

      console.log(t1)     // { value: undefined, done: false }
      console.log(t2)     // { value: undefined, done: false }
      console.log(t3)     // { value: 8, done: true }

    ---
    ---ts(内部调用生成器函数)
      function* subFn() {
        console.log('子任务一')
        yield
        console.log('子任务二')
        return
      }

      function* fn() {
        console.log('任务一')
        yield 
        console.log('任务二')
        yield* subFn()
        console.log('任务三')
        return 
      }

      let g = fn()
      g.next()      // 任务一
      g.next()      // 任务二 子任务一 子任务二
      g.next()      // 任务三
    ---
    ---ts(遍历迭代器)
      function* fn() {
        yield 1
        yield 2
        yield 3
      }

      // 最常见的两大遍历方式
      for(const value of fn()) {
        console.log(value)      // 1 2 3
      }

      const list = [...fn()]
      console.log(list)        // [1, 2, 3]
    ---
  `}}</Code>
  <Text>生成器函数常用于以下场景：</Text>
  <List>生成序列值</List>
  <List>优化异步任务代码编写</List>
  <List>存储状态</List>
  <Code>{{`
    ---ts(生成序列)
      // 生成一个等差数列
      function* fn(start, d, n) {
        let i = 0
        let result = start
        while(i <= n) {
          yield result
          result += d
          i++
        }
      }

      const list = [...fn(1, 2, 5)]
      console.log(list)     // [ 1, 3, 5, 7, 9, 11 ]  遍历迭代器很爽
    ---
    ---ts(优化异步代码)
      function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time))
      }

      // 以同步的方式编写异步代码，避免primise的回调地狱
      function* asyncTask() {
        console.log('Task started')
        yield delay(1000) 
        console.log('After 1 second')
        yield delay(2000)
        console.log('After 2 more seconds')
        return 'Task completed'
      }

      const task = asyncTask()

      const handleNext = (result) => {
        if (result.done) {
          return result.value
        } 
        return result.value.then(res => handleNext(task.next(res)))
      }

      handleNext(task.next())
    ---
    ---ts(存储状态)
      // 方便手动控制状态
      function* loading() {
        let load = 0
        while(load <= 100) {
          load += yield load
        }
        console.log('加载完成！！')
        return '加载完成！！'
      
      }

      const progress = loading()

      progress.next()
      progress.next(20)
      progress.next(50)
      progress.next(40)   // 加载完成
    ---
  `}}</Code>
  <Line></Line>

  <Title>##异步函数</Title>
  <Text>使用`async`关键字来声明异步函数，它基于`Promise`对象实现，其目的是优化异步代码的编写体验，拥有如下特性：</Text>
  <List>搭配`await`关键字来阻塞异步 Promise 的执行</List>
  <List>使用`await`获取返回值时，拿到的是 Promise 的`resolve/reject`结果，否则只能拿到其状态</List>
  <List>阻塞的 Promise 执行状态失败时，整个函数将会中断，不会继续执行</List>
  <List>使用`try-catch`来捕获错误</List>
  <Code>{{`
    ---ts(await)
      function delay(time) {
        return new Promise((resolve)=> {
          setTimeout(() => {
            resolve('resolve返回值')
          }, time)
        })
      }

      const fn = async () => {
        const result = await delay(1000)
        console.log(result)
      }

      const contrastFn = async () => {
        const result = delay(1000)
        console.log(result)
      }

      fn()            // resolve返回值
      contrastFn()    // Promise { <pending> }
    ---
    ---ts(阻塞条件)
      // await只能阻塞promise对象
      const fn = async () => {
        console.log(1)
        await setTimeout(()=>{console.log(2)})	
        console.log(3)
      }

      fn()   // 1 3 2
    ---
    ---ts(错误处理)
      const mockRequest = () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject('请求失败')
          })
        })
      }

      const fn = async () => {
        try {
          const res = await mockRequest()
        } catch(err) {
          console.log(err) 
        }
        console.log('测试后续执行代码')
      }

      const contrastFn = async () => {
        const res = await mockRequest()
        console.log('测试后续执行代码')
      }

      fn()            // 请求失败  测试后续执行代码
      contrastFn()    // 报错
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