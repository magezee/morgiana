<template>
  <div class="note--tempalte">
    <div class="note-header">
      <div class="site-name">
        <span class="site-name-text" @click="goHome">Morgiana</span> 
      </div>
      <div class="note-operate">
        <div class="note-outline" @mouseenter="showOutlineCard=true" @mouseleave="hideOutlineCard">
          <SvgIcon class="outline-icon" id="outline" :useExternalColor="true"/>
          <Transition name="outline-card--transition">
            <NoteOutline class="outline-card" v-if="showOutlineCard" @mouseenter="clearOutlineCardTimer"/>
          </Transition>
          
        </div>
        
      </div>
      <div class="more-info">
        <SvgIcon class="more-icon" id="more" :useExternalColor="true"/>
      </div>
    </div>

    <div class="note-main">
      <div class="note-sort-container">
        <div class="fixed-container">
          <NoteSort 
            class="note-sort-component"
            v-if="noteSortInfo"
            :noteSortInfo="noteSortInfo" 
            :notePathName="notePathName" 
            :initExpandListNumber="noteInfo.number?.[0]" 
          />
        </div>
        
      </div>
      <div class="note-content-container" v-if="!mockLoadingNoteContent">
        <NoteContent @noteContentMounted="noteContentMounted" />
      </div>
      <div class="note-navbar-container" v-show="noteContentLoaded">
        <NoteNavbar :noteContentLoaded="noteContentLoaded" />
      </div>
    </div>
    
    
  </div>
</template>

<script setup lang="ts">
import { shallowRef, watchEffect, ref, defineAsyncComponent, Transition } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { outline } from '../../note/ouline'
import { delay } from '../tools/util'

import NoteSort from '../component/base/NoteSort.vue'
import NoteOutline from '../component/base/NoteOutline.vue'
import NoteNavbar from '../component/base/NoteNavbar.vue'
import SvgIcon from '../component/ui/SvgIcon.vue'


const route = useRoute()
const router = useRouter()
const noteSortInfo = ref()
const notePathName = ref()
const noteInfo = ref()

const showOutlineCard = ref()
const hideOutlineCardTimer = ref()

const noteContentLoaded = ref(false)



// 动态加载组件
const noteComponents = import.meta.glob('../../note/**/**/*.vue')  // 注册所有的笔记组件,直接使用动态路径导入异步组件会导致vite无法正常打包chunk
const NoteContent = shallowRef()

const mockLoadingNoteContent = ref(false)   // 加载太快了,手动延时加个loading动画

// 根据监听路由变动,动态加载不同的笔记内容组件
watchEffect(async() => {
  notePathName.value = route.params?.notePath
  const pathInfo = notePathName.value?.split('--')

  if (notePathName.value) {
    window.scroll(0, 0)
    noteContentLoaded.value = false
    mockLoadingNoteContent.value = true
    await delay(10)
    mockLoadingNoteContent.value = false

    // 根据mark遍历,减少遍历次数
    noteSortInfo.value = outline
      ?.find((note) => note.id === pathInfo[0])
      ?.sort?.find((sort) => sort.id === pathInfo[1])

    noteInfo.value = noteSortInfo.value
      ?.list?.find((list) => list.id === pathInfo[2])
      ?.source?.find((source) => source.id === pathInfo[3])

    if (noteInfo.value) {
      const noteComponentsKey = `../../note/${noteInfo.value?.notePath}`   // 更新import.meta.glob的key值
      NoteContent.value = defineAsyncComponent(noteComponents[noteComponentsKey] as any)
    }
  }
})

const goHome = () => {
  router.push('/')
}

const noteContentMounted = () => {
  noteContentLoaded.value = true
}

const hideOutlineCard = () => {
  hideOutlineCardTimer.value = setTimeout(() => {
    showOutlineCard.value = false
  }, 300)
}

const clearOutlineCardTimer = () => {
  clearTimeout(hideOutlineCardTimer.value)
}

</script>



<style lang="less" scoped>
@import url('../style/variables.less');

.note--tempalte {
  width: 100%;
  overflow-x: hidden;

  .note-header {
    position: fixed;
    z-index: 10;
    top: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 0 10px;
    border-bottom: 1px @Color[grey] solid;
    background-color: #fff;
    user-select: none;

    .site-name {
      flex-basis: 200px;
      font-size: 30px;
      line-height: 1;
      font-weight: 600;

      .site-name-text {
        display: inline-block;
        transition: .4s;
        cursor: pointer;
        &:hover {
          transform: scale(1.05);
        }
      }
    }

    .note-operate {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 0 40px;

      .note-outline {
        position: relative;

        .outline-icon {
          width: 35px;
          height: 35px;
          fill: @Color[grey];
          transition: .2s;
          cursor: pointer;

          &:hover {
            transform: translateY(2px);
            fill: @Color[blue-light];
          }
        }

        .outline-card {
          position: absolute;
          top: 50px;
          left: -35px;

          &--transition-enter-active, 
          &--transition-leave-active {
            transition: 0.3s ease;
          }

          &--transition-enter-from, 
          &--transition-leave-to {
            transform: translateY(-10px);
            opacity: 0;
          }
        }

      }

      
    }
    
    .more-info {
      .more-icon {
        width: 35px;
        height: 35px;
        fill: @Color[grey];
        transition: .4s;
        cursor: pointer;

        &:hover {
          transform: translateX(-8px);
          fill: @Color[blue-light];
        }
      }
    }

    
  }
  .note-main {
    position: relative;
    display: flex;
    padding-top: 50px;
    height: 100%;
    width: 100%;

    .note-sort-container {
      flex-basis: 200px;
      flex-shrink: 0;
      

      .fixed-container {
        width: 200px;
        height: 100%;
        position: fixed;
        left: 0;
        padding: 10px 10px 0;
        border-right: 1px @Color[grey] solid;
        
        .note-sort-component {
          animation-name: mountNoteSort;
          animation-duration: 1.2s;
        }
      }
    }

    .note-content-container {
      width: 100%;
      min-width: 800px;
      padding: 20px 280px 200px 60px;
      animation-name: updateNoteContent;
      animation-duration: 1.2s;
    }

    .note-navbar-container {
      @media screen and (max-width: 950px){
        display: none;
      }
      position: fixed;
      top: 60px;
      right: 20px;
      padding-top: 20px;
      animation-name: mountNoteNavbar;
      animation-duration: 1.2s;
      
    }
  }
}


@keyframes mountNoteSort {
  0% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
  
}

@keyframes mountNoteNavbar {
  0% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
  }
  
}

@keyframes updateNoteContent {
  0% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>