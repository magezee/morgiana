<template>
  <div class="note--tempalte">
    <div class="note-header">

    </div>
    <div class="note-main">
      <div class="note-sort-container">
        <div class="fixed-container">
          <NoteSort :noteSortInfo="noteSortInfo" :notePathName="notePathName" :initExpandListNumber="noteInfo?.number?.[0]" />
        </div>
        
      </div>
      <NoteContent />
    </div>
    
    
  </div>
</template>

<script setup lang="ts">
import { shallowRef, watchEffect, ref, defineAsyncComponent, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { outline } from '../../note/ouline'

import NoteSort from '../component/base/NoteSort.vue'

const route = useRoute()
const noteSortInfo = ref()
const notePathName = ref()
const noteInfo = ref()


// 动态加载组件
const noteComponents = import.meta.glob('../../note/**/**/*.vue')  // 注册所有的笔记组件,直接使用动态路径导入异步组件会导致vite无法正常打包chunk
const NoteContent = shallowRef()

// 根据监听路由变动,动态加载不同的笔记内容组件
watchEffect(async() => {
  notePathName.value = route.params?.notePath
  const pathInfo = notePathName.value?.split('--')

  if (notePathName.value) {
    window.scroll(0, 0)

    // 根据mark遍历,减少遍历次数
    noteSortInfo.value = outline
      ?.find((note) => note.id === pathInfo[0])
      ?.sort?.find((sort) => sort.id === pathInfo[1])

    noteInfo.value = noteSortInfo.value
      ?.list?.find((list) => list.id === pathInfo[2])
      ?.source?.find((source) => source.id === pathInfo[3])

    console.log(noteInfo.value)
    if (noteInfo.value) {
      const noteComponentsKey = `../../note/${noteInfo.value?.notePath}`   // 更新import.meta.glob的key值
      NoteContent.value = defineAsyncComponent(noteComponents[noteComponentsKey] as any)
    }
  }
})



</script>



<style lang="less" scoped>
@import url('../style/variables.less');

.note--tempalte {
  width: 100%;
  height: 100%;

  .note-header {
    height: 40px;
    border-bottom: 1px @Color[grey] solid;
  }
  .note-main {
    position: relative;
    display: flex;

    .note-sort-container {
      flex-basis: 200px;
      height: 100%;

      .fixed-container {
        width: 200px;
        height: 100%;
        position: fixed;
        left: 0;
        padding: 10px 10px 0;
      }
    }
  }
}
</style>