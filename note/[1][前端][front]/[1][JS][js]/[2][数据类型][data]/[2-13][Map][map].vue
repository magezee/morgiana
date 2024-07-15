<template>
  <Tip>最后更新 - 2024.07.09</Tip>
  <Title>#Map</Title>
  <Text>Map 提供了比传统对象更加优秀的方案来存储键值对：</Text>
  <List>灵活键：允许任意类型的键</List>
  <List>有序性：键值按插入顺序排序</List>
  <List>键值对数量：可以直接通过`Map.size`来获取总的键值对个数</List>
  <List>迭代：拥有更加方便的迭代方式</List>
  <List>性能：在频繁的增删改查中，Map 性能优于传统对象</List>
  <Code>{{`
    ---ts(创建)
      const map1 = new Map()
      map1.set('a', 'A')
      map1.set('b', 'B')

      const map2 = new Map([ ['a','A'], ['b','B'] ])

      console.log(map1)   // Map(2) { 'a' => 'A', 'b' => 'B' }
      console.log(map2)   // Map(2) { 'a' => 'A', 'b' => 'B' }
    ---
    ---ts(灵活)
      // object 无法区别数值1和字符串1，后声明的会隐式转换为字符串然后覆盖同名key
      const obj = {
        '1': 'string',
        1: 'number'
      }

      console.log(Object.keys(obj))       // [ '1' ]
      console.log(Object.values(obj))     // [ 'number' ]

      const map = new Map()
      map.set('1', 'string')
      map.set(1, 'number')

      console.log(map.keys())             // [Map Iterator] { '1', 1 }
      console.log(map.values())           // [Map Iterator] { 'string', 'number' }
    ---
    ---ts(有序性)
      const obj = {
        '2': 'b',
        '1': 'a',
        '3': 'c'
      }

      for(let key in obj) {
        console.log(obj[key])   // a b c
      }

      const map = new Map([ ['2','b'], ['1','a'], ['3','c'] ])

      map.forEach((value, key, map) => {
        console.log(value)      // b a c
      })

    ---
  `}}</Code>
  <Line></Line>

  <Title>##WeakMap</Title>
  <Text>与`Map`类似，但 WeakMap 对自身所持有的对象键是`弱引用`关系，意味着如果没有其他引用指向这个键值对中的键，则这部分键值会被垃圾机制回收，因此一般使用该类型管理缓存和私有数据存储</Text>
  <Text>以下是和 Map 的不同：</Text>
  <List>弱引用：键值对可以被回收</List>
  <List>键类型：只能为引用类型</List>
  <List>不可枚举：不能获取到具体的键值对个数，也无法对键值对进行遍历</List>
  <Text>弱引用难以用代码的方式来演示，具体可以参考[这篇文章](https://ruanyifeng.com/blog/2017/04/memory-leak.html)</Text>
  <Code>{{`
    ---ts(无关紧要的代码)
      const weakMap = new WeakMap()
      weakMap.set({}, 'data')

      console.log(weakMap.size)   // undefined

    ---
  
  `}}</Code>
  <Line></Line>

  <Title>##场景</Title>
  <Text>Map 的常用场景：</Text>
  <List>频率统计：方便统计元素出现的频率</List>
  <List>缓存机制：用于实现简单的缓存机制，可以缓存计算结果或数据查询结果以提高性能</List>
  <List>记录和合并多个数据源：用于合并和记录多个数据源，确保快速查询和更新数据</List>
  <Code>{{`
    ---ts(频率统计)
      const text = 'hello world hello'
      const wordCount = new Map()

      text.split(' ').forEach(word => {
        wordCount.set(word, (wordCount.get(word) || 0) + 1)
      })

      console.log(wordCount)    // Map { 'hello' => 2, 'world' => 1 }
    ---
    ---ts(缓存数据)
      const cache = new Map()

      function fetchData(key) {
        if (cache.has(key)) {
            return cache.get(key)
        }
        const result = expensiveOperation(key)     // 模拟一个耗时的操作
        cache.set(key, result)
        return result
      }
    ---
    ---ts(记录数据)
      const map1 = new Map([
        [1, 'one'],
        [2, 'two'],
      ])

      const map2 = new Map([
        [3, 'three'],
        [4, 'four'],
      ])

      // 可以用该方式和Array.from实现map和array的相互转换
      const combinedMap = new Map([...map1, ...map2])

      console.log(combinedMap)                // Map { 1 => 'one', 2 => 'two', 3 => 'three', 4 => 'four' }
      console.log(Array.from(combinedMap))    // [[ 1, 'one' ], [ 2, 'two' ], [ 3, 'three' ], [ 4, 'four' ]]
    ---
  `}}</Code>
  <Line></Line>

  <Text>WeakMap 的常用场景：</Text>
  <List>私有数据：用于存储对象的私有数据，利用上下文中的对象引用来关联私有数据</List>
  <List>缓存：用于缓存对象，避免内存泄漏</List>
  <Code>{{`
    ---ts(缓存)
      const cache = new WeakMap()

      function fetchData(obj) {
        if (!cache.has(obj)) {
          let data = expensiveOperation(obj)    // 假设 expensiveOperation 是一个很耗时的操作
          cache.set(obj, data)
          return data
        }
        return cache.get(obj)
      }
    ---
    ---ts(私有数据)
      const privateData = new WeakMap()

      class MyClass {
        constructor() {
          privateData.set(this, { secret: 'secretData' })
        }

        getSecret() {
          return privateData.get(this).secret
        }
      }

      const instance = new MyClass()
      console.log(instance.getSecret())   // 输出 'secretData'
    ---
  `}}</Code>
  <Line></Line>

  <Title>##API</Title>
  <Title>###判断</Title>
  <Api>
    @api - map.has(key)
    @desc - 检查键值表中是否含有指定键数据
    @params - [key : any] 键
    @return - [boolean] 判断结果
  </Api>
  <Code>{{`
    ---ts(演示)
      const map = new Map()
      map.set('a', 'A')

      console.log(map.has('a'))      // true
      console.log(map.has('b'))      // false
    ---
  `}}</Code>
  <Line></Line>

  <Title>###增删</Title>
  <Api>
    @api - map.set(key, value)
    @desc - 检查键值表中是否含有指定键数据
    @params - [key : any] 键
    @params - [value : any] 值
    @return - [map] 新增数据后的 map 实例
  </Api>
  <Code>{{`
    ---ts(演示)
      const map = new Map()
      map.set('a', 'A')

      console.log(map.set('b', 'B'))      // Map(2) { 'a' => 'A', 'b' => 'A' }
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - map.delete(key)
    @desc - 删除键值表中的指定键数据
    @params - [key : any] 键
    @return - [boolean] 若在字典中可以找到对应数据并且删除返回 true，否则 false
  </Api>
  <Code>{{`
    ---ts(演示)
      const map = new Map()
      map.set('a', 'A')

      console.log(map.delete('a'))      // true
      console.log(map.delete('b'))      // flase
      console.log(map.get('a'))         // undefined
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - map.clear( )
    @desc - 删除键值表中的所有数据
    @return - [undefined] 
  </Api>
  <Code>{{`
    ---ts(演示)
      const map = new Map()
      map.set('a', 'A')

      console.log(map.delete('a'))      // true
      console.log(map.delete('b'))      // flase
      console.log(map.get('a'))         // undefined
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>###查找</Title>
  <Api>
    @api - map.get(key)
    @desc - 获取键值表中的指定键的值
    @params - [key : any] 键
    @return - [any] 值
  </Api>
  <Code>{{`
    ---ts(演示)
      const map = new Map()
      map.set('a', 'A')

      console.log(map.get('a'))      // A
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - map.keys( )
    @desc - 获取键值表中的所有键
    @return - [Map Iterator] 一个包含所有键数据的迭代器
  </Api>
  <Code>{{`
    ---ts(演示)
      const map = new Map()
      map.set('a', 'A')
      map.set('b', 'B')
      const result = map.keys()

      console.log(result)                                      // [Map Iterator] { 'a', 'b' }
      console.log([...result])                                 // [ 'a', 'b' ]
      console.log(Object.prototype.toString.call(result))      // [object Map Iterator]
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - map.values( )
    @desc - 获取键值表中的所有值
    @return - [Map Iterator] 一个包含所有值数据的迭代器
  </Api>
  <Code>{{`
    ---ts(演示)
      const map = new Map()
      map.set('a', 'A')
      map.set('b', 'B')
      const result = map.values()

      console.log(result)                                      // [Map Iterator] { 'A', 'B' }
      console.log([...result])                                 // [ 'A', 'B' ]
      console.log(Object.prototype.toString.call(result))      // [object Map Iterator]
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - map.entries( )
    @desc - 获取键值表中所有键值对
    @return - [Map Iterator] 一个包含所有键值数据的迭代器
  </Api>
  <Code>{{`
    ---ts(演示)
      const map = new Map()
      map.set('a', 'A')
      map.set('b', 'B')
      const result = map.entries()

      console.log(result)                                      // [Map Entries] { [ 'a', 'A' ], [ 'b', 'B' ] }
      console.log([...result])                                 // [ [ 'a', 'A' ], [ 'b', 'B' ] ]
      console.log(Object.prototype.toString.call(result))      // [object Map Iterator]
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>###遍历</Title>
  <Quote>常规可以使用`for...of`来遍历键值表，对应变量拿到的是`Array&lt;key, value&gt;`数组</Quote>
  <Api>
    @api - map.forEach(callback)
    @desc - 获取键值表中的所有值
    @params - [callback : (value, key, map) => void] 回调函数，`value`：当前值; `key`：当前键; `map`：源实例
    @return - [undefined] 
  </Api>
  <Code>{{`
    ---ts(演示)
      const map = new Map()
      map.set('a', 'A')
      map.set('b', 'B')

      map.forEach((value, key, map) => {
        console.log(value)      // A  B
        console.log(key)        // a  b
        console.log(map)        // Map(2) { 'a' => 'A', 'b' => 'B' }  Map(2) { 'a' => 'A', 'b' => 'B' }
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