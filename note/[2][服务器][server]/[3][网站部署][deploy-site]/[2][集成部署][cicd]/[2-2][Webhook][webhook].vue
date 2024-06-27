<template>
  <Tip>最后更新 - 2024.06.22</Tip>
  <Title>#Webhook</Title>
  <Text>Webhook 和 CI/CD 是两种不同的机制，但是他们可以协同工作以实现自动化工作流</Text>
  <Text>它是一种用户定义的 HTTP 回调，在事件触发时（如将代码推送到远程仓库），向指定接口发送一个`post`请求</Text>
  <List>Webhook 主要用于通知和触发动作，如代码库更新时，通知服务器去执行相应的构建、测试和部署工作（可以单独使用而不配合CI/CD）</List>
  <List>CI/CD 负责整个自动化流程</List>
  <Quote>webhook 主要是轻量与灵活，只需要一个接口，它便可以与外部的服务集成，而 CI/CD 往往深度集成于各种方案平台，同时也提供了复杂的能力</Quote>
  <Line></Line>

  <Title>##使用</Title>
  <Text>下面以`Github`上的项目为例，说明 webhook 的简单使用</Text>
  <Text>首先需要去项目仓库中设置用于接收 webhook 发出的接口地址，如下图所示</Text>
  <Quote>`Content type`建议选择为`application/json`</Quote>
  <Image src="https://morgiana.oss-cn-beijing.aliyuncs.com/note/webhook-01.png" :width="500"></Image>
  <Text>然后便可去编写用于接收请求的`post`接口，下面例子实现了当触发 webhook 时，服务器通过接口内部逻辑来实现重新拉取最新代码并且重新启动项目</Text>
  <Code>{{`
    ---ts(node接口)
      import { Router }  from 'express'
      import { exec } from 'child_process'

      const router = Router()

      router.post('/webhook', async(req, res) => {
        const payload = req.body

        // 推送到main分支才触发
        if (payload?.ref === 'refs/heads/main') {
          process.chdir('/project/morgiana')  // 修改进程工作目录

          // 开始同步更新
          exec('pm2 stop 0 && git pull && pm2 start npm -- run start', (err, stdout, stderr) => {
            if (err) {
              console.error(\`指令报错: \${stderr}\`)
              return res.status(500).send(\`Error: \${stderr}\`)
            }
        
            console.log(\`终端输出: \${stdout}\`);
            res.status(200).send('同步完成~')
            
          })
        } else {
          res.status(200).send('非执行分支')
        }
      })
    ---
  `}}</Code>
  <Quote>一般为了方便，服务器中会同时存在两个服务，一个是项目本体服务，一个是监听 webhook 的服务，当触发后，通过该服务手动关停项目本体服务并拉取最新代码最后重新启动服务</Quote>
  <Text>在设置的 webhook 详情中，可以看到每次触发时的状态，比如发送的请求信息，以及请求结果</Text>
  <Image src="https://morgiana.oss-cn-beijing.aliyuncs.com/note/webhook-02.png" :width="500"></Image>
  <Quote>如果执行一些耗时的任务，可能会直接返回`504`超时错误码，为了好看可能需要先返回`200`状态码再执行耗时操作，但是这样就看不到一些执行时的信息了，待解决~~</Quote>
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