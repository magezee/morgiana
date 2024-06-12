<template>
  <div class="home--index" >
    <div class="title">介绍~</div>
    <Text>欢迎在冲浪中偶然访问到我的小站</Text>
    <Text>本站站名为**摩尔迦娜（Morgiana）**，出自漫画作品《魔笛MAGI》，并无特殊含义，不过摩爷是真的可爱！！</Text>
    <Text>这里主要用于分享自己平时所学时记录下的笔记，以及偶尔发些日常生活吐槽，所以更多的功能还是给自己在开发的时候充当一个快捷查找资料的网站使用</Text>
    <Text>所有内容均无偿对外开放，希望对学习中的你有所帮助，[开源项目仓库请轻敲这里](https://github.com/magezee/morgiana)</Text>
    <Line></Line>
    <Text>为了图方便目前该站所有内容均为静态前端页面，想自己从零开始搭一个网站出来</Text>
    <Text>还有很多设计方面的内容没有思路，网站后续的功能会陆续补充齐全</Text>
    <Text>或许会直接尝试使用社区成熟的博客框架去搭建另外一个自己的小站，未来的事情谁知道呢~</Text>
    
  </div>
</template>

<script setup lang="ts">
import { Text, Line } from '../note'


</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.home--index {
  width: 100%;
  padding: 0 40px;
  overflow-y: auto;
  
  * {
    user-select: none;
  }
  
  .title {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    
  }
}
  

</style>
