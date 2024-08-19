<template>
  <Tip>最后更新 - 2024.08.15</Tip>
  <Title>#结构</Title>
  <Text>一个请求请求通常由以下几个主要部分组成：</Text>
  <List>请求行：包括请求方法，请求目标（URL），协议版本等</List>
  <List>请求头：包含关于客户端环境、请求体内容性质、期望的响应以及其他属性的信息</List>
  <List>请求体：请求体可能包含表单数据、JSON对象、文件上传或者其他需要随请求发送的数据</List>
  <Code>{{`
    ---md(组成)
      # 请求行
      GET /index.html HTTP/1.1  

      # 请求头
      Host: www.example.com  
      User-Agent: Mozilla/5.0  
      Accept: text/html  

      # 请求体
      {  
        "username": "exampleuser",  
        "password": "password123"  
      }  
    ---
  `}}</Code>
  <Line></Line>

  <Title>##请求目标</Title>
  <Text>一个完整的 url 包括7部分：</Text>
  <List>协议：如 http 或 ftp，以`//`为分隔符</List>
  <List>主机：可以是域名也可以是 ip</List>
  <List>端口：跟在主机后，以`:`作为分隔符</List>
  <List>路径：从第一个`/`到最后一个`/`为路径</List>
  <List>文件：跟在路径后</List>
  <List>参数：以`?`作为分隔符，多个参数之间用`&`作为分隔符</List>
  <List>锚点：从`#`作为分隔符</List>
  <Code>{{`
    ---ts(获取url信息)
      // url = https://wwww.demo.com:8080/news/index.html?id=123&page=1#name

      location.href           // https://wwww.demo.com:8080/news/index.html?id=123&page=1#name
      location.protocol       // https
      location.host           // wwww.demo.com       
      location.port           // 8080
      location.pathname       // /news/index.html
      location.search         // ?id=123&page=1
      location.hash           // #name
    ---
  `}}</Code>
  <Line></Line>

  <Title>##请求方式</Title>
  <Text>根据场景选择请求方式</Text>
  <List>数据获取：使用`get`方法，但如果请求需要安全性（如传输密码），则需要考虑使用`post`</List>
  <List>数据创建：使用`post`，因为这会创建新的资源</List>
  <List>数据更新：使用`put`（完全更新）或`patch`（部分更新），取决于需要更新所有数据还是部分数据</List>
  <List>数据删除：使用`delete`，确保该操作是可逆或不再需要此数据</List>
  <List>检查资源：使用`head`以最小成本获取信息</List>
  <List>获取服务器支持的操作：使用`options`了解API功能</List>
  <List>安全通信：用`connect`建立安全隧道，仅当需要代理通信时考虑</List>
  <Table>
    #请求方式
    |方式|场景|应用|示例|
    ----------------------------
    |GET|需要从服务器获取数据而不导致数据的修改|用于请求网页、获取API的数据资源、下载文件等|用户访问网页、获取产品列表、检索特定用户信息|
    |POST|需要将数据发送到服务器以创建、更新资源或触发处理|提交表单、上传文件、通过API添加新记录|用户注册、新增订单、提交博客文章|
    |PUT|需要替换或更新服务器上的现有资源|更新数据库记录、上传完整替代文件|更新用户资料、更改产品信息|
    |DELETE|需要从服务器删除指定资源|通过 api 删除记录、撤销操作|删除用户账户、移除购物车中的物品|
    |HEAD|需要在下载资源并检查其大小、格式等信息之前验证其可用性|检查网页是否存在、获取文件的 http 头|验证资源的最后修改时间、检查cookies|
    |OPTIONS|需要了解到服务器支持的请求方法或用于 cors 请求的预检请求|确定支持的 http 动词、cors 预检|检测 api 可用性、检查跨站请求有效性|
    |PATCH|需要对资源进行部分更新，仅传输更改部分|局部更新记录、修改部分内容|更新用户某个字段、更改订单状态|
    |CONNECT|需要建立隧道协议，通常用于 https 连接|https 代理、创建 tcp 隧道|通过代理访问互联网资源|
    |TRACE|需要诊断网络通信路径|请求回显，可用于调试和跟踪|网络故障排查|
  </Table>
  
  <Line></Line>

  <Title>##请求头</Title>
  <Text>请求头可以按功能分为以下几种，下面是些常见的请求头</Text>
  <Title>###通用</Title>
  <Text>这些头不是特定于请求或响应的，它负责提供有关消息传递的通用信息</Text>
  <Table>
    #通用
    |字段|说明|
    ----------------------------
    |Cache-Control|控制缓存机制，如`Cache-Control: no-cache`|
    |Connection|控制逐次请求是否使用持久连接，如`Connection: keep-alive`|
    |Date|消息发送的日期和时间|
  </Table>
  <Line></Line>

  <Title>###请求</Title>
  <Text>这些头是客户端在发送请求时使用的</Text>
  <Table>
    #请求头
    |字段|说明|
    ----------------------------
    |Host|用于指定发出请求的主机，如`Host: www.example.com`|
    |User-Agent|提供有关客户端应用程序的信息，如`User-Agent: Mozilla/5.0`|
    |Accept|告知服务器客户端能处理的响应内容类型，如`Accept: text/html`|
    |Accept-Language|指定客户端首选的语言，如`Accept-Language: en-US`|
    |Accept-Encoding|指定客户端能够理解的内容编码类型，如`Accept-Encoding: gzip, deflate`|
    |Referer|包含从哪个页面发起的请求。用于分析来源|
  </Table>
  <Line></Line>

  <Title>###条件</Title>
  <Text>这些头用于使请求在特定条件下成功执行</Text>
  <Table>
    #条件请求头
    |字段|说明|
    ----------------------------
    |If-Modified-Since|允许请求的方法在资源自某一时间后未被修改的前提下执行|
    |If-Unmodified-Since|相反，当资源在指定时间未被修改时执行|
    |If-Match|仅在由 ETag 确认的资源没有改变时执行|
    |If-None-Match|如果 ETag 匹配（未改变）则请求返回304状态代码|
  </Table>
  <Line></Line>

  <Title>###安全</Title>
  <Text>为请求提供安全性的信息</Text>
  <Table>
    #条件请求头
    |字段|说明|
    ----------------------------
    |Origin|指示发起请求的原始域名（协议和域名）|
    |Cookie|在请求中包含一个网页的所有 cookie 数据|
    |Authorization|提供身份认证凭据|
  </Table>
  <Line></Line>

  <Title>###实体</Title>
  <Text>描述请求体信息，包括内容类型和长度</Text>
  <Table>
    #条件请求头
    |字段|说明|
    ----------------------------
    |Content-Type|描述请求体的 MIME 类型，如`Content-Type: application/json`|
    |Content-Length|请求体的字节大小|
    |Content-Encoding|请求体进行的编码压缩类型，如`Content-Encoding: gzip`|
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