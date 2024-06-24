<template>
  <div 
    :class="['note--list', { 
      'rank-1': rank === 1,
      'rank-2': rank === 2,
      'rank-3': rank === 3
    }]"
  > 
    <i class="list-icon"></i>
    <span class="slot-container" ref="slotContainer" v-if="!noteTextContent">
      <slot></slot>
    </span>
    <span v-html="noteTextContent"/>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance, nextTick } from 'vue'
import { useMarkdownText } from '../../hook/note'

const noteTextContent = ref()
const slotContainer = ref<HTMLElement>()
const rank = ref(1)

onMounted(async () => {
  let instance = getCurrentInstance()
  
  // 使用父元素来判定级别
  while(instance?.type.__name === instance?.parent?.type.__name) {
    rank.value += 1
    instance = instance?.parent!
  }

  // 不使用nextTick会导致层级判断错误
  nextTick(async() => {
    noteTextContent.value = await useMarkdownText(slotContainer.value?.innerHTML)
  })
  
})


</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.note--list {
  position: relative;
  padding-left: 2em;
  font-size: 16px;
  line-height: 20px;
  margin: 5px 0;

  .list-icon {
    position: absolute;
    display: flex;
    align-items: center;
    left: .8em;
    height: 20px;
    margin-right: 8px;
    color: inherit;

    &::after {
      content: '';
      display: flex;
      align-items: center;
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
  }
  

  &.rank-1 {
    color: @Color[mono-v1];

    .list-icon { 
      &::after {
        background-color: @Color[mono-v1];
      }
      
    }
    
  }

  &.rank-2 {
    color: @Color[mono-v3];
    .list-icon { 
      &::after {
        background-color: @Color[mono-v3];
      }
    }
  }

   &.rank-3 {
    color: @Color[mono-v4];
    .list-icon { 
      &::after {
        background-color: @Color[mono-v4];
      }
    }
  }  
}
</style>
