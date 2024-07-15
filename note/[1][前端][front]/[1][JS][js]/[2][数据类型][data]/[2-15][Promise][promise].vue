<template>
  <Tip>最后更新 - 2024.07.09</Tip>
  <Title>#Promise</Title>
  <Text>Promise 是一个用于处理异步操作的对象，代表一个异步操作的最终结果（成功 or 失败）</Text>
  <Line></Line>
  <Title>##特性</Title>
  <Title>###创建实例</Title>
  <Text>有两种方式可以创建实例，无论哪种方式，在声明时都是同步操作，只有当第一个链式调用开始后才是异步：</Text>
  <List>构造函数：使用该方式的好处是灵活，可以控制创建实例时的额外操作，但是代码累赘</List>
  <List>静态方法：相当于构造函数的语法糖</List>
  <Code>{{`
    ---ts(构造函数)
      const promise = new Promise((resolve, reject) => {
        console.log('这里是一些额外操作...')      // 先打印，说明此时还是同步代码
        resolve('data')
      })

      promise.then((data) => {
        console.log(data)                       // 后打印
      })
    ---
    ---ts(静态方法)
      let promise = Promise.resolve('data')

      promise = promise.then((data) => data)

      console.log(promise)      // Promise { <pending> }

      setTimeout(() => {
        console.log(promise)    // Promise { 'data' }
      })
    ---
  `}}</Code>
  <Line></Line>

  <Title>###链式调用</Title>
  <Text>在 promise 的多级链式调用中，有如下特性：</Text>
  <List>状态管理：每个实例都处于三种状态之一 `pending`：初始状态，操作未完成; `fulfilled`：操作成功完成; `rejected`：操作失败</List>
  <List>维持状态：一旦状态转换为操作成功/失败，它的状态就无法再次变化</List>
  <List>状态传递：使用`then`和`catch`方法会在当前 promise 完成后返回一个新的 promise 实例，从而实现链式调用和状态传递</List>
  <List>数据传递：数据只能下一个链式调用接受上一个的数据，无法跨级传递</List>
  <Code>{{`
    ---ts(数据传递)
      Promise.resolve('A')
        .then((data) => {
          console.log(data)				// A
          return 'B'
        })
        .then((data) => {
          console.log(data)				// B
        })
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>###异步阻塞</Title>
  <Text>在链式调用中，会持续等待上一个状态置为非 `pending` 才会执行下一个，阻塞只对 promise 有效，无法作用域其他异步</Text>
  <Code>{{`
    ---ts(阻塞异步)
      Promise.resolve()
        .then(() => {
          setTimeout(() => {
            console.log('执行了setTimeout方法')   // 无法被阻塞
          })
        })
        .then(() => {
          console.log('任务完成')
        })
    ---
    ---ts(改进)
      Promise.resolve()
        .then(() => {
          return new Promise((resolve) => {
            setTimeout(() => {
              console.log('执行了setTimeout方法')   // 会被阻塞
              resolve()
            })
          })
        })
        .then(() => {
          console.log('任务完成')
        })
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>###错误处理</Title>
  <Text>使用 promise 中的`reject`和`catch`都可以捕获错误，有如下特性：</Text>
  <List>捕获方式：`reject` 返回的是一个失败状态的 promise，用于抛出错误， `catch` 状态返回的是成功状态的，用于处理错误</List>
  <List>捕获机制：链式调用中上一个状态置为 reject 后，如果没有在后续传入第二个回调函数接收错误，则只能被后续声明 catch 的方法捕获，且网络错误造成的错误只能被 catch 捕获，因此捕获错误直接选 catch 就完事了</List>
  <List>错误影响：链式调用中其中一个状态置为失败后，则在捕获错误声明前的 promise 任务都不会被执行</List>
  <List>多级错误：如果存在多个错误，只会一条链路中直至捕获前的最开始的错误</List>
  <Code>{{`
    ---ts(reject 捕获)
      const promise =  Promise.resolve().then(() => {
        return new Promise((resolve, reject) => {
          reject('出大事儿啦!!!')
        })
      })

      console.log(promise)        // Promise { <pending> }

      setTimeout(() => {
        console.log(promise)      // Promise { <rejected>: '出大事儿啦！！！' }
      })
    ---
    ---ts(catch 捕获)
      const promise =  Promise.resolve().then(() => {
        throw new Error('出大事儿啦！！！')
      })
        .catch((err) => {
          console.log(err)        // Error：'出大事儿啦！！！'
          return '错误信息'
        })

      console.log(promise)        // Promise { <pending> }

      setTimeout(() => {
        console.log(promise)      // Promise { <fulfilled>: '错误信息' }
      })
    ---
    ---ts(捕获机制)
      const promise1 =  Promise.reject('出大事儿啦!!!')
        .then(
          (data) => {console.log(data)},      // 无数据打印
          (err) => {console.log(err)}         // 出大事儿啦!!!             
        )
        .catch((err) => {
          console.log(err)                    // 无数据打印，因为错误已经在之前被捕获到了
        })


      const promise2 =  Promise.reject('出大事儿啦!!!')
        .then(
          (data) => {console.log(data)},      // 无数据打印        
        )
        .catch((err) => {
          console.log(err)                    // 出大事儿啦!!!
        })
    ---
    ---ts(错误影响)
      // 3、4任务不会被执行，使用reject方式捕获错误同样结果
      Promise.resolve()
        .then(() => {console.log('执行第1个任务')})
        .then(() => {
          console.log('执行第2个任务')
          throw new Error('出大事儿啦!!!')
        })
        .then(() => {console.log('执行第3个任务')})
        .then(() => {console.log('执行第4个任务')})
        .catch((err) => {
          console.log('执行第5个任务')
          console.log(err)
        })
        .then(() => {console.log('执行第6个任务')})
    ---
    ---ts(多级错误)
      Promise.reject('出大事儿啦!!!')
        .then(() => {
          throw new Error('又出大事儿啦!!!')
        })
        .catch((err) => {
          console.log(err)                      // 出大事儿啦!!!
        })
        .catch((err) => {
          console.log(err)                      // 无数据打印
        })
        .then(() => {
          throw new Error('又又出大事儿啦!!!')
        })
        .catch((err) => {
          console.log(err)                      // 又又出大事儿啦!!!
        })
    ---
  `}}</Code>
  <Line></Line>

  <Title>##场景</Title>
  <Text>
    使用 promise 的场景往往和网络请求相关，虽然一般的请求库都已经将请求过程封装成了一个 promise，使用`async`函数也可以优雅地拿到数据，
    但是该函数无法独立完成如并行处理请求的机制，仍需要借用 promise 的能力
  </Text>
  <Code>{{`
    ---ts(并行执行)
      // 打印 id 顺序依次为 1 3 2 说明并行执行
      const task = (id, delay) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log(id)
            resolve(\`task \${id} completed\`)
          }, delay)
        })
      }

      Promise.all([
        task(1, 1000), 
        task(2, 2000), 
        task(3, 1500)
      ])
        .then(results => {
            console.log(results)  // [ 'task 1 completed', 'task 2 completed', 'task 3 completed' ]
        })

    ---
    ---ts(超时处理)
      // 用于模拟请求延时和回调
      const asyncWork = (callback, time) => new Promise((resolve) => {
        setTimeout(() => {
          callback(resolve)
        }, time)
      })

      const fetchTimeout = (fetch, timeout=5000) => {
        Promise.race([
          fetch,
          asyncWork(() => { throw new Error('请求超时') }, timeout)
        ])
      }

      fetchTimeout(asyncWork((resolve) => {
        resolve('请求结束')
      }, 5000))
    ---
    ---ts(请求重试)
      const asyncWork = (callback, time) => new Promise((resolve) => {
        setTimeout(() => {
          callback(resolve)
        }, time)
      })

      const fetchWithRetry = (fetch, retries = 3) => {
        return fetch.then((data) => {
          if(!data) {
            if(retries > 1) {
              console.log('重试中...')
              return fetchWithRetry(fetch, retries - 1)
            }
            throw new Error('已达到最大重试次数')
          }
          console.log('拿到数据：' + data)
          return data
        })
      }

      fetchWithRetry(asyncWork((resolve) => {
        resolve(1)  // 拿到数据：1
      }, 3000))

      fetchWithRetry(asyncWork((resolve) => {
        resolve()   // 重试中... 重试中... Error: 已达到最大重试次数
      }, 3000)) 
    ---
  `}}</Code>
  <Line></Line>

  <Title>##API</Title>
  <Title>###链式调用</Title>
  <Api>
    @api - promise.then(callback?, errorCallbcak?)
    @desc - 链式调用下一个任务
    @params - [callback? : (data) => any] 回调函数，`data`：上一个 promise 成功时传递的数据
    @params - [errorCallback? : (error) => any] 捕获错误回调函数，`error`：最开始的错误
    @return - [promise] 一个新的 promise
  </Api>
  <Code>{{`
    ---ts(演示)
      Promise.resolve('传递的数据')
        .then((data) => {
          console.log(data)       // 传递的数据
        })
        .then((data) => {
          console.log(data)       // undefined，因为上一个promise没有值传递
        })
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - promise.catch(callback?)
    @desc - 捕获链式任务过程中的错误
    @params - [callback? : (error) => any] 捕获错误回调函数，`error`：最开始的错误
    @return - [promise] 一个新的 promise
  </Api>
  <Code>{{`
    ---ts(演示)
      Promise.reject('出大事儿啦!!!')
        .catch((err) => {
          console.log(err)      // 出大事儿啦!!!
        })
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - promise.finally(callback?)
    @desc - 无论任务链是否有报错，都会执行该方法
    @params - [callback? : () => any] 回调函数
    @return - [promise] 一个新的 promise
  </Api>
  <Code>{{`
    ---ts(演示)
      new Promise((resolve, reject) => {
        resolve()
      })
        .then(() => new Promise((resolve, reject) => {
          reject()
        }))
        .finally(() => {
          console.log('任务完毕')       // 任务完毕
        })
    ---
  `}}</Code>
  <Line></Line>

  <Title>###并行处理</Title>
  <Api>
    @api - Promise.all(promiseTasks)
    @desc - 并行处理多个任务，仅全部任务都成功时才会返回`fulfilled`状态的 promise 并往下继续链式调用，如果有任一任务失败则立即往下调用（不影响原任务集继续执行）
    @params - [promiseTasks : promise[ ]] promise 任务数组
    @return - [promise] 一个新的 promise，包含所有成功任务返回的数据数组，或者首个任务失败信息
  </Api>
  <Code>{{`
    ---ts(演示)
      const asyncWork = (callback, time) => new Promise((resolve, reject) => {
        setTimeout(() => {
          callback(resolve, reject)
        }, time)
      })

      Promise.all([
        asyncWork((resolve) => resolve(1), 1000),
        asyncWork((resolve) => resolve(3), 2000),
        asyncWork((resolve) => resolve(5), 3000)
      ]).then(data => {
        console.log(data)     // [ 1, 3, 5 ] 等到所有任务都成功后才打印
      })

      Promise.all([
        asyncWork((resolve) => { console.log(1) }, 1000),
        asyncWork((resolve, reject) => reject('出大事啦'), 0),
        asyncWork((resolve) => resolve(5), 5000)
      ]).catch((err) => {
        console.log(err)     // 先打印 出大事啦，后打印 1 ，说明失败立即往下执行，并且不会中断任务集合
      })
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Promise.race(promiseTasks)
    @desc - 并行处理多个任务，当任一任务置为非`pending`状态时立即向下执行链式调用（不影响原任务集继续执行）
    @params - [promiseTasks : promise[ ]] promise 任务数组
    @return - [promise] 一个新的 promise，传递首个成功或失败任务的数据
  </Api>
  <Code>{{`
    ---ts(演示)
      const asyncWork = (callback, time) => new Promise((resolve, reject) => {
        setTimeout(() => {
          callback(resolve, reject)
        }, time)
      })

      Promise.race([
        asyncWork((resolve) => resolve(1), 1000),
        asyncWork((resolve) => resolve(3), 2000),
        asyncWork((resolve) => resolve(5), 3000)
      ]).then(data => {
        console.log(data)     // 1 
      })

      Promise.race([
        asyncWork((resolve) => { console.log(1) }, 1000),
        asyncWork((resolve, reject) => reject('出大事啦'), 0),
        asyncWork((resolve) => resolve(5), 5000)
      ]).catch((err) => {
        console.log(err)     // 先打印 出大事啦  后打印 1
      })
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Promise.allSettled(promiseTasks)
    @desc - 并行处理多个任务，只有全部任务都为非`penging`时才会继续往下链式调用
    @params - [promiseTasks : promise[ ]] promise 任务数组
    @return - [promise] 一个新的 promise，传递所有任务信息数组
  </Api>
  <Code>{{`
    ---ts(演示)
      const asyncWork = (callback, time) => new Promise((resolve, reject) => {
        setTimeout(() => {
          callback(resolve, reject)
        }, time)
      })

      Promise.allSettled([
        asyncWork((resolve) => resolve(1), 1000),
        asyncWork((resolve) => resolve(3), 4000),
        asyncWork((resolve) => resolve(5), 3000)
      ]).then(data => {
        console.log(data)     // [ { status: 'fulfilled', value: 1 }, { status: 'fulfilled', value: 3 }, { status: 'fulfilled', value: 5 } ]
      })

      Promise.allSettled([
        asyncWork((resolve) => resolve(1), 1000),
        asyncWork((resolve, reject) => reject('出大事啦'), 0),
        asyncWork((resolve) => resolve(5), 5000)
      ]).then(data => {
        console.log(data)     // [ { status: 'fulfilled', value: 1 }, { status: 'rejected', reason: '出大事啦' }, { status: 'fulfilled', value: 5 } ]
      })
    ---
  `}}</Code>
  
  

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