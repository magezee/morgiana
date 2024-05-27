<!-- 此文件用于创建新笔记文件时方便复制的空模板 -->
<template>
  <div class="note--sort">
    <div class="sort-desc">{{ noteSortInfo.desc }}</div>
    <div class="sort-wrap">
      <div 
        v-for="noteList in noteSortInfo.list"
        :class="['note-list', { 'active': props.notePathName.split('--')[2] === noteList.id, 'expand': expandNoteList[noteList.number] }]"
        :id="noteList.id"
        :style="{ 'height': expandNoteList[noteList.number] ? getNoteListWrapHeight(noteList.source.length) : '24px' }"
      >
        <div class="list-desc">
          <span class="desc-text" @click="selectNoteList(noteList.number)">{{ noteList.desc }}</span>
          <img :class="['desc-icon', { 'expand': expandNoteList[noteList.number] }]" :src="expandNoteList[noteList.number] ? UpArrowIcon : DownArrowIcon" >
        </div>
        
        <div 
          v-for="noteSource in noteList.source"
          :class="['note-source', { 'active': props.notePathName === noteSource.pathName }]"
        >
          <span class="desc-text" @click="jumpNote(noteSource.pathName)">{{ noteSource.desc }}</span>
          <img class="desc-icon" :src="LeftArrowIcon" >
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { outline, type Outline } from '../../../note/ouline'
import LeftArrowIcon from '../../assets/icon/arrow-left.svg'
import UpArrowIcon from '../../assets/icon/arrow-up.svg'
import DownArrowIcon from '../../assets/icon/arrow-down.svg'

type Props = {
  noteSortInfo: Outline[0]['sort'][0],
  notePathName: string,
  initExpandListNumber: string   // 初始化是为了直接使用输入地址的时候，能展开选定项
}

const props = defineProps<Props>()
const noteSortInfo = computed(() => props.noteSortInfo)
const router = useRouter()

const expandNoteList = ref<{[key: string]: boolean}>({ [props.initExpandListNumber]: true })

console.log()
// 计算长度以此方便做风琴动画效果
const getNoteListWrapHeight = (noteCount) => {
  return `${ 28 * (noteCount + 1)}px`
}

const selectNoteList = (listNumber) => {
  if (expandNoteList.value[listNumber]) {
    expandNoteList.value[listNumber] = false
  } else {
    expandNoteList.value[listNumber] = true
  }
}

const jumpNote = (notePathName) => {
  router.push(`/note/${notePathName}`)
}


</script>

<style lang="less" scoped>
@import url('../../style/variables.less');

.note--sort {
  user-select: none;
  line-height: 24px;

  .sort-desc {
    margin: 12px 0;
    font-size: 20px;
    font-weight: 600;
  }

  .sort-wrap {
    .note-list {
      margin-bottom: 8px;
      font-size: 18px;
      overflow: hidden;
      transition: .2s;

      .list-desc {
        display: flex;
        align-items: center;

        .desc-text {
          cursor: pointer;
          &:hover {
            & + .desc-icon {
              display: inline-block;
            }
          }
        }

        .desc-icon {
          display: none;
          width: 20px;
          height: 20px;
          margin-left: 8px;
          animation-name: hoverFoldDescText;
          animation-duration: 1s;
          animation-iteration-count: infinite;

          &.expand {
            animation-name: hoverExpandDescText;
          }
        }
      }

      .note-source {
        display: flex;
        align-items: center;
        padding: 2px 2px 2px 18px;
        font-size: 15px;
        animation-name: foldNoteList;
        animation-duration: .2s;

        .desc-text {
          cursor: pointer;
          &:hover {
            & + .desc-icon {
              display: inline-block;
            }
          }
        }

        .desc-icon {
          display: none;
          width: 20px;
          height: 20px;
          margin-left: 8px;
          animation-name: hoverDescText;
          animation-duration: 1s;
          animation-iteration-count: infinite;
        }

        &.active {
          color: @Color[blue-light];
        }

      }

      &.active {
        .list-desc {
          .desc-text {
            color: @Color[blue-light];
          }
        }
      }

      &.expand {
        .note-source {
          animation-name: expandNoteList;
          animation-duration: .2s;
        }
      }
    }
  }
}

@keyframes expandNoteList {
  0% {
    opacity: .2;
  }
  100% {
    opacity: 1;
  }
}
@keyframes foldNoteList {
  0% {
    opacity: 1;
  }
  100% {
    opacity: .2;
  }
}

@keyframes hoverFoldDescText {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(3px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes hoverExpandDescText {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-3px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes hoverDescText {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(-5px);
  }

  100% {
    transform: translateX(0);
  }
}
</style>