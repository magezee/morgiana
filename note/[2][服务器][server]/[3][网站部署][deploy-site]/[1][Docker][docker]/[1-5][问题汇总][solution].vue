<template>
  <Tip>最后更新 - 2024.06.17</Tip>
  <Title>#问题汇总</Title>
  <Text>这里主要用于记录在我使用过程中遇到的一些问题以及尝试解决的方案~~~</Text>
  <Line></Line>
  <Title>##无法拉取镜像</Title>
  <Text>
    无法拉取镜像的原因有很多，但是能真正解决的方法却没几个，以下是一些常用解决方案：
    <List>尝试命令`docker login`进行登录，提高下载速度</List>
    <List>尝试更换镜像源，使用国内镜像源</List>
    <List>手动科学访问 docker hub 并下载镜像压缩包，然后手动上传到服务器中解压以获得镜像</List>
  </Text>
  <Text>由于目前国内基本上已经把 docker 给拦掉了，因此这里主要介绍第三种方案，其他方案目前暂时都不可用</Text>
  <Text>此方案需要先给本地电脑安装 docker 服务，我这里直接下载了官方的 `docker desktop`，然后下载想要的镜像（我这里是 node 镜像），最后传到服务器上读取镜像</Text>
  <Code>{{`
    ---bash(导出和读取镜像)
      # 该命令会在执行文件的目录下生成 node.tar 压缩包
      docker save -o node.tar node:latest

      # 上传服务器后再读取
      docker load -i ./node.tar
    ---
  `}}</Code>
  <Line></Line>

  <Title>##无法更新内容</Title>
  <Text>我项目改动后，直接上传到`git hub`，然后通过`git pull`的方式更新内容，并重新执行`docker compose`，发现项目内容并没有改动，这是 docker 缓存了镜像文件导致的</Text>
  <Text>因此需要手动刪除旧容器及其旧镜像，再重新通过`docker compose`构建镜像并启动容器来达到更新的目的，为了方便实施，可以直接写一个`shell`脚本</Text>
  <Code>{{`
    ---shell(docker-update.sh)
      #!/bin/bash

      IMAGE_NAME="你需要刪除的镜像名"
      HOST_PORT=主机端口
      CONTAINER_PORT=容器端口

      echo "停止并刪除旧容器..."
      docker stop $(docker ps -a -q --filter ancestor=$IMAGE_NAME) && docker rm $(docker ps -a -q --filter ancestor=$IMAGE_NAME)

      echo "刪除旧镜像..."
      docker rmi -f $IMAGE_NAME

      echo "执行docker compose"
      docker compose up -d

      echo "Done!"
    ---
  `}}</Code>
  <Text>如果发现没有权限执行，则给个权限`chmod +x update-docker.sh`，以后启动docker就直接运行这个文件即可~</Text>

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