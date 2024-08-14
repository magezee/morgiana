<template>
  <Tip>最后更新 - 2024.08.11</Tip>
  <Title>#Vue</Title>
  <Title>###视图更新逻辑</Title>
  <Text>Vue 的视图更新逻辑涉及其响应式系统，它决定了在数据变化时如何更新 DOM，不同版本中的实现细节有所不同</Text>
  <Text>**数据劫持**</Text>
  <List>vue2 使用`Object.defineProperty`来劫持数据对象的属性，在数据初始化时遍历对象的每个属性，并为其设置 getter 和 setter，当组件实例化时创建一个观察者（watcher）实例，并将它与组件模板中的数据绑定，每个观察者监视相关数据的变化</List>
  <List>vue3 使用`Proxy`对象替代`Object.defineProperty`，它可以拦截并代理对对象的访问，因此能检测包括属性添加和删除在内的各种变化</List>
  <Text>**依赖收集**</Text>
  <List>vue2 在属性的 getter 中进行依赖收集，使得当属性发生变化时，监听该属性的所有 watcher 都会得到通知并重新进行计算或渲染</List>
  <List>vue3 的 proxy 通过`Reflect API`，结合的`effect`和`track`系统，自动追踪被访问的属性依赖，当这些属性被修改时触发相关的副作用函数以执行更新操作</List>
  <Text>**更新机制**</Text>
  <List>都使用异步队列机制进行批量更新，每次数据变化后，不会立即更新视图，而是将更新操作推迟到下一个事件循环，因此，多次数据修改只会引起一次视图更新</List>
  <List>vue3 在批量更新的基础上使用更优化的`scheduler`调度策略可以更细致灵活地调整</List>
  <Text>**优势**</Text>
  <List>vue3 允许监听对象和数组的深层变动，而 vue2 只能通过内置的方法如`pop`，直接使用非改写方法如`filter`则无法监控到 </List>
  <List>vue3 提供了`reactive`和`ref`来手动创建响应式状态，这些 API 提供了更低层和细粒度的控制，使开发者可以显式地声明哪些数据需要跟踪</List>
  <List>vue3 内置更好的类型推断和 ts 支持</List>
  <Line></Line>

  <Title>###为什么需要.value</Title>
  <List>可以显式声明哪些数据为响应式数据，利于开发</List>
  <List>当需要追踪基本类型时，需要将该值包裹在一个对象中，响应式系统才能监测到这些数据的操作</List>
  <List>在 ts 使用`.value`明确访问有助于类型推断，减少潜在的类型错误</List>
  <Line></Line>

  <Title>###nextTick的作用和实现</Title>
  <Text>**作用**</Text>
  <Text>主要作用是延迟执行一段代码，直到下次 DOM 更新循环结束之后。这样可以确保在操作 DOM 时，变更已经反映在 DOM 上</Text>
  <Text>vue 是异步更新 dom 的，意味着更改数据后 dom 的更新不会立即生效，而是在下一个事件循环的`tick`中，如果此时立马操作 dom，获取到的不是更新后的 dom 状态，因此需要在`nextTick`中去做操作</Text>
  <Text>**实现**</Text>
  <Text>内部实现基于 js 的异步任务队列，在不同环境会采用不同的技术</Text>
  <List>Promise：现代浏览器中的首选方法，因为它们提供了微任务队列，并且性能优越</List>
  <List>MutationObserver：如果 promise 不可用，vue 会尝试使用这个基于 dom 的 api 来创建异步队列</List>
  <List>setImmediate：在某些环境中可用，如 IE</List>
  <List>setTimeout：以上所有方法都不可用，vue 最后会使用这个作为后备方案</List>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const emits = defineEmits([ 'noteContentMounted' ])

onMounted(() => {
  emits('noteContentMounted')
})

</script>



<style lang="less">

</style>