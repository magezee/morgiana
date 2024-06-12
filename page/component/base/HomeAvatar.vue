<template>
  <div class="home--avatar">
    <img class="avatar-img" :src="AvatarImg">
  </div>
</template>

<script setup lang="ts">
import AvatarImg from '../../assets/img/avatar.png'

</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.home--avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  transition: all .2s;
  border: 5px solid rgba(255, 255, 255, .1);
  backdrop-filter: blur(10px);

  &:hover {
    cursor: pointer;
    filter: brightness(1.05);
    transform: scale(1.1);
  }

  .avatar-img {
    position: relative;
    z-index: 2;
    width: 80px;
    height: 80px;
    transform: scale(1.2);
  }
}

</style>
