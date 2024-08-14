<template>
  <Tip>最后更新 - 2024.07.29</Tip>
  <Title>#对象相关</Title>
  <Title>###入参取值</Title>
  <Text>给出下面代码，要求补充函数满足输出条件</Text>
  <Text>思路：</Text>
  <List>要考虑到数组取值的情况，需要格式化数组为对象取值方式</List>
  <List>可以直接读取深层对象的值，所以需要把对象按需求方式扁平化</List>
  <List>参数为任意，如果取不到值需要返回 undefined</List>
  <Code>{{`
    ---ts(问题)
      function get() {
        // 待补充
      }

      const obj = { 
        selector: {
          to: { toutiao: 'FEcoder' },
          target: [1, 2, {name: 'byted'}]
        }
      }

      const result = get(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name')    
      console.log(result)   // ['FEcode', 1, 'byted']

    ---
    ---ts(解答)
      function get(obj, ...paths: string[]) {
        const formatPaths = []

        // 格式化path
        paths.forEach((path) => {
          // 把target[0]变成target.0后续统一再格式化
          const formatPath = path.replace(/\[(\d+)\]/g, '.$1')
          formatPaths.push(formatPath)
        })

        // 扁平化对象
        const flatObj = (maybeObj, orginObj) => {
          if (typeof maybeObj === 'object' && !Array.isArray(maybeObj)) {
            Object.keys(maybeObj).forEach((key) => {
              orginObj[key] = maybeObj[key]
              flatObj(maybeObj[key], orginObj)
            })
          }
        }

        const flatObjResult = {}
        flatObj(obj, flatObjResult)

        return formatPaths.reduce((pre, cur: string) => {
          const pathList = cur.split('.')
          let curValue = flatObjResult

          // 按照要求一个个塞进查找数据
          for(let i=0; i<pathList.length; i++) {
            if(curValue[pathList[i]]) {
              curValue = curValue[pathList[i]]

              if (i === pathList.length -1) {
                pre.push(curValue)
              } 

            } else {
              pre.push(undefined)
              return pre
            }
          }
          return pre
        }, [])
      }

      const obj = { 
        selector: {
          to: { toutiao: 'FEcoder' },
          target: [1, 2, {name: 'byted'}]
        }
      }

      const result = get(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name')    
      console.log(result)   // ['FEcode', 1, 'byted']
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