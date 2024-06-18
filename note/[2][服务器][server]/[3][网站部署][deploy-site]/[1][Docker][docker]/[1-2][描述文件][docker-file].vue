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

  <Title>###CMD、RUN</Title>
  <Text>需要执行终端命令时可以使用`CMD`或`RUN`，但是他们应用的是不同的场景</Text>
  <Text>**CMD特点**</Text>
  <List>指令在构建镜像阶段不会运行，仅表示构建镜像后启动容器时默认执行的指令</List>
  <List>无论是单构建还是多构建阶段，由于最终都只会输出一个镜像，因此只有最后一个被声明的指令会被写入到镜像中并在运行容器时执行</List>
  <Code>{{`
    ---docker(单构建)
      # 仅第二条CMD指令会生效
      FROM ubuntu:latest
      CMD ["echo", "Hello, World!"]
      CMD ["echo", "This is the last CMD"]  
    ---
    ---docker(多构建)
      # 即使是多构建，也仅最后一个CMD是运行时生效的
      # 第一阶段: 构建阶段
      FROM node:14 AS builder
      WORKDIR /app
      COPY . .
      RUN npm install
      RUN npm run build
      CMD ["echo", "This is the build stage."]

      # 第二阶段: 运行阶段
      FROM node:14 AS runtime
      WORKDIR /server
      COPY --from=builder /app/build .
      CMD ["npm", "run", "server"]
    ---
  `}}</Code>
  <Quote>如果仅仅是生效一条，为什么多构建阶段会出现多个`CMD`指令呢？这是因为多构建的文件，可以使用docker命令去单独构建某个阶段的镜像，仅这个时候每个阶段的`CMD`指令会有作用</Quote>
  <Text>**RUN**</Text>
  <Text>该指令用于在镜像构建过程中执行命令，有两种书写形式</Text>
  <List>Shell形式：使用默认的`shell`来执行命令</List>
  <List>Exec形式：又称数组形式，明确指定可执行文件及其参数</List>
  <Text>使用数组形式的场景:</Text>
  <Code>{{`
    ---docker(避免 shell 特性)
      # 在Exec形式中，$HOME会被视为一个普通字符串，而不是环境变量
      # 因此输出将是字符串 $HOME，而不是该环境变量的实际值

      RUN echo $HOME

      RUN ["echo", "$HOME"] 
    ---
    ---docker(平台兼容性)
      # Shell 形式的脚本在不同的操作系统上可能有不同的行为
      # Exec 形式通过直接指定可执行文件，可以更好地保持跨平台的一致性

      # Windows
      RUN ["cmd", "/S", "/C", "echo", "Hello, World!"]

      # Linux
      RUN ["echo", "Hello, World!"]
    ---
    ---docker(明确参数和命令拆分)
      # Shell 形式，参数可能被错误解析
      RUN echo "Hello, World!"

      # Exec 形式，参数明确拆分
      RUN ["echo", "Hello, World!"]
    ---
    ---docker(避免注入攻击)
      # 在处理用户输入或不受信任的数据时，使用Exec形式可以减少shell注入攻击的风险
      # 因为输入被直接传递给可执行文件，而不是通过shell解析
      
      # Exec 形式可以避免 shell 注入攻击
      RUN ["sh", "-c", "echo", "User input: $UNTRUSTED_INPUT"]
    ---
  `}}</Code>
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
  <Text>一般场景下，使用多阶段构建是为了分隔文件，如在前面的构建阶段中执行复杂的构建步骤，并在后面的构建阶段中只复制必要文件，这样可以避免在最终镜像中包含不必要的构建工具和中间文件</Text>
  <Text>如果一个项目中先进行前端构建打包，然后用 node 服务来运行打包后的产物，那么使用`dockerfile`可以如下编写</Text>
  <Code>{{`
    ---docker(使用as关键字)
      # 前端项目构建
      FROM node:latest as build
      WORKDIR /app
      COPY . *.json ./
      RUN npm install
      COPY . .
      RUN npm run build

      # 获取构建文件并启动服务
      FROM node:latest
      WORKDIR /app

      COPY --from=build /app/dist ./dist
      COPY --from=build /app/server ./server
      COPY --from=build /app/node_modules ./node_modules
      COPY --from=build /app/package.json ./package.json

      EXPOSE 80
      CMD [ "npm", "run", "server" ]
    ---
    ---docker(不使用as关键字)
      # 前端项目构建
      FROM node:latest
      WORKDIR /app
      COPY . *.json ./
      RUN npm install
      COPY . .
      RUN npm run build

      # 获取构建文件并启动服务
      FROM node:latest
      WORKDIR /app

      COPY --from=0 /app/dist ./dist
      COPY --from=0 /app/server ./server
      COPY --from=0 /app/node_modules ./node_modules
      COPY --from=0 /app/package.json ./package.json

      EXPOSE 80
      CMD [ "npm", "run", "server" ]
    ---
  `}}</Code>
  <Quote>可以使用`as`关键字定义一个阶段的名字，可以更具有可读性，如果不使用该关键字，则第一个构建阶段默认命名为`0`，第二个为`1`以此类推</Quote>
  <Text>
    多阶段构建还有一个特点就是，可以单独为一个阶段构建镜像，如需要单独构建上面例子中的`build`阶段，可以执行以下命令:
    `docker build --target builde -t project-builder-image .`
  </Text>
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