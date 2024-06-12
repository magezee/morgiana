<template>
  <div class="1">作用域</div>
  <Title>#33</Title>
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