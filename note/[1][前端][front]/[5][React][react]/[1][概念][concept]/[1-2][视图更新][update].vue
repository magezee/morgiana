<template>
  <Tip>最后更新 - 2024.07.17</Tip>
  <Title>#视图更新</Title>
  <Text>要了解更新机制，首先需要了解组件的生命周期，每个组件都会经历挂载、更新、卸载三个阶段，React 提供了对应生命周期的钩子，虽然函数式组件没有这些钩子，不过也有必要了解</Text>
  <Table :nowrap-row="[1, 2]">
    #生命周期钩子
    |阶段|钩子|调用时机|功能|
    -----------------
    |挂载|`constructor( )`|组件实例化时|初始化状态、绑定事件处理程序等|
    |挂载|`static getDerivedStateFromProps( )`|组件实例化以及接收到新的 props 时|获取更新状态|
    |挂载|`render( )`|虚拟 dom 变化时|更新虚拟 dom|
    |挂载|`componentDidMount( )`|组件被挂载到真实 dom 后|进行 dom 操作、数据获取、事件订阅等|
    |||||
    |更新|`static getDerivedStateFromProps( )`|组件实例化以及接收到新的 props 时|获取更新状态|
    |更新|`shouldComponentUpdate( )`|在接收到新的 props 或 state 时|控制是否更新|
    |更新|`render( )`|虚拟 dom 变化时|更新虚拟 dom|
    |更新|`getSnapshotBeforeUpdate( )`|更新前（render 之后，真实 dom 变更之前）时|捕获 dom 信息|
    |更新|`componentDidUpdate( )`|组件更新后|可进行 dom 操作、发起新的数据请求等|
    |||||
    |销毁|`componentWillUnmount( )`|组件销毁时|从 dom 中移除组件|
  </Table>
  <Line></Line>

  <Title>##生命周期</Title>
  <Text>虽然函数式组件没有生命周期钩子，但是有对应的 hook 可以模拟这个过程，即[useEffect](/note/front--react--code--hook#anchor-4)</Text>
  <Code>{{`
    ---tsx(useEffect)
      function App() {
        const [count, setCount] = useState(0)
        const [isMounted, setIsMounted] = useState(false)

        useEffect(() => {
          if (!isMounted) {
            setIsMounted(true)
            console.log('组件挂载完成')
          } else {
            console.log('组件更新完成')
          }

          // 清除函数
          return () => {
            console.log('组件即将卸载或effect即将重新执行')
          }
        }, [count])

        return (
          <div>
            <button onClick={() => setCount(count + 1)}>更新视图</button>
          </div>
        )
      }
    ---
  
  `}}</Code>

  <Line></Line>
  <Title>##更新机制</Title>
  <Text>只有组件触发更新机制，页面视图才会发生变化，一个组件通过以下方式来触发更新</Text>
  <List>组件自身的`state`发生变化</List>
  <List>组件接受的`props`发生变化</List>
  <List>父组件发生更新，当前组件也会更新</List>
  <Code>{{`
    ---tsx(函数式组件更新状态)
      import React from 'react'
      import { useState } from 'react'

      function App() {
        const [ count, setCount ] = useState(0)
        console.log('函数执行')   // 每次更新函数式组件都会重新执行一遍函数体

        return (
          <React.Fragment>
            <div>{ count }</div>
            <button onClick={()=>setCount(count + 1)}>更改</button>
          </React.Fragment>
        )
      }
    ---
  `}}</Code>
  <Line></Line>

  <Title>###state</Title>
  <Text>state 的核心概念是不可变性，即需要更新组件状态时，不可以直接修改当前的 state 对象而应借助官方方法[useState](/note/front--react--code--hook#anchor-6)</Text>
  <Quote>为了遵循不可变原则，当 state 为对象或数组时，应该重新赋值为新的对象或数组，而不是修改原始内容</Quote>
  <List></List>
  <Code>{{`
    ---tsx(useState)
      function App() {
        const [countA, setCountA] = useState(0)
        const [countB, setCountB] = useState(() => 0)

        const changeCountA = () => {
          setCountA(countA + 1)
        }

        const changeCountB = () => {
          setCountB((value) => {
            return value + 1
          })
        }

        return (
          <div>
            <button onClick={changeCountA}>更改数据</button>
            <button onClick={changeCountB}>更改数据</button>
          </div>
        )
      }
    ---
    ---tsx(修改对象和数组 state)
      function App() {
        const [objState, setObjState] = useState({ x:1, y:2 })
        const [listState, setListState] = useState([ 1, 2 ])

        // 重新生成新的对象和数组，而不是在原始对象、数组上操作
        const changeObjState = () => {
          setObjState({ ...objState, x: 3 })
        }

        const changeListState = () => {
          setListState([ ...listState, 3 ])
        }

        return (
          <div>
            <span>{JSON.stringify(objState)}
            {listState}</span>
            <button onClick={changeObjState}>更改数据</button>
            <button onClick={changeListState}>更改数据</button>
          </div>
        )
      }
    ---
  `}}</Code>
  <Line></Line>

  <Title>##风险</Title>
  <Text>React 的类组件和函数组件的更新方式有所不同，类组件是每次渲染执行一遍`render()`生命周期钩子内代码，而函数组件则是执行整个函数体内代码</Text>
  <Text>在下面的代码中，在组件挂载和更新时，都会向页面重新绑定一个事件，已知`addEventListener()`对于完全相同的事件函数不会进行多次添加，则下面代码执行后的效果为：</Text>
  <List>类组件：在更新多次后，一次点击事件只会触发一次打印</List>
  <List>函数组件：在更新多次后，一次点击事件会触发多次打印，说明此时函数组件同时绑定了多个点击事件</List>
  <Code>{{`
    ---tsx(类组件)
    import React from 'react'
    import { Component } from 'react'

    class App extends Component {
      state = {
        count: 0
      }

      showConsole() {
        console.log('打印执行~')
      }

      componentDidMount() {
        document.documentElement.addEventListener('click', this.showConsole)
      }

      componentDidUpdate() {
        document.documentElement.addEventListener('click', this.showConsole)
      }

      render() {
        return (
          <div className='app'>
            <button onClick={() => this.setState({ count: this.state.count + 1 })}>更新</button>
            <div>已更新次数: { this.state.count }</div>
          </div>
        )
      }
    }
    ---

    ---tsx(函数组件)
      import React from 'react'
      import { useState, useEffect } from 'react'

      function App() {
        const [ count, setCount ] = useState(0)
        
        const showConsole = () => {
          console.log('打印执行~')
        }

        useEffect(() => {
          document.documentElement.addEventListener('click', showConsole)
        })

        return (
          <div className='app'>
            <button onClick={() => setCount(count + 1)}>更新</button>
            <div>已更新次数: { count }</div>
          </div>
        )
      }
    ---
  `}}</Code>
  <Text>这是因为每次更新时，重新声明会视为全新的变量（即使看起来同名），在类组件中，没有在`render()`方法中声明，因此不会出现事件叠加，而函数组件则会</Text>
  <Quote>更新时重新声明的变量如果继续被引用就不会被当成垃圾处理（往往是函数调用），因此造成了事件叠加</Quote>
  <Code>{{`
    ---tsx(手动清除副作用)
      import React from 'react'
      import { useState, useEffect } from 'react'

      function App() {
        const [ count, setCount ] = useState(0)
        
        const showConsole = () => {
          console.log('打印执行~')
        }

        useEffect(() => {
          document.documentElement.addEventListener('click', showConsole)
          return () => {
            document.documentElement.removeEventListener('click', showConsole)
          }
        })

        return (
          <div className='app'>
            <button onClick={() => setCount(count + 1)}>更新</button>
            <div>已更新次数: { count }</div>
          </div>
          
        )
      }
    ---

    ---tsx(不重新声明变量)
      import React from 'react'
      import { useState, useEffect } from 'react'

      const showConsole = () => {
        console.log('打印执行~')
      }

      function App() {
        const [ count, setCount ] = useState(0)
        
        useEffect(() => {
          document.documentElement.addEventListener('click', showConsole)
        })

        return (
          <div className='app'>
            <button onClick={() => setCount(count + 1)}>更新</button>
            <div>已更新次数: { count }</div>
          </div>
        )
      }
    ---
  `}}</Code>

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