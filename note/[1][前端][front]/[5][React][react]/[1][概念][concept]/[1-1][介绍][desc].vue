<template>
  <Tip>最后更新 - 2024.07.16</Tip>
  <Title>#介绍</Title>
  <Refer :source="[
    { desc: 'React 官网', url: 'https://react.dev/' },
    { desc: 'React 官网(中文)', url: 'https://zh-hans.react.dev/' }
  ]"></Refer>
  <Text>
    React 是一个热门 Web 开发框架，其核心特性可以归纳为以下三点：
    <List>组件化：设计理念是将视图拆分成独立可重用的组件，从而实现模块化</List>
    <List>虚拟DOM：每次视图更新会创建虚拟节点树与真实节点比较，最小化更新实际变化部分，从而极大提升性能</List>
    <List>单向数据流：组件使用单向数据流进行管理，即数据只能父组件传递给子组件，而子组件无法直接修改父组件状态，从而更易管理数据变化</List>
  </Text>
  
  <Text>**创建项目**</Text>
  <Text>本篇笔记基于 React18 技术方向， 首先来创建一个项目，目前`Vite`提供了高效便捷的脚手架方式，直接用即可</Text>
  <Code>{{`
    ---bash(脚手架创建)
      # 之后按照提示自己选创建项目类型即可
      npm create vite@latest project-name
    ---
  `}}</Code>
 
  <Text></Text>
  <Line></Line>

  <Title>##JSX</Title>
  <Text>React 的组件采用 `jsx（js xml）`或 `tsx` 的编写方式，其后缀名为`.jsx/.tsx`，有以下特点：</Text>
  <List>必须存在一个根元素，没有根元素可用`&lt;&gt; &lt;/&gt;`充当</List>
  <List>使用`{ }`嵌入表达式</List>
  <List>使用`className`定义类名</List>
  <List>使用`on`前缀加原生事件名表示绑定特定事件</List>
  <List>常使用三元表达式或`&&`表示条件渲染</List>
  <List>常使用数组`map()`遍历列表，遍历要加`key`值且不能使用数组下标</List>
  <Code>{{`
    ---tsx(demo~)
      function App() {
        const list = [
          {  id: '1', desc: '数据A' },
          {  id: '2', desc: '数据B' },
          {  id: '3', desc: '数据C' }
        ]
        const renderBtn = true
        const handleBtn = () => { }

        return (
          <>
            <div className='container'>
              <div className='list'>
                {
                  list.map((item) => <div key={item.id} >{ item.desc }</div>)
                }
              </div>
              { renderBtn && <button onClick={ handleBtn }>按钮</button> }
            </div>
          </>
        )
      }
    ---
  `}}</Code>
  <Line></Line>

  <Title>##组件</Title>
  <Quote>React 的组件主要分为类组件和函数式组件，但是由于目前类组件已经不再是被推崇的方式，因此本篇笔记只介绍函数式组件</Quote>
  <Text>
    组件的数据主要由`state`和`props`组成：
    <List>State：由组件自身定义，用于更新和修改自身数据</List>
    <List>Props：由父组件传递而来，用于控制子组件的数据变化</List>
  </Text>
  <Text>
    根据内部数据又可分为三种组件：
    <List>完全受控组件：组件的数据完全由外部 props 控制</List>
    <List>非受控组件：只有自身 state 数据不接收外部数据</List>
    <List>半受控组件：既有 props 又有 state</List>
  </Text>
  <Code>{{`
    ---tsx(demo)
      import { useState } from 'react'

      function FatherComponent() {
        const [data, setData] = useState('父组件数据')

        return (
          <div className='father'>
            <ChildComponents data={ data } />
          </div>
        )
      }

      function ChildComponent({ data }: { data: string }) {
        return (
          <div className='child'></div>
        )
      }
    ---
  
  `}}</Code>
  <Line></Line>
  
  <Title>###高阶组件</Title>
  <Text>高阶组件（HOC）是一种用于符合组件逻辑的技术，本质上是一个函数，接收一个组件经过处理后返回一个新的组件</Text>
  <Text>高阶组件的主要使用目的是代码复用，注入状态等，但是这些功能使用 hook 的方式抽离出来也是一样的，虽然 hook 不能完全替代高阶组件，但是绝大部分情况下，直接使用 hook 就完事了</Text>
  <Code>{{`
    ---tsx(高阶组件)
      // 为组件添加一个自定义数据
      const higherOrder = (Component) => {
        return (props) => {
          const [newData, setData] = useState('新的数据')

          return <Component { ...props } newData={ newData } />
        }
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