<template>
  <Tip>最后更新 - 2024.06.15</Tip>
  <Title>#容器编排</Title>
  <Refer :source="[
    { desc: '官方docker compose文档', url: 'https://docs.docker.com/compose/'},
    { desc: '容器集群编排详解', url: 'https://juejin.cn/post/7111895817278980127' },
  ]"></Refer>
  <Text>
    很多时候，我们的项目都需要启动多个容器，如果每个容器都手动启动则十分低效使用，
    `docker compose`是一个用于定义和运行多容器应用程序的工具，可以管理多个容器的运行、停止及构建
  </Text>
  <Code>{{`
    ---bash(安装docker compose)
      sudo yum install docker-compose-plugin
    ---
  `}}</Code>
  <Quote>在安装 docker 的时候会顺便把 docker compose 也安装掉，因此可以先试试指令`docker compose`看看服务器终端是否有提示</Quote>
  <Line></Line>

  <Title>##执行文件</Title>
  <Text>docker compose通过使用`yaml`文件来配置应用程序的服务，一般为项目根目录下的`docker-compose.yml`</Text>
  <Table>
    #docker compose 服务指令
    |指令|功能|options|
    ------------------
    |`docker compose up`|启动并运行服务|`-d`: 在后台运行|
    |`docker compose down`|停止并刪除服务||
    |`docker compose build`|构建或重新构建服务||
    |`docker-compose ps`|列出所有定义的服务及其当前状态||
    |`docker compose down`|推送本地镜像到dockerHub||
    |`docker compose down`|推送本地镜像到dockerHub||
  </Table>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Code, Line, Title, Text, Table, Image, List, Refer, Quote, Tip } from '../../../../page/component/note'

const emits = defineEmits([ 'noteContentMounted' ])

onMounted(() => {
  emits('noteContentMounted')
})

</script>



<style lang="less">

</style>