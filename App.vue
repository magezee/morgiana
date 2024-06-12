<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { type RouterView } from 'vue-router'

</script>

<style lang="less">
@import url('./page/style/variables');

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

  position: relative;
  width: 100%;
  height: 100%;
  min-height: 650px;
  font-family: FZFWZhuZiAYuanJM;
  -webkit-font-smoothing: antialiased;

  * {
    box-sizing: border-box;
  }
  
}
&::-webkit-scrollbar {
    width: 2px;
    height: 8px;
    border-radius: 8px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    border-radius: 8px;
    background-color: @Color[pink];
    transition: 0.3s ease-in-out;
  }
  &::-webkit-scrollbar-track {
    border-radius: 8px;
    background-color: transparent;
  }
</style>