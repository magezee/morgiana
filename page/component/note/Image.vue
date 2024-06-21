<template>
  <div class="bg-mask" v-if="isViewDetail"></div>
  <img 
    ref="imgRef"
    :class="['note--image', { 'detail': isViewDetail }]" 
    :src="props.src" 
    @click="viewDetailImage"
  >
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'


const props=  defineProps<{
  src: string,
  width?: number
}>()

const imgWidth = computed(() => `${props.width}px`)
const isViewDetail = ref(false)
const imgRef = ref()

const detailImgScale = ref()
const detailImgTranslateX = ref()
const detailImgTranslateY = ref()
const imgTransform = computed(() => {
  return `scale(${detailImgScale.value}) translate3d(${detailImgTranslateX.value}, ${detailImgTranslateY.value}, 0px)`
})

const defaultScrollTop = ref()


const viewDetailImage = async() => {
  if (!props.width) return
  const imgRect = (imgRef.value as HTMLElement).getBoundingClientRect()
  const intervalWidth = 300  // 图片放大不占满全屏,默认留300空隙,即发大后应该图片视口居中,左右间隔各150px
  const intervalHeight = 150
  
  const viewPortWidth = document.body.clientWidth
  const viewPortHeight = document.body.clientHeight

  // 用最小倍率进行缩放
  const widthScale = (viewPortWidth - intervalWidth) / props.width!    // 用视口宽度计算放大比例
  const heightScale = (viewPortHeight - intervalHeight) / imgRect.height
  const scale = widthScale > heightScale ? heightScale : widthScale

  if (scale < 1) {
    return
  }

  
  const detailImgWidth = imgRect.width * scale
  const detailImgHeight = imgRect.height * scale

  const detailImgLeft = imgRect.left - ((detailImgWidth - imgRect.width) / 2)  
  const detailImgTop = imgRect.top - ((detailImgHeight - imgRect.height) / 2)  

  const translateX = -(detailImgLeft - ((viewPortWidth - detailImgWidth) / 2))
  const translateY = -(detailImgTop - ((viewPortHeight - detailImgHeight) / 2))
  
  detailImgTranslateX.value = `${translateX / scale}px`   // 因为scale了,因此唯一需要除以对应scale倍数
  detailImgTranslateY.value = `${translateY / scale}px`
  detailImgScale.value = scale
  isViewDetail.value = !isViewDetail.value

  if (isViewDetail.value) {
    defaultScrollTop.value = window.scrollY
    window.addEventListener('scroll', moveDetailImgByScroll)
  } else {
    window.removeEventListener('scroll', moveDetailImgByScroll)
  }
  
}


const moveDetailImgByScroll = () => {
  const currentScrollTop = window.scrollY
  if (Math.abs(currentScrollTop - defaultScrollTop.value) > 50) {
    isViewDetail.value = false
    window.removeEventListener('scroll', moveDetailImgByScroll)
  }
}


</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.bg-mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: .3;
  cursor: zoom-out;
}

.note--image {
  position: relative;
  width: v-bind(imgWidth);
  max-width: 100%;
  border-radius: 5px;
  border: .5px solid #ddd;
  margin: 10px 0;
  transition: .4s;
  transform-origin: center;
  cursor: zoom-in;

  &.detail {
    z-index: 30;
    border-radius: 3px;
    border-color: @Color[blue-light];
    transform: v-bind(imgTransform);
  }
}



</style>
