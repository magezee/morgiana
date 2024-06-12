<template>
  <div class="1">选择器</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Code, Line, Title, Text } from '../../../../page/component/note/'

const emits = defineEmits([ 'noteContentMounted' ])

onMounted(() => {
  emits('noteContentMounted')
})

// 动态加载组件


</script>



<style lang="less">

</style>