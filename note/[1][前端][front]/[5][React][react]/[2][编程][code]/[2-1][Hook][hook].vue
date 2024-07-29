<template>
  <Tip>最后更新 - 2024.07.27</Tip>
  <Title>#Hook</Title>
  <Refer :source="[
    { desc: '官方 Hook 文档', url: 'https://zh-hans.react.dev/reference/react/hooks' },
    { desc: 'Hook 规则', url: 'https://zh-hans.react.dev/reference/rules/rules-of-hooks' },
    { desc: 'ahooks：一个很火的 hook 库', url: 'https://ahooks.js.org/zh-CN/hooks/use-request/index' },
  ]"></Refer>
  
  <Text>React 中 Hook 具有如下规则：</Text>
  <List>只能在函数组件中调用</List>
  <List>只能在顶层调用，即不能在循环、条件或嵌套函数中调用</List>
  <Quote>
    React 内部维护了一个列表（类似链表结构）来跟踪记录每个组件的 hook 调用顺序及其状态，
    在每次渲染时以相同的顺序迭代这个列表，确保`useState`或`useEffect`等能保留其状态工作，
    由于是有序的，因此在条件语句或循环中会破坏这个顺序，所以只能顶层调用
  </Quote>
  <Line></Line>

  <Title>##自定义</Title>
  <Text>框架已经提供了很多功能强大的 hook，但是很多时候仍需要根据功能抽离组件逻辑，当编写自定义 hook 时应遵循以下规则：</Text>
  <List>命名约定：以`use`作为函数名前缀</List>
  <List>避免副作用：使用具有副作用的 hook 如`useEffect`时需要清理副作用</List>
  <List>清晰抽象：确保 hook 仅处理一件事情，保持职责单一</List>
  <Code>{{`
    ---tsx(自定义 hook)
      function useWindowSize() {  
        const [windowSize, setWindowSize] = useState({  
          width: window.innerWidth,  
          height: window.innerHeight  
        })

        useEffect(() => {  
          function handleResize() {  
            setWindowSize({  
              width: window.innerWidth,  
              height: window.innerHeight  
            })
          }  

          window.addEventListener('resize', handleResize)

          // 清理事件监听器，避免内存泄漏  
          return () => {  
            window.removeEventListener('resize', handleResize)
          }  
        }, []) 

        return windowSize
      }  
    ---
    ---tsx(自定义获取数据)
      function useFetchData(url) {  
        const [data, setData] = useState(null)   
        const [loading, setLoading] = useState(true)   
        const [error, setError] = useState(null)   

        useEffect(() => {  
          async function fetchData() {  
            try {  
              const response = await fetch(url)   
              const result = await response.json()   
              setData(result)   
              setLoading(false)   
            } catch (error) {  
              setError(error)   
              setLoading(false)   
            }  
          }  

          fetchData()   
        }, [url])  // 注意依赖数组包含 url，确保在 url 变化时重新获取数据  

        return { data, loading, error }   
      }  
    ---
  `}}</Code>
  <Line></Line>
  <Title>##API</Title>
  <Title>###生命周期</Title>
  <Title :hide="true">####useEffect</Title>
  <Api>
    @api - useEffect(callback, deps?)
    @desc - 可用于处理组件副作用，模拟生命周期
    @params - [callback : () => void] 副作用函数，在组件挂载时会执行，如果没有`deps`限制，在组件每次更新时也会执行，该方法可以返回一个清除函数，此函数会在组件卸载或副作用函数重新执行前调用
    @params - [deps? : any[ ]] 仅数组内指定的任一数据发生更新时，组件更新时`callback`才会执行，如果仅在组件挂载时执行副作用函数可以传入一个空数组
    @return - [undefined] 
  </Api>
  <Code>{{`
    ---tsx(介绍)
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
    ---tsx(数据获取)
      function App() {  
        const [data, setData] = useState(null)  

        useEffect(() => {  
          fetch('https://api.example.com/data')  
            .then(response => response.json())  
            .then(data => setData(data))  
        }, [])  // 空数组表示这个副作用只在组件挂载和卸载时执行一次  

        return (  
          <div>  
            {data ? <p>{data.text}</p> : <p>Loading...</p>}  
          </div>  
        )  
      }
    ---
    ---tsx(事件管理)
      function App() {  
        useEffect(() => {  
          const handleResize = () => {  
            console.log('Window resized')  
          }  
          window.addEventListener('resize', handleResize)  

          // 返回一个函数以清除副作用  
          return () => {  
            window.removeEventListener('resize', handleResize)  
          }  
        }, []) // 空数组表示这个副作用只在组件挂载和卸载时执行一次  

        return <div>Resize the window and check the console</div>  
      }
    ---
    ---tsx(操作dom)
      function App() {  
        const divRef = useRef(null)  

        useEffect(() => {  
          const div = divRef.current  
          div.style.transition = 'opacity 1s'  
          div.style.opacity = 1  

          return () => {  
            div.style.opacity = 0  
          }  
        }, [])  

        return <div ref={divRef} style={\{ opacity: 0 }\}>Fade In Effect</div>  
      }
    ---
  
  `}}</Code>
  <Line></Line>

  <Title>###数据</Title>
  <Title :hide="true">####useState</Title>
  <Api>
    @api - useState(defauleValue)
    @desc - 用于生成组件的 state 对象
    @params - [defauleValue : any | () => any] 初始状态值，可以声明为一个回调函数并返回默认值
    @return - [[state, dispatchState]] 返回一个数组，第一个元素为当 state 值，第二个元素为更改 state 的方法
  </Api>
  <Code>{{`
    ---tsx(介绍)
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
  
  <Title :hide="true">####useRef</Title>
  <Api>
    @api - useRef(defauleValue)
    @desc - 用于在组件中创建一个可变的，持久的引用
    @params - [defauleValue : any] 初始值
    @return - [MutableRefObject] 返回的是一个对象，该对象只拥有一个属性`current`，值为赋予引用的值
  </Api>
  <Quote>
    由于函数组件在更新时会重新执行组件内全部代码，因此普通数据会重置，而`useRef`可以在组件重新渲染之间存储信息，第一次赋值后便持久化保存<br/>
    渲染期间不要写入或读取`ref.current`，会破坏预期行为，如果需要渲染期间的数据应使用`state`
  </Quote>
  <Text>使用场景：</Text>
  <List>访问 dom 元素：可以用于直接访问元素，避免使用原生方法查询</List>
  <List>存储可变值：存储一些在渲染过程中不会影响 UI 的持久数据，避免因为状态更新导致的不必要的重复渲染</List>
  <List>保持函数之间的持久引用：保持某个回调函数或一些数据在重新渲染时不变</List>
  <Quote></Quote>
  <Code>{{`
    ---tsx(访问dom)
      function MyComponent() {  
        const inputRef = useRef(null)  

        useEffect(() => {  
          inputRef.current.focus() // 在组件挂载时聚焦输入框  
        }, [])  

        return (  
          <input ref={inputRef} type="text" placeholder="Focus on mount" />  
        )  
      }  
    ---
    ---tsx(存储数据)
      function MyComponent() {  
        const [count, setCount] = useState(0)  
        const renderCount = useRef(0)  

        useEffect(() => {  
          renderCount.current++  
        })  

        return (  
          <div>  
            <p>Render Count: {renderCount.current}</p>  
            <p>Count: {count}</p>  
            <button onClick={() => setCount(count + 1)}>Increment</button>  
          </div>  
        )  
      }  
    ---
    ---tsx(持久引用)
      function MyComponent() {  
        const lastClicked = useRef(null)  

        const handleClick = useCallback(() => {  
          lastClicked.current = new Date()  
          console.log('Button clicked at: ', lastClicked.current)  
        }, []) // 此回调函数在整个组件生命周期中保持同一个引用  

        return (  
          <button onClick={handleClick}>Click Me</button>  
        )  
      }
    ---
    ---tsx(风险)
      function MyComponent() {
        // ...
        // 不要在渲染期间写入 ref
        myRef.current = 123
        // ...
        // 不要在渲染期间读取 ref
        return <h1>{myOtherRef.current}</h1>
      }

      // 可以在 事件处理程序或者 Effect 中读取和写入 ref
      function MyComponent() {
        // ...
        useEffect(() => {
          // 可以在 Effect 中读取和写入 ref
          myRef.current = 123
        });
        // ...
        function handleClick() {
          // 可以在事件处理程序中读取和写入 ref
          doSomething(myOtherRef.current)
        }
        // ...
      }
    ---
  
  `}}</Code>
  <Line></Line>

  <Title>###数据管理</Title>
  <Title :hide="true">####useContext</Title>
  <Api>
    @api - useContext(context)
    @desc - 通过`React.createContext`创建上下文后，为组件提供一个便捷获取数据的方式
    @params - [context : Context] 默认设置的值，即如果后续没有显式设置`provider`的`value`时该值会被启用
    @return - [{ Provide, Consumer }] 返回一个包含`Provide`和`Consumer` 的对象，用前者设置要传递的数据，后者原用于获取数据，目前已不使用，统一用`useContext`获取数据
  </Api>
  <Quote>从 provide 接收到不同的 value 后，会重新渲染使用该特定 context 的所有子组件（因此滥用会有性能问题），使用`memo`跳过重新渲染也并不妨碍子组件接收到新的 context 值</Quote>
  <Code>{{`
    ---tsx(传递数据)
      const CounterContext = createContext()

      function CounterProvider({ children }) {  
        const [count, setCount] = useState(0)  

        // 提供 count 和 setCount 给子组件使用  
        return (  
          <CounterContext.Provider value=\{{ count, setCount }\}>  
            {children}  
          </CounterContext.Provider>  
        )  
      }  

      function IncrementButton() {  
        const { setCount } = useContext(CounterContext)  

        return <button onClick={() => setCount(c => c + 1)}>Increment</button>  
      }  

      function DisplayCount() {  
        const { count } = useContext(CounterContext)  

        return <p>Count: {count}</p>  
      }  

      function App() {  
        return (  
          <CounterProvider>  
            <DisplayCount />  
            <IncrementButton />  
          </CounterProvider>  
        )  
      }  
    ---
    ---tsx(嵌套)
      // 当多级context嵌套时，嵌套在内层的 context 会覆盖外层的
      import { ThemeContext } from './context.js'

      export const App = () => {
        return (
          <ThemeContext.Provider value='dark'>
            <ThemeContext.Provider value='light'>
              <MyComponent />
            </ThemeContext.Provider>
          </ThemeContext.Provider>
        )
      }
    ---
  `}}</Code>
  <Line></Line>
  <Title :hide="true">####useReducer</Title>
  <Api>
    @api - useReducer(reducer, initState, initFn?)
    @desc - 用于添加一个 reducer 以管理复杂的状态逻辑和控制全局数据
    @params - [reducer : (state, action) => state] 一个用于更新 state 的纯函数，接收当前 state 和一个 aciton 并返回更新后的 state
    @params - [initState : any] 指定初始状态的 state
    @params - [initFn? : (initState) => state] 用于计算初始 state 的函数，接收`initState`并返回计算后的 state，如果存在该参数则以该函数的结果作为初始 state 值
    @return - [[state, dispatch]] 返回一个包含当前 state 和一个用于更新 state 并触发组件重新渲染的 dispatch 方法
  </Api>
  <Code>{{`
    ---tsx(计数)
      function reducer(state, action) {  
        switch (action.type) {  
          case 'increment':  
            return { count: state.count + 1 }  
          case 'decrement':  
            return { count: state.count - 1 }  
          default:  
            throw new Error()  
        }  
      }

      function Counter() {  
        const initState = { count: 0 }  
        const [state, dispatch] = useReducer(reducer, initState)  

        return (  
          <div>  
            <p>Count: {state.count}</p>  
            <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>  
            <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>  
          </div>  
        )  
      }  
    ---
    ---tsx(控制表单)
      function formReducer(state, action) {  
        switch (action.type) {  
          case 'updateField':  
            return {  
              ...state,  
              [action.field]: action.value,  
            }  
          case 'reset':  
            return action.initialState  
          default:  
            throw new Error()  
        }  
      }  

      function Form() {  
        const initialState = { name: '', email: '', password: '' }  
        const [state, dispatch] = useReducer(formReducer, initialState)  

        return (  
          <div>  
            <label>  
              Name:  
              <input type="text" value={state.name} onChange={(e) => dispatch({ type: 'updateField', field: 'name', value: e.target.value })}  />  
            </label>  
            <label>  
              Email:  
              <input type="text" value={state.email} onChange={(e) => dispatch({ type: 'updateField', field: 'email', value: e.target.value })}  />  
            </label>  
            <label>  
              Password:  
              <input type="password" value={state.password} onChange={(e) => dispatch({ type: 'updateField', field: 'password', value: e.target.value })} />  
            </label>  
            <button onClick={() => dispatch({ type: 'reset', initialState })}>Reset</button>  
          </div>  
        )  
      }  
    ---
  `}}</Code>
  <Line></Line>

  <Title>###优化</Title>
  <Title :hide="true">####useMemo</Title>
  <Api>
    @api - useMemo(value, deps)
    @desc - 用于缓存一个计算结果，并且仅在其依赖项变化时才重新计算，避免每次渲染都进行高开销的计算或创建大量新对象
    @params - [value : () => any] 要缓存计算值的，不带参数的纯函数，在组件首次渲染时会调用该函数，如果`deps`没有发生变化则在组件更新时返回相同数据
    @params - [deps : any[ ]] 所依赖的响应式值列表，可以是 props、state 以及直接声明在组件内部的变量和函数等
    @return - [Function] 返回的即是传入的`fn`内容方法
  </Api>
  <Code>{{`
    ---tsx(避免子组件不必要渲染)
      function ParentComponent() {  
        const [count, setCount] = useState(0)  

        const memoizedObject = useMemo(() => ({ foo: 'bar' }), []) // 空数组表示这个对象在整个组件生命周期中保持不变  

        return (  
          <div>  
            <button onClick={() => setCount(count + 1)}>Increment</button>  
            <ChildComponent obj={memoizedObject} />  
          </div>  
        )  
      }

    ---
    ---tsx(缓存高开销计算)
      function MyComponent({ a, b }) {  
        const expensiveComputation = (a, b) => {  
          // 假设这是一个昂贵的计算  
          return a + b  
        }  

        const memoizedValue = useMemo(() => expensiveComputation(a, b), [a, b])  

        return (  
          <div>  
            <p>Memoized Value: {memoizedValue}</p>  
          </div>  
        )  
      }

    ---
  
  `}}</Code>
  <Line></Line>
  <Title :hide="true">####useCallback</Title>
  <Api>
    @api - useCallback(fn, deps)
    @desc - 用于缓存一个函数，并且仅在其依赖项变化时才重新创建该函数，避免因函数变化导致的不必要的子组件重新渲染或性能开销
    @params - [fn : Function] 缓存的函数，初次渲染组件时会将该方法返回（不会直接调用方法），当组件更新时如果`deps`没有发生改变则每次都返回相同的函数
    @params - [deps : any[ ]] 所依赖的响应式值列表，可以是 props、state 以及直接声明在组件内部的变量和函数等
    @return - [Function] 返回的即是传入的`fn`内容方法
  </Api>
  <Quote>
    useCallback 想发挥作用具有一定条件，父组件更新会导致子组件也更新，首先需要通过一定手段让子组件避免也更新如`React.memo`（控制子组件仅 props 变化时才更新组件），
    然后父组件传递一个方法给子组件时，由于父组件每次每次更新都会导致这个方法更新，所以子组件实际上还是会更新，为了避免就使用`useCallback`来达到真正意义上的优化
  </Quote>
  <Code>{{`
    ---tsx(优化传递给子组件的回调函数)
      const ChildComponent = React.memo(function ChildComponent({ onIncrement, multipliedValue }) {  
        return (  
          <div>  
            <button onClick={onIncrement}>Increment from Child</button>  
            <p>Multiplied Value in Child: {multipliedValue}</p>  
          </div>  
        )  
      }, (prevProps, nextProps) => {  
        // 只在 multipliedValue 或 onIncrement 改变时重新渲染  
        return prevProps.multipliedValue === nextProps.multipliedValue &&  
              prevProps.onIncrement === nextProps.onIncrement  
      })  

      function ParentComponent() {  
        const [count, setCount] = useState(0)  
        const [multiplier, setMultiplier] = useState(1)  

        const increment = useCallback(() => {  
          setCount(c => c + 1)  
        }, [])  

        const multipliedValue = useMemo(() => count * multiplier, [count, multiplier])  

        return (  
          <div>  
            <ChildComponent onIncrement={increment} multipliedValue={multipliedValue} />  
          </div>  
        )  
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