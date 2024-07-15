<template>
  <Tip>最后更新 - 2024.07.11</Tip>
  <Title>#介绍</Title>
  <Refer :source="[
    { desc: 'Typescript【官网】', url: 'https://www.typescriptlang.org/' },
    { desc: '在线编辑器【官网】', url: 'https://www.typescriptlang.org/zh/play' },
  ]"></Refer>
  <Text>简单来说，Typescripe 就是 Javascript 加了个类型规范，补足了 js 规范数据的能力，使用 ts 对开发者最直接的好处是编译器的代码智能提示爽的飞起，所以赶快用起来~</Text>
  <Line></Line>
  <Title>##配置</Title>
  <Refer :source="[
    { desc: '了不起的 tsconfig 指南【博客】', url: 'https://segmentfault.com/a/1190000022809326/' },
    { desc: 'compilerOptions 详细配置说明【官网】', url: 'https://www.typescriptlang.org/docs/handbook/compiler-options-in-msbuild.html' },
  ]"></Refer>
  <Text>使用 ts 首先需要有`tsconfig.json`配置文件, 它的作用是将 ts 编译 成 js, 其文件主要包含两个部分：</Text>
  <List>定义编译选项</List>
  <List>指定编译文件</List>
  <Quote>可以通过全局安装 npm 包`typescripe`然后使用终端命令`tsc --init`来快捷生成 tsconfig.json 文件</Quote>
  <Table>
    #tsconfig.json 主配置项
    |指令|功能|示例|
    -----------------
    |`compilerOptions`|配置编译选项|`"compilerOptions": { "target": "es5" }`|
    |`files`|指定需要编译的单个文件列表|`"files": [ "src/demo.ts" ]`|
    |`include`|指定需要编译的文件或目录|`"include": [ "src" ]`|
    |`exclude`|指定需要排除编译的文件或目录, 默认排除 `node_modules`|`"exclude": [ "src/lib" ]`|
    |`extends`|继承另外一套 `tsconfig.json` 配置|`"extends": "./tsconfig.base.json"`|
    |`references`|指定项目依赖|`"references": { "path": "./comment" }`|
    |`typeAcquisition`|配置如何引入第三方依赖的声明文件|`"typeAcquisition": { "enable": true }`|
    |`compileOnSave`|设置编译器在保存文件的时候是否自动编译|`"compileOnSave": true`|
  </Table>
  <Line></Line>
  <Title>###文件解析</Title>
  <Text>默认情况下，在一个项目中，会自动解析以下文件：</Text>
  <List>与`tsconfig.json`文件同一目录下的所有 ts 源文件`.ts`,`.tsx`</List>
  <List>所有子目录（递归）的 ts 源文件</List>
  <List>所有`.d.ts`文件（包含子目录）</List>
  <Text>如果需要排除解析的文件，可以显式声明`exclude`配置选项</Text>
  <Code>{{`
    ---json(tsconfig)
      {
        "compilerOptions": {
          "target": "es5",
          "module": "commonjs"
        },
        "exclude": ["index.d.ts"]   // 仅排除index.d.ts
      }
    ---
  `}}</Code>
  <Text>如果需要禁用默认的全部解析选项，可以显式声明`include`或`file`配置选项</Text>
  <Code>{{`
    ---json(include)
      {
        "compilerOptions": {
          "target": "es5",
          "module": "commonjs"
        },
        "include": ["index.ts, src/**/*.ts"]   // 仅解析index.ts以及子目录src下的所有.ts文件
      }
    ---
    ---json(file)
      {
        "compilerOptions": {
          "target": "es5",
          "module": "commonjs"
        },
        "include": ["index.ts"]   // 仅解析index.ts
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

</script>



<style lang="less">

</style>