<template>
  <Tip>最后更新 - 2024.06.17</Tip>
  <Title>#Yaml</Title>
  <Text>YAML 是一种可读的数据序列化格式，主要用于配置文件、数据交换和存储，其文件后缀名为`.yml`</Text>
  <Text>编写规则如下：</Text>
  <List>使用缩进表示层级关系</List>
  <List>不允许使用`tab`，只能使用空格进行缩进</List>
  <List>缩进的空格数目不重要，只要相同层级的元素左侧对齐即可</List>
  <List>使用`#`进行注释</List>
  <Line></Line>

  <Title>##键值对</Title>
  <Text>使用`:`来表示一个键值对数据</Text>
  <Code>{{`
    ---yaml(键值对数据)
      # 相当于 { name: "jack" }
      name: jack    

      # 相当于 person: { name: "jack", sex: "boy" }
      person:
        name: jack
        sex: boy
    ---
  `}}</Code>
  <Line></Line>

  <Title>##列表</Title>
  <Text>使用`-`来表示该元素为父列表中的一个子元素</Text>
  <Code>{{`
    ---yaml(普通列表)
      # 相当于friends: ["jack", "marry", "ben"]
      friends:
        - jack
        - marry
        - ben
      # 即key为friends,value为一个列表
    ---
    ---yaml(列表键值对)
      # 相当于friends: [{ name: "jack", sex: "boy" }, { name: "marry", sex: "girl" }]
      friends:
        - name: jack
          sex: boy
        - name: marry
          sex: girl

      # 和下面写法同效果
      friends:
        - 
          name: jack
          sex: boy
        - 
          name: marry
          sex: girl
    ---
    ---yaml(多维列表)
      # 相当于 person: [["jack", "marry"], ["ben", "jim"]]
      person:
        - 
          - jack
          - marry
        -
          - ben
          - jim
    ---
  `}}</Code>
  <Line></Line>
  <Title>##数据类型</Title>
  <Text>YAML支持多种数据类型，如字符串、数值、布尔值、空值等</Text>
  <Code>{{`
    ---yaml(键值对数据)
      # 布尔
      boolean: 
        - TRUE                          # true,True都可以
        - FALSE                         # false，False都可以

      # 数值
      float:
        - 3.14
        - 6.8523015e+5                  # 可以使用科学计数法

      int:
        - 123
        - 0b1010_0111_0100_1010_1110    # 二进制表示

      # 空值
      null:
        nodeName: 'node'
        parent: ~                       # 使用~表示null
      
      # 字符串
      string:
        - hello                         # 可以不使用引号
        - 'Hello world'                 # 可以使用双引号或者单引号包裹特殊字符
        - newline                       # 字符串可以拆成多行，每一行会被转化成一个空格
          newline2                      

      # 时间日期
      date:
        - 2018-02-17                    # 日期必须使用ISO 8601格式，即yyyy-MM-dd
      datetime: 
        - 2018-02-17T15:02:31+08:00     # 时间使用ISO 8601格式，时间和日期之间使用T连接，最后使用+代表时区
    ---
  `}}</Code>
  <Line></Line>

  <Title>##引用合并</Title>
  <Text>通过`&`定义锚点，`*`引用锚点的值，`&lt;&lt;`将一个数据块的内容合并到另一个数据块中</Text>
  <Code>{{`
    ---yaml(引用锚点)
      jack:
        name: &personName jack
        sex: &personSex boy
        
      person:
        name: *personName
        sex:  *personSex

      # 等同于：
      person:
        name: jack
        sex: boy

      # 可以在任意地方设置锚点和引用（锚点必须要声明在引用前）
      - &leader jack
      - marry
      - ben
      - *leader

      # 等同于
      - jack
      - marry
      - ben
      - jack
    ---
    ---yaml(合并数据)
      jack: &jackData
        name: jack
        sex: boy
        
      person:
        <<: *jackData
        
      # 等同于：
      person:
        name: jack
        sex: boy
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