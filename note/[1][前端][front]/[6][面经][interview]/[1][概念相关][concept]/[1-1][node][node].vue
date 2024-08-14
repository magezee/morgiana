<template>
  <Tip>最后更新 - 2024.07.29</Tip>
  <Title>##打包工具</Title>
  <Text>**vite和react的区别，以及他们的优势和劣势**</Text>
  <Text>先从结论来说：vite 适合中小型项目，webpack 适合大型复杂项目</Text>
  <List>在开发环境中，vite 启动服务及热更新速度更快</List>
  <List>在生产环境中，webpack 更完善、灵活且性能优秀</List>
  <List>在配置方面，vite 更简单</List>
  <List>在生态方面，webpack 更成熟，众多的插件几乎可以满足任意开发需求</List>
  <Text>
    在工作机制上，vite 借助浏览器的的 ESM 功能，以至于启动服务以及更改文件的时候不需要全局打包，而是用到哪部分加载哪部分的代码，所以在开发时速度很快，
    而 webpack 则需要将所有的模块和依赖转换成浏览器可理解的格式并通过一个复杂的依赖图来管理模块然后进行各种优化和代码拆分
  </Text>
  <Text>
    在生产环境中，vite 基于`rollup`打包，在一些功能如`tree-shaking`、`scope hoisting`和`code splitting`等优化生产代码文件的功能上不如 weiack 强大
  </Text>
  <Line></Line>
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