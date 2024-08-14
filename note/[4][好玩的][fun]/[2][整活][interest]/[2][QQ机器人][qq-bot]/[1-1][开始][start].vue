<template>
  <Tip>最后更新 - 2024.08.02</Tip>
  <Title>#开始</Title>
  <Refer :source="[
    { desc: '官方机器人文档', url: 'https://bot.q.qq.com/wiki'},
    { desc: '官方账号注册及机器人管理平台', url: 'https://q.qq.com/#/' },
    { desc: 'koshi 框架', url: 'https://koishi.chat/zh-CN/' }
  ]"></Refer>
  <Text>目前官方推出了自己的机器人协议，把`cq-http`协议禁了，所以本文基于官方的协议，并通过`koishi`框架来编写功能</Text>
  <Line></Line>

  <Title>##准备机器人</Title>
  <Text>目前官方机器人只给个人用户的机器人开放在QQ频道以及私聊中使用，QQ群可能后续会开启，所以目前的所有机器人功能都是基于频道中测试和使用的</Text>
  <Quote>机器人主要在频道的讨论组中使用，但是目前最新版QQ关闭了在频道中创建讨论组的功能，因此如果要创建讨论组要使用旧版QQ客户端去创建，有点搞...</Quote>
  <Text>为了将机器人拉入自己的频道讨论组，并进行后续开发，需要做以下准备：</Text>
  <List>前往[官方平台](https://q.qq.com/#/)注册账户并创建机器人</List>
  <List>在机器人详情中设定`开发-沙箱配置`对应QQ频道，并选择机器人类型为`公域机器人`，以此可以让对应频道可以拉机器人进来</List>
  <List>在`开发-开发设置`中配置启动服务的服务器 ip 白名单</List>
  <Text>更具体的操作可以参考[这个视频](https://www.bilibili.com/video/BV1Vr421L7o6)</Text>
  <Line></Line>

  <Title>##对接QQ</Title>
  <Text>这里使用 koishi 连接机器人以控制机器人的逻辑</Text>
  <Text>首先需要初始化一个 koishi 项目，官方提供了创建项目的脚手架，首先确保服务器已拥有 node 环境，该框架使用 ts 语言进行开发，对切图仔友好~</Text>
  <Code>{{`
    ---bash(创建项目)
      npm init koishi@latest
    ---
  `}}</Code>
  <Text>koishi 提供了可视化配置的方案，启动项目后更改对应设置，会自动映射到项目的文件上，不需要直接去操作文件内容，使用新插件时也会自动填入`package.json`依赖并自动下载，很是方便~</Text>
  <Text>
    通过官方的[QQ适配器](https://koishi.chat/zh-CN/plugins/adapter/qq.html)说明，从启动项目中找到`插件配置 → adapter-qq`进行设置，填入刚准备好的机器人信息，
    然后需要订阅机器人事件，具体事件类型说明可以从[机器人平台文档](https://bot.q.qq.com/wiki/develop/api-v2/dev-prepare/interface-framework/event-emit.html#websocket-%E6%96%B9%E5%BC%8F)找到，
    详细操作可以参考[这个视频](https://www.bilibili.com/video/BV1HgeQeoEp1)或者[koishi接入教程](https://forum.koishi.xyz/t/topic/810)
  </Text>
  <Image :width="400" src="https://morgiana.oss-cn-beijing.aliyuncs.com/note/fun-qq-bot-01.png"></Image>

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