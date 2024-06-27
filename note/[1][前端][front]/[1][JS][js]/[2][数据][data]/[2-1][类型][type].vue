<template>
  <Title>类型</Title>
  <Text>
    JS 的数据类型分为两大类:
    <List>原始类型(值类型)：`Number` `String` `Boolean` `Symbol` `null` `undefined`</List>
    <List>引用类型：`Object`以及任意由其衍生的类型如`Array/Function/Map...`</List>
  </Text>
  <Text>值类型的变量直接指向`栈`, 而引用类型类型指向的是`堆`</Text>
  <Code>{{`
    ---ts(修改数据区别)
      // 值类型修改的是栈中的值,引用类型则是堆中数据指向的栈的值
      let str = 'abc'
      str[1] = 'A'   
      console.log(str)   // abc,值类型的值不可以被直接更改

      let obj = {
        str: 'abc'
      }
      obj.str = 'Abc'
      console.log(obj)  // { str: Abc }
    ---
    ---ts(赋值区别)
      // 值类型的赋值给的是栈中的值,引用类型则是堆的引用地址
      let str_1 = 'abc'
      let str_2 = str_1
      str_1 = 'Abc'
      console.log(str_2)          // abc

      let obj_1 = { str: 'abc' }
      let obj_2 = obj_1
      obj_1.str = 'Abc'
      console.log(obj_2)          // { str: 'Abc' }
    ---
    ---ts(比较区别)
      // 值类型比较的是栈中的值,引用类型比较的是堆的引用地址
      let str_1 = 'abc'
      let str_2 = 'abc'
      console.log(str_1 == str_2)     // true
      console.log(str_1 === str_2)    // true  

      let obj_1 = { str: 'abc' }      
      let obj_2 = { str: 'abc' }
      console.log(obj_1 == obj_2)     // false
      console.log(obj_1 === obj_2)    // false
    ---
  `}}</Code>
  <Line></Line>

  <Title>##包装类</Title>
  <Text>
    值类型没有自己的属性, 那么是怎么使用特定的方法的呢？ js 为了解决这个问题提供了`包装类`的功能：当读写值类型的属性时, 首先将值类型隐式转换为对应的对象, 然后再读写其对象属性
  </Text>
  <Code>{{`
    ---ts(包装类场景)
      let str = 'abc'
      str.replace('a', 'A')
      
      // 等同于:
      let str = 'abc'
      let strObj = new String('abc')
      str = strObj.replace('a', 'A')    // String 构造函数上拥有 replace 方法
      strObj = null                     // 消除占用内存
    ---
    ---ts(显示转换与包装类区别)
      const num = 123

      console.log(typeof String(num))       // string
      console.log(typeof new String(num))   // object

      // 由此可知, 实际开发中并不会使用包装类功能,因为会出现 bug
      if (new Boolean(false)) {   
        console.log('run')                  // object 会通过条件判断
      }
    ---
  `}}</Code>

  <Title>##数据转换</Title>
  <Text>
    在不同的类型的数据之间操作时, 往往需要转换成相关的类型再进行操作, 转换方式有两种：
    <List>`显式转换`：手动使用相关方法进行转换</List>
    <List>`隐式转换`：js 内部自动进行</List>
  </Text>
  <Code>{{`
    ---ts(转换)
      const str = '1'
      const num = 1
     
      console.log(Number('1') + num)    // 2, 显式转换
      console.log(str + num)            // 2, 隐式转换
    ---
    ---ts(隐式转换规则)
      // object与string
      const obj = {}
      const str = '[object Object]'
      console.log(obj == str)       // true

      // string与boolean
      console.log(!!'abc')          // true
      console.log(!!'')             // false

      // string与number
      console.log(4 + 'px')        // 4px
      console.log(4 - 'px')        // NaN(运算符号中只有'+'发生字符串拼接)

      // boolean与number
      console.log(0 == false)       // true
      console.log(1 == true)        // true
      console.log(2 == true)        // false
      console.log(2 == false)       // false(比较时隐式转换booelan转number时只会转为0或1)
    ---
    ---ts(显示转换方法)
      // 基本转换
      Number()
      Boolean() 
      String()
      Object()

      // 特殊转换
      const obj = { data: 'abc' }
      const str = "{"data":"abc"}"

      JSON.parse(str)       // { data: 'abc' }
      JSON.stringify(obj)   // "{"data":"abc"}"
    ---
  `}}</Code>
  <Table>
    #值类型的隐式转换规则
    |值|转字符|转数值|转布尔|转对象|
    ----------------------------
    |`undefined`|`"undefined"`|`NaN`|`false`|`TypeError`|
    |`null`|`"null"`|`0`|`false`|`TypeError`|
    |`(空字符)`|`/`|`0`|`false`|`new String("")`|
    |`1.2(数值字符)`|`/`|`1.2`|`true`|`new String("1.2")`|
    |`ab(非数值字符)`|`/`|`NaN`|`true`|`new String("ab")`|
    |`0`|`"0"`|`/`|`false`|`new Number("0")`|
    |`-0`|`"0"`|`/`|`false`|`new Number("NaN")`|
    |`Infinity`|`"Infinity"`|`/`|`true`|`new Number("Infinity")`|
    |`-Infinity`|`"-Infinity"`|`/`|`true`|`new Number("-Infinity")`|
    |`true`|`"true"`|`1`|`/`|`new Boolean("true")`|
    |`false`|`"false"`|`0`|`/`|`new Boolean("false")`|
    |`false`|`"false"`|`0`|`/`|`new Boolean("false")`|
  </Table>
  <Text>
    当引用类型需要和值类型操作时, 引用类型会尝试将自己转换为值类型, 后续再沿用值类型的隐式转换规则, 转换方法有两种：`Object.valueOf`和`Object.toString`
  </Text>
   <Text>首先会尝试调用`valueOf`, 如果返回值仍不为值类型, 则会继续调用`toString`</Text>
  <Code>{{`
    ---ts(转换)
      const arr = [1,2,3]
      const fun = function() { console.log('this is a function') }
      const obj = { value: 1 }

      // 引用类型使用valueOf()返回的是本身
      arr.valueOf()                                                             // [1,2,3]
      fun.valueOf()                                                             // ƒ () { console.log('this is a function') }
      obj.valueOf()                                                             // { value: 1 }

      // 引用类型执行toString()后结果
      arr.toString()                                                            // '1,2,3'
      fun.toString()                                                            // 'function() { console.log('this is a function') }'
      obj.toString()                                                            // '[object Object]'

      // 验证为string类型
      arr.toString() === '1,2,3'                                                // true
      fun.toString() === 'function() { console.log('this is a function') }'     // true
      obj.toString() === '[object Object]'                                      // true		
    ---
  `}}</Code>
  <Line></Line>

  <Title>##类型检测</Title>
  <Text>
    常用的类型检测有以下几种方式, 可根据具体场合使用：
    <List>关键字`typeof`：适用于简单的类型, 但无法精确检测出引用类型和`null`</List>
    <List>对象方法`Object.prototype.toString.call()`：适用于检测出具体的引用类型, 但无法识别自定义构造函数的实例类型</List>
    <List>关键字`instanceof`：适用于判断一个数据是否属于指定构造函数, 但无法获取到具体类型</List>
  </Text>
  <Code>{{`
    ---ts(typeof)
      typeof 123                    // number
      typeof '123'                  // string
      typeof true                   // boolean
      typeof undefined              // undefined
      typeof null                   // object
      typeof Symbol('123')          // symbol

      typeof {}                     // object
      typeof []                     // object
      typeof function(){}           // function
      typeof new Date()             // object
      typeof new RegExp()           // object
      typeof new Error()            // object
      typeof new Map()              // object
      typeof new Set()              // object
    ---
    ---ts(toString)
      Object.prototype.toString.call(123)              // '[object Number]'
      Object.prototype.toString.call('123')            // '[object String]'
      Object.prototype.toString.call(true)             // '[object Boolean]'
      Object.prototype.toString.call(undefined)        // '[object Undefined]'
      Object.prototype.toString.call(null)             // '[object Null]'
      Object.prototype.toString.call(Symbol('123'))    // '[object Symbol]'

      Object.prototype.toString.call({})               // '[object Object]'
      Object.prototype.toString.call([])               // '[object Array]'
      Object.prototype.toString.call(function(){})     // '[object Function]'
      Object.prototype.toString.call(new Date())       // '[object Date]'
      Object.prototype.toString.call(new RegExp())     // '[object RegExp]'
      Object.prototype.toString.call(new Error())      // '[object Error]'
      Object.prototype.toString.call(new Map())        // '[object Map]'
      Object.prototype.toString.call(new Set())        // '[object Set]'
    ---
    ---ts(instanceof)
      function Person(name) {
        this.name = name
      }
      const jack = new Person('jack')

      typeof jack                              // object
      Object.prototype.toString.call(jack)     // '[object Object]' 
      jack instanceof Person                   // true
      jack.constructor === Person              // true

      // 由于引用类型都是源于 Object 构造函数，因此可以使用此方法判断一个数据是值类型还是引用类型
      123 instanceof Object                    // false
      '123' instanceof Object                  // false
      true instanceof Object                   // false
      undefined instanceof Object              // false
      null instanceof Object                   // false
      Symbol('123') instanceof Object          // false

      {} instanceof Object                     // true
      [] instanceof Object                     // true
      function(){} instanceof Object           // true
      new Date() instanceof Object             // true
      new RegExp() instanceof Object           // true
      new Error() instanceof Object            // true
      new Map() instanceof Object              // true
      new Set() instanceof Object              // true
    ---
  `}}</Code>
  <Line></Line>

  <Title>##数据比较</Title>
  <Text>
    数据比较有两种方式：
    <List>`==`：如果数据类型不相同, 会进行隐式转换再比较</List>
    <List>`===`：不会进行隐式转换</List>
  </Text>
  <Text>
    比较的隐式转换规则：只能向下级进行转换 
  </Text>
  <Image src="https://morgiana.oss-cn-beijing.aliyuncs.com/note/js-type-01.png" :width="300"></Image>
  <Code>{{`
    ---ts(比较规则)
      // 如 object 需要和 boolean 进行比较时:
      // object → string → number
      // boolean → number
      // number == number
      const obj = {}
      const arr = []

      Number(obj)    // NaN
      Number(arr)    // 0(这里是因为数组转字符串的结果为数组内的元素，当空数组时则等于空字符，空字符转boolean为0)

      obj == true    // false
      obj == false   // false(obj转换number为NaN,boolean转number为0或1，所以都不相等)
      arr == true    // false
      arr == false   // true
    ---
    ---ts(特殊值的比较)
      NaN == NaN           // false
      null == undefined    // true
      [] == false          // true
      {} == true           // false
      {} == false          // false
      null == true         // false
      null == false        // false
    ---
    ---ts(转换和比较的区别)
      // 比较的隐式转换规则仅出现在 == 运算符中, 其他的隐式转换皆是普通的隐式转换规则, 没有上下级关系
      const num = 2
      Boolean(num)     // true(类型转换，非0数字转boolean为true)
      str == true      // false(类型比较，boolean只能向下转换为0或1，永远不可能为2) 

    
      [] == false      // true
      ![] == false     // true, ![]是类型转换，[]转boolean为true，取反为false，然后boolean与boolean直接比较

      
      const obj = {}
      if(obj) {
        console.log('程序运行')     // 这里用的是普通规则, 即 {} 相当于 true, 而非 false
      }
    ---
  `}}</Code>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const emits = defineEmits([ 'noteContentMounted' ])

onMounted(() => {
  emits('noteContentMounted')
})

// 动态加载组件


</script>



<style lang="less">

</style>