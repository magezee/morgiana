<template>
  <Tip>最后更新 - 2024.07.07</Tip>
  <Title>#Math</Title>
  <Text>可以用 Math 类型来引用多种数学常数和函数，执行数学运算</Text>
  <Line></Line>

  <Title>##场景</Title>
  <Title>###随机数</Title>
  <Text>可利用`Math.random( )`的特性生成指定随机数</Text>
  <Code>{{`
    ---ts(生成随机数)
      const random = Math.random()

      // 生成0或1
      Math.floor(random * (1 + 1))                    // 这里加1是为了配合floor方法去除小数部分

      // 生成[0, max]
      let max
      Math.floor(random * (max + 1))

      // 生成[min, max]
      let min
      Math.floor(random * ((max - min) + 1)) + min    // 即先生成[0, max - min] 最后加上min来达到目的
    ---
  `}}</Code>
  <Line></Line>

  <Title>##API</Title>
  <Title>###运算</Title>
  <Api>
    @api - Math.pow(base, exponent)
    @desc - 计算基数的指数次幂
    @params - [base : number] 基数
    @params - [exponent : number] 幂指数
    @return - [number] 运算后数值
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log(Math.pow(2, 3))     // 8
      console.log(Math.pow(8, 1/3))   // 2
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Math.log(x)
    @desc - 返回以`e`为底的 x 的对数
    @params - [x : number] 指定数
    @return - [number] 运算后数值
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log(Math.log(Math.E))   // 1
      console.log(Math.log10(10))     // 1

      console.log(Math.log2(2))       // 1
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Math.sin(x)
    @desc - 返回 x 弧度的正弦值
    @params - [x : number] 指定数
    @return - [number] 运算后数值
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log(Math.sin(Math.PI / 2))   // 1
      console.log(Math.cos(Math.PI))       // -1
      console.log(Math.tan(Math.PI / 4))   // 1
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Math.asin(x)
    @desc - 返回 x 的反正弦值（以弧度表示）
    @params - [x : number] 指定数
    @return - [number] 运算后数值
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log(Math.asin(1))     // 1.5707963267948966 (即PI/2)
      console.log(Math.acos(1))     // 0
      console.log(Math.atan(1))     // 0.7853981633974483 (即PI/4)
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Math.hypot(...values)
    @desc - 返回所有参数的平方和的平方根
    @params - [values : number] 指定数
    @return - [number] 运算后数值
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log(Math.hypot(3, 4))   // 5
    ---
  `}}</Code>
  <Line></Line>

  <Title>###取值</Title>
  <Api>
    @api - Math.abs(x)
    @desc - 取绝对值
    @params - [x : number] 处理数值
    @return - [number] 期望数值
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log(Math.abs(5))    // 5
      console.log(Math.abs(-5))   // 5
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Math.ceil(x)
    @desc - 向上取整，舍弃小数部分，如果是正数则整数部分 +1，负数则不变
    @params - [x : number] 处理数值
    @return - [number] 期望数值
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log(Math.ceil(10.12))     // 11
      console.log(Math.ceil(-1.12))     // -1
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Math.floor(x)
    @desc - 向下取整，舍弃小数部分，如果是负数则整数部分 -1，正数则不变
    @params - [x : number] 处理数值
    @return - [number] 期望数值
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log(Math.floor(10.12))    // 10
      console.log(Math.floor(-1.12))    // -2
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Math.round(x)
    @desc - 四舍五入取整
    @params - [x : number] 处理数值
    @return - [number] 期望数值
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log(Math.round(10.12))    // 10
      console.log(Math.round(10.52))    // 11
      console.log(Math.round(-1.12))    // -1
      console.log(Math.round(-1.52))    // -2
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Math.random( )
    @desc - 生成一个随机`[0, 1)`的数值
    @return - [number] 期望数值
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log(Math.random())        // 0.9399308305634984
      console.log(Math.random())        // 0.4876264459716122
    ---
  `}}</Code>
  <Line></Line>

  <Title>###排序</Title>
  <Api>
    @api - Math.max(...values)
    @desc - 获取一组数值的最大项
    @params - [value : number] 处理数值
    @return - [number] 期望数值
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log(Math.max(20, -93, 44, 127))     // 127
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Math.min(...values)
    @desc - 获取一组数值的最小项
    @params - [value : number] 处理数值
    @return - [number] 期望数值
  </Api>
  <Code>{{`
    ---ts(演示)
      console.log(Math.max(20, -93, 44, 127))     // -93
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