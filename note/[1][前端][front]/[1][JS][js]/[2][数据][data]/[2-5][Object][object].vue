<template>
  <Tip>最后更新 - 2024.07.01</Tip>
  <Title>#Object</Title>
  <Text>使用`{ }`来直接创建一个对象，相当于`Object.create()`的语法糖，创建出的对象自带原型链绑定，如果只想创建一个`纯对象`，使用`Object.create(null)`</Text>
  <Code>{{`
    ---ts(创建对象)
      const obj = {}
      const pureObj = Object.create(null)

      console.log(obj == '[object Object]')       // ture 借助于原型链上的valueOf和toString方法隐式转换
      console.log(pureObj == '[object Object]')   // 报错 无法将对象转换为值类型
    ---
  `}}</Code>
  <Line></Line>
  <Title>##使用</Title>
  <Title>###数据描述符</Title>
  <Text>使用`Object.defineProperty`可以设置对象属性的数据描述符，其属性受到约束，有以下几种描述符：</Text>
  <List>`value`：该属性对应的值，默认`undefined`</List>
  <List>`configurable`：条件成立时，该属性允许重新修改修饰符和被删除，意味着一旦置否则无法再改动，默认`false`</List>
  <List>`writable`：条件成立时，该属性可以被重新赋值修改，默认`false`</List>
  <List>`enumerable`：条件成立时，该属性可被枚举，默认`flase`</List>
  <List>`get`：当读取该属性时，触发该监听函数，默认`undefined`</List>
  <List>`set`：当修改该属性时，触发该监听函数，默认`undefined`</List>
  <Quote>需要注意的是，上面所示的默认值，是指手动通过`Object.defineProperty`创建属性同时设置描述符时的默认值，字面量创建属性时会有所不同</Quote>
  <Code>{{`
    ---ts(默认值)
      const obj = { x: undefined }

      Object.defineProperty(obj, 'y', {})

      console.log(Object.getOwnPropertyDescriptor(obj, 'x'))
      // { value: undefined, writable: true,  enumerable: true,  configurable: true }

      console.log(Object.getOwnPropertyDescriptor(obj, 'y'))
      // { value: undefined, writable: false, enumerable: false, configurable: false }   
    ---
    ---ts(重新设置描述符)
      const obj = {}

      Object.defineProperty(obj, 'x', {
        configurable: true
      })

      // 可重新设置
      Object.defineProperty(obj, 'x', {
        value: 1
      })


      Object.defineProperty(obj, 'y', {
        configurable: false
      })

      // 报错：Cannot redefine property: y
      Object.defineProperty(obj, 'y', {
        value: 1
      })
    ---
    ---ts(重新赋值)
      const obj = {}

      Object.defineProperty(obj, 'x', {
        writable: true
      })

      Object.defineProperty(obj, 'y', {
        writable: false
      })

      obj.x = 1
      obj.y = 1

      console.log(obj.x)    // 1
      console.log(obj.y)    // undefined
    ---
    ---ts(枚举)
      const obj = {}

      Object.defineProperty(obj, 'x', {
        enumerable: true
      })

      Object.defineProperty(obj, 'y', {
        enumerable: false
      })

      console.log(obj)      // { x: undefined } 无法直接被打印

      for(let key in obj) {
        console.log(key)    // x 无法遍历出y
      }
    ---
    ---ts(监听函数)
      const obj = {}

      Object.defineProperty(obj, 'x', {
        get() {
          console.log('读取值')
        },
        set(value) {
          console.log('设置为值:' + value)
        }
      })

      const y = obj.x   // 读取值
      obj.x = 2         // 设置为值:2
    ---
  `}}</Code>
  <Line></Line>

  <Title>###遍历</Title>
  <Text>由上面内容可知，对象上的属性可以分为可枚举和不可枚举属性，由`enumerable`属性决定</Text>
  <Text>一般使用`for...in`来遍历所有可枚举属性，使用`Object.getOwnPropertyNames`遍历所有属性</Text>
  <Code>{{`
    ---ts(遍历属性)
      const obj = {}

      Object.defineProperty(obj, 'x', {
        enumerable: true
      })

      Object.defineProperty(obj, 'y', {
        enumerable: false
      })    

      for(let key in obj) {
        console.log(key)    // x 
      }

      console.log(Object.getOwnPropertyNames(obj))  // [ 'x', 'y' ]

    ---
  `}}</Code>
  <Line></Line>

  <Title>###技巧</Title>
  <Text>在这里顺便补充下对象使用中的一些小技巧：</Text>
  <List>与变量同名属性可以省略属性值</List>
  <List>如果一个对象属性为变量，需要使用`[paramsName]`去设置和调用</List>
  <Code>{{`
    ---ts(技巧~)
      const key = 'key'
      const paramsKey = 'paramsKey'

      const obj = {
        key
      }

      obj[paramsKey] = 1

      console.log(obj)    // { key: 'key', paramsKey: 1 }
    ----
  `}}</Code>
  <Line></Line>

  <Title>##API</Title>
  <Title>###定义</Title>
  <Api>
    @api - Object.create(obj)
    @desc - 创建一个空对象，同时将该对象的原型对象指定为 obj
    @params - [obj : object] 作为原型的对象
    @return - [object] 创建的对象
  </Api>
  <Code>{{`
    ---ts(演示~)
      const obj = {}
      const newObj = Object.create(obj)

      console.log(newObj.__proto__ === obj)   // true
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Object.defineProperty(obj, key, config)
    @desc - 新增或修改目标对象属性
    @params - [obj : object] 目标对象
    @params - [key : string] 新增或修改的属性
    @params - [config : object] 数据描述符对象
    @return - [object] 修改后的目标对象
  </Api>
  <Code>{{`
    ---ts(演示~)
      const obj = {}
      Object.defineProperty(obj, 'x', {
        writable: true
      })
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Object.getOwnPropertyDescriptors(obj)
    @desc - 获取目标对象上所有自身属性的描述符配置
    @params - [obj : object] 目标对象
    @return - [object] 描述符配置
  </Api>
  <Code>{{`
    ---ts(演示~)
      const obj = { x: 1 }
      Object.defineProperty(obj, 'y', {
        value: 2,
        enumerable: true
      })
      console.log(Object.getOwnPropertyDescriptors(obj))
      /*
        {
          x: { value: 1, writable: true, enumerable: true, configurable: true },
          y: { value: 2, writable: false, enumerable: true, configurable: false }
        }
      */
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Object.getOwnPropertyDescriptor(obj, key)
    @desc - 获取目标对象上自身单个属性的描述符配置
    @params - [obj : object] 目标对象
    @params - [key : string] 目标属性
    @return - [object] 描述符配置
  </Api>
  <Code>{{`
    ---ts(演示~)
      const obj = { x: 1 }

      // { value: 1, writable: true, enumerable: true, configurable: true }
      console.log(Object.getOwnPropertyDescriptors(obj, 'x'))
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Object.preventExtensions(obj)
    @desc - 将目标对象设置为不可扩展的，即无法为其添加属性
    @params - [obj : object] 目标对象
    @return - [object] 修改后的目标对象
  </Api>
  <Code>{{`
    ---ts(演示~)
      const obj = { x: 1 }
      const result = Object.preventExtensions(obj)
      obj.x = 3
      obj.y = 2

      console.log(result)   // { x: 3 }
      console.log(obj)      // { x: 3 } 可以修改属性值
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>###判断</Title>
  <Api>
    @api - Oject.is(value1, value2)
    @desc - 与 === 功能一致，不过修复了一些缺陷
    @params - [value1、value2 : any] 要比较的值
    @return - [boolean] 判断结果
  </Api>
  <Code>{{`
    ---ts(演示~)
      console.log(NaN === NaN)            // false
      console.log(Object.is(NaN, NaN))    // true

      console.log(-0 === +0)              // true
      console.log(Object.is(-0, +0))      // false
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Object.isExtensible(obj)
    @desc - 判断目标对象是否可扩展
    @params - [obj : object] 目标对象
    @return - [boolean] 判断结果
  </Api>
  <Code>{{`
    ---ts(演示~)
      const obj = {}
      const constrastObj = {}
      Object.preventExtensions(obj)

      console.log(Object.isExtensible(obj))             // false
      console.log(Object.isExtensible(constrastObj))    // true
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - object.propertyIsEnumerable(key)
    @desc - 判断一个对象实例的某个属性是否可枚举
    @params - [key : string] 目标属性名
    @return - [boolean] 判断结果
  </Api>
  <Code>{{`
    ---ts(演示~)
      const obj = { x: 1 }
      Object.defineProperty(obj, 'y', {
        value: 2,
        enumerable: false     
      })

      console.log(obj.propertyIsEnumerable('x'))    // true
      console.log(obj.propertyIsEnumerable('y'))    // false
    ---
  `}}</Code>
  <Line></Line>

  <Title>###遍历</Title>
  <Api>
    @api - Object.keys(obj)
    @desc - 遍历对象自身可枚举属性并返回
    @params - [obj : object] 目标对象
    @return - [Arrary&lt;string&gt;] 存储 keys 的数组
  </Api>
  <Code>{{`
    ---ts(演示~)
      const obj = { x: 1 }
      Object.defineProperty(obj, 'y', {
        value: 2,
        enumerable: false 
      })
      Object.prototype.prop = 'prop'

      console.log(Object.keys(obj))    // [ 'x' ]
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Object.getOwnPropertyNames(obj)
    @desc - 遍历对象自身属性并返回
    @params - [obj : object] 目标对象
    @return - [Arrary&lt;string&gt;] 存储 keys 的数组
  </Api>
  <Code>{{`
    ---ts(演示~)
      const obj = { x: 1 }

      Object.defineProperty(obj, 'y', {
        value: 2,
        enumerable: false 
      })
      Object.prototype.prop = 'prop'

      console.log(Object.getOwnPropertyNames(obj))    // [ 'x', 'y' ]
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Object.vaules(obj)
    @desc - 遍历对象自身可枚举属性的值并返回
    @params - [obj : object] 目标对象
    @return - [Arrary&lt;any&gt;] 存储 values 的数组
  </Api>
  <Code>{{`
    ---ts(演示~)
      const obj = { x: 1 }

      Object.defineProperty(obj, 'y', {
        value: 2,
        enumerable: false 
      })
      Object.prototype.prop = 'prop'

      console.log(Object.values(obj))    // [ 1 ]
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>###拷贝</Title>
  <Api>
    @api - Object.assign(obj, ...source)
    @desc - 用于对象合并，将源对象的所有可枚举属性浅拷贝到目标对象，如果源对象有目标对象同名属性，则进行覆盖
    @params - [obj : object] 目标对象
    @params - [source : object] 源对象
    @return - [object] 合并后的目标对象
  </Api>
  <Code>{{`
    ---ts(演示~)
      const obj = {x: 1}
      const sourceObj1 = { y: 2 }
      const sourceObj2 = { z: { data: 3 } }

      const result = Object.assign(obj, sourceObj1, sourceObj2)

      // 和...功能相似，但是...会生成新的对象而不会影响到目标对象
      console.log(result)   // { x: 1, y: 2, z: { data: 3 } }
      console.log(obj)      // { x: 1, y: 2, z: { data: 3 } }
    ---
  `}}</Code>
  <Line></Line>

  <Title>###转换</Title>
  <Api>
    @api - Object.entries(obj)
    @desc - 遍历对象自身可枚举属性的 key-value 数组并返回
    @params - [obj : object] 目标对象
    @return - [Arrary&lt;[string, any]&gt;] 存储 key-value 的数组
  </Api>
  <Code>{{`
    ---ts(演示~)
      const obj = {
        x: 1,
        y: [],
        z: function() {}
      }
      Object.prototype.prop = 'prop'

      console.log(Object.entries(obj))    // [ [ 'x', 1 ], [ 'y', [] ], [ 'z', [Function: z] ] ]
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Object.fromEntries(array)
    @desc - 上面方法的逆向，将一个 key-value 数组转换为对象
    @params - [array : Arrary&lt;[string, any]&gt;] 目标数组
    @return - [object] 转换后的对象
  </Api>
  <Code>{{`
    ---ts(演示~)
      const array =  [
        ['x'],                                  // 少传value则认为undefined
        ['y', 2],
        ['z', 3, 4],                            // 多传value则被忽略
      ]

      console.log(Object.fromEntries(array))    // { x: undefined, y: 2, z: 3 }
    ---
  `}}</Code>
  <Line></Line>

  <Title>###原型链</Title>
  <Api>
    @api - Object.setPrototypeOf(obj, prototype)
    @desc - 将 obj 的原型对象设置为 prototype ，此方法用于替代传统建立原型链的方式
    @params - [obj : object] 目标对象
    @params - [prototype : object] 要设置为原型的对象
    @return - [object] 设置后的目标对象
  </Api>
  <Code>{{`
    ---ts(演示~)
      const obj = {x: 1}
      const prototype = {y: 2}
      
      // 用于规范obj.__proto__ = prototype
      const result = Object.setPrototypeOf(obj, prototype)
      console.log(obj.__proto__ === prototype)      // true
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Object.getPrototypeOf(obj)
    @desc - 获取目标对象的原型
    @params - [obj : object] 目标对象
    @return - [object] 原型
  </Api>
  <Code>{{`
    ---ts(演示~)
      const obj = {x: 1}
      const prototype = {y: 2}
      Object.setPrototypeOf(obj, prototype)

      // 用于规范obj.__proto__
      console.log(Object.getPrototypeOf(obj))    // { y: 2 }
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - object.hasOwnProperty(key)
    @desc - 判断实例对象的指定属性是否为自身存在而非原型链上继承
    @params - [key : string] 目标属性名
    @return - [boolean] 判断结果
  </Api>
  <Code>{{`
    ---ts(演示~)
      const obj = { x: 1 }
      Object.prototype.y = 2

      console.log(obj.hasOwnProperty('x'))    // true
      console.log(obj.hasOwnProperty('y'))    // false
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