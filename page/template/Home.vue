<template>
  <div class="home">
    <HomeBg></HomeBg>
    <HomeBanner></HomeBanner>

    <div class="home-container" v-show="delayShow">
      <div class="home-container--left">
        <ShowcaseCard class="personal-info" boxShadowColor="#e4c7f2">
          <div class="personal-info--avatar">
            <HomeAvatar></HomeAvatar>
          </div>
          <div class="personal-info--sign">
            <span>相信的心</span>
            <span>就是你的魔法</span>
          </div>
          <div class="personal-info--contact">
            <HomeContact></HomeContact>
          </div>
        </ShowcaseCard>
        <ShowcaseCard class="site-notice" boxShadowColor="#c5e0b9">
          施工中。。。
        </ShowcaseCard>
        <ShowcaseCard class="charge-enter" boxShadowColor="#cec5c7">
          施工中。。。
        </ShowcaseCard>
      </div>

      <ShowcaseCard class="home-container--main" boxShadowColor="#ffb3b3">
        <div class="scroll-container">
          <RouterView></RouterView>
        </div>
      </ShowcaseCard>
      
      <div class="home-container--right">
        <ShowcaseCard class="dash-board" boxShadowColor="#82c1ff">
          <HomeDashBoard></HomeDashBoard>
        </ShowcaseCard>

        <ShowcaseCard class="recent-update" boxShadowColor="#fff07a">
          <HomeRecentUpdate></HomeRecentUpdate>
        </ShowcaseCard>
      </div>



    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { RouterView } from 'vue-router'

import HomeBanner from '../component/base/HomeBanner.vue'
import HomeBg from '../component/base/HomeBg.vue'
import HomeAvatar from '../component/base/HomeAvatar.vue'
import HomeContact from '../component/base/HomeContact.vue'
import HomeDashBoard from '../component/base/HomeDashBoard.vue'
import HomeRecentUpdate from '../component/base/HomeRecentUpdate.vue'

import ShowcaseCard from '../component/ui/ShowcaseCard.vue'

const delayShow = ref(false)

onMounted(() => {
  setTimeout(() => {
    delayShow.value = true    // 防止部分dom未加载完即显示，视觉效果很差
  }, 30)
  
})

</script>


<style lang="less">
@import url('../style/variables.less');
.mountCardAnimation(@name, @delay) {
  animation-name: @name;
  animation-delay: @delay;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}


.home {
  width: 100%;
  height: 100%;
  position: relative;
  user-select: none;

  .home-container {
    display: flex;
    position: relative;
    height: 100%;
    padding: calc(25vh + 20px) 0 20px 0;
    margin: 0 150px;
    

    @media screen and (max-width: 1500px){
      margin: 0 50px;
    }

    .home-container--left {
      @media screen and (max-width: 1200px){
        flex-basis: 200px;
      }
      display: flex;
      flex-direction: column;
      flex-basis: 280px;
      flex-shrink: 0; 
      gap: 10px;
      transition: .2s;

      .personal-info {
        display: flex;
        flex-direction: column;
        flex-basis: 160px;
        flex-shrink: 0;
        position: relative;
        color: @Color[mono-v2];
        .mountCardAnimation(mountedLeftCard, 0);
        
        .personal-info--avatar {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .personal-info--sign {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 30px 0 20px 0;
          font-size: 16px;
          font-weight: 600;
          line-height: 1.2;
        }

        .personal-info--contact {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex: 1;
        }
      }

      .site-notice {
        flex: 1;
        transform: translateX(-6px);
        .mountCardAnimation(mountedLeftCard, .2s);
      }

      .charge-enter {
        height: 80px;
        transform: translateX(-6px);
        .mountCardAnimation(mountedLeftCard, .4s);
      }
    }

    .home-container--main {
      flex: 1;
      min-width: 600px;
      margin: 0 20px;
      overflow: hidden;
      .mountCardAnimation(mountedMiddleCard, 0);

      .scroll-container {
        height: 100%;
        overflow-y: auto;
      }
    }

    .home-container--right {
      @media screen and (max-width: 1200px){
        flex-basis: 240px;
      }
      display: flex;
      flex-direction: column;
      flex-basis: 280px;
      flex-shrink: 0;
      transition: .2s;

      .dash-board {
        margin-bottom: 10px;
        .mountCardAnimation(mountedRgightCard, 0);
        
      }

      .recent-update {
        flex: 1;
        transform: translateX(6px);
        .mountCardAnimation(mountedRgightCard, .2s);
      }
    }
  }
}

@keyframes mountedLeftCard {
  0% {
    transform: translateX(-6px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes mountedMiddleCard {
  0% {
    transform: translateY(6px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes mountedRgightCard {
  0% {
    transform: translateX(6px);
  }
  100% {
    transform: translateX(0);
  }
}


</style>