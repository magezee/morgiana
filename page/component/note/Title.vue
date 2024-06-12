<template>
  <div 
    :class="`note--title rank${rank}`" 
    :data-hashId="title"
  >
    <slot v-if="false"></slot>
    {{ title }}
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const rank = ref(1)
const title = ref('')

const slots = defineSlots()

const initTitle = () => {
  const defaultSlotsChild = slots?.default()?.[0]?.children as string
  rank.value = defaultSlotsChild.match(/^#+/)?.[0].length || 1
  title.value = defaultSlotsChild.replace(/^#+/, '')
}

onMounted(() => {
  initTitle()
})

</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.note--title {
  margin: 15px 0;
  color: @Color[mono-v1];
  font-weight: 600;
  line-height: 1.4;


  &.rank1 {
    font-size: 2em;
    margin: 0 0 15px 0;
  }

  &.rank2 {
    font-size: 1.75em;
  }

  &.rank3 {
    font-size: 1.5em;
  }

  &.rank4 {
    font-size: 1.25em;
  }
}
</style>
