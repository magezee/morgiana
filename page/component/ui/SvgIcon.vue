<template>
  <div 
    v-html="svgHtml"
    :class="['svg-icon', { 'external-color': useExternalColor }]"  
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

const props = defineProps<{
  id: string,
  useExternalColor?: boolean
}>()

const svgHtml = ref()

onMounted(async () => {
  svgHtml.value = await loadSvg(`/svg/${props.id}.svg`)   // 这里需要请求静态服务器中的svg文件才可以拿到对应的hmtl数据，因此需要把svg文件都放在静态文件夹public下
//
})

const loadSvg = async (url) => {
  const response = await axios.get(url)
  return response.data
}

</script>

<style lang="less">
.svg-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: inherit;
    height: inherit;
  }

  &.external-color {
    svg {
      path {
        fill: inherit;
      } 
    }
  }
}
</style>