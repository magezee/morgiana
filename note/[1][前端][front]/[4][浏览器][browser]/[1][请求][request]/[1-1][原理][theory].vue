<template>
  <Tip>最后更新 - 2024.08.14</Tip>
  <Title>#原理</Title>
  <Text>简单来说，一次请求是客户端（通常为浏览器）和服务器之间的通信，会进行以下步骤：</Text>
  <Text>**1.** 由特定链接（url）指定到一个特定资源</Text>
  <Text>**2.** 查询指定资源是否在本地中有缓存，如果有则直接返回资源，无需进行后续步骤</Text>
  <Text>**3.** 通过 dns 将域名解析为具体的服务器 ip 地址并发起查询</Text>
  <Text>**4.** 客户端与服务器之间建立 tcp 连接，即三次握手，确保连接可靠</Text>
  <Text>**5.** 客户端发送请求获取特定资源，服务端收到后根据内容处理并返回特定资源</Text>
  <Text>**6.** 根据 http 版本和连接头信息，浏览器会在请求完后关闭 tcp 连接或者保持连接以便复用</Text>
  <Line></Line>
  
  <Title>##缓存</Title>
  <Text>在 http 缓存机制中，主要有两种缓存策略：强缓存和协商缓存，这两种机制协同工作，以提高网页加载速度，同时确保用户获得最新的内容</Text>

  <Title>###强缓存</Title>
  <Text>强缓存的目标是在不与服务器交互的情况下缓存资源，特征是响应状态码`200`，这种机制通过 http 头来实现，最常用的头包括`Cache-Control`和`Expires`</Text>
  <Text>**Cache-Control**</Text>
  <Text>用于控制缓存策略，它可以包含多个指令，如</Text>
  <List>`max-age=&lt;seconds&gt;`：资源被认为是新鲜的时间段，以秒为单位</List>
  <List>`no-cache`：指示在每次使用缓存之前，必须向服务器再验证一遍</List>
  <List>`no-store`：指示请求和响应不应被缓存，每次都向服务器请求最新的资源</List> 
  <Text>**Expires**</Text>
  <Text>用于指定资源过期的具体时间点，使用的是绝对时间格式，通常是`GMT`时间</Text>
  <Text>它较为不灵活并且容易出现客户端和服务器时间不同步的问题，因此`Cache-Control`更为推荐</Text>
  <Code>{{`
    ---ts(node配置例子)
      const express = require('express')
      const app = express()

      var options = { 
        setHeaders: (res, path, stat) => {
          res.set('Cache-Control', 'max-age=10')    // 强缓存超时时间为10秒
        },
      }

      app.use(express.static((__dirname + '/public'), options))
      app.listen(3000)
    ---

  `}}</Code>
  <Line></Line>

  <Title>###协商缓存</Title>
  <Text>当强缓存失效，或者策略要求进行验证时，会使用协商缓存，这种机制允许浏览器与服务器协商以确定缓存资源是否仍是最新的，特征是响应状态码`304`</Text>
  <Text>需要使用协商缓存时，需要在头部设置`ETag`或者`Last-Modified`</Text>
  <Text>**ETag**</Text>
  <List>`ETag`：服务器为每个资源生成唯一的标识符（实体标签），通常基于内容哈希或服务器版本号</List>
  <List>`If-None-Match`：浏览器在后续请求中发送这个标识符，以检查当前资源是否与缓存版本相同</List>
  <List>如果 ETag 匹配（资源未修改），服务器返回`304 Not Modified` 状态，并浏览器继续使用缓存资源</List>
  <Text>**Last-Modified**</Text>
  <List>`Last-Modified`：服务器在响应头中提供的日期，表示资源最后一次修改的时间</List>
  <List>`If-Modified-Since`：浏览器在后续请求中使用这个头部来告诉服务器上次获取资源的时间</List>
  <List>如果资源自上次请求以来没有被修改，服务器返回 304 状态，浏览器使用缓存版</List>
  <Text>**总结**</Text>
  <List>精度：`Last-Modified`的精准度仅以秒为单位。如果资源在同一秒内多次更新，则可能不会被检测到，同时内容不变但生成时间不同也被错误认为资源已更新，所以`ETag`的精度更高</List>
  <List>性能：生成和比较`ETag`可能会为服务器带来额外的计算开销，尤其对于复杂的哈希计算</List>
  <List>场景：一般情况下`Last-Modified`是够用的，并且配置简单</List>
  <Code>{{`
    ---ts(node配置例子)
      const express = require('express')
      const app = express()

      const options = { 
        etag: true,                           // 开启协商缓存
        lastModified: true,                   // 开启协商缓存
        setHeaders: (res, path, stat) => {
          res.set({
            'Cache-Control': 'max-age=00',    // 浏览器不走强缓存
          })
        }
      }
    ---
  `}}</Code>
  <Line></Line>

  <Title>##状态码</Title>
  <Text>状态码表示服务器对客户端请求的响应结果，分为五类，每类状态码以不同的数字开头</Text>
  <Table>
    #信息性状态
    |状态码|描述|场景|
    ----------------------------
    |100|Continue|客户端应继续请求，最常用于客户端在发送较大的请求体之前收到继续发送的指示|
    |101|Switching Protocols|服务器理解并愿意进行协议切换，主要用于 WebSocket 等协议切换|
  </Table>
  <Line></Line>

  <Table>
    #成功状态
    |状态码|描述|场景|
    ----------------------------
    |200|OK|请求成功，通常用于 GET 和 POST 请求的响应|
    |201|Created|请求成功并创建了新资源，常用于 POST 请求后的响应|
    |202|Created|请求已接受但尚未处理，通常用于异步任务|
    |204|No Content|请求成功但不返回内容，常用于不需返回内容的 DELETE、PUT 请求|
  </Table>
  <Line></Line>
  
  <Table>
    #重定向状态
    |状态码|描述|场景|
    ----------------------------
    |301|Moved Permanently|永久性重定向，资源已永久移动到新位置|
    |302|Found|临时重定向，资源临时可在不同的URI找到|
    |304|Not Modified|客户端资源未修改，常用于缓存验证|
    |307|Temporary Redirect|临时重定向，方法和主体未更改，例如 POST 请求|
  </Table>
  <Line></Line>

  <Table>
    #客户端错误状态
    |状态码|描述|场景|
    ----------------------------
    |400|Bad Request|请求报文存在语法错误，无法被服务器理解|
    |401|Unauthorized|请求需要身份验证，未提供或未通过验证|
    |403|Forbidden|服务器拒绝请求，通常因为权限不足|
    |404|Not Found|服务器找不到请求的资源，常见于错误的 URL|
    |405|Method Not Allowed|请求方法对资源不允许|
    |409|Conflict|请求冲突，例如资源的当前状态导致冲突|
  </Table>
  <Line></Line>

  <Table>
    #服务器错误状态	
    |状态码|描述|场景|
    ----------------------------
    |500|Internal Server Error|服务器遇到不可预知的错误，无法完成请求|
    |501|Not Implemented|服务器不支持请求的方法|
    |502|Bad Gateway|网关或代理收到无效响应|
    |503|Service Unavailable|服务器过载或维护中，暂时无法处理请求|
    |504|Gateway Timeout|网关或代理操作超时|
  </Table>


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