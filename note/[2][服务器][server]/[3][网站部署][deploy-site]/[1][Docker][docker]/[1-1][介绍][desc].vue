<template>
  <Tip>最后更新 - 2024.06.15</Tip>
  <Title>#介绍</Title>
  <Refer :source="[
    { desc: 'Docker官网', url: 'https://www.docker.com/' },
  ]"></Refer>
  <Text>Docker 是一个容器创建和管理工具，简单来说就是在服务器中运行一个和外部完全隔离且满足特定程序环境的容器</Text>
  <Text>这样做的好处就是一个项目在不同的服务器中跑可以不用考虑各个服务器间环境的差异性，仅需统一安装 docker 环境，然后拉取同样的镜像并运行，就可以得到一套完全相同执行环境的容器供程序执行</Text>
  <Line></Line>

  <Title>##安装</Title>
  <Refer :source="[
    { desc: 'CentOS安装Docker', url: 'https://docs.docker.com/engine/install/centos/#prerequisites' },
  ]"></Refer>
  <Text>各个系统的安装套路都不一样，下面仅演示 CentOS 下的安装，其他的具体去官网搜搜~~</Text>
  <Text>跟着下面的命令敲完之后在终端输入`docker`有信息则成功了</Text>
  <Code>{{`
    ---bash(安装docker命令步骤)
      # 1.安装 yum-utils
      sudo yum install -y yum-utils

      # 2.设置存储库
      sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

      # 3.安装 docker 引擎
      sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
    ---
  `}}</Code>
  <Quote>
    有时候会出现无法找到地址的问题，这是国内无法访问到目标地址的缘故，因此可以手动设置为国内镜像源<br/>
    例如：`sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo`
  </Quote>
  <Text>安装完成后可以开始设置docker服务了</Text>
  <Code>{{`
    ---bash(docker服务指令[systemctl老套路])
      # 启动 docker
      systemctl start docker

      # 重启 docker
      systemctl restart docker

      # 停止 docker
      systemctl stop docker

      # 查看 docker 服务状态
      systemctl status docker

      # 设置开机自启
      systemctl enable docker
    ---
  `}}</Code>
  <Line></Line>

  <Title>##镜像</Title>
  <Refer :source="[
    { desc: 'DockerHub', url: 'https://hub.docker.com/' },
  ]"></Refer>
  <Text>使用 docker 的最终目的是运行拥有特定环境的容器，镜像就相当于 docker 运行容器的一种模板，用户可以将自己定制的镜像上传到`DockerHub`以供后续使用在不同的服务器下载同一套镜像来运行同一套容器</Text>
  <Text>需要注意的是，一个容器往往需要具备多种执行环境，所以镜像拥有分层的概念，最终运行的镜像往往基于多个镜像组成(如node环境镜像、数据库环境镜像等)</Text>
  <Table>
    #常用镜像相关指令
    |指令|功能|options|
    ------------------
    |`docker images`|列出服务器中所有镜像||
    |{{ '`docker rmi <image>`' }}|删除指定镜像||
    |{{ '`docker search <image>`' }}|在dockerHub上查询指定镜像信息||
    |{{ '`docker pull <image>`' }}|在dockerHub上拉取指定镜像||
    |{{ '`docker push <image>`' }}|推送本地镜像到dockerHub||
    |{{ '`docker push <image>`' }}|推送本地镜像到dockerHub||
  </Table>
  <Quote>表格中的{{ '`<image>`' }}可以为镜像id也可以为名字，下面同理</Quote>
  <Line></Line>

  <Title>##容器</Title>
  <Text>Docker 运行镜像后会生成容器，每个容器都有一套完全独立的环境和文件，容器在运行后即使停止了，内部的文件也会持久保留下来，直到删除该容器</Text>
  <Text>
    和服务器内执行程序一致，在容器内启动的程序也会占用容器端口，如果要访问到容器内程序，需要将容器的端口映射到服务器端口
    (如将程序运行在容器的 3000 端口,需要将容器的 3000 端口映射到服务器的 3000 端口，这样才能通过访问服务器的 3000 端口访问到该程序)
  </Text>
  <Quote>Docker 可以多次运行同一个镜像，这样就会运行多个相同的容器，这个过程类似于面向对象中`new`实例的感觉，每个容器内部是彼此独立的</Quote>
  <Table :nowrapRow="[1]">
    #常用容器相关指令
    |指令|功能|options|
    ------------------
    |{{ '`docker run <image>`' }}|基于镜像运行容器|`-d`: 后台运行; `-it`: 为容器分配伪终端供命令交互; `-p {{ '<serverPort>:<containerPort>' }}`: 端口映射; `-v {{ '<serverPath>:<containerPath>' }}`: 数据卷目录映射; `-rm`: 容器运行停止时立即删除容器|
    |{{ '`docker ps`' }}|查看运行中的容器|`-a`: 查看包括停止的容器|
    |{{ '`docker stop <container>`' }}|停止容器运行||
    |{{ '`docker kill <container>`' }}|强制停止容器运行||
    |{{ '`docker restart <container>`' }}|强制停止容器运行||
    |{{ '`docker rm <container>`' }}|删除容器||
    |{{ '`docker exec <container>`' }}|进入容器,常用于查看容器内部文件信息|`-it`: 为容器分配伪终端供命令交互|
    |{{ '`docker inspect`' }}|查看容器详细信息||
  </Table>
  <Line></Line>

  <Title>##数据管理</Title>
    <Refer :source="[
      { desc: 'Docker的数据管理', url: 'https://juejin.cn/post/7116102339051651108' },
    ]"></Refer>
  <Text>
    Docker 容器中的数据具有以下特点：
    <List>容器间数据相互独立，正常情况下无法完成数据相互通信</List>
    <List>数据很容易随着容器删除而丢失，不保险，无法持久化存储数据，因此充当数据库使用存在困难</List>
  </Text>
  <Quote>目前就 docker 容器是否适合充当数据库使用这个说法具有争议性，这里不进行讨论</Quote>
  <Text>
    为了解决以上问题，需要对容器进行数据管理，其主要方式有两种：
    <List>数据卷</List>
    <List>数据卷容器</List>
  </Text>
  <Quote>待有空继续更新。。。</Quote>
  
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