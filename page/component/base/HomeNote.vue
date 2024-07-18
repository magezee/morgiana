<template>
  <div class="home-note">
    <div class="desc-container">
      <div class="title">笔记~</div>
      <Text>这里是笔记入口，主要用于平时学习时记录点内容的地方</Text>
      <Text>其内容仅以个人理解为准确度，如果有误或引用内容没有写明源文请联系我呦！</Text>
      <Line></Line>
    </div>
    <div class="note-container">
      <div class="note-outline">
        <div 
          :class="['ouline-item', { 'active': noteDtailInfo?.id === outlineInfo.id }]"  
          v-for="outlineInfo in outline" 
          :key="outlineInfo.id"
        >
          <span class="item-desc" @click="expandNoteDetail(outlineInfo.id)">
            {{ outlineInfo.desc }}
            <div class="hover-line"></div>
          </span>
        </div>
      </div>
      <Line></Line>
      <div class="note-sort" v-if="noteDtailInfo">
        <div class="note-item" 
          v-for="(note, index) in noteDtailInfo.sort" 
          :key="note.id" 
          @click="jumpNote(note.list[0].source[0].pathName)"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          {{ note.desc }}
        </div>
      </div>
    </div>
    <img class="emotion-img" :src="LingMengImg">
    
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { Text, Line } from '../note'
import { outline } from '../../../note/ouline'
import { randomCoolColor } from '../../tools/util'
import LingMengImg from '../../assets/img/lingmeng.png'


const router = useRouter()
const showNoteDetail = ref(false)
const noteDtailInfo = ref()
const colorStyle = ref(randomCoolColor())

const expandNoteDetail = (outlineInfoId) => {
  showNoteDetail.value = true

  noteDtailInfo.value = outline.find((item) => {
    return item.id === outlineInfoId
  })
  
}

const jumpNote = (routePath) => {
  router.push(`/note/${routePath}`)
}


</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.home-note {
  position: relative;
  padding: 0px 40px;
  animation-name: mountedHomeNote;
  animation-duration: 2s;
  min-height: calc(100% - 10px);
  * {
    user-select: none;
  }

  .desc-container {
    .title {
      margin-bottom: 20px;
      font-size: 24px;
      font-weight: 600;
      text-align: center;
    }
  }

  .note-container {
    display: flex;
    flex-direction: column;

    .note-outline {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;

      .ouline-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 20%;
        margin-bottom: 10px;
        font-size: 18px;

        &.active {
          color: @Color[blue-light];

          .item-desc {
            .hover-line {
              &::before, 
              &::after {
                width: 50%;
              }
            }
          }
          
        }

        .item-desc {
          display: inline-block;
          position: relative;
          cursor: pointer;


          &:hover {
            color: @Color[blue-light];
          }

          .hover-line {
            display: flex;
            justify-content: center;
            position: absolute;
            width: 150%;
            height: 3px;
            transform: translate(-15%, -4px);

            &::before, 
            &::after {
              display: block;
              content: '';
              width: 0;
              background-color: @Color[blue-light];
              transition: .4s;
            }

        
          }
        }

        
      }
    }

    .note-sort {
      display: flex;
      flex-wrap: wrap;
      gap: 25px;
      padding: 0 10px;

      .note-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100px;
        padding: 5px 10px;
        border-radius: 10px;
        border: 1px solid #ddd;
        font-size: 16px;
        color: @Color[mono-v3];
        transition: .2s;
        transform: translateX(5px);
        animation-name: mountNoteItem;
        animation-duration: 1s;
        animation-fill-mode: forwards;
        cursor: pointer;

        &:hover {
          border-color: @Color[blue-light];
        }
        
      }
    }
  }

  .emotion-img {
    position: absolute;
    width: 180px;
    height: 180px;
    right: 0;
    bottom: 0;
    filter: grayscale(80%);
    opacity: .5;
  }
  
}

@keyframes mountedHomeNote {
  0% {
    transform: translateY(4px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes mountNoteItem {
  0% {
    transform: translateX(5px);
  }
  100% {
    transform: translateX(0);
  }
}



</style>
