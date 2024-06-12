<template>
  <div class="home--banner" >
    <img class="banner-img" :src="BannerImg">
  </div>
</template>

<script setup lang="ts">

import BannerImg from '../../assets/img/home-banner.jpg'



</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.home--banner {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  height: 25vh;

  .banner-img {
    position: absolute;
    width: 100%;
    min-width: 840px;
    min-height: 25vh;
    will-change: transform;
    image-rendering: auto;
    transform-origin: center center;
    animation-name: enterAnimation-homeBg;
    animation-duration: 2.5s;
    animation-fill-mode: forwards;
  }
}

@keyframes enterAnimation-homeBg {
  0% {
    position: absolute;
    transform: scale(1.05) translateY(20%);
    filter: brightness(.9);
  }

  100% {
    position: absolute;
    transform: scale(1) translateY(20%);
    filter: brightness(1);
  }
}
</style>
