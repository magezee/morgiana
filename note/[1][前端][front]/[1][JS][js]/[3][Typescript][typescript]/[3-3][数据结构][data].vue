<template>
  <Tip>最后更新 - 2024.07.12</Tip>
  <Title>#数据结构</Title>
  <Text>这里主要介绍一下在 ts 中新增的一些有的没的</Text>
  <Line></Line>

  <Title>##命名空间</Title>
  <Text>使用关键字`namespace`定义命名空间，它是一种组织代码的方式：</Text>
  <List>基本：可以将相关的类、接口、函数和变量聚合到一个命名空间中，以避免全局命名污染</List>
  <List>嵌套：可以嵌套命名空间以进一步组织代码，每个嵌套的命名空间都需要使用`export`关键字显式导出</List>
  <List>合并：命名空间可以分散在多个文件中，并且可以通过同名的方式进行合并</List>
  <Code>{{`
    ---ts(定义)
      // 声明
      namespace MyNamespace {
        export const myVar = 42
        
        export interface MyInterface {
          name: string
        }
        
        export class MyClass {
          constructor(public name: string) {}
        }
        
        export function myFunction(param: MyInterface): void {
          console.log(param.name)
        }
      }

      // 使用
      const myVar = MyNamespace.myVar
      const myInstance = new MyNamespace.MyClass("Alice")
      MyNamespace.myFunction({ name: "Bob" })
    ---
    ---ts(嵌套)
      namespace OuterNamespace {
        export namespace InnerNamespace {
          export class InnerClass {
            constructor(public value: number) {}
          }
        }
      }

      const innerInstance = new OuterNamespace.InnerNamespace.InnerClass(123)
    ---
    ---ts(合并)
      // file1.ts
      namespace MyNamespace {
        export interface MyInterface {
          id: number
        }
      }

      // file2.ts
      namespace MyNamespace {
        export function myFunction(): void {
          console.log("Hello")
        }
      }

      // main.ts
      const obj: MyNamespace.MyInterface = { id: 1 }
      MyNamespace.myFunction()
    ---
  `}}</Code>
  <Line></Line>

  <Title>##接口</Title>
  <Text>使用关键字`interface`定义接口，主要用于规定类型和规范类的实现</Text>
  <Code>{{`
    ---ts(规定类型)
      interface Iperson {
        sex: string
        age: number
      }

      const jcak: Iperson = {
        sex: 'man',
        age: 12
      }
    ---
    ---ts(继承类型)
      interface Iperson {
        sex: string
        age: number
      }

      interface IpersonAction extends Iperson {
        eat(food: string): void
      }

      const jcak: IpersonAction = {
        sex: 'man',
        age: 12,
        eat(food: string) {
          console.log(\`eat \${food}\`)
        }
      }
    ---
    ---ts(规范类)
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
  `}}</Code>
  <Line></Line>

  <Title>##函数重载</Title>
  <Text>函数重载允许为一个函数提供多种类型签名，使得同一个函数可以根据传入参数的不同表现出不同的行为，包含两个部分：</Text>
  <List>重载签名：定义了函数可以接受的多种输入类型，每种输入类型对应一种输出类型，重载签名必须在实现签名之前声明</List>
  <List>实现签名：函数的实际实现，参数类型要能够覆盖所有重载签名的参数类型（通常使用联合类型或 any 类型）</List>
  <Code>{{`
    ---ts(函数重载)
      // 重载签名
      function add(a: string, b: string): string
      function add(a: number, b: number): number

      // 实现签名
      function add(a: string | number, b: string | number): string | number {
        if (typeof a === "string" && typeof b === "string") {
          return a + b                            // 处理字符串相加
        }
        if (typeof a === "number" && typeof b === "number") {
          return a + b                            // 处理数字相加
        }
        throw new Error('Invalid arguments')      // 处理错误情况
      }

      // 使用重载签名
      const result1 = add("Hello, ", "world!")    // result1 的类型为 string
      const result2 = add(10, 20)                 // result2 的类型为 number

      console.log(result1)                        // 输出: Hello, world!
      console.log(result2)                        // 输出: 30
    ---
    ---ts(根据入参处理逻辑)
      function getInfo(username: string): { name: string, age: number }
      function getInfo(userId: number): { id: number, email: string }

      function getInfo(param: string | number): { name: string, age: number } | { id: number, email: string } {
        if (typeof param === 'string') {
          // 查询用户名相关逻辑
          return { name: param, age: 30 }; 
        } else if (typeof param === 'number') {
          // 查询用户ID相关逻辑
          return { id: param, email: 'user@example.com' }
        }
        throw new Error('Invalid argument')           // 处理错误情况
      }

      // 使用重载签名
      const userInfoByName = getInfo("Alice")
      const userInfoById = getInfo(12345)

      console.log(userInfoByName)                     // 输出: { name: 'Alice', age: 30 }
      console.log(userInfoById)                       // 输出: { id: 12345, email: 'user@example.com' }
    ---
  
  `}}</Code>
  <Text>在某些情况下，使用函数重载可以显得过于复杂，可以使用可选参数实现类似功能</Text>
  <Code>{{`
    ---ts(可选参数)
      function greet(name: string, age?: number): string {
        if (age !== undefined) {
          return \`Hello, my name is \${name} and I am \${age} years old.\`;
        } else {
          return \`Hello, my name is \${name}.\`
        }
      }

      console.log(greet("Alice"))         // 输出: Hello, my name is Alice.
      console.log(greet("Alice", 30))     // 输出: Hello, my name is Alice and I am 30 years old.

    ---
  `}}</Code>
  <Line></Line>

  <Title>##枚举</Title>
  <Text>使用关键字`enum`定义枚举，用于定义一组命名常量，使代码更具可读性和可维护性，有以下常用方案：</Text>
  <List>数值枚举：本质上是用一串有顺序的数值去依次表示枚举成员，如果没有显示指定数值，则从`0`开始计数，同时数值枚举可以反向映射通过值来获取枚举成员名称</List>
  <List>字符串枚举：每个枚举成员必须显式指定字符串值</List>
  <List>异构枚举：包含数值枚举成员和字符串枚举成员，一般不咋用</List>
  <Code>{{`
    ---ts(数值枚举)
      enum Direction {
        Up,
        Down,
        Left = 6,
        Right
      }

      console.log(Direction.Up)       // 0
      console.log(Direction.Down)     // 1
      console.log(Direction.Left)     // 6
      console.log(Direction.Right)    // 7

      // 反向映射
      console.log(Direction[0])       // Up
      console.log(Direction[1])       // Down
      console.log(Direction[6])       // Left
      console.log(Direction[7])       // Right
    ---
    ---ts(字符串枚举)
      enum Colors {
        Red = 'RED',
        Green = 'GREEN',
        Blue = 'BLUE'
      }

      console.log(Colors.Red)     // 'RED'
      console.log(Colors.Green)   // 'GREEN'
      console.log(Colors.Blue)    // 'BLUE'
    ---
    ---ts(异构枚举)
      enum MixedEnum {
        No = 0,
        Yes = 'YES'
      }

      console.log(MixedEnum.No);   // 0
      console.log(MixedEnum.Yes);  // 'YES'
    ---
    ---ts(使用枚举作为类型)
      enum UserRole {
        Admin,
        User,
        Guest
      }

      function getUserRole(role: UserRole) {
        switch (role) {
          case UserRole.Admin:
            return 'Admin'
          case UserRole.User:
            return 'User'
          case UserRole.Guest:
            return 'Guest'
        }
      }

      const role = getUserRole(UserRole.Admin);
      console.log(role)     // 'Admin'
    ---
  `}}</Code>
  <Line></Line>

  <Title>##装饰器</Title>
  <Text>装饰器是一种高级特性，用于修改类、方法、访问器、属性或参数的行为，其本质上是一些特殊的函数，要使用装饰器，需要在`tsconfig`中启用`experimentalDecorators`选项</Text>
  <List>类装饰器：应用于类构造函数，用于观察、修改或替换类定义</List>
  <List>方法装饰器：应用于类的方法，接收三个参数，类的原型对象、方法名和方法描述符</List>
  <List>访问器装饰器：应用于类的存取器`getter`和`setter`，接收三个参数，类的原型对象、存取器名和存取器描述符</List>
  <List>属性装饰器：应用于类的属性，接收两个参数，类的原型对象和属性名</List>
  <List>参数装饰器：应用于类的方法参数，接收三个参数，类的原型对象、方法名和参数索引</List>
  <Code>{{`
    ---ts(类装饰器)
      // @sealed装饰器会将Greeter类及其原型对象标记为不可扩展
      function sealed(target: Function) {
        console.log(target)             // [Function: Greeter]
        Object.seal(target)
        Object.seal(target.prototype)
      }

      @sealed
      class Greeter {
        greeting: string

        constructor(message: string) {
          this.greeting = message
        }

        greet() {
          return this.greeting
        }
      }
    ---
    ---ts(方法装饰器)
      // 日志方法装饰器
      function log(target: any, methodName: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value

        descriptor.value = function (...args: any[]) {
          console.log(\`Calling \${methodName} with arguments: \${JSON.stringify(args)}\`)
          const result = originalMethod.apply(this, args)
          console.log(\`Result: \${result}\`)
          return result
        }

        return descriptor
      }

      class Calculator {
        @log
        add(a: number, b: number): number {
          return a + b
        }
      }

      const calculator = new Calculator()
      calculator.add(2, 3)      // 控制台输出调用过程的日志
    ---
    ---ts(访问器装饰器)
      function enumerable(value: boolean) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
          descriptor.enumerable = value
        }
      }

      class Person {
        private _name: string

        constructor(name: string) {
          this._name = name
        }

        @enumerable(true)
        get name() {
          return this._name
        }
      }

      const person = new Person('Alice')
      for (const key in person) {
        console.log(key)          // 'name'
      }
    ---
    ---ts(属性装饰器)
      function format(prefix: string = '') {
        return function (target: any, propertyKey: string) {
          let value = target[propertyKey]

          Object.defineProperty(target, propertyKey, {
            get: () => \`\${prefix}\${value}\`,
            set: (newValue: any) => { value = newValue; },
            enumerable: true,
            configurable: true
          })
        }
      }

      class Product {
        @format('$')
        price: number

        constructor(price: number) {
          this.price = price
        }
      }

      const product = new Product(100)  
      console.log(product.price)        // 输出: $100
    ---
    ---ts(参数装饰器)
      // 参数装饰器只能用来监视一个方法的参数是否被传入 没什么太大作用
      function required(target: any, propertyKey: string, parameterIndex: number) {
        const existingRequiredParameters: number[] = Reflect.getOwnMetadata("required", target, propertyKey) || [];
        existingRequiredParameters.push(parameterIndex);
        Reflect.defineMetadata("required", existingRequiredParameters, target, propertyKey);
      }

      class UserService {
        createUser(@required name: string) {
          console.log(\`Creating user: \${name}\`);
        }
      }

      const userService = new UserService();
      userService.createUser("Bob")     // 调用成功
      userService.createUser();         // 缺少参数
    ---
  `}}</Code>
  <Text>装饰器执行顺序有如下规则：</Text>
  <List>不同种装饰器：执行内部装饰器后才开始执行类装饰器，内部的装饰器执行顺序按照声明顺序决定</List>
  <List>同种装饰器：按照由后到前的顺序执行</List>
  <List>嵌套装饰器：即高阶函数返回装饰器时，执行顺序为先按声明顺序执行高阶函数，再由后向前执行装饰器</List>
  <Code>{{`
    ---ts(参数装饰器)
      function paramDecorator(target: any, methodName: string, paramIndex: number) {
        console.log(\`Parameter decorator called for \${methodName} at parameter index \${paramIndex}\`);
      }

      class MyClass {
        myMethod(@paramDecorator param1: string, @paramDecorator param2: number) {}
      }

      // 执行顺序：
      // Parameter decorator called for myMethod at parameter index 1
      // Parameter decorator called for myMethod at parameter index 0
    ---
    ---ts(类装饰器)
      function classDecoratorA(constructor: Function) {
        console.log('Class decorator A called')
      }

      function classDecoratorB(constructor: Function) {
        console.log('Class decorator B called')
      }

      @classDecoratorA
      @classDecoratorB
      class MyClass {}

      // 执行顺序：
      // Class decorator B called
      // Class decorator A called
    ---
    ---ts(方法装饰器)
      function methodDecoratorA(target: any, methodName: string, descriptor: PropertyDescriptor) {
        console.log(\`Method decorator A called for \${methodName}\`);
      }

      function methodDecoratorB(target: any, methodName: string, descriptor: PropertyDescriptor) {
        console.log(\`Method decorator B called for \${methodName}\`);
      }

      class MyClass {
        @methodDecoratorA
        @methodDecoratorB
        myMethod() {}
      }

      // 执行顺序：
      // Method decorator B called for myMethod
      // Method decorator A called for myMethod

    ---
    ---ts(不同种装饰器)
      function classDecorator(constructor: Function) {
        console.log('ClassDecorator')
      }
      function propertyDecorator(target: any, propertyName: string) {
        console.log('PropertyDecorator')
      }
      function accessorDecorator(target: any, propertyName: string, descriptor: PropertyDescriptor) {
        console.log('AccessorDecorator')
      }
      function methodDecorator(target: any, methodName: string, descriptor: PropertyDescriptor) {
        console.log('MethodDecorator')
      }
      function paramDecorator(target: any, methodName: string, paramIndex: number) {
        console.log('ParamDecorator')
      }

      @classDecorator
      class MyClass {
        @propertyDecorator
        myProperty: string | undefined

        @accessorDecorator
        set setter(value: string) {}

        @methodDecorator
        myMethod(@paramDecorator param1: string, @paramDecorator param2: number) {}
      }

      // 执行顺序：
      // PropertyDecorator
      // AccessorDecorator
      // ParamDecorator   （paramIndex 1）
      // ParamDecorator   （paramIndex 0）
      // MethodDecorator
      // ClassDecorator

    ---
    ---ts(嵌套装饰器)
      function decoratorA() {
        console.log('Evaluating decorator A')
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
          console.log('Applying decorator A')
        }
      }

      function decoratorB() {
        console.log('Evaluating decorator B')
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
          console.log('Applying decorator B')
        }
      }

      class MyClass {
        @decoratorA()
        @decoratorB()
        myMethod() {}
      }

      // 执行顺序：
      // Evaluating decorator A
      // Evaluating decorator B
      // Applying decorator B
      // Applying decorator A
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