<template>
  <Tip>最后更新 - 2024.07.09</Tip>
  <Title>#Set</Title>
  <Text>Set 用于存储唯一值的集合类型，有如下特性：</Text>
  <List>唯一：内部的所有值都是唯一的，如果尝试添加重复的值，它们会被自动忽略</List>
  <List>键值：每个元素相当于同时充当键和值，API 用法与 `Map` 相似</List>
  <List>长度：可以通过`Set.size`获取集合大小</List>
  <Code>{{`
    ---ts(创建)
      const list1 = new Set()
      list1.add('a')
      list1.add('b')

      const list2 = new Set(['a', 'b'])

      console.log(list1)      // Set(2) { 'a', 'b' }
      console.log(list2)      // Set(2) { 'a', 'b' }
    ---
  `}}</Code>
  <Line></Line>

  <Title>##WeakSet</Title>
  <Text>与[WeakMap](http://localhost/note/front--js--data--map#anchor-1)一样，集合也有同样的类型来处理弱引用，他们具有类似的特性：</Text>
  <List>存储对象：只能存储引用类型，原始类型达咩</List>
  <List>弱引用：如果集合内元素没有被引用，会被垃圾回收机制回收</List>
  <List>不可枚举：无法遍历集合，也无法获取集合大小</List>
  <Code>{{`
    ---ts(无关紧要的代码)
      const weakSet = new WeakSet()
      weakSet.add({})

      console.log(weakSet.size)   // undefined
    ---
  `}}</Code>
  <Line></Line>

  <Title>##场景</Title>
  <Text>Set 的常用场景：</Text>
  <List>数组去重</List>
  <List>检查元素存在</List>
  <List>集合操作</List>
  <Code>{{`
    ---ts(数组去重)
      const arr = [1,2,3,1]
      const newArr = [...new Set(arr)]

      console.log(newArr)     // [ 1, 2, 3 ]
    ---
    ---ts(数组去重)
      const set = new Set([1, 2, 3])
      console.log(set.has(2))     // true
      console.log(set.has(4))     // false
    ---
    ---ts(集合操作)
      const setA = new Set([1, 2, 3])
      const setB = new Set([3, 4, 5])

      // 并集
      const union = new Set([...setA, ...setB]);
      console.log(union)             // Set { 1, 2, 3, 4, 5 }

      // 交集
      const intersection = new Set([...setA].filter(x => setB.has(x)));
      console.log(intersection)      // Set { 3 }

      // 差集
      const difference = new Set([...setA].filter(x => !setB.has(x)));
      console.log(difference)        // Set { 1, 2 } 
    ---
  `}}</Code>
  <Line></Line>

  <Text>WeakSet 的常用场景：</Text>
  <List>避免内存泄漏</List>
  <List>标记对象：用于临时存储和快速检查对某个对象是否进行过某种操作，比如跟踪已经处理过的对象、避免重复处理等场景</List>
  <Code>{{`
    ---ts(内存泄漏)
      const cache = new WeakSet()

      function cacheObject(obj) {
        if (!cache.has(obj)) {
          cache.add(obj)
          console.log('Object cached')
        } else {
          console.log('Object already cached')
        }
      }

      let obj = {}
      cacheObject(obj)      // Object cached
      cacheObject(obj)      // Object already cached

      obj = null            // obj 解除引用，将会被垃圾回收
    ---
    ---ts(标记对象)
      const visitedNodes = new WeakSet()

      function traverseNode(node) {
        if (visitedNodes.has(node)) {
          return
        }
        visitedNodes.add(node)
        // 执行某些操作
      }
    ---
  `}}</Code>
  <Line></Line>

  <Title>##API</Title>
  <Title>###判断</Title>
  <Api>
    @api - set.has(value)
    @desc - 检查集合中是否含有指定数据
    @params - [value : any] 指定数据
    @return - [boolean] 判断结果
  </Api>
  <Code>{{`
    ---ts(演示)
      const set = new Set([1,2,3])

      console.log(set.has(1))      // true
      console.log(set.has(4))      // false
    ---
  `}}</Code>
  <Line></Line>

  <Title>###增删</Title>
  <Api>
    @api - set.add(value)
    @desc - 为集合添加数据
    @params - [value : any] 数据
    @return - [set] 新增数据后的 set 实例
  </Api>
  <Code>{{`
    ---ts(演示)
      const set = new Set([1,2,3])

      console.log(set.add(4))      // Set(4) { 1, 2, 3, 4 }
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - set.delete(value)
    @desc - 删除集合中的指定数据
    @params - [value : any] 指定数据
    @return - [boolean] 若在集合中可以找到对应数据并且删除返回 true，否则 false
  </Api>
  <Code>{{`
    ---ts(演示)
      const set = new Set([1,2,3])

      console.log(set.delete(1))      // true
      console.log(set.delete(4))      // false
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - set.clear( )
    @desc - 删除集合中所有数据
    @return - [undefined]
  </Api>
  <Code>{{`
    ---ts(演示)
      const set = new Set([1,2,3])
      set.clear()      

      console.log(set)              // Set(0) {}
    ---
  `}}</Code>
  <Line></Line>

  <Title>###遍历</Title>
  <Quote>常规可以使用`for...of`来遍历键值表，对应变量拿到的是当前数据</Quote>
  <Api>
    @api - set.forEach(callback)
    @desc - 获取集合中的所有数据
    @params - [callback : (value, value2, map) => void] 回调函数，`value`：当前数据; `value2`：当前数据; `map`：源实例
    @return - [undefined] 
  </Api>
  <Code>{{`
    ---ts(演示)
      // 不晓得为什么硬要搞个value2出来~
      const set = new Set([1,2])

      set.forEach((value, value_, set) => {
        console.log(value)      // 1 2
        console.log(value_)     // 1 2
        console.log(set)        // Set(2) { 1, 2 }  Set(2) { 1, 2 }
      })
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