<template>
  <Tip>最后更新 - 2024.07.05</Tip>
  <Title>#String</Title>
  <Text>字符串拥有如下特性：</Text>
  <List>一旦创建就无法修改字符串内容，本质上所有修改字符串的操作都是重新创建一个完全新的字符串</List>
  <List>使用`length`属性来获取字符串长度</List>
  <List>使用`+`表达式可以拼接多个字符串</List>
  <List>可以通过索引来访问字符串的单个字符</List>
  <List>使用字符串模板来在字符串中嵌入变量</List>
  <Code>{{`
    ---ts(字符串特性)
      const str1 = '123'
      const str2 = '456'

      console.log(str1.length)          // 3
      console.log(str1[0])              // 1
      console.log(str1 + str2)          // 123456
      console.log(\`$\{str1}-$\{str2}\`)    // 123-456
    ----
  `}}</Code>
  <Line></Line>

  <Title>##API</Title>
  <Text>字符串的所有方法，均不会对原字符串产生影响~</Text>

  <Title>###判断</Title>
  <Api>
    @api - string.includes(str, start?)
    @desc - 查找字符串中是否含有指定内容
    @params - [str : string] 指定查找内容
    @params - [start? : number] 查找起始索引，用于限制查找范围`[start, length]`
    @return - [boolean] 判断结果
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = 'morgiana'

      console.log(str.includes('org'))      // true
      console.log(str.includes('org', 3))   // false
      console.log(str.includes(''))         // true 空字符是任意字符串的子字符
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - string.startsWith(str, start?)
    @desc - 检查字符串是否以指定内容为开头
    @params - [str : string] 指定内容
    @params - [start? : number] 查找起始索引，用于限制查找范围`[start, length]`
    @return - [boolean] 判断结果
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = 'morgiana'

      console.log(str.startsWith('mo'))       // true
      console.log(str.startsWith('org', 3))   // false
      console.log(str.startsWith('gia', 3))   // true
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - string.endsWith(str, end?)
    @desc - 检查字符串是否以指定内容结尾
    @params - [str : string] 指定内容
    @params - [start? : number] 查找结束索引，用于限制查找范围`[0, end)`
    @return - [boolean] 判断结果
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = 'morgiana'

      console.log(str.endsWith('ana'))      // true
      console.log(str.endsWith('ana', 3))   // false
      console.log(str.endsWith('mor', 3))   // true
    ---
  `}}</Code>
  <Line></Line>

  <Title>###转换</Title>
  <Api>
    @api - string.split(separator?, length?)
    @desc - 将字符串按照分隔符拆分为数组形式
    @params - [separator? : string] 分隔符，默认`,`
    @params - [length? : number] 指定返回数组的最大长度，默认全部返回
    @return - [string[ ]] 返回拆分后的数组
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = '123,456,789'

      console.log(str.split())         // [ '123, 456, 789' ]
      console.log(str.split('', 5))    // [ '1', '2', '3', ',', '4' ]
    ---
  `}}</Code>
  <Line></Line>

  <Title>###拼接</Title>
  <Api>
    @api - string.concat(...str)
    @desc - 拼接字符串，和`+`功能一致
    @params - [str : string] 要拼接的字符串
    @return - [string] 拼接后的字符串
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = 'gegeda'

      const result = str.concat('a', 'bcd')
      console.log(result)   // gegedaabcd
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - string.padStart(length, str)
    @desc - 如果字符串没有达到指定长度，则在开头补充指定内容直到满足
    @params - [length : number] 规定字符串长度
    @params - [str : string] 填充字符
    @return - [string] 拼接后的字符串
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = 'gegeda'

      console.log(str.padStart(10,'1'))               // 1111gegeda
      console.log(str.padStart(10,'123456'))          // 1234gegeda
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - string.padEnd(length, str)
    @desc - 如果字符串没有达到指定长度，则在末尾补充指定内容直到满足
    @params - [length : number] 规定字符串长度
    @params - [str : string] 填充字符
    @return - [string] 拼接后的字符串
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = 'gegeda'

      console.log(str.padEnd(10,'1'))               // gegeda1111
      console.log(str.padEnd(10,'123456'))          // gegeda1234
    ---
  `}}</Code>
  <Line></Line>

  <Title>###替换</Title>
  <Api>
    @api - string.replace(target, str)
    @desc - 将满足条件的内容替换为指定字符串
    @params - [target : RegExp | string] 替换字符串
    @params - [str: string | (match, key, index, source) => string] 替换字符串，`match`：匹配字符; `key`：捕获分组内容，需要存在正则表达式分组才有此变量; `index`：匹配到字符串的初始索引; `source`：原字符
    @return - [string] 替换后的字符串
  </Api>
  <Code>{{`
    ---ts(演示)
      let str
      str = 'gegeda'
      console.log(str.replace(/ge/g,'da'))   // dadada
      console.log(str.replace(/ge/,'da'))    // dageda
      console.log(str.replace('ge','da'))    // dageda

      str = '<div>{#content#}</div>'
      const result = str.replace(/\{#(\w+)#\}/g, (match, key, index, source) => {
        console.log(match)    // {#content#}
        console.log(key)      // content
        console.log(index)    // 5
        console.log(source)   // <div>{#content#}</div>
        return 'x'
      })
      console.log(result)     // <div>x</div>
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - string.toUpperCase()
    @desc - 将字符串中的字母全部转换为大写
    @return - [string] 替换后的字符串
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = 'aBcD'

      console.log(str.toUpperCase())    // ABCD
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - string.toLowerCase()
    @desc - 将字符串中的字母全部转换为小写
    @return - [string] 替换后的字符串
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = 'aBcD'

      console.log(str.toLocaleLowerCase())    // abcd
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - string.trim()
    @desc - 去除字符串首尾的空白符
    @return - [string] 替换后的字符串
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = '  ge geda      '

      console.log(str.trim())               // 'ge geda'

      // 其他衍生API(单独去头和去尾)
      console.log(str.trimStart())          // ge geda
      console.log(str.trimEnd())            //   ge geda
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - String.raw(callSite, ...substitutions?)
    @desc - 常用于将被转义字符替换为非转义字符，同时也可以作为穿插字符方法使用
    @params - [callSite? : object] 格式字符串对象
    @params - [substitution : string] 插入字符串
    @return - [string] 替换后字符串
  </Api>
  <Code>{{`
    ---ts(替换字符)
      console.log(String.raw\`a\\nb\\\\c\`)    // a\\nb\\\\c  相当于下面的字符
      console.log(\`a\\\\nb\\\\\\\\c\`)           // a\\nb\\\\c

      // 常用于需要变量的正则表达中
      let params
      const reg1 = new RegExp(String.raw\`\\s\${params}\`)
      const reg2 = new RegExp(\`\\\\s\${params}\`)           // 否则要这样写，只要正则表达式一复杂就会很恶心
    ---
    ---ts(穿插字符)
      let result 

      result = String.raw({raw: 'abcd'}, '12345')
      console.log(result)                 // a12345bcd

      result = String.raw({raw: 'abcd'}, '1', '2', '3', '4', '5')
      console.log(result)                 // a1b2c3d

    ---
  `}}</Code>
  <Line></Line>

  <Title>###截取</Title>
  <Api>
    @api - string.slice(start?, end?)
    @desc - 截取字符串的`[start, end)`部分内容，可接受负值
    @params - [start? : number] 截取起始索引，默认值为 0
    @params - [end? : number] 截取终止索引，默认截取至末尾
    @return - [string] 截取后的字符串
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = 'morgiana'

      console.log(str.slice())      // morgiana
      console.log(str.slice(2))     // rgiana
      console.log(str.slice(2,4))   // rg
      console.log(str.slice(-2))    // na
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - string.substring(start?, end?)
    @desc - 截取字符串的`[start, end)`部分内容，不接受负值
    @params - [start? : number] 截取起始索引，默认值为 0
    @params - [end? : number] 截取终止索引，默认截取至末尾
    @return - [string] 截取后的字符串
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = 'morgiana'

      console.log(str.substring())      // morgiana
      console.log(str.substring(2))     // rgiana
      console.log(str.substring(2,4))   // rg
      console.log(str.substring(-2))    // morgiana
    ---
  `}}</Code>
  <Line></Line>

  <Title>###查找</Title>
  <Api>
    @api - string.charAt(n)
    @desc - 获取字符串指定索引字符
    @params - [n: number] 截取起始索引，默认值为 0
    @return - [string | undefine] 查找到的字符串
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = 'Hello World'

      console.log(str.charAt(1))    // e 
      console.log(str[1])           // e 功能和上面一样 
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - string.match(target)
    @desc - 获取满足条件的字符串数组
    @params - [target: RegExp | string] 指定条件正则表达式或者字符串
    @return - [any[ ] | null] 如果为正则全局匹配，返回满足条件字符串数组，否则返回信息数组，如果找不到返回 null
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = 'gegeda'

      console.log(str.match(/e/g))  // [ 'e', 'e' ]
      console.log(str.match(/e/))   // [ 'e', index: 1, input: 'gegeda', groups: undefined ]
      console.log(str.match('e'))   // [ 'e', index: 1, input: 'gegeda', groups: undefined ]
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - string.search(target)
    @desc - 获取字符串中指定内容的起始索引
    @params - [target: RegExp | string] 指定条件正则表达式或者字符串
    @return - [number] 满足内容条件则返回该内容第一个字符索引，否则返回`-1`
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = 'gegeda'

      console.log(str.search('ge'))       // 0  
      console.log(str.search(/ge..$/))    // 2
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - string.indexOf(str, start?)
    @desc - 从前往后遍历，获取字符串中指定内容的起始索引
    @params - [str : string] 指定查找内容
    @params - [start? : number] 开始查找索引，默认为 0
    @return - [number] 满足内容条件则返回该内容第一个字符索引，否则返回`-1`
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = 'gegeda'

      console.log(str.search('ge'))       // 0  
      console.log(str.search(/ge..$/))    // 2
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - string.lastIndexOf(str, start?)
    @desc - 从后往前遍历，获取字符串中指定内容的起始索引
    @params - [str : string] 指定查找内容
    @params - [start? : number] 开始查找索引，默认为 0
    @return - [number] 满足内容条件则返回该内容第一个字符索引，否则返回`-1`
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = 'gegeda'

      console.log(str.lastIndexOf('ge'))      // 2  
      console.log(str.lastIndexOf('ge', 1))   // 2
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