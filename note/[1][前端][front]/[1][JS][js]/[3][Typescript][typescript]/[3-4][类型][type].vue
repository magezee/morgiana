<template>
  <Tip>最后更新 - 2024.08.16</Tip>
  <Title>#类型</Title>
  <Text>声明类型的方式有`type`和`interface`两种</Text>
  <List>当需要做类型处理运算时, 使用`type`</List>
  <List>当需要继承或扩展类型时, 使用`interface`, 同时该方式只能声明对象类型</List>
  <Quote>当重复声明同名接口类型时, 会往该对象类型中填充新类型, 因此需要扩展的类型需要使用接口类型, 如`Window`类型是一个需要经常扩展的类型, 因此官方也是用接口声明</Quote>
  <Code>{{`
    ---ts(使用场景)
      // 类型运算
      type Record<K extends keyof any, T> = {
        [P in K]: T;
      }

      // 类型扩展
      interface Person {
        name: string,
        age: number
      }

      interface Person {
        sex: 'man' | 'woman'
      }
    ---
  `}}</Code>
  <Line></Line>

  <Title>##用法</Title>
  <Text>
    声明类型时, 常和以下用法配合
    <List>使用` : `表示变量类型</List>
    <List>使用`typeof`获取一个变量类型（typeof 在值与类型中使用具有不同效果）</List>
    <List>使用`keyof`获取数据的键集合 </List>
    <List>使用`[ ]`获取数据的某个属性类型 </List>
    <List>使用`as`进行类型断言（类型断言不能更改数据类型）</List>
    <List>使用`any`直接 anyscript 摆烂</List>
  </Text>
  <Code>{{`
    ---ts(示例)
      interface Person {
        language: string[],
        age: number,
        specialty: any
      }

      const marisue: Person = {
        language: ['Chinese, English'],
        age: 19,
        specialty: []
      }

      type Marisue = typeof marisue   // Person
      type Age = Marisue['age']       // number
      type Key = keyof Marisue        // 'language'| 'age' | 'specialty
      (marisue.specialty as string[]).push('sing', 'running') 
    ---  
  `}}</Code>
  <Line></Line>
  <Title>###任意类型</Title>
  <Text>在 ts 中，有两种类型可以表示任意类型，即`any`和`unkonw`，它们在类型检查和使用方面各不相同</Text>
  <List>赋值：`any`可以赋值给任意类型变量或被赋值，而`unkonw`可以被赋值给另一个`any/unkonw`类型，不能直接赋值给其他具体类型，除非经过类型检查或断言</List>
  <List>检查：`any`允许任何操作，例如调用一个不存在的方法，而对`unkonw`进行操作之前需要将其缩小到更具体的类型，可以通过类型保护（如`typeof`或`instanceof`）或类型断言`as`来实现</List>
  <Code>{{`
    ---ts(任意类型的区别)
      let anyValue: any
      let unknownValue: unknown 

      // 使用 any 类型  
      anyValue = 5
      anyValue.toUpperCase()            // 运行时可能出错，但编译时不报错  

      // 使用 unknown 类型  
      unknownValue = "Hello"  
      // unknownValue.toUpperCase()     // 编译时报错，需要类型检查  

      if (typeof unknownValue === "string") {  
          unknownValue.toUpperCase()    // 类型缩小后，编译通过  
      }
    ---
  `}}</Code>

  <Line></Line>

  <Title>##泛型</Title>
  <Text>泛型使用`{{'< >'}}`进行标记, 它类似于函数的形参, 只有在使用的时候才能确切知道具体的类型, 使用泛型的好处是可以灵活设置类型, 避免写一堆重复类型</Text>
  <Text>
    常使用以下几个字母表示特定意思：
    <List>`T`: 表示第一个任意类型</List>
    <List>`U`: 表示第二个任意类型</List>
    <List>`S`: 表示第三个任意类型</List>
    <List>`K`: 表示对象键类型</List>
    <List>`V`: 表示对象值类型</List>
    <List>`E`: 表示元素类型, 如数组元素</List>
  </Text>
  <Code>{{`
    ---ts(减少重复代码)
      // 不使用泛型
      type Demo = {
        fn_1: (arg: number) => number,
        fn_2: (arg: string) => string,
        fn_3: (arg: boolean) => boolean
      }

      // 使用泛型
      type Fn<T> = (arg: T) => T
      type Demo = {
        fn_1: Fn<number>,
        fn_2: Fn<string>,
        fn_3: Fn<boolean>
      }
    ---
    ---ts(泛型默认值)
      type Arr<T = string> = T[]

      const arr_2: Arr = ['1']
      const arr_1: Arr = [1]    // error: number 不能分配给 string
    ---
  `}}</Code>
  <Text>泛型不仅可以用在类型中, 也可直接用于类与函数, 直接使用时可以不显示传入泛型, 编译器会根据第一次传入的数据决定类型</Text>
  <Quote>但是起名太模糊反而会有误导性, 如果不是为了偷懒感觉还是直接起个有语义的变量名比较舒服</Quote>
  <Code>{{`
    ---ts(类)
      class Queue<T> {
        arr: Array<T>
        constructor(arr: Array<T>) {
          this.arr = arr
        }

        push(item: T) {
          return this.arr.push(item)
        }
      }

      const queue = new Queue([1,2,3])
      queue.push('4')   // error: string 不能分配给 number
    ---
    ---ts(函数)
      function normalFn<T>(arg: T): T {
        return arg
      }

      const arrowFn = <T>(arg: T): T => {
        return arg
      }

      let result_1 = normalFn<string>('1')
      let result_2 = normalFn('1')

      // error: number 无法分配给 string
      result_1 = 1
      result_2 = 1
    ---
  
  `}}</Code>
  <Line></Line>

  <Title>##集合</Title>
  <Text>每个类型就相当于一个集合, 拥有及自己的父集和子集(如`any`是任何类型的父集), 类型之间可以互相产生新的集合</Text>
  <Text>
    对于使用`type`声明的类型：
    <List>使用` | `取多个类型的并集, 即联合类型</List>
    <List>使用`&`取多个类型的交集, 即交叉类型</List>
  </Text>
  <Text>
    对于使用`interface`声明的类型：
    <List>使用`extends`继承多个对象类型从而实现最终联合</List>
    <List>无法形成交叉类型</List>
  </Text>
  <Quote>当类型为对象类型时, 联合表示当对象中属性满足任意单元类型即可, 交叉表示对象属性需要满足所有单元类型</Quote>
  <Code>{{`
    ---ts(基本类型)
      type T = number | string             // number | string
      type U = number & string             // nerver
      type S = (number | string) & string  // string
    ---
    ---ts(对象类型-type)
      type T = { x: number }
      type U = { y: string }

      type S = T | U 
      type K = T & U

      const obj_1: S = {
        x: 1
      }

      const obj_2: K = {
        x: 1
        // error: need y
      }
    ---
    ---ts(对象类型-interface)
      type T = { x: number }
      type U = { y: string }

      interface S extends T, U {
        z: boolean
      }

      const obj: S = {
        x: 1,
        y: '1',
        // error: need z
      }
    ---
  `}}</Code>
  <Line></Line>

  <Title>###集合操作</Title>
  <Text>
    类型集合的操作往往与两个关键字联系在一起：
    <List>`extends`: 用于约束类型</List>
    <List>`in`: 用于遍历类型</List>
  </Text>
  <Quote>由于`extends`具有约束性，因此往往也使用它配合条件判断使用</Quote>
  <Code>{{`
    ---ts(约束泛型类型)
      type Id<T extends (string | number)> = T

      const id_1: Demo<string> = '1'
      const id_2: Demo<boolean> = true      // error: boolean 不在 string|number 范围中
    ---
    ---ts(遍历类型并生成新类型)
      type FriendName = 'jack' | 'marry' | 'lucy'
      type Friend = {
        [Key in FriendName]: {
            age: number,
            sex: string,
        }
      }

      // error: 缺少lucy属性
      const friend: Friend = {
        jack: { age: 18, sex: 'man' },
        marry: { age: 21, sex: 'woman' }
      }
    ---
    ---ts(类型的条件判断)
      type T = (...rest: Array<number>) => any 

      type U = ((x: number, y: number) => void) extends T ? true : false    // true
      type S = ((x: boolean, y: number) => void) extends T ? true : false   // false
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>###协变和逆变</Title>
  <Text>简单来说，协变与逆变都是一种`子集类型 → 父集类型`的变化规则</Text>
  <Text>协变往往出现在联合类型或对象类型中, 它表示子类数据可以赋值给父类型数据, 代表了类型集合中的并集</Text>
  <Code>{{`
    ---ts(联合类型)
      type Faher = string | number | boolean
      type Child = string | number 

      type Result = Child extends Faher ? true : false    // true

      let father: Faher
      const child: Child = 1

      father = child                                      // 不会类型报错
    ---
    ---ts(对象类型)
      type Father = {
        x: string,
        y: number
      }

      type Child = {
        x: string,
        y: number,
        z: boolean
      }

      type Result = Child extends Father ? true : false   // true

      let father: Father
      const child: Child = {
        x: '1',
        y: 1,
        z: true
      }

      father = child
    ---
  `}}</Code>
  <Text>逆变往往出现在函数参数类型中, 它表示子类型数据不可以赋值给父类型数据, 代表了类型集合中的交集, 即函数参数需要同时满足任一类型才可被安全传入</Text>
  <Code>{{`
    ---ts(函数类型)
      type Faher = (arg: { x: string, y: number }) => void
      type Child = (arg: { x: string, y: number, z: boolean }) => void

      let father: Faher
      const child: Child = (arg) => {
        console.log(arg)
      }

      father = child  // error: arg不能包含z
    ---
  `}}</Code>
  <Line></Line>

  <Title>##断言</Title>
  <Text>
    类型断言主要运用内置关键字`infer`来进行运算，使用规则：
    <List>只能用于`extends`语句之中</List>
    <List>声明的存储变量只能用于`true`语句内</List>
  </Text>
  <Code>{{`
    ---ts(使用infer)
      type ArrElement<T> = T extends Array<infer R> ?  R : never

      type TypeA = ArrElement<['1', 2 , true]>    // "1" | 2 | true 
      type TypeB = ArrElement<true>               // never true不满足数组条件
    ---
  `}}</Code>
  <Text>可以看出，infer 声明变量相当于一个占位标志，它会匹配中满足条件的任意类型，如上面的例子匹配到的是数组元素的类型</Text>
  <Text>变量可以声明多个，每一个都会自动匹配到合适的内容填充</Text>
  <Code>{{`
    ---ts(使用infer)
      type Side<Content, MiddleStr extends string> = Content extends \`\${infer Left}\${MiddleStr}\${infer Right}\`? Left | Right : never
      type TypeA = Side<'无敌夜夜笳', '夜'>       // "无敌" | "夜笳"
      type TypeB = Side<'无敌夜夜笳', '无敌'>     // "" | "夜夜笳"
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