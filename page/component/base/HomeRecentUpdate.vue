<template>
  <div class="home-recent-update">
    <div class="update-title">
      <SvgIcon class="update-icon" id="update" :useExternalColor="true"></SvgIcon>
      近期更新
    </div>
    <div class="update-list">
      <div 
        class="update-item" 
        v-for="(item, index) in updateList"
        :key="item.id"
        :style="{ animationDelay: `${index* 0.2}s` }"
      >
        <span class="item-name" @click="jumpRoute(item.route)">{{ item.name }}</span>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import SvgIcon from '../ui/SvgIcon.vue';

const router = useRouter()

const updateList = [
  {
    id: '1',
    name: '【笔记】Css布局',
    route: '/note/front--js--env--context'
  },
  {
    id: '1',
    name: '【笔记】Css布局',
    route: ''
  },
  {
    id: '1',
    name: '【笔记】Css布局',
    route: ''
  },
  {
    id: '1',
    name: '【笔记】Css布局',
    route: ''
  }
]

const jumpRoute = (route) => {
  router.push(route)
}

</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.home-recent-update {
  .update-title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    color: @Color[pink];

    .update-icon {
      width: 20px;
      height: 20px;
      margin-right: 6px;
      fill: @Color[pink];
    }
  }

  .update-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    .update-item {
      transform: translateX(10px);
      animation-name: mountUpdateItem;
      animation-duration: 2s;
      animation-fill-mode: forwards;

      .item-name {
        display: inline-block;
        color: @Color[mono-v2];
        transition: .2s;
        cursor: pointer;
        
        &:hover {
          transform: translateX(10px);
          color: @Color[blue-light];
        }
      }
    }
  }
}

@keyframes mountUpdateItem {
  0% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}

</style>
