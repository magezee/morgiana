<template>
  <Tip>最后更新 - 2024.07.02</Tip>
  <Title>#Array</Title>
  <Text>使用数组时，需要注意以下内容：</Text>
  <List>直接使用字面量`[]`和`new Array()`都可以创建数组，但是后者如果只传一个参数时，表示的是数组长度而非填充的元素</List>
  <List>数组的`length`属性在数组创建被初始化，跟随数组长度动态变化，最末元素索引为`n`时，数组长度为`n+1`</List>
  <List>数组索引为`string`类型而非`number`</List>
  <List>使用`for...in`或`for...of`遍历数组</List>
  <Code>{{`
    ---ts(创建数组)
      const list1 = [1, 2, 3]                 // [ 1, 2, 3 ]
      const list2 = new Array(1, 2, 3)        // [ 1, 2, 3 ]

      const list3 = new Array(3)              // [ <3 empty items> ]
      const list4 = new Array(3).fill(0)      // [ 0, 0, 0 ] 使用fill填充数组
    ---
    ---ts(索引类型)
      const list = ['a', 'b', 'c']

      // 永远不相等
      for(let index in list) {
        if(index === 2) {
          console.log(list[index])
        }
      }
    ---
    ---ts(遍历数组)
        const list = ['a', 'b', 'c']

        for(let index in list) {
          console.log(index)      // 0 1 2
        }

        for(let item of list) {
          console.log(item)       // a b c
        }

        // 跳出单次循环
        for(let index in list) {
          if(index == 1) continue
          console.log(index)      // 0 2
        }

        // 跳出循环
        for(let index in list) {
          if(index == 1) break
          console.log(index)      // 0
        }
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>##API</Title>
  <Text>调用数组方法时，主要需要注意以下调用该方法后会不会影响原数组~</Text>
  <Title>###判断</Title>
  <Api>
    @api - Array.isArray(target)
    @desc - 判断一个目标是否为数组类型
    @params - [target : any] 判断目标
    @return - [boolean] 判断结果
  </Api>
  <Code>{{`
    ---ts(演示)
      const array = [0, 1, 2]
      const arrayLike = { 0: 0, 1: 1, 2: 2, length: 3 }

      console.log(Array.isArray(array))       // true
      console.log(Array.isArray(arrayLike))   // false
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - array.includes(target, start?)
    @desc - 判断数组索引 `[start, length]` 中的元素是否包含指定元素
    @params - [target : any] 指定元素
    @params - [start? : number] 搜索起始索引，默认值为 0，接受负值
    @return - [boolean] 判断结果
  </Api>
  <Code>{{`
    ---ts(演示)
      const arr = [NaN, undefined, null]

      console.log(arr.includes(NaN))      // true
      console.log(arr.includes(NaN, 1))   // false
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - array.every(mapFn, thisArg?)
    @desc - 判断数组内所有的元素是否都符合条件
    @params - [mapFn? : (item, index, arr) => any] 指定 map 回调函数，每个元素都会执行该函数
    @params - [thisArg? : any] 执行回调函数时 this 指定对象（需要绑定时，mapFn 不能写成箭头函数）
    @return - [boolean] 判断结果
  </Api>
  <Code>{{`
    ---ts(演示)
      const list1 = [1, 2, 3, 4]
      const list2 = [1, 2, 3, '4']

      const callback = (item) => {
        return typeof item === 'number'
      }

      console.log(list1.every(callback))    // true
      console.log(list2.every(callback))    // false
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - array.some(mapFn, thisArg?)
    @desc - 判断数组内是否有符合条件的元素
    @params - [mapFn? : (item, index, arr) => any] 指定 map 回调函数，每个元素都会执行该函数
    @params - [thisArg? : any] 执行回调函数时 this 指定对象（需要绑定时，mapFn 不能写成箭头函数）
    @return - [boolean] 判断结果
  </Api>
  <Code>{{`
    ---ts(演示)
      const list1 = [1, 2, 3, 4]
      const list2 = [1, 2, 3, '4']

      const callback = (item) => {
        return typeof item === 'string'
      }

      console.log(list1.some(callback))    // false
      console.log(list2.some(callback))    // true
    ---
  `}}</Code>
  <Line></Line>

  <Title>###转换</Title>
  <Api>
    @api - array.join(separator?)
    @desc - 将数组转为字符串
    @params - [separator? : string] 生成字符串后的元素分隔符，默认为逗号
    @return - [string] 不影响原数组，返回转换后字符串
  </Api>
  <Code>{{`
    ---ts(演示)
      const arr = [1, 2, 3]

      console.log(arr)            // [ 1, 2, 3 ]
      console.log(arr.join())     // 1,2,3
      console.log(arr.join(''))   // 123
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Array.from(arrayLike, mapFn?, thisArg?)
    @desc - 将类数组对象转换为数组
    @params - [arrayLike : object] 类数组对象
    @params - [mapFn? : (item, index, arr) => any] 指定 map 回调函数，每个元素都会执行该函数
    @params - [thisArg? : any] 执行回调函数时 this 指定对象（需要绑定时，mapFn 不能写成箭头函数）
    @return - [any[ ]] 不影响数组，返回一个全新数组
  </Api>
  <Code>{{`
    ---ts(演示)
      const arrayLike = { 0: 0, 1: 1, 2: 2, length: 3 }
      const obj = { multiple: 2 }

      const result1 = Array.from(arrayLike)     
      const result2 = Array.from(arrayLike, function(item) {
        return item * this.multiple
      }, obj)

      console.log(result1)    // [0, 1, 2]
      console.log(result2)    // [0, 2, 4]
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - Array.of(...params)
    @desc - 将传入参数组成一个新数组
    @params - [params : any] 数组元素
    @return - [any[ ]] 新数组，不传参数返回空数组
  </Api>
  <Code>{{`
    ---ts(演示)
      const result = Array.of(1, '2', [], [[]], {}, undefined)
      console.log(result)      // [ 1, '2', [], [[]], {}, undefined ]
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - array.flat(n?)
    @desc - 将目标数组扁平化
    @params - [n? : number] 扁平化深度，默认 1
    @return - [any[ ]] 不影响原数组，返回转换后新数组
  </Api>
  <Code>{{`
    ---ts(演示)
      const arr = [1, [2,[3,[4,5]]], 6];

      console.log(arr.flat())             // [ 1, 2, [ 3, [ 4, 5 ] ], 6 ]
      console.log(arr.flat(2))            // [ 1, 2, 3, [ 4, 5 ], 6 ]
      console.log(arr.flat(3))            // [ 1, 2, 3, 4, 5, 6 ]

      // 一般直接用Infinity进行通用的扁平化，无论深度多深都能扁平化完毕
      console.log(arr.flat(Infinity))     // [ 1, 2, 3, 4, 5, 6 ]
    ---
  `}}</Code>
  <Line></Line>

  <Title>###排序</Title>
  <Api>
    @api - array.sort(sortBy?)
    @desc - 对数组元素进行排序
    @params - [sortBy? : (a, b) => number] 比较规则函数 `a/b`：要比较的值， 返回值`&lt; 0`：a 排在b 前，`&gt; 0`：b 排在 a 前，`= 0`：不变
    @return - [any[ ]] 影响原数组，返回修改后数组
  </Api>
  <Code>{{`
    ---ts(演示)
      const list1 =  [2000, 100, 30]
      const list2 = ['2000', '100', '30']

      const result1 = list1.sort()
      const result2 = list2.sort()

      console.log(result1)    // [ 100, 2000, 30 ]
      console.log(result2)    // [ '100', '2000', '30' ]

      // 发现默认规则无法比较字符串，引入比较函数
      const result3 = list2.sort((a, b) => {
        return Number(a) - Number(b)
      })

      console.log(result3)    // [ '30', '100', '2000' ]
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - array.reverse( )
    @desc - 颠倒当前数组的元素排序
    @return - [any[ ]] 影响原数组，返回修改后数组
  </Api>
  <Code>{{`
    ---ts(演示)
      const arr = [null, undefined, {}]

      console.log(arr.reverse())      // [ {}, undefined, null ]
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>###遍历</Title>
  <Api>
    @api - array.map(mapFn, thisArg?)
    @desc - 遍历数组，每一个元素都执行回调函数
    @params - [mapFn : (item, index, arr) => any] 元素执行的回调函数 `item`：当前元素; `index`：当前索引; `arr`：遍历数组的本体
    @params - [thisArg? : any] 更改回调函数绑定的`this`，使用时回调函数不可写成箭头函数
    @return - [any[ ]] 不影响原数组，回调函数的返回值依次组成一个新数组并返回
  </Api>
  <Code>{{`
    ---ts(演示)
      const arr = [1, 2, 3, 4, 5]

      const result = arr.map((item) => {
        return item * item
      }) 

      console.log(result)   // [ 1, 4, 9, 16, 25 ]
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - array.forEach(mapFn, thisArg?)
    @desc - 遍历数组，每一个元素都执行回调函数
    @params - [mapFn : (item, index, arr) => any] 元素执行的回调函数，同上
    @params - [thisArg? : any] 更改回调函数绑定的`this`，同上
    @return - [undefined] 使用该方法只遍历执行，不拥有返回值
  </Api>
  <Code>{{`
    ---ts(演示)
      const arr = [1, 2, 3, 4]

      const result = arr.forEach((item, index, arr) => {
        arr[index] = item * item
      })

      console.log(arr)      // [ 1, 4, 9, 16 ]
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - array.reduce(callback, initValue?)
    @desc - 遍历数组，每个元素都执行一遍`callback`，常用于通过遍历数组生成另一自定义数据
    @params - [callback : (pre, cur, index, arr) => any] 回调函数 `pre`：上一个元素回调后返回值，如果第一个元素则为`initValue`的值; `cur`：当前元素; `index`：当前索引; `arr`：数组本体
    @params - [initValue? : any] 第一次遍历时的`pre`，如果不给该值，遍历则会跳过第一个元素，以第二个元素开始遍历，且此时`pre`为第一个元素
    @return - [any] 不影响原对象，返回值为最后一个元素执行回调函数的返回值
  </Api>
  <Code>{{`
    ---ts(生成新数据)
      const list = ['a', 'b', 'c', 'd']

      const result = list.reduce((pre, cur, index) => {
        pre[cur] = index
        return pre
      }, {})

      console.log(result)   // { a: 0, b: 1, c: 2, d: 3 }
    ---
    ---ts(累加器)
      const list = [1, 2, 3, 4]

      const result = list.reduce((pre, cur) => {
        pre = pre + cur
        return pre
      })

      console.log(result)   // 10
    ---
  `}}</Code>
  <Line></Line>

  <Title>###增删</Title>
  <Api>
    @api - array.push(...items)
    @desc - 在数组末尾添加新元素
    @params - [items : any] 添加的元素
    @return - [number] 影响原数组，返回新的数组长度
  </Api>
  <Code>{{`
    ---ts(演示)
      const arr = [1, 2, 3] 
      const result = arr.push(4,5,6)

      console.log(arr)        // [ 1, 2, 3, 4, 5, 6 ]
      console.log(result)     // 6
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - array.concat(...items)
    @desc - 在数组末尾添加新元素
    @params - [items : any] 添加的元素，如果是数组，则会进行一层扁平化
    @return - [any[ ]] 不影响原数组，返回组合后的新数组
  </Api>
  <Code>{{`
    ---ts(演示)
      const arr = [1, 2, 3]

      console.log(arr.concat(4, 5, 6))        // [ 1, 2, 3, 4, 5, 6 ]
      console.log(arr.concat([4, 5, 6]))      // [ 1, 2, 3, 4, 5, 6 ]
      console.log(arr.concat([4, [4, 5]]))    // [ 1, 2, 3, 4, [ 4, 5 ] ]
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - array.pop( )
    @desc - 删除数组最末的元素
    @return - [any] 不影响原数组，返回被刪除的元素
  </Api>
  <Code>{{`
    ---ts(演示)
      const arr = [1, 2, 3] 
      const result = arr.pop()

      console.log(arr)        // [ 1, 2 ]
      console.log(result)     // 3
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - array.unshift(...items)
    @desc - 在数组头部添加新元素
    @params - [items : any] 添加的元素
    @return - [number] 影响原数组，返回新的数组长度
  </Api>
  <Code>{{`
    ---ts(演示)
      const arr = [1, 2, 3] 
      const result = arr.unshift(4,5,6)

      console.log(arr)        // [ 4, 5, 6, 1, 2, 3 ]
      console.log(result)     // 6
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - array.shift( )
    @desc - 删除数组头部的元素
    @return - [any] 影响原数组，返回删除元素
  </Api>
  <Code>{{`
    ---ts(演示)
      const arr = [1, 2, 3] 
      const result = arr.unshift(4,5,6)

      console.log(arr)        // [ 4, 5, 6, 1, 2, 3 ]
      console.log(result)     // 6
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - array.splice(index, count?, ...items?)
    @desc - 可进行元素删除、添加或两者同时进行的操作
    @params - [index : number] 删除的索引位置，如果是负数，则从末往前数
    @params - [count? : number] 要删除的元素数量，从指定`index`开始算（包括 index），默认刪除后面所有元素
    @params - [items? : any] 刪除后，在空白处需要填充的元素
    @return - [number] 影响原数组，返回由被删除元素组成的新数组
  </Api>
  <Code>{{`
    ---ts(演示)
      const list1 = [1, 2, 3]
      const list2 = [1, 2, 3]
      const list3 = [1, 2, 3]

      // 仅刪除
      const result1 = list1.splice(1, 1)
      console.log(list1)                                      // [1, 3]
      console.log(result1)                                    // [ 2 ]

      // 仅添加
      const result2 = list2.splice(0, 0, ...[4, 5, 6])
      console.log(list2)                                      // [4, 5, 6, 1, 2, 3]
      console.log(result2)                                    // []

      // 删除并添加
      const result3 = list3.splice(1, 1, ...[4, 5, 6])
      console.log(list3)                                      // [ 1, 4, 5, 6, 3 ]
      console.log(result3)                                    // [ 2 ]
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - array.fill(value, start?, end?)
    @desc - 将`value`以覆盖的方式填充进数组索引的`[start, end)`，只能在规定长度内填充，无法改变数组长度
    @params - [value : any] 填充元素
    @params - [start? : number] 填充位置起始索引，默认为 0
    @params - [end? : number] 填充位置的终止索引，默认为数组长度，可接受负值
    @return - [any[ ]] 影响原数组，返回修改后的数组
  </Api>
  <Code>{{`
    ---ts(演示)
      const arr = new Array(3).fill(1)
      console.log(arr)      // [ 1, 1, 1 ]

      arr.fill(7, 1, 5)
      console.log(arr)      // [ 5, 7, 7 ]
    ---
  `}}</Code>
  <Line></Line>

  <Title>###拷贝</Title>
  <Api>
    @api - array.slice(start?, end?)
    @desc - 将数组索引`[start, end)`的元素浅拷贝到新的数组上
    @params - [start? : number] 起始索引，默认为 0，接受负值
    @params - [end? : number] 终止索引，默认为数组长度，可接受负值
    @return - [any[ ]] 不影响原数组，返回拷贝后的新数组
  </Api>
  <Code>{{`
    ---ts(演示)
      const list = [1, { x: 2 } ,3]

      const result = list.slice(1, 2)
      console.log(list)             // [ 1, { x: 2 }, 3 ]
      console.log(result)           // [ { x: 2 } ]

      // 浅拷贝会影响原引用数据
      result[0].x = 4
      console.log(list)             // [ 1, { x: 4 }, 3 ]
      console.log(result)           // [ { x: 4 } ]
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - array.copyWithin(index, start?, end?)
    @desc - 复制数组中索引`[start, end)`中的元素在索引`index`处进行覆盖式粘贴，不能改变总数组长度，超出长度的元素会被舍弃
    @params - [index : number] 粘贴处的索引
    @params - [start? : number] 复制内容的起始索引，默认为 0，接受负值
    @params - [end? : number] 复制内容的终止索引，默认为数组长度，可接受负值
    @return - [any[ ]] 影响原数组，返回修改后数组
  </Api>
  <Code>{{`
    ---ts(演示)
      const list1 = [1, 2, 3, 4]
      const list2 = [1, 2, 3, 4]

      const result1 = list1.copyWithin(1)            // 取元素1,2,3,4，在list1[1]开始依次往后填入这些元素
      const result2 = list2.copyWithin(0, 1, 2)      // 取元素2，在list2[0]处填入该元素

      console.log(result1)                           // [1, 1, 2, 3] 直接填入后是 [1,1,2,3,4] 超出一位元素舍弃变成[1,1,2,3]
      console.log(result2)                           // [2, 2, 4, 4] 直接填入后是 [2,2,3,4] 没超出长度不需要额外舍弃处理
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>###查找</Title>
  <Api>
    @api - array.find(mapFn, thisArg?)
    @desc - 获取第一个满足条件的数组元素
    @params - [mapFn : (item, index, arr) => any] 元素执行的回调函数，同上
    @params - [thisArg? : any] 更改回调函数绑定的`this`，同上
    @return - [any] 不影响原数组，返回满足条件的元素，无满足项则返回`undefined`
  </Api>
  <Code>{{`
    ---ts(演示)
      const arr = ['1', 2, [3], 4]

      const result = arr.find((item) => {
        return typeof item === 'number'
      })

      console.log(result)     // 2
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - array.findIndex(mapFn, thisArg?)
    @desc - 获取第一个满足条件的数组元素的索引
    @params - [mapFn : (item, index, arr) => any] 元素执行的回调函数，同上
    @params - [thisArg? : any] 更改回调函数绑定的`this`，同上
    @return - [number] 不影响原数组，返回满足条件的元素的索引，无满足项则返回`-1`
  </Api>
  <Code>{{`
    ---ts(演示)
      const arr = ['1', 2, [3], 4]

      const result = arr.findIndex((item) => {
        return typeof item === 'number'
      })

      console.log(result)     // 1
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - array.indexOf(target, start?)
    @desc - 在数组的`[start, length]`索引内的元素中查找满足条件的元素，由前往后找，找到第一个满足值立即返回
    @params - [target : any] 要查找的元素
    @params - [start? : number] 搜索起始索引，默认值为 0，接收负值
    @return - [number] 不影响原数组，返回满足条件的元素的索引，无满足项则返回`-1`
  </Api>
  <Code>{{`
    ---ts(演示)
      const arr = [1, 3, 2, 3]

      console.log(arr.indexOf(3))     // 1
      console.log(arr.indexOf(3, 2))  // 3
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - array.lastIndexOf(target, start?)
    @desc - 在数组的`[0, start]`索引内的元素中查找满足条件的元素，由后往前找，找到第一个满足值立即返回
    @params - [target : any] 要查找的元素
    @params - [start? : number] 搜索起始索引，默认值为`length-1`，接收负值
    @return - [number] 不影响原数组，返回满足条件的元素的索引，无满足项则返回`-1`
  </Api>
  <Code>{{`
    ---ts(演示)
      const arr = [1, 3, 2, 3]

      console.log(arr.lastIndexOf(3))     // 3
      console.log(arr.lastIndexOf(3, 2))  // 1
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - array.filter(mapFn, thisArg?)
    @desc - 过滤原始数组，获取所有满足条件的元素组成的数组
    @params - [mapFn : (item, index, arr) => any] 元素执行的回调函数，同上
    @params - [thisArg? : any] 更改回调函数绑定的`this`，同上
    @return - [any[ ]] 不影响原数组，将满足条件的元素填充进新数组并返回，没有满足项则为空数组
  </Api>
  <Code>{{`
    ---ts(演示)
      const arr = ['1', 2, [3], 4]

      const result = arr.filter((item) => {
        return typeof item === 'number'
      })

      console.log(result)     // [ 2, 4 ]
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