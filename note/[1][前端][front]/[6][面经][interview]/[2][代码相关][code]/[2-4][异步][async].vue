<template>
  <Tip>最后更新 - 2024.08.11</Tip>
  <Title>#异步</Title>
  <Title>###最大请求数</Title>
  <Text>在大量并发请求中，控制单次最多请求 max 次，如果有任务完成，则立即进行下一个请求</Text>
  <Text>思路：使用任务队列的方式去做，而不是考虑`Promise.all( )`啥的</Text>
  <Code>{{`
    ---ts(例子)
      const mockFetch = (time, id) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log(id)
            resolve(true)
          }, time)
        })
      }

      class Scheduler {
        taskQueue: Array<()=>Promise<any>>
        limit: number
        activeTaskCount: number

        constructor(limit) {
          this.taskQueue = []
          this.limit = limit
          this.activeTaskCount = 0
        }

        add(task: ()=>Promise<any>) {
          const promiseTask = () => new Promise((resovle, reject) => {
            task().then(resovle, reject)
          })
          this.taskQueue.push(promiseTask) 
          this.run()  // 在每次添加任务时，都尝试开始运行
        }

        run() {
          if(this.activeTaskCount < this.limit && this.taskQueue.length > 0) {
            this.activeTaskCount += 1
            const task = this.taskQueue.shift()
            task().finally(() => {
              this.activeTaskCount -= 1
              this.run()
            })
          }
        }
      }

      const scheduler = new Scheduler(2)

      scheduler.add(() => mockFetch(1000, 1))
      scheduler.add(() => mockFetch(1000, 2))
      scheduler.add(() => mockFetch(1000, 3))
      scheduler.add(() => mockFetch(1000, 4))

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