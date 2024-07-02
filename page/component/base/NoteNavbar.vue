<template>
  <div class="note--navbar">
    <div 
      v-for="anchorInfo in anchorList" 
      :key="anchorInfo.id"
      :class="[
        `title-anchor rank${anchorInfo.rank}`, 
        { 'active': activeAnchorId === anchorInfo.id }
      ]"
      @click="scrollToTargetAnchor(anchorInfo.id, anchorInfo.offsetTop)"
    >
      {{ anchorInfo.text }}
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watchEffect, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useThrottleFn } from '@vueuse/core'

interface NoteNavbarProps {
  noteContentLoaded: boolean
}

const route = useRoute()
const props = defineProps<NoteNavbarProps>()

const navStrucure = ref<Array<Element>>()
const activeAnchorId = ref(0)
const isScrolling = ref(false)
const scrollTimer = ref()
const anchorList = ref<Array<any>>([])

const noteContentLoaded = computed(() => props.noteContentLoaded)

watch(noteContentLoaded, (loaded) => {
  if (loaded) {
    navStrucure.value = getNavStrucure()
    updateAnchorList()
    initScrollTop()
    window.addEventListener('scroll', updateTargetAnchorByScroll)
  }
})

const updateAnchorList = () => {
  setTimeout(() => {
    anchorList.value = navStrucure.value?.map(( anchorElement, index ) => {
      const rank = anchorElement.getAttribute('class')?.match(/\d/)?.[0]
      const offsetTop = (anchorElement as HTMLElement).offsetTop
      const text = anchorElement.getAttribute('data-hashid')

      return {
        id: index,
        rank,
        offsetTop,
        text
      }
      
    })!
  })
}

// 直接输入锚点链接也可以跳转
onMounted(() => {
  setTimeout(() => {
    const currentAnchorId = Number(route.hash?.replace('#anchor-', ''))
    if(currentAnchorId) {
      scrollToTargetAnchor(currentAnchorId, anchorList.value[currentAnchorId]?.offsetTop)
    }
    
  }, 500)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateTargetAnchorByScroll)
})

const getNavStrucure = () => {
  const strucure =  document.querySelectorAll('.note--title')
  return Array.from(strucure)
}

const updateUrlHash = (hash: string) => {
  window.history.replaceState(
    {},
    '',
    `${window.location.pathname}${window.location.search}#anchor-${hash}`
  )
}

const scrollToTargetAnchor = (anchorId: number, anchorOffsetTop: number) => {
  activeAnchorId.value = anchorId
  clearTimeout(scrollTimer.value)
  isScrolling.value = true
  window.scrollTo({
    top: anchorOffsetTop - 50,
    behavior: 'smooth'
  })
  updateUrlHash(anchorId.toString())
  
  scrollTimer.value = setTimeout(() => {
    isScrolling.value = false
  }, 2000);
}

const updateTargetAnchorByScroll = useThrottleFn(() => {
  if (isScrolling.value) return  // 防止滚动条平滑滚动的时候影响到这里
  const currentOffsetTop = document.documentElement.scrollTop
  const currentAnchor = anchorList.value?.reduce<any>((pre, cur) => {
    const preDistance = Math.abs(currentOffsetTop - pre.offsetTop) 
    const curDistance = Math.abs(currentOffsetTop - cur.offsetTop) 
    if (curDistance > 0 && curDistance < preDistance) {
      return cur
    } else {
      return pre
    }
  }, anchorList.value[0])

  if (currentAnchor?.id !== activeAnchorId.value) {
    updateUrlHash(currentAnchor?.id)
    activeAnchorId.value = currentAnchor?.id
  }
  
}, 300)

const initScrollTop = () => {
  const anchorId = window.location.hash.replace('#anchor-', '')

  if (!anchorId) {
    return
  }

  const scrollTop =  anchorList.value?.[Number(anchorId)]?.offsetTop
  activeAnchorId.value = Number(anchorId)
  window.scrollTo({
    top: scrollTop! - 50
  })
  
}



</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.note--navbar {
  width: 200px;
  font-size: 18px;
  line-height: 1;
  overflow: auto;
  


  .title-anchor {
    padding: 5px 10px;
    border-radius: 4px;
    margin: .4em 0;
    transition: .2s;
    cursor: pointer;

    &.rank1 {
      font-size: 1em;
      color: @Color[mono-v1];
    }

    &.rank2 {
      padding-left: 25px;
      font-size: .9em;
      color: @Color[mono-v2];
    }

    &.rank3 {
      padding-left: 45px;
      font-size: .8em;
      color: @Color[mono-v3];
     
    }

    &.rank4 {
      padding-left: 60px;
      font-size: .7em;
      color: @Color[mono-v4];
    }

    &:hover {
      background-color: @Color[mono-v7];
    }

    &.active {
      background-color: @Color[mono-v7];

      &.rank1, &.rank2, &.rank3, &.rank4 {
        color: @Color[blue];
      }
      
    }

    

  }
}
</style>
