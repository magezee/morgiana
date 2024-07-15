<template>
  <Tip>最后更新 - 2024.07.12</Tip>
  <Title>#声明文件</Title>
  <Refer :source="[
    { desc: '声明文件引入【官网】', url: 'https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html' },
  ]"></Refer>
  <Text>通常来说, 在使用`外部`代码块时, 无法感知其类型规则, 这个时候可以使用`declare`全局定义或补充同名`变量/类型`的规则</Text>
  <Code>{{`
    ---ts(例如使用外部容器挂载到window的一个fn方法)
      /// 普通使用时:
      window.fn()           // error: Window上不存在属性fn
      (window as any).fn()  // 可以这样写, 但是很难看

      /// 手动增加类型
      declare interface Window {
        fn: (x?: number, y?: string) => void
      }

      window.fn()           // 拥有类型规范且用起来很舒服
    ---
  `}}</Code>
  <Text>ts 文件在编译后最终为 js 文件, 如果需要保留类型规则, 需要一种独立文件, 它不参与 js 编译、不会对功能产生影响, 但是可以描述代码的类型, 这种文件就是`.d.ts`即声明文件</Text>
  <Text>声明文件作用对象是编译器, 它不会影响代码功能, 它仅在代码开发过程中为开发者说明类型规范</Text>
  <Quote>所以即使`declare`可以写在任意`.ts`文件中对全局产生作用, 但是一般也只会在`.d.ts`中使用</Quote>
  <Line></Line>

  <Title>##引入</Title>
  <Text>在一个项目中，有以下策略使声明文件自动引入并生效</Text>
  <List>第三方库：ts 会自动加载所有`node_modules/@types`目录下的声明文件，也会加载模块文件夹内部已经定义的声明文件</List>
  <List>指令：可以使用三斜杠指令在 ts 文件的顶部来引用特定的声明文件，提升性能和避免全局污染</List>
  <List>配置：默认情况下会加载本地项目中的所有`.d.ts`文件，也可以手动控制范围，[详情看这里](/note/front--js--typescript--desc#anchor-2)</List>
  <Quote>需要注意的是, 只有`import`方式引入的模块会携带声明文件, `require`则不会, 如果实在需要可以使用 `import xx = require('module')` 的方式</Quote>
  <Code>{{`
    ---ts(三斜杠指令)
      /// <reference path="./foo.d.ts" />
      console.log(foo)
      // 声明文件的引用

      /// <reference types="node" />
      //引用类型定义：引用某个包的类型定义，这通常用于显式地引入node_modules/@types中的类型定义

      /// <reference lib="myProject" />
      //项目引用（针对多项目引用的情况）: 通过三斜杠指令可以实现项目间的类型引用，这对于 Monorepo 或者多包项目非常有用
    ---
  `}}</Code>
  <Line></Line>

  <Title>##编写</Title>
  <Text>编写声明文件主要用到`declare`和`namespace`：</Text>
  <Text>declare 功能：</Text>
  <List>声明全局变量和类型</List>
  <List>声明模块：为一个模块定义或扩展类型</List>
  <Text>namespace 功能：</Text>
  <List>定义命名空间：避免污染全局</List>
  <Code>{{`
    ---ts(全局变量和类型)
      // globals.d.ts
      declare const GLOBAL_CONST: string
      declare function globalFunction(param: number): void
      declare class GlobalClass {
        constructor(name: string)
        sayHello(): void
      }
      declare interface GlobalInterface {
        name: string;
        age: number;
      }

      // main.ts
      console.log(GLOBAL_CONST)
      globalFunction(42)
      const instance = new GlobalClass('Alice')
      instance.sayHello()
      const person: GlobalInterface = { name: "Alice", age: 30 }
    ---
    ---ts(定义和扩展模块)
      // my-module.d.ts
      declare module 'my-module' {
        export function foo(param: string): number;
        export interface MyInterface {
          id: number
          value: string
        }
      }

      // main.ts
      import { foo, MyInterface } from 'my-module'

      const result: number = foo('test')
      const data: MyInterface = { id: 1, value: "text" }
    ---
    ---ts(命名空间)
      // globals.d.ts
      declare namespace MyNamespace {
        export interface MyInterface {
          name: string
          age: number
        }

        export class MyClass {
          constructor(name: string, age: number)
          getInfo(): string
        }

        export function myFunction(param: MyInterface): void
      }

      // main.ts
      const person: MyNamespace.MyInterface = { name: "Alice", age: 30 }
      const myClassInstance = new MyNamespace.MyClass("Alice", 30)

      console.log(myClassInstance.getInfo())

      MyNamespace.myFunction(person)
    ---
  `}}</Code>
  
  
  

</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Code } from '../../../../page/component/note';

const emits = defineEmits([ 'noteContentMounted' ])

onMounted(() => {
  emits('noteContentMounted')
})

</script>



<style lang="less">

</style>