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