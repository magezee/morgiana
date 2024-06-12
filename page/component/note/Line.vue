<template>
  <div class="note--line">
    <SvgIcon class="star-icon" id="start" />
    <div class="line"></div>
    <SvgIcon class="star-icon" id="start" />
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '../ui/SvgIcon.vue';
</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.note--line {
  display: flex;
  align-items: center;
  margin: 20px 0;

  .line {
    width: 100%;
    height: 1px;
    margin: 0 3px;
    background-color: @Color[mono-v6];
  }

  .star-icon {
    width: 14px;
    height: 14px;
  }
}
</style>
