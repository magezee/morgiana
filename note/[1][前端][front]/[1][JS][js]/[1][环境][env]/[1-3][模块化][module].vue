<template>
  <Tip>最后更新 - 2024.06.24</Tip>
  <Titleg>#模块化</Titleg  <Text>模块化是一种软件设计技术，用于将代码组织成独立、可重用、可维护的模块，目前拥有以下几种方案：</Text>
  <List>`早期模块化`：通过立即调用函数表达式来创建一个局部作用域，从而避免全局污染</List>
  <List>`CommonJs`：用于 Node 的模块化标准，使用`require`和`module.exports`来导入和导出模块</List>
  <List>`AMD`：用于浏览器模块化的标准，使用`define`和`require`来定义和加载模块，适用于异步加载</List>
  <List>`ES Modules`：现代的 JS 标准，使用`import`和`export`进行模块化，更加简介强大</List>
  <Code>{{`
    ---js(早期模块化)
      (function() {
        // 模块代码
        var privateVariable = "这是一个私有变量"

        function privateFunction() {
          console.log(privateVariable)
        }

        window.myModule = {
          publicMethod: function() {
            privateFunction()
          }
        }
      })()
    ---
    ---js(CommonJs)
      // math.js
      function add(a, b) {
        return a + b
      }

      module.exports = {
        add: add
      }

      // main.js
      const math = require('./math')
      console.log(math.add(2, 3))     // 输出 5
    ---
    ---js(AMD)
      // math.js
      define([], function() {
        return {
          add: function(a, b) {
            return a + b
          }
        }
      })

      // main.js
      require(['math'], function(math) {
        console.log(math.add(2, 3))    // 输出 5
      })
    ---
    ---js(ES Module)
      // math.js
      export function add(a, b) {
        return a + b
      }

      // main.js
      import { add } from './math.js'
      console.log(add(2, 3))          // 输出 5
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>##CJS</Title>
  <Text>
    在 CJS 中，一个模块通过`require`加载另一模块时，被导入的模块会被实例化并执行，
    随后将其导出的对象进行缓存，下一次有任意其他模块导入时，直接从缓存中返回已加载的实例，而不会重新加载和执行模块代码，因此有以下特点：
  </Text>
  <List>运行环境：Node</List>
  <List>同步加载：在加载模块时，程序会暂停执行直到加载完成</List>
  <List>单例模式：第一次调用模块时，运行源模块**所有代码**并生成导出对象实例，后续引用该模块的所有文件共享一个实例</List>
  <Code>{{`
    ---js(counter.js)
      let count = 0

      const increment = () => {
        count++
      }

      const getCount = () => {
        return count
      }

      module.exports = {
        increment,
        getCount
      }
    ---
    ---js(app.js)
      // 第一次加载模块时，会加载并执行模块内的所有代码，创建导出对象并缓存
      // 第二次加载模块时，会从缓存中直接返回之前创建的对象实例
      // 因此couter1和counter2引用的是同一个实例对象，修改源文件会互相影响
      const counter1 = require('./counter')
      const counter2 = require('./counter')

      counter1.increment()
      console.log(counter1.getCount())   // 输出：1

      counter2.increment();
      console.log(counter1.getCount())   // 输出：2
      console.log(counter2.getCount())   // 输出：2
    ---
  `}}</Code>
  <Text>下面是常见的使用方式：</Text>
  <Code>{{`
    ---js(导出)
      // demo.js
      const data = 'data'
      const fn = () => {}

      exports.newFn = () => {}            // 声明并导出
      module.exports = { data, fn }       // 批量导出（一般都用这种）
      module.myVariable = { data, fn}     // 通过一个自定义变量包装起来再导出
    ---
    ---js(导入)
      const demo = require('./demo')   // 直接导入

      // 懒加载
      if (true) {
        const demo = require('./demo')
      }

      demo.fn()
      demo.myVariable.fn()
    ---
  `}}</Code>
  <Line></Line>

  <Title>##ESM</Title>
  <Text>JS 引擎对代码静态分析的时候，遇到模块加载命令会生成一个只读引用，等代码真正运行时再根据这个引用去模块里取值，有以下特点：</Text>
  <List>运行环境：浏览器和 Node</List>
  <List>异步加载：异步的方式加载模块，浏览器环境中不会阻塞页面渲染</List>
  <List>静态结构：在编译时就已经确定模块的导入和导出，不需要运行模块代码，当模块第一次被导入时会被缓存，如果源文件内容发生改动，需要重启运行环境（刷新浏览器/重启 Node 服务）以加载最新模块内容，通常是通过开发服务器的热更新实现自动刷新</List>
  <Code>{{`
    ---js(导出)
      // demo.js
      const data = 'data'
      const fn = () => {}

      export const newFn = () => {}         // 声明并导出
      export default fn = () => {}          // 默认导出
      export { data }                       // 批量导出
    ---
    ---js(导入)
      import Fn from './demo'               // 默认导入
      import { data } from './demo'         // 普通导入
      import * as demoModule from './demo'  // 使用*可以引入全部导出内容，使用as可以起别名

      // 懒加载
      const loadModule = async() => {
        const { newFn } = await impor('./demo')
      }

      demoModule.default()                  // 使用default关键字使用默认导出
      demoModule.newFn()
    ---
  `}}</Code>
  <Line></Line>

  <Title>##环境配置</Title>
  <Text>要声明一个项目或特定文件是使用`CJS`还是`EMS`，有以下方式：</Text>
  <List>配置`package.json`：不设置`type`或者显式设置为`commonjs`时，所有`.js`文件都会被解析为 CJS 模块，可以手动设置为`module`来更改解析成 ESM</List>
  <List>文件扩展名：可以使用`.cjs`或`.mjs`扩展名来强制使用 CJS 或 ESM 模块</List>
  <List>浏览器环境：使用{{ '`<scripit>`' }}标签并设置`type="module"`来声明 ESM，未声明的标签则被视为普通脚本（类 CJS 情况，即引入时会在全局环境中运行一次脚本）</List>
  <List>打包工具：使用工具（如`webpack/rollup`）时可以通过配置文件来指定模块</List>
  <List>转换代码：如果使用`Babel`来转换代码，同样可以进行配置模块</List>
  <Code>{{`
    ---json(package.json)
      {
        "type": "module"
      }
    ---
    ---html(script 标签)
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body>
        <!-- ES Module -->
        <script type="module" src="main.js"></script>
        <!-- CommonJS-like script -->
        <script src="legacy.js"></script>
      </body>
      </html>
    ---
    ---js(webpack 配置)
      module.exports = {
        entry: './src/index.js',
        output: {
          filename: 'bundle.js',
          path: __dirname + '/dist',
        },
        module: {
          rules: [
            {
              test: /\.mjs$/,
              include: /node_modules/,
              type: 'javascript/auto',
            },
          ],
        },
        resolve: {
          extensions: ['.js', '.mjs'],
        },
      }
    ---
    ---json(babel 配置)
      // .babelrc
      {
        "presets": [
          ["@babel/preset-env", {
            "modules": false // 保持ES Modules，这样打包工具如Webpack可以进行优化
          }]
        ],
        "plugins": [
          "@babel/plugin-transform-modules-commonjs" // 将ESM转为CJS
        ]
      }
    ---
  `}}</Code>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Code, Line, Title, Text, Table, Image, List, Refer, Quote, Tip, Api } from '../../../../page/component/note/'

const emits = defineEmits([ 'noteContentMounted' ])

onMounted(() => {
  emits('noteContentMounted')
})

// 动态加载组件


</script>



<style lang="less">

</style>