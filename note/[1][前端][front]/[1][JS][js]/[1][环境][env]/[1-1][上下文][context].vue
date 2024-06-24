<template>
  <Tip>最后更新 - 2024.06.24</Tip>
  <Title>#上下文</Title>
  <Refer :source="[
    { desc: '你真的了解执行上下文吗？', url: 'https://juejin.cn/post/6945240902625394718' },
  ]"></Refer>
  <Text>在 JavaScript 中，共有三种执行上下文</Text>
  <List>全局执行上下文：默认上下文，涵盖任何不在函数内部的代码，浏览器环境中特指`window`，node 中特指`global`，仅存在一个全局上下文</List>
  <List>函数执行上下文：每当一个函数被调用时，都会为其创建一个新的执行上下文</List>
  <List>Eval 执行上下文：`eval`函数可以将传入的字符串视为`js`代码运行，此时也会产生上下文，用的很少可以忽略</List>
  <Line></Line>

  <Title>##执行栈</Title>
  <Text>执行栈（也叫调用栈），JS 引擎用它来追踪函数调用，每当一个新的执行上下文被创建，它会被推入栈中，执行完成后弹出</Text>
  <Text>程序运行步骤如下：</Text>
  <Text>1. 当程序开始时，将全局上下文推入栈中，始终位于栈底</Text>
  <Text>2. 函数被调用时，创建新的上下文推入栈顶</Text>
  <Text>3. 函数执行完毕时，它的上下文从执行栈中弹出</Text>
  <Text>下面有个简单的小例子：</Text>
  <Code>{{`
    ---js(执行栈)
      function fatherFn() {
        var fatherData = 'fatherData'

        function childFn() {
          var childData = 'childData'
          var multiData = fatherData + childData
        }

        childFn()   // 在faherFn的函数上下文中执行
      }
      
      fatherFn()  // 在全局上下文中执行
    ---
  `}}</Code>
  <Image src="https://morgiana.oss-cn-beijing.aliyuncs.com/note/context-01.png" :width="450"></Image>
  <Text>可以看出，为什么`childFn`可以在执行周期内一直引用`fatherFn`内部的数据，其原因也是在执行时`fatherFn`上下文一直存在</Text>

  <Line></Line>
  <Title>##生命周期</Title>
  <Text>每个执行上下文都有创建和执行两个主要阶段</Text>
  <Title>###创建</Title>
  <Text>创建阶段做以下三件事情：</Text>
  <List>创建词法环境</List>
  <List>创建变量环境</List>
  <list>绑定`this`</list>
  <Text>**词法环境**</Text>
  <Text>词法环境是一个用于存储变量、函数声明、特点上下文中的相关数据结构，它定义了变量和函数的作用域，其结构如下：</Text>
  <List>环境记录器：一个存储变量标识和它们实际值的地方，包括所有的变量、函数以及块级作用域的`let`和`const`变量</List>
  <List>外部词法环境引用：指向父级环境，如果当前作用域不包含某个变量，即去外层作用域找，直到全局环境</List>
  <Text>词法环境有三种类型：</Text>
  <List>全局词法环境：程序启动时即创建且一直存在，外部词法环境引用为`null`</List>
  <List>函数词法环境：每次函数调用时创建，包含函数的内部变量和内部函数声明，外部词法环境引用为创建该函数的词法环境</List>
  <List>在代码块（如`{ }`、`for`等代码块）内部创建，包含会计作用域`let`和`const`变量，外部词法环境为包含此块的语法环境</List>
  <Text>**变量环境**</Text>
  <Text>变量环境与词法环境非常相似，但是它专门用于存储通过`var`声明的变量</Text>
  <Line></Line>

  <Title>###执行</Title>
  <Text>执行阶段中，全局上下文会开始执行代码，将变量和函数赋予具体的值</Text>
  <Text>下面是一个简单的代码示例，演示了全局上下文、作用域链和执行栈的运作</Text>
  <Code>{{`
    ---js(环境小例子~)
      /** *************************************
        全局上下文
        全局词法环境
          环境记录器：{ globalVar: 'I am global', outerFunction: function }
          外部词法环境引用：null
      *************************************** **/
      var globalVar = 'I am global'   // globalvar就是这个变量的标识符

      /** *************************************
        outerFunction函数执行上下文
        词法环境
          环境记录器：{ outerVar: 'I am outer', innerFunction: function }
          外部词法环境引用：指向全局词法环境
        变量环境
          环境记录器：{ [no var declarations] }
          外部词法环境引用：指向全局词法环境
      *************************************** **/
      function outerFunction() {
          var outerVar = 'I am outer'

          /** *************************************
          innerFunction函数执行上下文
            词法环境
              环境记录器：{ innerVar: 'I am inner' }
              外部词法环境引用：指向outerFunction的词法环境
            变量环境
              环境记录器：{ [no var declarations] }
              外部词法环境引用：指向outerFunction的词法环境
          *************************************** **/
          function innerFunction() {
              let innerVar = 'I am inner'

              // 当内部查找不到，则向上级作用域查找，如果没有则继续向上查找
              console.log(innerVar)     // I am inner
              console.log(outerVar)     // I am outer
              console.log(globalVar)    // I am global 
          }

          innerFunction()
      }

      outerFunction()
    ---
  `}}</Code>
  <Line></Line>

  <Title>##提升</Title>
  <Text>
    在上下文的创建阶段，JS 引擎会将当前执行上下文中的所有变量声明和函数声明添加到全局上下文或函数上下文中，
    经过标识符绑定后，函数声明会被完整地提升到顶部并被初始化为函数对象，变量声明会被提升，但仅初始化为`undefine`
  </Text>
  <Title>###变量提升</Title>
  <Text>变量提升特指用`var`声明的变量，为了防止变量提升可以使用`let`和`const`进行声明，其特点如下：</Text>
  <List>不能在同一作用域下重复声明同名变量</List>
  <List>拥有块级作用域，不会对外部产生影响</List>
  <List>使用`const`声明时必须赋值且不可更改（若为引用类型则可以更改内部内容，因为值实际是引用地址）</List>
  <List>和`var`不同，不会添加到全局对象的属性中</List>
  <Quote>需要注意的是，只有`window`对象会自动存储`var`声明的变量，而`global`不会有该特性</Quote>
  <Code>{{`
    ---js(变量提升)
      console.log(data)  // undefined
      var data = 'data'
      console.log(data)  // data

      // 实际代码执行的顺序为：
      var data
      console.log(data)
      data = 'data'
      console.log(data)
    ---
    ---js(块级作用域)
      // x 不存在块级作用域，相当于声明了一个变量，进行两次赋值
      // y 在不同的作用域内声明了两个不同的变量
      console.log(x)    // undefined
      console.log(y)    // 报错: 暂时性死区，即虽然作用域开始便存在，但是直到变量声明执行阶段被实际执行前，访问这些变量会抛出错误

      var x = 'x'
      let y = 'y'
      {
        var x = 'new x'
        let y = 'new y'

        console.log(x)  // new x
        console.log(y)  // new y
      }

      console.log(x)    // new x
      console.log(y)    // y
    ---
    ---js(变量提升影响)
      // 比较经典的是异步循环例子
      // 换成let即可解决
      for(var i=0; i<5; i++){
        setTimeout(() => {
          console.log(i)					// 5 5 5 5 5
        })
      }

      // 代码相当于:
      var i
      {
        i = 0
        setTimeout(() => {console.log(i)})		// 1
      }
      {
        i = 1	
        setTimeout(() => {console.log(i)})		// 1
      }
    ---
  `}}</Code>
  <Line></Line>

  <Title>###函数提升</Title>
  <Text>函数提升特指用函数声明式`function fn( ){ }`声明的函数</Text>
  <Code>{{`
    ---js(声明式和表达式)
      // 如果不是声明式方式，则按变量提升的规则处理
      console.log(fn_1)      // [Function: fn_1]
      console.log(fn_2)      // undefine
      console.log(fn_3)      // 报错：暂时性死区

      fn_1()                 // fn_1 running
      fn_2()                 // 报错：fn_2 is not a function
      fn_3()                 // 报错：fn_2 is not a function

      function fn_1() {
        console.log('fn_1 running')
      }

      var fn_2 = function() {
        console.log('fn_2 running')
      }

      const fn_3 = function() {
        console.log('fn_3 running')
      }
      
    ---
    ---js(多次赋值)
      // 因为函数提升，第二次声明覆盖同名函数内容，然后再调用两次fn
      function fn() {
        console.log('first fn is running')
      }
      fn()      // second fn is running

      function fn() {
        console.log('second fn is running')
      }
      fn()      // second fn is running
    ---

  `}}</Code>
  <Line></Line>

  <Title>##作用域</Title>
  <Text>在 JS 中共有四种作用域：全局、函数、块级、动态作用域，前三种的特性上面都有提到，这里只介绍动态作用域</Text>
  <Text>动态作用域特指关键字`this`，它由函数(非箭头函数)产生，为何是动态呢？因为它的指向的确定时机是在函数执行时而非函数定义时，主要特点如下：</Text>
  <List>指向最后调用该函数的对象</List>
  <List>函数内部调用另外一个函数时，该函数直接指向全局对象（包括箭头函数）</List>
  <Code>{{`
    ---js(动态this)
      global.data = 'global data'

      const obj = {
        data: 'obj data',
        fn() {
          const data = 'fn data'
          console.log(this.data)
        },
        innerObj: {
          data: 'inner obj data',
          fn() {
            const data = 'inner fn data'
            console.log(this.data)
          }
        }
      }

      // 当函数被调用时，指向最后一个调用它的对象
      obj.fn()                        // obj data
      obj.innerObj.fn()               // inner obj data

      // 由于函数被重新赋值后，最后调用它的实际上是全局对象，因此this都指向了全局对象
      const fn_1 = obj.fn
      const fn_2 = obj.innerObj.fn   
      fn_1()                          // global data
      fn_2()                          // global data
      
    ---
    ---js(函数内部调用)
      global.data = 'global data'

      function showData() {
        console.log(this.data)
      }

      const obj = {
        data: 'obj data',
        fn() {
          const data = 'fn data'
          showData()
        },
        innerObj: {
          data: 'inner obj data',
          fn() {
            const data = 'fn data'
            showData()
          }
        }
      }

      obj.fn()                        // global data
      obj.innerObj.fn()               // global data
    ---
  `}}</Code>
  <Line></Line>
  <Title>###箭头函数</Title>
  <Text>与普通函数不同，箭头函数不会通过自己产生`this`，它只会捕获其所在上下文的`this`值，即：</Text>
  <List>如果没有父级普通函数，箭头函数不会更改`this`，始终指向全局对象（浏览器环境中指向`window`，而 node 环境中则指向一个空对象而非`global`）</List>
  <List>如果存在父级普通函数，则`this`的值和最近父级普通函数的`this`值完全一致</List>
  <Code>{{`
    ---js(this捕获)
      window.data ='window data'

      const obj = {
        data: 'obj data',
        fn() {
          const data = 'fn data'
          console.log(this.data)    // obj data
          
          const arrowFn = () => {
            console.log(this.data)  // obj data  捕获fn的this
          }

          arrowFn()
        }
      }

      obj.fn()
    ---
    ---js(多重嵌套)
      window.data = 'window data'

      const obj = {
        data: 'obj data',
        fn_1:() => {
          console.log(this.data)            // window data  父级没有普通函数
          return {
            data: 'obj_1 data',
            fn_2() {
              console.log(this.data)        // obj_1 data
              return {
                data: 'obj_2 data',
                fn_3: () => {
                  console.log(this.data)    // obj_1 data  最近的父级是fn_2，this指向与其一致
                }
              }
            }
          }
        }
      }

      obj.fn_1().fn_2().fn_3()
    ---
  `}}</Code>
  <Line></Line>

  <Title>###丢失this</Title>
  <Text>丢失`this`指的是在一些场景下，它的指向没有满足期望，而是指向了全局对象，常出现在回调函数、事件处理等场景</Text>
  <Code>{{`
    ---js(回调函数)
      // 异步回调，比如setTimeout
      window.data = 'window data'

      const obj = {
        data: 'obj data',
        fn() {
          setTimeout(function() {
            console.log(this.data)   // window data
          })
        }
      }

      obj.fn()

      // 以及一些常见回调
      window.data = 'window data'

      const obj = {
        data: 'obj data',
        fn() {
          [1, 2, 3].forEach(function() {
            console.log(this.data)    // window data x3
          })
        }
      }

      obj.fn()
    ---
    ---js(事件处理)
      const button = document.querySelector('button')
      const obj = {
        data: 'obj data',
        fn() {
          console.log(this.data)
        }
      }

      button.onclick = obj.fn   // 点击按钮时，this指向的是button
    ---
  `}}</Code>
  <Text>解决方式也很简单，一种是全都改成箭头函数，另外一种则是重新为`this`指向，即使用下面三个函数对象的 API：</Text>
  <List>`function.call(obj, ...params)`：调用一个函数，并让其`this`指向`obj`</List>
  <List>`function.apply(obj, [...params])`：与`call`方法功能一致，只是参数接受的是数组形式</List>
  <List>`function.bind(obj)`：创建一个新的函数，当它被调用时，其`this`指向`obj`</List>
  <Quote>箭头函数不可以使用上述方式改变`this`值~</Quote>
  <Code>{{`
    ---js(回调函数)
      window.data = 'window data'

      const obj = {
        data: 'obj data',
        fn() {
          setTimeout(function() {
            console.log(this.data)   // obj data
          }.call(obj))

          setTimeout(function() {
            console.log(this.data)   // obj data
          }.apply(obj))

          setTimeout((function() {
            console.log(this.data)   // obj data
          }.bind(obj))())
        }
      }

      obj.fn()
    ---
  `}}</Code>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { Code, Line, Title, Text, Table, Image, List, Refer, Quote, Tip, Api } from '../../../../page/component/note/'

const emits = defineEmits([ 'noteContentMounted' ])

onMounted(() => {
  emits('noteContentMounted')
})

// 动态加载组件


</script>



<style lang="less">

</style>