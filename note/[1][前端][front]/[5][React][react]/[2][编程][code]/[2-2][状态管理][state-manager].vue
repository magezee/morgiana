<template>
  <Tip>最后更新 - 2024.07.27</Tip>
  <Title>#状态管理</Title>
  <Text>状态管理思路可以总结为以下几点：</Text>
  <List>通过 state 管理自身组件状态</List>
  <List>通过 props 管理子组件状态</List>
  <List>通过 context 管理跨层级子组件状态</List>
  <List>通过 reducer 管理全局状态</List>
  <Line></Line>

  <Title>##Context</Title>
  <Text>context 的出现避免了在多层级组件中需要层层传递 props 的尴尬局面</Text>
  <Api>
    @api - React.createContext(defaultValue)
    @desc - 用于创建一个上下文
    @params - [defaultValue : any] 默认设置的值，即如果后续没有显式设置`provider`的`value`时该值会被启用
    @return - [{ Provide, Consumer }] 返回一个包含`Provide`和`Consumer` 的对象，用前者设置要传递的数据，后者原用于获取数据，目前已不使用，统一用`useContext`获取数据
  </Api>
  <Code>{{`
    ---tsx(创建和使用)
      import { useContext } from 'react'

      // 创建一个上下文  
      const MyContext = createContext()

      function ChildComponent() {  
        const context = useContext(MyContext)

        return (  
          <div>  
            <p>Name: {context.name}</p>  
            <p>Version: {context.version}</p>  
          </div>  
        )
      }  

      function App() {  
        const contextValue = { name: 'React', version: '18.0' }

        return (  
          <MyContext.Provider value={contextValue}>  
            <ChildComponent />  
          </MyContext.Provider>  
        )
      }  
    ---
  
  `}}</Code>

  <Line></Line>

  <Title>##Reducer</Title>
  <Text>reducer 的设计来源于 Redux，在 react 中有内置的[useReducer](http://localhost/note/front--react--code--hook#anchor-10)方法去实现，它相当于一个简化版的 Redux</Text>
  <Text>它对数据的更改遵循单向数据流的规则，如图所示</Text>
  <Image :width="500" src="https://morgiana.oss-cn-beijing.aliyuncs.com/note/react-state-01.png"></Image>
  <Text>往往`useReducer`和`useContext`会被搭配起来使用，以创建一个简单的全局状态管理系统，这样就可以不借助 redux 等外部库管理全局状态</Text>
  <Quote>配合 context 的原因主要是要管理多个组件时，层层传递 dispatch 和 state 很蠢</Quote>
  <Code>{{`
    ---tsx(reducer.ts)
      export const initialState = { count: 0 }  

      export function reducer(state, action) {  
        switch (action.type) {  
          case 'increment':  
            return { count: state.count + 1 }  
          case 'decrement':  
            return { count: state.count - 1 }  
          default:  
            throw new Error()  
        }  
      }  
    ---
    ---tsx(CounterContext.tsx)
      import { createContext, useReducer } from 'react'  
      import { reducer, initialState } from './reducer'  

      const CounterContext = createContext()  

      const CounterProvider = ({ children }) => {  
        const [state, dispatch] = useReducer(reducer, initialState)  

        return (  
          <CounterContext.Provider value=\{{ state, dispatch }\}>  
            {children}  
          </CounterContext.Provider>  
        )  
      }  

      export { CounterContext, CounterProvider }  
    ---
    ---tsx(Counter.tsx)
      import { useContext } from 'react'  
      import { CounterContext } from './CounterContext'  

      function Counter() {  
        const { state, dispatch } = useContext(CounterContext)  

        return (  
          <div>  
            <p>Count: {state.count}</p>  
            <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>  
            <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>  
          </div>  
        )  
      }  

      export default Counter    
    ---
    ---tsx(App.tsx)
      import Counter from './Counter'  

      function App() {  
        return (  
          <div>  
            <h1>Global State Management with useReducer and useContext</h1>  
            <Counter />  
          </div>  
        )  
      }  

      export default App  
    ---
    ---tsx(index.ts)
      import React from 'react'  
      import ReactDOM from 'react-dom/client'  
      import App from './App'  
      import { CounterProvider } from './CounterContext'  

      const root = ReactDOM.createRoot(document.getElementById('root'))  
      root.render(  
        <CounterProvider>  
          <App />  
        </CounterProvider>  
      )
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