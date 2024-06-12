<template>
  <p class="note--quote">
    <span class="slot-container" ref="slotContainer" v-if="!noteQuoteContent">
      <slot></slot>
    </span>
    <span v-html="noteQuoteContent"/>
  </p>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMarkdownText } from '../../hook/note'
const noteQuoteContent = ref()
const slotContainer = ref<HTMLElement>()

onMounted(async() => {
  noteQuoteContent.value = await useMarkdownText(slotContainer.value?.innerHTML)
})


</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.note--quote {
  margin: 5px 0;
  padding-left: 1em;
  border-left: 0.25em solid @Color[mono-v6];
  font-size: 16px;
  color: @Color[mono-v4];
  line-height: 1.5;
  word-wrap: break-word;
  user-select: text;
}
</style>
