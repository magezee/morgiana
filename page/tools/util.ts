export const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, time)
  })
}

export const  randomCoolColor = () => {
  // 随机生成蓝色和绿色范围的颜色，红色较低以保持冷色调
  const r = Math.floor(Math.random() * 101) + 120; // 红色分量 0-100
  const g = Math.floor(Math.random() * 101) + 150; // 绿色分量 100-200
  const b = Math.floor(Math.random() * 106) + 150; // 蓝色分量 150-255

  // 将颜色值转为16进制字符串并格式化
  const toHex = (value: number): string => value.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}