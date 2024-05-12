<template>
  <div class="1">112221</div>
  <button @click="jump">1111</button>
</template>

<script setup lang="ts">
import { shallowRef, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const jump = () => {
  router.push('/note/front--env--context')
}

console.log(route.params)

// 动态加载组件
const noteComponents = import.meta.glob('../../note/**/**/*.vue')  // 注册所有的笔记组件,直接使用动态路径导入异步组件会导致vite无法正常打包chunk
const NoteContent = shallowRef()

// 根据监听路由变动,动态加载不同的笔记内容组件
watchEffect(async() => {
  const notePath = route.params?.notePath
  console.log(notePath)


  window.scroll(0, 0)

})



</script>



<style lang="less">

</style>