<template>
  <Title>#引言</Title>
  <Code>>{{`
    ---docker(/dockerfile)
      # 使用node环境,docker会自动从dockerhub下载对应的镜像
      FROM node
      # 设定docker工作根目录为app
      WORKDIR /app
      # 将相对于dockerfile路径的本地文件复制到容器相对于app目录下的指定位置
      COPY *.json ./
      COPY src /app/src
      # 下载运行依赖包
      RUN npm install
      RUN npm install -g nodemon ts-node
      # 将服务运行在容器的3000端口
      EXPOSE 3000
      # 构建完毕后执行相关npm命令启动服务
      CMD ["npm","run","dev"]
    ---
    ---json(/package.json)
      {
        "name": "dockerfile-test",
        "scripts": {
          "dev": "nodemon ./src/app.ts"
        },
        "dependencies": {
          "@types/express": "^4.17.13",
          "express": "^4.18.1",
          "typescript": "^4.7.4"
        }
      }
    ---
    ---ts(/src/app.ts)
      import express from 'express'

      const app = express()

      app.get('/', (req, res) => {
        res.send('测试dockerfile')
      })

      app.listen(3000, () => {
        console.log('连接成功')
      })
    ---
  `}}</Code>
  <Title>##引言</Title>
  <Text>将该项目文件放到指定服务器中，然后尝试构建并运行，如果能访问到该服务，说明 docker 已顺利完成了它的工作</Text>
   <Code>{{`
      ---bash(11)
        # 构建
        docker build -f dockerfile -t demo .
        # 运行(需要将容器的3000端口映射到服务器的3000端口)
        docker run --rm -it -p 3000:3000 demo
      ---
   `}}
  </Code>
  <Line />
  <Text>`11`</Text>
  <Text>将该项目文件放到指定服务器中，然后尝试构建并运行，如果能访问到该服务，说明 docker 已顺利完成了它的工作</Text>
  <Text>将该项目文件放到指定服务器中，然后尝试构建并运行，如果能访问到该服务，说明 docker 已顺利完成了它的工作</Text>
  <Text>将该项目文件放到指定服务器中，然后尝试构建并运行，如果能访问到该服务，说明 docker 已顺利完成了它的工作</Text>
  <Text>将该项目文件放到指定服务器中，然后尝试构建并运行，如果能访问到该服务，说明 docker 已顺利完成了它的工作</Text>
  <Text>将该项目文件放到指定服务器中，然后尝试构建并运行，如果能访问到该服务，说明 docker 已顺利完成了它的工作</Text>
  <Text>将该项目文件放到指定服务器中，然后尝试构建并运行，如果能访问到该服务，说明 docker 已顺利完成了它的工作</Text>
  <Text>将该项目文件放到指定服务器中，然后尝试构建并运行，如果能访问到该服务，说明 docker 已顺利完成了它的工作</Text>
  <Text>将该项目文件放到指定服务器中，然后尝试构建并运行，如果能访问到该服务，说明 docker 已顺利完成了它的工作</Text>
  <Text>将该项目文件放到指定服务器中，然后尝试构建并运行，如果能访问到该服务，说明 docker 已顺利完成了它的工作</Text>
  <Title>###引言</Title>
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
  <Image src="https://img-blog.csdnimg.cn/2021061115030396.png" :width="550"></Image>
  <Text>
    
  </Text>
  <List>在自己电脑上安装数据库，但该方式的致命缺点是要保证电脑不能关闭，否则数据库服务也会关闭</List>
  <List>在购买的云服务器上手动安装数据库</List>
  <List>
    直接购买云数据库，啥也不用管，直接使用
    <List>
      111
      <List>222</List>
    </List>
  </List>
  <Refer :source="[
    { desc: '了不起的 tsconfig 指南【博客】', url: 'https://segmentfault.com/a/1190000022809326/' },
    { desc: 'compilerOptions 详细配置说明【官网】', url: 'https://www.typescriptlang.org/docs/handbook/compiler-options-in-msbuild.html' },
  ]"></Refer>
  <Quote>构`造函`数的静态属性与原型、实例没有作用域的关联, 因此静态属性不会影响原型及实例</Quote>
  <Text>官网有各个系统的[安装教程](https://www.mongodb.com/docs/manual/installation/)安装教程</Text>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Code, Line, Title, Text, Table, Image, List, Refer, Quote } from '../../../../page/component/note'

const emits = defineEmits([ 'noteContentMounted' ])

onMounted(() => {
  emits('noteContentMounted')
})

// 动态加载组件


</script>



<style lang="less">

</style>