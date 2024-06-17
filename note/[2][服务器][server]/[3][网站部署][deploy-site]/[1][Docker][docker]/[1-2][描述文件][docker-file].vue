<template>
  <Tip>最后更新 - 2024.06.15</Tip>
  <Title>#描述文件</Title>
  <Refer :source="[
    { desc: 'DockerFile指令使用说明', url: 'https://docs.docker.com/engine/reference/builder/#from' },
    { desc: 'DockerFile指令最佳实践', url: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#dockerfile-instructions' },
  ]"></Refer>
  <Text>
    Docker 描述文件`dockerFile`可以让 docker 根据描述文件内的信息快捷构建出一个镜像环境，
    它包含了一组连续执行的命令，使之可以自定义镜像
  </Text>
  <Text>构建成功后的镜像可以通过`docker image ls`来查看，并且可以在任意位置直接通过`docker run`使用</Text>
  <Code>{{`
    ---bash(使用dockerFile构建镜像)
      # 构建指令(注意末尾有个.)
      docker build -f <dockerFilePath> -t <imageName>[:version] .

      # 如通过当前路径下的 dockerfile-demo 描述文件来构建镜像 dmeo 
      docker build -f dockerfile-demo -t demo .
    ---
  `}}</Code>
  <Line></Line>

  <Title>##指令</Title>
  <Text>dockerFile 的指令需要全大写表示</Text>
  <Table>
    #dockeFile 常用指令
    |指令|规则|功能|备注|
    -------------------
    |FROM|{{'`FROM <image>` \\| `FROM <image>:<tag>`'}}|指定基础镜像|必须为首条命令|
    |ENV|{{'`ENV <key> <value>` \\| `ENV <key>=<value>`'}}|指定容器环境变量|供其他指令使用其变量信息，通过`${key} \| $key`引用|
    |WORKDIR|{{'`WORKDIR <path>`'}}|指定容器工作目录|后续指令都基于这个目录下运行(如COPY)，不存在该目录则自动创建|
    |ADD|{{'`ADD <src> <dest>`'}}|将文件添加到容器中|可以访问网络资源并自动下载；本地的压缩文件会自动解压，网络文件不会|
    |COPY|{{'`COPY <src> <dest>`'}}|将本地文件添加到容器中|不可访问网络资源也不会自动解压|
    |RUN|{{'`RUN <command>` \\| `RUN ["executable", "param1", "param2"]`'}}|构建时执行并生成新镜像||
    |EXPOSE|{{'`EXPOSE <port>`'}}|声明容器占用端口|不会在docker宿主机自动进行端口映射，需要手动映射|
    |CMD|{{'`CMD <command>` \\| `CMD ["executable", "param1", "param2"]` \\| `CMD ["param1", "param2"]`'}}|在容器启动时作为第一条命令|dockerFile中仅最后声明的CMD命令会生效,会被 docker run 后的命令覆盖|
    |ENTRYPOINT|{{'`ENTRYPOINT <command>` \\| `ENTRYPOINT ["executable", "param1", "param2"]`'}}|在容器启动时作为第一条命令|dockerFile中仅最后声明的CMD命令会生效,不会被 docker run 后的命令覆盖|
  </Table>
  <Line></Line>

  <Title>##小练习</Title>
  <Text>下面来简单试一下一个小 demo，在一台没有 node 相关环境下的服务器，启动一个 node 服务并且可以在外部通过 ip 及端口访问到这个服务吧~</Text>
  <Code>{{`
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
  <Text>将该项目文件放到指定服务器中，然后尝试构建并运行，如果能访问到该服务，说明 docker 已顺利完成了它的工作</Text>
  <Code>{{`
    ---bash(link start!!)
      # 构建
      docker build -f dockerfile -t demo .

      # 运行(需要将容器的3000端口映射到服务器的3000端口)
      docker run --rm -it -p 3000:3000 demo
    ---
  `}}</Code>
  <Line></Line>
  <Title>##高级技巧</Title>
  <Title>###多阶段构建</Title>
  <Text>在 dockerfile 中，可以使用多个`FROM`指令，每个该指令定义一个新的构建阶段</Text>
  <Text>一般场景下，使用多阶段构建是为了分隔文件，如在前面的构建阶段中执行复杂的构建步骤，并在后面的构建阶段中只复制必要文件，这样就可以避免在最终镜像中包含不必要的构建工具和中间文件</Text>
  <Text>可以使用`as`关键字定义一个阶段的名字，来构成多阶段构建</Text>
  <Quote>待学习。。。</Quote>
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