<template>
  <div class="home--bg" >
    <div class="bg first"></div>
    <div class="bg second"></div>
  </div>
</template>

<script setup lang="ts">



</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.home--bg {
  // 目前还是有首尾衔接一丝卡顿的问题，待解决
  .bg {
    position: fixed;
    top: 0;
    right: 0;
    width: 200%;
    height: 200%;
    background:
    linear-gradient(45deg,rgba(0, 0, 0, 0.05) 25%,transparent 25%,transparent 75%,rgba(0, 0, 0, 0.05) 75%,rgba(0, 0, 0, 0.05) 100%),
      linear-gradient(45deg,rgba(0, 0, 0, 0.05) 25%,transparent 25%,transparent 75%,rgba(0, 0, 0, 0.05) 75%,rgba(0, 0, 0, 0.05) 100%);
    background-size: 10vw 10vw;
    background-position: 0 0, 5vw 5vw;
    background-color: #c0cdeb;
    animation-duration: 120s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    &.first {
      animation-name: scrollBgFirst;
    }

    &.second {
      width: 100%;
      height: 100%;
      transform: translate(50%, -50%);
      animation-name: scrollBgSecond;
    }
  }
  
  
}

@keyframes scrollBgFirst {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(50%, -50%);
  }
}

@keyframes scrollBgSecond {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(100%, -100%);
  }
}

</style>
