<template>
  <div class="home--project" >
    <div class="card-title">
      <SvgIcon class="project-icon" id="project" :useExternalColor="true"></SvgIcon>
      项目作品
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from '../ui/SvgIcon.vue'
import BgImg from '../../assets/img/home-bg.jpg'



</script>

<style scoped lang="less">
@import url('../../style/variables.less');
.home--project {
  .card-title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    color: @Color[purple];
  }

  .project-icon {
    width: 20px;
    height: 20px;
    margin-right: 6px;
    fill: @Color[purple];
  }
}
</style>
