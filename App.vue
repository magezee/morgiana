<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { type Router, RouterView } from 'vue-router'

</script>

<style lang="less">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#morgiana {
  @font-face {
    font-family: FZFWZhuZiAYuanJM;
    src:url('./page/assets/font/FZFWZhuZiAYuanJM.OTF');
  }

  width: 100%;
  height: 100%;
  font-family: FZFWZhuZiAYuanJM;
  -webkit-font-smoothing: antialiased;

  * {
    box-sizing: border-box;
  }
  
}

</style>