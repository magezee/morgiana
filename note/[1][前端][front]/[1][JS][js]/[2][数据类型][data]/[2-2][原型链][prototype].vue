<template>
  <Tip>最后更新 - 2024.06.27</Tip>
  <Title>#原型链</Title>
  <Text>在 js 中的每一种数据都可以视为是该数据构造函数的实例，每个构造函数都会具有原型链</Text>
  <Text>一个简单的原型链如图所示：</Text>
  <Image src="https://morgiana.oss-cn-beijing.aliyuncs.com/note/js-prototype-01.png" :width="450"></Image>
  <Code>{{`
    ---ts(示例)
      // 引用类型
      function Person() {}
      const jack = new Person()

      console.log(jack.__proto__ === Person.prototype)              // true，实例对象-→原型     
      console.log(jack.constructor === Person)                      // true，实例对象-→构造函数
      console.log(Person.prototype.constructor === Person)          // true，构造函数←→原型
      console.log(jack.__proto__.__proto__ === Object.prototype)    // true
      console.log(Object.prototype.__proto__ === null)              // true

      // 值类型
      const num = 123
      console.log(num.__proto__.__proto__ === Object.prototype)     // true，相当于包装类Number去访问
    ---
  `}}</Code>
  <Line></Line>
  <Title>##特性</Title>
  <Text>原型的本质是一个对象, 其内部包含默认属性`constructor`和`__proto__`, 对象自然可以增添自定义属性</Text>
  <Text>原型会作为实例的父层作用域, 当实例找不到指定属性时, 会向上从原型中寻找</Text>
  <Quote>构造函数的静态`static`属性与原型、实例没有作用域的关联, 因此静态属性不会影响原型及实例</Quote>
  <Text>实例读取属性时：</Text>
  <List>检测实例中是否存在指定属性, 有则读取</List>
  <List>如果没有, 则向上在原型链中寻找, 直到顶层作用域, 没有则返回`undefined`</List>
  <Text>实例写入属性时：</Text>
  <List>检测实例中是否存在指定属性, 有则直接修改</List>
  <List>如果没有, 则在实例中创建该属性并写入</List>
  <Code>{{`
    ---ts(作用域关系)
      function Person() {}
      const jack = new Person()

      Person.prototype.say = function() { console.log('say') }    // 原型方法
      Person.speak =  function() { console.log('speak') }         // 静态方法

      console.log(jack.say)         // function
      console.log(jack.speak)       // undefined 实例不会访问到静态方法
      console.log(Person.say)       // undefined 类不会访问到原型方法
      console.log(Person.speak)     // function
    ---
    ---ts(多级作用域)
      function Person() {}
      const jack = new Person()

      Person.prototype.say = function() { console.log('say') }    
      Object.prototype.speak =  function() { console.log('speak') }  

      console.log(jack.say)         // function
      console.log(jack.speak)       // function Person处于Object的原型链上
    ---
  `}}</Code>
  <Line></Line>

  <Title>##风险</Title>
  <Text>**实例更改原型属性**</Text>
  <Text>正常情况下, 实例写入属性时不会影响到原型, 但该限制仅判断值类型和引用类型的引用地址是否前后相等, 如果实例写入的是深层数据, 则有机会改写原型属性(如修改`const`的引用类型数据)</Text>
  <Text>为了避免该场景, 可在实例中增加同名属性, 这样就会优先操作自身的属性</Text>
  <Quote>由于这个特性, 一般需要实例更改的数据往往写进实例内部而非存储在原型中</Quote>
  <Code>{{`
    ---ts(风险场景)
      function Person() {}
      const jack = new Person()
      const lucy = new Person()

      Person.prototype.obj = { x: 'x' }

      jack.obj.x = 'jack_x'

      console.log(jack.__proto__.obj.x)   // jack_x，原型内部属性被实例对象修改了
      console.log(jack)                   // Person {}，实例对象内部并不会增加属性
      console.log(lucy.obj.x)             // jack_x，由于原型属性被修改，所以所有的实例对象都会被影响
    ---
    ---ts(消除风险)
      function Person() {}
      const jack = new Person()
      const lucy = new Person()

      Person.prototype.obj = { x: 'x' }

      jack.obj = {}
      jack.obj.x = 'jack_x'

      console.log(jack.__proto__.obj.x)   // x
      console.log(jack)                   // Person { obj: { x: 'jack_x' } }
      console.log(lucy.obj.x)             // x
    ---
  `}}</Code>

  <Text>**原型方法丢失this**</Text>
  <Text>由于箭头函数不绑定`this`, 因此在原型中绑定的方法为箭头函数, 则会丢失</Text>
  <Code>{{`
    ---ts(风险场景)
      function Person() {}
      const jack = new Person()


      Person.prototype.say = () => {
        console.log(\`my name is \${this.name}\`)
      }

      Person.prototype.doing = function() {
        console.log(\`i am doing \${this.thing}\`)
      }

      jack.name = 'jack'
      jack.thing = 'cooking'

      jack.say()        // my name is undefined
      jack.doing()      // i am doing cooking
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