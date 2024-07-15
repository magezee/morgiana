<template>
  <Tip>最后更新 - 2024.07.07</Tip>
  <Title>#Number</Title>
  <Refer :source="[
    { desc: '数字丢失原因', url: 'https://segmentfault.com/a/1190000018981068'}
  ]"></Refer>
  <Text>在 js 中，数值类型是双精度（不区分浮点型和整型） 64 位二进制格式的值，虽然可以覆盖很大的数字范围，但是会在处理时遇到精度丢失问题：</Text>
  <List>精度范围：安全整数范围为`-(2^53 -1)`至`2^53 - 1`，即`±9007199254740991`，超过该数值会丢失精度，一般需要注意整数不能超过15位</List>
  <List>小数精度：浮点数无法完全精确表示，在浮点数之间运算时，会出现精度问题</List>
  <Code>{{`
    ---ts(整数范围)
      console.log(Number.MIN_SAFE_INTEGER)      // -9007199254740991
      console.log(Number.MAX_SAFE_INTEGER)      //  9007199254740991
              
      console.log(9007199254740991 * 11)        //  99079191802150900 丢失精度，个位数不可能为0
    ---
    ---ts(小数计算)
      console.log(0.1 + 0.2)      // 0.30000000000000004
      console.log(1.0 - 0.9)      // 0.09999999999999998
      console.log(3 * 0.3)        // 0.8999999999999999
      console.log(1.21 / 1.1)     // 1.0999999999999999
    ---
  `}}</Code>
  <Line></Line>

  <Title>##处理风险</Title>
  <Text>以下是常见的几种处理精度的方式：</Text>
  <List>转为字符串运算后再转为数值</List>
  <List>转为整数运算后再处理为浮点数</List>
  <List>引入新的类型`BigInt`进行运算（不能处理浮点数），该类型的特点是数值后面会带个`n`符号</List>
  <Code>{{`
    ---ts(转字符串)
      const num = 0.1 + 0.2
      const fixedNum = num.toFixed(2)       // '0.30'

      console.log(parseFloat(fixedNum))     // 0.3
    ---
    ---ts(转整数)
      const num1 = 0.1 * 100
      const num2 = 0.2 * 100
      const sum = (num1 + num2) / 100    // 30 / 100 = 0.3
    ---
    ---ts(使用 bigint 类型)
      const num1 = BigInt(9007199254740991)
      const num2 = BigInt(11)
      const result = num1 * num2

      console.log(result)           // 99079191802150901n
      console.log(typeof result)    // bigint
    ---
  
  `}}</Code>
  <Line></Line>

  <Title>##API</Title>
  <Title>###判断</Title>
  <Api>
    @api - Number.isNaN(value)
    @desc - 判断一个目标是否为`NaN`
    @params - [value : any] 指定目标
    @return - [boolean] 判断结果
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log(Number.isNaN(NaN))    // true
      console.log(Number.isNaN(15))     // false
      console.log(Number.isNaN('NaN')   // false
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Number.isSafeInteger(value)
    @desc - 判断一个目标是否为安全整数范围内的数值
    @params - [value : any] 指定目标
    @return - [boolean] 判断结果
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log(Number.isSafeInteger(9007199254740991))       // true
      console.log(Number.isSafeInteger(9007199254740992))       // false

      console.log(Number.isSafeInteger(9007199254740991.4))     // true
      console.log(Number.isSafeInteger(9007199254740991.9))     // false
      
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Number.isIntege(value)
    @desc - 判断一个目标是否为整数
    @params - [value : any] 指定目标
    @return - [boolean] 判断结果
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log(Number.isInteger(15))     // true
      console.log(Number.isInteger(15.5))   // false
      console.log(Number.isInteger('15'))   // false
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Number.isFinite(value)
    @desc - 判断一个目标是否为有限数
    @params - [value : any] 指定目标
    @return - [boolean] 判断结果
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log(Number.isFinite(15))          // true
      console.log(Number.isFinite(Infinity))    // false
      console.log(Number.isFinite('15'))        // false
    ---
  `}}</Code>
  <Line></Line>

  <Title>###转换</Title>
  <Api>
    @api - number.toString(radix?)
    @desc - 将数字格式化为指定进制的字符串
    @params - [radix? : number] 指定进制`2~36`
    @return - [string] 转换后字符串
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log((36).toString(2))   // '100100'
      console.log((36).toString(8))   // '44'
      console.log((36).toString())    // '36'
      console.log((36).toString(16))  // '24'
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Number.parseFloat(str)
    @desc - 将字符串转换为浮点数，如果存在非数值字符，则忽略非数值字符之后的内容
    @params - [str : string] 指定目标
    @return - [number] 转换后数值
  </Api>
  <Code>{{`
    ---ts(演示)
      // 该方法可以全局调用
      console.log(Number.parseFloat('123.456'))   // 123.456
      console.log(parseFloat('123.456abc789'))    // 123.456
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Number.parseInt(str)
    @desc - 将字符串转换为整数，如果存在非数值字符，则忽略非数值字符之后的内容
    @params - [str : string] 指定目标
    @return - [number] 转换后数值
  </Api>
  <Code>{{`
    ---ts(演示)
      // 该方法可以全局调用
      console.log(Number.parseInt('123.456'))   // 123
      console.log(parseInt('123.456abc789'))    // 123
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - number.toFixed(digits)
    @desc - 将数字格式化为指定小数位数的字符串
    @params - [digits : number] 保留小数位数
    @return - [string] 转换后字符串
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log((123.456).toFixed(2))   // '123.46'
      console.log((123).toFixed(2))       // '123.00'
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - number.toPrecision(precision)
    @desc - 将数字格式化为指定精度的字符串
    @params - [precision : number] 指定精度
    @return - [string] 转换后字符串
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log((123.456).toPrecision(1))   // '1e+2'
      console.log((123.456).toPrecision(2))   // '1.2e+2'
      console.log((123.456).toPrecision(3))   // '123'
      console.log((123.456).toPrecision(4))   // '123.5'
      console.log((123).toPrecision(2))       // '123.00'
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