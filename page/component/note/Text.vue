<template>
  <p class="note--text">
    <span class="slot-container" ref="slotContainer" v-if="!noteTextContent">
      <slot></slot>
    </span>
    <span v-html="noteTextContent" />
  </p>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMarkdownText } from '../../hook/note'

const noteTextContent = ref()
const slotContainer = ref<HTMLElement>()
const a = ref()

onMounted(async() => {
  noteTextContent.value = await useMarkdownText(slotContainer.value?.innerHTML)
  
})

</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.note--text {
  margin: 5px 0;
  font-size: 16px;
  color: @Color[mono-v1];
  line-height: 1.5;
  word-wrap: break-word;
  user-select: text;
}
</style>
