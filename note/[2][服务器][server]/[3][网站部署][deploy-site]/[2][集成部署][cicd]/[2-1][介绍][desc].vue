<template>
  <Tip>最后更新 - 2024.06.20</Tip>
  <Title>#介绍</Title>
  <Text>这里的集成部署指的是网站部署中的`CI/CD`，即持续集成/持续部署`Continuous Integration/Continuous Deployment`</Text>
  <List>持续集成：这个环节和测试环境相关，比如将代码推送到测试环境时，会执行自动化测试行为，确保快速发现问题</List>
  <List>持续部署：这个环节和生产环境相关，持续集成的基础上（确保无 bug）执行代码的构建和部署</List>
  <Text>
    **结论**：简单来说，CI/CD 的目的是为了更方便地部署项目，它可以是手动通过终端命令来主动触发，也可以是在远程仓库代码发生变动时触发，
    触发时会执行一系列自定义的操作，如自动化测试，项目构建，项目部署等内容，多的概念这里就不讨论了，有兴趣自行了解~
  </Text>
  <Line></Line>
  
  <Title>##方案</Title>
  <Text>目前比较流行的集成部署方案包含以下几种：</Text>
  <List>`Travis CI` ： 主要用于 GitHub 项目，支持多种编程语言，并提供简单配置文件来定义构建和测试流程</List>
  <List>`GitLab CI/CD` ： 提供了内置的 CI/CD 管道，可以与 GitLab 的版本控制系统紧密集成，非常适合 DevOps 实践</List>
  <List>`Jenkins` ： 开源的自动化服务器，广泛用于CI/CD，同时支持各种插件和配置，以适应不同的开发工作流程和环境</List>
  <List>`Azure DevOps` ： 提供了一个完整的开发工具链，可以进行代码管理、构建、测试和发布自动化</List>
  <Text>后面的笔记内容可能会基于 Github 上的使用来写</Text>
  <Line></Line>

  <Title>##概念</Title>
  <Text>
    尽管不同的方案中的`CI/CD`在具体实现和术语上会略有不同，但核心理念都是一致的，
    即：通过自动化`Pipeline`，将代码从提交到生产部署的整个过程变得更加高效和可靠
  </Text>
  <Text>下面介绍一些重要的概念</Text>
  <Text>**Runner**</Text>
  <Text>Runner 一般指代一台服务器或者虚拟机，它用于执行`CI/CD`中的`pipeline`任务</Text>
  <Text>在不同的方案中，都有相关教程如何去把一台服务器设定为 Runner，通常包含以下三个步骤：</Text>
  <List>在特定服务器或虚拟机中下载对应的 Runner 程序</List>
  <List>为了能和服务器连接上，需要在所选方案平台中进行 Runner 注册</List>
  <List>在机器中启动 Runner 服务</List>
  <Line></Line>

  <Text>**Pipeline**</Text>
  <Text>Pipeline 是一组按顺序或并行执行的`jobs`，它定义了从代码提交到最终部署的整个流程，比如代码构建、测试、打包和部署</Text>
  <Text>在不同的平台方案中，都会使用一个`yaml`文件用于定义整个工作流程，例如一个`GitLab CI`的简单例子如下</Text>
  <Code>{{`
    ---yaml(.gitlab-ci.yml)
      # 定义pipeline的不同阶段
      stages:
        - build
        - test
        - deploy

      # 定义在每个阶段中需要执行的job
      build_job:
        stage: build
        # 定义job执行的命令或脚本
        script:
          - echo "Building..."

      test_job:
        stage: test
        script:
          - echo "Running tests..."

      deploy_job:
        stage: deploy
        script:
          - echo "Deploying..."
        # 定义job执行的条件，仅在main分支上执行
        only:
          - main
    ---
  `}}</Code>
  <Line></Line>

  <Text>**Stages**</Text>
  <Text>一个完整的`pipeline`由多个`stages`构成，每个阶段包含需要执行的若干个`jobs`，这些阶段可以表示整个开发生命周期中的不同步骤</Text>
  <Text>这些阶段可以按照顺序执行，也可以并行执行</Text>
  <Line></Line>

  <Text>**Jobs**</Text>
  <Text>一个`job`即一个具体的可执行单元，可能是一个脚本、命令或配置文件，通常包含以下部分：</Text>
  <List>命令：执行的具体操作，如运行某个脚本</List>
  <List>环境：执行的环境配置，如具体编程语言或框架</List>
  <List>依赖：任务的输入和输出，即需要在不同任务之间传递的文件或工件</List>
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