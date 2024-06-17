<template>
  <div class="toast-container">
    <TransitionGroup name="toast--transition" @before-leave="beforeLeave" @leave="leave">
      <Toast
        class="toast"
        v-for="(toast, index) in props.toastList"
        :key="toast.id"
        :message="toast.message"
      ></Toast>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { TransitionGroup } from 'vue'

import Toast from './Toast.vue'

const props = defineProps<{
  toastList: Array<{ id: number, message: string }>
}>()

// 搭配修改高度来实现往上滑动的效果，不然会元素突然消失突然闪去上方很奇怪（这个方案还是有点怪，待改进
const beforeLeave = (element: Element) => {
  (element as HTMLElement).style.height = `${element.clientHeight}px`
}

const leave = (element: Element) => {
  (element as HTMLElement).style.height = `${0}px`;
  (element as HTMLElement).style.border = '0';
  (element as HTMLElement).style.padding = '0';
  (element as HTMLElement).style.margin = '0';
  (element as HTMLElement).innerHTML = ''
}

</script>

<style lang="less">
.toast-container {
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 20;
  top: 10vh;
  right: 10px;

  .toast {
    margin-top: 10px;
    transition: 1s;
    animation-duration: 1s; // 这个不能删
    
    &--transition-enter-active, 
    &--transition-leave-active {
      transition: all .6s ease;
    }
    &--transition-enter-from, 
    &--transition-leave-to {
      opacity: 0;
      transform: translate(200px, -30px);
    }
  }

}
</style>