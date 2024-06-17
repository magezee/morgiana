<template>
  <div class="home--dash-board" >
    <div class="dash-board--menu" v-for="menu in menuData" @click="dashBoardAction(menu.id)">{{ menu.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, nextTick, inject } from 'vue'
import { useRouter } from 'vue-router'

import { useToast } from '../../hook/'

const router = useRouter()
const toast = useToast()

type MenuData = Array<{
  id: string,
  name: string,
}>

const menuData: MenuData = [
  {
    id: '首页',
    name: '🏠  首页',
  },
  {
    id: '笔记',
    name: '📔  笔记',
  },
  {
    id: '绘画',
    name: '🎨  绘画',
  },
  {
    id: '生活',
    name: '🍵  生活',
  },
  {
    id: '友链',
    name: '🤣  友链',
  },
  {
    id: '通知',
    name: '🚨  通知',
  },
]

const dashBoardAction = (menuId) => {
  switch(menuId) {
    case '首页':
      router.push('/')
      break
    case '笔记':
      router.push('/home-note')
      break
    case '绘画':
      toast('🤗 施工中...')
      break
    case '生活':
      toast('敬请期待')
      break
    case '通知':
      toast('施工中...')
      break
      
  }
}


</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.home--dash-board {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 18px;
  line-height: 1.4;

  .dash-board--menu {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 12px;
    border-radius: 8px;
    // border: 1px solid #c9a494;
    margin: 10px 0;
    font-weight: 600;
    color: #c9a494;
    transition: .2s;
    cursor: pointer;

    &:hover {
      transform: scale(1.2);
      background-color: #c9a494;
      color: #fff;
    }
  }
}


</style>