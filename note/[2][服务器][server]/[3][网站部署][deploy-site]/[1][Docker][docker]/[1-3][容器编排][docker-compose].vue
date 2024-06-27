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
      # 在安装docker的时候可能会默认安装了，因此可以先试试指令docker compose看看服务器终端是否有提示
      sudo yum install docker-compose-plugin
    ---
  `}}</Code>
  <Quote></Quote>
  <Text>docker compose通过使用`yaml`文件来配置应用程序的服务，一般为项目根目录下的`docker-compose.yml`</Text>
  <Text>即使你可能只需要一个 dockerfile 就可以完成所有功能，我也推荐写一个，毕竟可以简化启动 docker 容器的命令，仅需`docker-compose up`即可完成容器的启动和设置</Text>
  <Line></Line>

  <Title>##指令</Title>
  <Text>以下为`docker compose`服务的一些常用指令：</Text>
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
  <Line></Line>

  <Title>##关键字</Title>
  <Table>
    #docker compose 文件常用关键字
    |关键字|功能|
    ------------------
    |version|指定文件的版本|
    |services|用来定义每个单独的服务，每个服务都有自己的一组配置选项|
    |image|指定服务使用的镜像|
    |build|使用特定的`dockerfile`构建镜像，而不是从注册表拉取，通常用于自定义镜像|
    |ports|将容器内部端口映射到主机端口|
    |volumes|将主机的目录或文件挂载到容器中|
    |environment|设置环境变量，可以用于传递配置或敏感信息|
    |networks|指定服务应该连接到的网络，`docker compose`会自动创建指定的网络|
    |depends_on|指定服务启动依赖的其他服务,这确保了相关服务按照指定顺序启动|
    |container_name|用于自定义容器的名称而不使用默认生成的|
    |restart|在容器退出时会基于该指定策略决定是否重启容器，其选项有 —— `no(default)`: 不重启; `always`: 总是重启; `on-failure`: 仅因错误退出时才自动重启; `unless-stoppe`: 手动停止外都会自动重启|
  </Table>
  <Text>下面是一个简单编写的小例子，其功能是使用项目中已经存在的`dockerfile`进行构建镜像并启动容器，同时再启动一个数据库容器</Text>
  <Code>{{`
    ---yaml(小例子~)
      version: '1'
      services:
        # 通过dockerfile构建镜像并启动前端服务容器
        # 该名字决定了构建后的镜像名字，默认格式为项目文件夹名字-该字段，比如如果项目名为demo，那么构建后的这部分镜像为demo-web
        web:
          # .表示使用该目录下的dockerfile文件构建
          build: .
          container_name: web-container
          restart: always
          ports:
            - 80:80
          # 启动服务器需要基于db容器已经启动完成
          depends_on:
            - db
          networks:
            - my-network
        
        # 启动并连接db容器
        db:
          image: mongo
          container_name: db-container
          restart: always
          # 指定用于登录数据库的用户数据
          environment:
            MONGO_INITDB_ROOT_USERNAME: root
            MONGO_INITDB_ROOT_PASSWORD: my_password
            MONGO_INITDB_DATABASE: admin
          ports:
            - 27017:27017
          networks:
            - my-network
          volumes:
            - ./shell/init-mongo.js:/docker-entrypoint-initdb.d/init-mongo.js:ro
            - ./db:/data/db
      networks:
        my-network:
          driver: bridge
    ---
  `}}</Code>
  <Line></Line>
  <Title>###网络</Title>
  <Text>每个`docker compose`项目都会自动创建一个网络，所有的服务默认都连接到这个网络，不过也可以通过关键字`network`定义更多自定义网络，以更精细地控制服务之间的网络拓扑结构</Text>
  <Text>同一网络下的服务可以直接连接而不需要额外配置，如下面例子中node服务可以直接通过服务名来直接连接到数据库</Text>
  <Code>{{`
    ---yaml(docker-compose.yml)
      version: '3.8'

      services:
        web:
          build: .
          ports:
            - "5000:5000"
          depends_on:
            - db

        db:
          image: mysql
          environment:
            MYSQL_ROOT_PASSWORD: example
            MYSQL_DATABASE: mydatabase
    ---
    ---js(app.js)
      const express = require('express')
      const mysql = require('mysql')

      const app = express()

      const db = mysql.createConnection({
        host: 'db',  // 使用服务名作为主机名
        user: 'root',
        password: 'example',
        database: 'mydatabase'
      })

      db.connect((err) => {
        if (err) {
          console.error('Error connecting to the database:', err)
          return
        }
        console.log('Connected to the database')
      })
    ---
  `}}</Code>
  <Text>可以定义多个网络来避免网络混淆，如下面例子</Text>
  <List>web 服务连接到`frontend`和`backend`两个网络</List>
  <List>api 和 db 服务仅连接到`backend`网络</List>
  <Code>{{`
    ---yaml(docker-compose.yml)
      version: '3.8'

      services:
        web:
          image: nginx
          networks:
            - frontend
            - backend

        api:
          image: myapi
          networks:
            - backend

        db:
          image: mysql
          networks:
            - backend

      networks:
        frontend:
        backend:
    ---
  `}}</Code>
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