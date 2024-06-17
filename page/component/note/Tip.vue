<template>
  <div class="note--tip">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.note--tip {
  font-size: 14px;
  text-align: center;
  color: @Color[mono-v4];
  user-select: none;
  margin-bottom: 5px;
}
</style>
