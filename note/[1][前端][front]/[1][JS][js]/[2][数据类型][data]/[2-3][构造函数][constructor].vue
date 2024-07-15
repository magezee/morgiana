<template>
  <Tip>最后更新 - 2024.06.27</Tip>
  <Title>#构造函数</Title>
  <Text>除了箭头函数，任意函数都可以充当构造函数，使用关键词`new`来生成实例对象</Text>
  <Text>实例化的过程的本质是建立原型链关联</Text>
  <Quote>为了和普通函数进行区分，也不知道谁规定的，作为构造函数时，函数名应首字母大写</Quote>
  <Line></Line>

  <Title>##实例化</Title>
  <Text>使用`new`创建实例时发生的事情：</Text>
  <Text>1. 创建容器：在构造函数中创建一个空对象充当实例对象</Text>
  <Text>2. 建立原型链：实例对象 ⇋ 构造函数原型</Text>
  <Text>3. 执行构造函数，其中`this`指向实例对象</Text>
  <Text>4. 返回实例对象</Text>
  <Quote>一般来说，充当构造函数时，都不会显式声明`return`内容，当然你也可以很皮，如果返回的是值类型则直接无效，实例化的仍是实例对象，但如果返回的是引用类型，那么实例化出来的将是这个数据</Quote>
  <Code>{{`
    ---ts(实例化)
      const Person = function(name) {
        this.name = name
        const desc = '这是一个人类'
      }

      const jack = new Person('jack')
      console.log(jack.name)      // jack
      console.log(jack.desc)      // undefined 因为没有用this声明
    ---
    ---ts(构造函数返回值)
      const Person = function(name) {
        this.name = name
        return 'data'
      }

      const Human = function(name) {
        this.name = name
        return {
          data: 'data'
        }
      }

      const jack = new Person('jack')
      const lucy = new Human('luck')

      console.log(jack)   // Person { name: 'jack' }
      console.log(lucy)   // { data: 'data' }
    ---
    ---ts(简单实现一个new)
      function myNew(Fn, ...rest) {
        const instance = Object.create(Fn.prototype)          // 创建空对象{},并连接实例对象到原型的链路
        const result = Fn.apply(instance, rest)               // 将this指向实例，传入构造参数执行构造函数，并接收构造函数返回值 
        return result instanceof Object ? result : instance   // 如果构造函数返回值为引用类型则直接返回，否则返回实例对象
      }

      const Person = function(name) {
        this.name = name
      }

      const jack = myNew(Person, 'jack')
      console.log(jack.name)                              // jack
      console.log(jack.__proto__ === Person.prototype)    // true
      console.log(jack.constructor === Person)            // true
    ---
  `}}</Code>
  <Text>其他需要补充的：</Text>
  <List>实例化时`this`指向实例对象是强制性的，不会受其他因素影响</List>
  <List>构造函数通常只进行实例化而不进行调用，因为`this`会指向外部从而产生影响</List>
  <List>
    箭头函数实例化时会报错，其本质原因：
    <List>箭头函数虽然拥有`__proto__`属性，但是没有`prototype`属性，无法形成完整的原型链</List>
    <List>箭头函数无法自己产生`this`，因此无法给实例对象添加属性</List>
  </List>
  <Code>{{`
    ---ts(优先级)
      const Person = function(name) {
        this.name = name
      }

      const obj = {}
      const newPerson = Person.bind(obj)
      const jack = new newPerson('jack')

      console.log(obj)      // {}
      console.log(jack)     // Person { name: 'jack' }
    ---
    ---ts(风险)
      const Person = function(name) {
        this.name = name
      }

      var name = 'window-name'
      Person('person-name')
      console.log(name)   // person-name 直接调用相当于this指向全局对象，导致全局对象中属性被污染
    ---
    ---ts(箭头函数)
      const Person = (name) => {
        this.name = name
      }

      Person.__proto__.data = 'data'

      console.log(Person.__proto__)     // { data: 'data' }
      console.log(Person.prototype)     // undefined

      const jack = new Person('jack')   // 报错：Person is not a constructor
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>##继承</Title>
  <Text>构造函数之间可以实现继承关系，如同所有的构造函数都继承于`Object`，继承关系具有如下特点：</Text>
  <List>child 实例拥有 Child、Father 构造函数的公开属性(`this`声明的属性)</List>
  <List>child 实例可以访问 Child、Father 构造函数的原型链</List>
  <Text>为了实现功能，需要做到以下关键内容：</Text>
  <List>让 child 拥有 Father 属性，需要在 Child 中直接调用 Father，同时要求`this`指向 Child，即`Father.call(this, ...args)`</List>
  <List>让 child 访问 Father 原型链，需要建立原型链关系，即`Child.prototype = Object.create(Father.prototype)`，以及确保 child 指向 Child 需要设置`Child.prototype.construct = Child`</List>
  <Code>{{`
    ---ts(实现继承吧~)
      const Father = function(name) {
        this.name = name
        this.data = '这是一个来自Father的数据'
      }

      const Child = function(name, age) {
        Father.call(this, name)   // 执行Father构造函数
        this.age = age
      }

      // 建立原型链关系
      Child.prototype = Object.create(Father.prototype)
      Child.prototype.constructor = Child                           // 如果不强制绑定，实例的构造函数会绑定为Father

      Father.prototype.say = function() {
        console.log('名字:' + this.name)
      }

      const jack = new Child('jack', 18)
      console.log(jack.data)                                        // 这是一个来自Father的数据
      console.log(jack.name)                                        // jack
      jack.say()                                                    // 名字:jack
      console.log(jack.constructor === Child)                       // true
      console.log(jack.__proto__.__proto__ === Father.prototype)    // true
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