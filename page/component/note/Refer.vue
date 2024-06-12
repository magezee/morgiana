<template>
  <div class="note--refer">
    <div class="refer-info" v-for="refer in props.source" :key="refer.desc" @click="jumpToTargetWebsite(refer.url)">
      <SvgIcon class="refer-icon" id="refer"/>
      <span class="refer-desc">{{ refer.desc }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '../../component/ui/SvgIcon.vue'

const props = defineProps<{
  source: Array<{
    desc: string,
    url: string
  }>
}>()

const jumpToTargetWebsite = (url: string) => {
  window.open(url)
}

</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.note--refer {
  padding: 0 15px;
  border-left: 4px solid #e8dacd;
  margin: 8px 0;
  color: #c6b09c;
  line-height: 20px;

  .refer-info {
    transition: .2s;
    line-height: 24px;
    cursor: pointer;

    &:hover {
      filter: hue-rotate(175deg);
      transform: translateX(-6px);
    }

    .refer-icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 4px;
      vertical-align: sub;
    }
  }
  
  
}
</style>
