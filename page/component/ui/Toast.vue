<template>
  <div class="toast-component">
    <div class="toast-message">{{ props.message }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  message: string
}>()

const colorStyle = ref()

function randomCoolColor(): string {
  // 随机生成蓝色和绿色范围的颜色，红色较低以保持冷色调
  const r = Math.floor(Math.random() * 101) + 120; // 红色分量 0-100
  const g = Math.floor(Math.random() * 101) + 150; // 绿色分量 100-200
  const b = Math.floor(Math.random() * 106) + 150; // 蓝色分量 150-255

  // 将颜色值转为16进制字符串并格式化
  const toHex = (value: number): string => value.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

onMounted(() => {
  colorStyle.value = randomCoolColor() 
})

</script>

<style lang="less" scoped>
.toast-component {
  display: flex;
  align-items: center;
  justify-content: center;  
  width: 200px;
  padding: 15px 20px;
  border: 2px solid v-bind(colorStyle);
  border-radius: 10px;
  font-weight: 600;
  background:#fff repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02) 13px, transparent 0, transparent 26px);
  box-shadow: 0 -2px inset v-bind(colorStyle);
  user-select: none;
}


</style>