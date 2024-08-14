<template>
  <Tip>最后更新 - 2024.08.07</Tip>
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
  <Line></Line>
  <Title>###模块设置</Title>
  <Text>通过设置`compilerOptions.module`来指定编译器应如何生成 js 模块代码，根据运行环境和需求不同拥有不同的配置</Text>
  <Table>
    #tsconfig.json 主配置项
    |配置项|使用范围|特点|使用示例|
    -----------------
    |CommonJS|node 环境|大多数 node 应用和库使用这种模块格式，因为 commonjs 是 node 默认的模块系统|适用于大部分 node 项目|
    |ESNext、ES2020等|现代浏览器或 node 环境（需要支持 ECMAScript 模块）|支持 import 和 export 语法|适用于浏览器项目和部分 node 项目|
    |AMD|浏览器|异步模块定义，适用于需要动态加载的应用，常用在 requirejs 这样的模块加载器中|适用于需要在浏览器中懒加载模块的需求|
    |UMD|浏览器和 node|通用模块定义，兼容 commonjs 和 amd，同时可用于浏览器和 node|适用于需要跨多个环境或提供库的项目|
    |System|使用 systemjs 的环境|用于 systemjS 加载器，动态加载模块|应用于需要复杂动态加载的系统|
    |None|自定义场景|不生成模块包装，所有导入和导出将会被忽略|仅适合特定的自定义构建场景|
  </Table>
  <Text>下面是一些场景的配置示例</Text>
  <Code>{{`
    ---json(node项目)
      {  
        "compilerOptions": {  
          "module": "CommonJS",  
          "target": "ESNext"
        }  
      }  
    ---
    ---json(现代前端项目)
      {
        "compilerOptions": {
          "module": "CommonJS",  
          "target": "ESNext",
          "moduleResolution": "node",
          "esModuleInterop": true,
          "allowJs": true
        }
      }
    ---
    ---json(跨平台库)
      {
        "compilerOptions": {
          "module": "UMD",  
          "target": "ESNext",
          "declaration": true
        }
      }
    ---
  `}}</Code>
  <Line></Line>

  <Title>##问题汇总</Title>
  <Title>###node配置</Title>
  <Text>**问题**：因为一些原因需要将`package.json`中的`type`设置为`module`模式时（例如需要用到顶层`await`功能），ts 文件会无法运行</Text>
  <Text>
    **解决**：需要改写`tsconfig.json`的三个字段配置，如下面代码所示，同时如果使用 node 运行 js 文件，会报`Unknown file extension ".ts"`错误，
    因为 node 本身不支持运行 ts 文件作为 esm 模块，通常借助`ts-node`的加载器来协助运行
  </Text>
  <Code>{{`
    ---json(tsconfig.json)
      "compilerOptions": {  
        "target": "ESNext",  
        "module": "ESNext",  
        "moduleResolution": "node",  
      }  
    ---
    ---bash(加载器运行)
      # 确保已安装 ts-node、typescript
      node --loader ts-node/esm app.ts
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