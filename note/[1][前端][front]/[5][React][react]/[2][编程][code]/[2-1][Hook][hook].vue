<template>
  <Tip>最后更新 - 2024.07.17</Tip>
  <Title>#Hook</Title>
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

  <Title>##Api</Title>
  <Text>Aoi 框架中提供了很多内置的 hook，如`useState`、`useEffect`等，在编写自定义 hook 时应遵循以下规则：</Text>
      
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