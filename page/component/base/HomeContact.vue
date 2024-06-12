<template>
  <a class="contact-link" href="https://github.com/magezee" target="_blank">
    <SvgIcon class="contact-icon" id="github" />
  </a>
  <a class="contact-link" href="https://juejin.cn/user/26044011909800" target="_blank">
    <SvgIcon class="contact-icon" id="juejin" />
  </a>
  <a class="contact-link" href="https://blog.csdn.net/qq_39261142" target="_blank" >
    <SvgIcon class="contact-icon" id="csdn" />
  </a>
  <a class="contact-link" href="https://space.bilibili.com/474486" target="_blank">
    <SvgIcon class="contact-icon" id="bilibili" />
  </a>
</template>

<script setup lang="ts">
import SvgIcon from '../ui/SvgIcon.vue';

</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.contact-link {
  display: flex;
  justify-content: center;
  align-items: center;
  
  .contact-icon {
    width: 26px;
    height: 26px;
    transition: .2s;

    &:hover {
      transform: translateY(-5px);
    }
  }
}

</style>
