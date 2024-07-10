<template>
  <Tip>最后更新 - 2024.07.07</Tip>
  <Title>#Symbol</Title>
  <Text>在 ES6 中引入了新的原始数据类型 Symbol，其特性如下：</Text>
  <List>唯一性：每个从`Symbol()`返回的符号都是唯一的</List>
  <List>不可变性：和字符串一样，一旦被创建，就无法更改</List>
  <List>影藏属性：使用`symbol`作为对象的`key`创建时属性不会被常规手段遍历到，可以使用`Object.getOwnPropertySymbols()`来遍历</List>
  <List>全局符号：使用`Symbol.for()`和`Symbol.keyFor()`可以在全局注册表中共享符号，确保同名符号唯一且可以跨文件和作用域共享</List>
  <Code>{{`
    ---ts(唯一)
      const keyName = 'gegeda'
      const symbolA = Symbol(keyName)
      const symbolB = Symbol(keyName)

      console.log(symbolA == symbolB)     // false
    ---
    ---ts(不可枚举)
      const key = Symbol('gegeda')

      const obj = {
        key: 'obj',
        [key]: 'gegeda'
      }

      console.log(Object.keys(obj))         // [ 'key' ]
      console.log(Object.values(obj))       // [ 'obj' ]

      for(let key in obj) {   
        console.log(key)                    // key
        console.log(obj[key])               // obj
      } 

      console.log(Object.getOwnPropertySymbols(obj))      // [ Symbol(gegeda) ]
    ---
    ---ts(全局)
      // a.js
      export const keyName = 'gegeda'
      export const symbolA = Symbol.for(keyName)
      export const symbolB = Symbol.for(keyName)

      // b.js
      import { symbolA, symbolB, keyName } = from './a'

      const symbolC = Symbol.for(keyName)
      const key = Symbol.keyFor(symbolC)

      console.log(key === keyName)        // true
      console.log(symbolA === symbolB)    // true
      console.log(symbolA === symbolC)    // true
      console.log(symbolB === symbolC)    // true
    ---

  `}}</Code>
  <Line></Line>

  <Title>##场景</Title>
  <Text>主要使用到 Symbol 的场景：</Text>
  <List>静态字符串常量，避免硬编码字符串，并确保值的唯一性</List>
  <List>定义私有属性</List>
  <List>避免对象属性冲突，常见于引入第三方库后的兼容</List>
  <Code>{{`
    ---ts(字符串常量)
      const COLOR = {
        RED: Symbol('red'),
        GREEN: Symbol('green'),
        BLUE: Symbol('blue')
      }

      function getColorStatus(color) {
        switch (color) {
          case COLOR.RED:
            return 'Stop'
          case COLOR.GREEN:
            return 'Go'
          case COLOR.BLUE:
            return 'Warning'
          default:
            return 'Unknown color'
        }
      }
    ---
    ---ts(私有属性)
      const privateMethod = Symbol('privateMethod')

      class MyClass {
        [privateMethod]() {
          console.log('This is a private method.')
        }

        callPrivateMethod() {
          this[privateMethod]()
        }
      }

      const instance = new MyClass()
      instance.callPrivateMethod()
    ---
    ---ts(避免冲突)
      import { obj } from 'module'

      obj[Symbol('userDefined')] = 'xxx'
    ---
  
  `}}</Code>
  <Line></Line>

  <Title>##API</Title>
  <Api>
    @api - Symbol.for(str)
    @desc - 与直接创建不同，此方法根据描述符创建一个单例
    @params - [str : string] 描述符
    @return - [symbol] 如果已经存在相同描述符的 symbol 实例，则返回该实例，如果不存在则创建
  </Api>
  <Code>{{`
    ---ts(演示)
      const symbolA = Symbol.for('gegeda')
      const symbolB = Symbol.for('gegeda')

      console.log(symbolA === symbolB)      // true
    ---
  `}}</Code>
  <Line></Line>

  <Api>
    @api - Symbol.keyFor(symbol)
    @desc - 获取使用`Symbol.key()`创建的 symbol 实例的描述符
    @params - [symbol : symbol] 实例
    @return - [string | undefined] 描述符
  </Api>
  <Code>{{`
    ---ts(演示)
      const resultA = Symbol.keyFor(Symbol('A'))
      const resultB = Symbol.keyFor(Symbol.for('B'))

      console.log(resultA)      // undefined
      console.log(resultB)      // B
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