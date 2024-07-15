<template>
  <Tip>最后更新 - 2024.06.30</Tip>
  <Title>#Class</Title>
  <Text>Class 提供了更便捷的方式来定义构造函数和管理继承关系，它相当于构造函数的语法躺，其本质上还是依赖原型链的机制</Text>
  <Quote>由于 class 主要在 typescript 中使用，且在 ts 中具有更多特性，因此本篇文章仅介绍在 ts 中的使用</Quote>
  <Code>{{`
    ---ts(些许不同)
      class Person {
        public name: string   // 在js中不需要显式声明属性，但是ts就需要~

        constructor(name) {
          this.name = name
        }
      }
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>##构造函数</Title>
  <Text>在类中同样有构造函数的概念，即类中的`constructor`成员，此成员函数与普通函数充当构造函数的特性一致，一个类中一定会有构造函数，如果没有显式声明，则会默认添加一个空的构造函数</Text>
  <Text>类中不允许使用关键字声明变量或函数，直接声明即可，有如下特性：</Text>
  <List>非空属性成员会充当实例化对象的属性</List>
  <List>方法成员方法则会绑定在该类的原型对象上</List>
  <List>实例中的`this`指向自己，因此调用内部成员需要使用`this`</List>
  <Code>{{`
    ---ts(声明成员)
      class Person {
        // 属性成员，非函数式声明的方法相当于声明属性再赋值
        country
        type = 'person'
        action = () => {}

        // 属性方法
        say() {
          console.log(this.type)
        }
      }

      const jack = new Person()
      console.log(jack)                         // Person { type: 'person', action: Function }
      console.log(jack.constructor.prototype)   // { say: Function  }
    ---
  `}}</Code>
  <Quote>顺便说一下，类实例无法通过`__proto__`属性直接访问到原型，只能先访问构造函数再访问原型~</Quote>
  <Line></Line>

  <Title>###静态成员</Title>
  <Text>通过关键字`static`来声明静态成员，它属于类本身而不是类实例，拥有以下特性：</Text>
  <List>由于普通成员存在于实例而非类本身，因此静态方法里只能调用静态成员，不能调用普通成员</List>
  <List>静态成员在所有实例之间共享</List>
  <Code>{{`
    ---ts(共享数据)
      class Example {
        static shareValue = 0

        changeValue(value) {
          Example.shareValue = value
        }

        getValue() { 
          return Example.shareValue
        }
      }

      const obj1 = new Example()
      const obj2 = new Example()

      console.log(Example.shareValue)   // 0

      obj1.changeValue(1)              
      console.log(obj1.getValue())      // 1

      obj2.changeValue(2)               
      console.log(obj1.getValue())      // 2
      console.log(obj2.getValue())      // 2
    ---
    ---ts(单例模式)
      class Singleton {
        private static instance: Singleton

        static getInstance(): Singleton {
          if(!Singleton.instance) {
            Singleton.instance = new Singleton
          }
          return Singleton
        }
      }

      const s1 = Singleton.getInstance()
      const s2 = Singleton.getInstance()

      console.log(s1 === s2)    // true
    ---
  `}}</Code>
  <Line></Line>

  <Title>###只读属性</Title>
  <Text>通过关键字`readonly`来声明只读属性，一旦初始化之后就不可修改</Text>
  <Code>{{`
    ---ts(只读属性)
    class Person {
      readonly id: number
      name: string

      constructor(id: number, name: string) {
        this.id = id
        this.name = name
      }

      changeName(newName: string) {
        this.name = newName     
        this.id = 10            // 错误，id 是只读属性
      }
    }
    ---
  `}}</Code>
  <Line></Line>

  <Title>##继承</Title>
  <Text>类可以使用关键字`extent`继承另一个类，拥有以下特性：</Text>
  <List>如果子类显式定义构造函数，则必须手动调用`super()`来执行父类构造函数，这点和普通函数的构造函数继承一致</List>
  <List>子类可以重写父类的方法，重写后仍可以使用`super`关键字调用原父类方法</List>
  <List>子类会同时继承父类的静态成员</List>
  <List>
    父类可以通过访问修饰符来控制子类允许访问的成员，如果不显式声明默认`public`：
    <List>`public`：子类和子实例可以继承并访问</List>
    <List>`protected`：子类可以继承和访问，子实例无法访问</List>
    <List>`private`：子类无法继承和访问，仅限父类和父实例</List>
  </List>
  <Code>{{`
    ---ts(super)
      class Father {
        action(): void {
          console.log('action of father')
        }
      }

      class Child extends Father {
        name: string
        constructor(name: string) {
          super()
          this.name = name
        }

        action(): void {
          console.log('action of child')
        }

        fatherAction() : void {
          super.action()
        }
      }

      const child = new Child('Alice')

      child.action()            // action of child
      child.fatherAction()      // action of father
    ---
    ---ts(静态成员)
      class Father {
        static staticData: string = 'static data'
        static staticFn() {
          console.log('static fn')
        }
      }

      class Child extends Father {}

      console.log(Child.staticData)   // static data
      Child.staticFn()                // static fn
    ---
    ---ts(访问修饰符)
      class Father {
        public publicData: string
        protected protectedData: string
        private privateData: string

        constructor() {
          this.publicData = 'publicData'
          this.protectedData = 'protectedData'
          this.privateData = 'privateData'
        }
      }

      class Child extends Father {
        constructor() {
          super()
          console.log(this.publicData)
          console.log(this.protectedData)
          console.log(this.privateData)     // 报错：无法访问
        }
      }

      const child = new Child()

      console.log(child.publicData)
      console.log(child.protectedData)      // 报错：无法访问
      console.log(child.privateData)        // 报错：无法访问
    ---
  `}}</Code>
  <Line></Line>

  <Title>###抽象</Title>
  <Text>通过关键字`abstract`来定义抽象类和抽象方法，为其他类提供基础结构和通用行为，具有如下特点：</Text>
  <List>无法创建实例，只能作为其他类的基类</List>
  <List>抽象类中可以定义抽象成员，成员不可以实现，子类继承时需要实现成员</List>
  <Code>{{`
    ---ts(抽象类)
      abstract class Father {
        // 抽象成员不可以实现
        abstract abstractData: string
        abstract abstractFn(): void    

        // 普通成员可以实现
        data: string = 'normal data'
        fn(): void {
          console.log('normal function')
        }
      }

      class Child extends Father {
        // 实现抽象成员
        abstractData: string = 'abstract data'
        abstractFn(): void {
          console.log('abstract function')
        }
      }

      const child = new Child()
      console.log(child.data)               // normal data
      console.log(child.abstractData)       // abstract data
      child.fn()                            // normal function
      child.abstractFn()                    // abstract function
    ---
    ---ts(规范功能)
      abstract class Vehicle {
        abstract startEngine(): void

        stopEngine(): void {
          console.log('Engine stopped')
        }
      }

      class Car extends Vehicle {
        startEngine(): void {
          console.log('Car engine started')
        }
      }

      class Bike extends Vehicle {
        startEngine(): void {
          console.log('Bike engine started')
        }
      }
    ---
    ---ts(多级抽象继承)
      abstract class Animal {
        abstract makeSound(): void        // 抽象方法

        move(): void { // 具体方法
          console.log('Moving...')
        }
      }

      abstract class Mammal extends Animal {
        abstract feedMilk(): void         // 新的抽象方法
      }

      abstract class MarineMammal extends Mammal {
        abstract swim(): void             // 进一步新增的抽象方法
      }

      class Dolphin extends MarineMammal {
        // 实现所有继承的抽象方法
        makeSound(): void {
          console.log('Click! Click!')
        }

        feedMilk(): void {
          console.log('Feeding milk...')
        }

        swim(): void {
          console.log('Swimming...')
        }
      }
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>###接口</Title>
  <Text>通过关键字`implements`来实现接口，以此规范一个类结构和功能，具有如下特点：</Text>
  <List>接口只能定义成员，不能实现，类实现接口时则需要实现接口规定的成员</List>
  <List>类可以实现多个接口</List>
  <Code>{{`
    ---ts(实现接口)
      interface CanFly {
        fly(): void
      }

      interface CanSwim {
        swim(): void
      }

      class Bird implements CanFly {
        fly(): void {
          console.log('Flying...')
        }
      }

      class Fish implements CanSwim {
        swim(): void {
          console.log('Swimming...')
        }
      }

      // 实现多个接口
      class Duck implements CanFly, CanSwim {
        fly(): void {
          console.log('Duck flying...')
        }
        swim(): void {
          console.log('Duck swimming...')
        }
      }

    ---
    ---ts(组合类和接口)
      interface Drivable {
        drive(): void
      }

      abstract class Vehicle {
        abstract startEngine(): void
      }

      class Car extends Vehicle implements Drivable {
        startEngine(): void {
          console.log('Car engine started')
        }

        drive(): void {
          console.log('Driving car')
        }
      }
    ---
  `}}</Code>
  <Text>**使用场景**</Text>
  <Text>抽象类使用场景：</Text>
  <List>定义模板：一些必要的功能需要在子类中拥有不同的实现</List>
  <List>层次结构：定义一个明确的类层次结构，包括一些基础行为和状态</List>
  <Text>接口使用场景：</Text>
  <List>定义行为：定义基础的行为，这些行为会在不相关的类中复用</List>
  <List>多重继承：类可以实现多个接口的功能</List>
  <List>降低耦合：接口单一易分离，更容易维护代码和测试</List>
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