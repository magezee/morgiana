<template>
  <Tip>最后更新 - 2024.07.05</Tip>
  <Title>#RegExp</Title>
  <Text>正则表达式是用于匹配文本模式的工具，可用于执行模式匹配和搜索操作</Text>
  <Text>有两种声明正则表达式的方式：</Text>
  <List>字面量：使用简单，但无法传递变量</List>
  <List>字面量：使用灵活，可以传递变量，但是需要额外处理转义符</List>
  <Code>{{`
    ---ts(声明)
      const str = '1234 abcd'
      const a = 'a'

      const reg1 = /.*\\sa/g
      const reg2 = new RegExp(\`.*\\\\s\${a}\`, 'g')

      console.log(str.match(reg1))    // [ '1234 a' ]
      console.log(str.match(reg2))    // [ '1234 a' ]
    ---
  `}}</Code>
  <Text>拥有 3 种匹配模式：</Text>
  <List>`i` ：忽略大小写</List>
  <List>`g` ：全局匹配，默认匹配第一个满足条件项即退出，开启全局匹配则匹配全部</List>
  <List>`m` ：多行匹配，默认`^`和`$`不会将换行符`\n`看做一段文本新的开头或结尾，开启多行匹配则看做新的一段文本</List>
  <Code>{{`
    ---ts(声明)
      const str = 'abcd\\nABCD'

      console.log(str.match(/abcd/g))       // [ 'abcd' ]
      console.log(str.match(/abcd/ig))      // [ 'abcd', 'ABCD' ]

      console.log(str.match(/^abcd/ig))     // [ 'abcd' ]
      console.log(str.match(/^abcd/igm))    // [ 'abcd', 'ABCD' ]
    ---
  `}}</Code>
  <Line></Line>

  <Title>##匹配符</Title>
  <Title>###单字符</Title>
  <Table>
    #匹配单个字符
    |符号|描述|
    ------------------
    |`.`|匹配任意字符|
    |`\ .`|匹配`.`字符|
    |`\ \`|匹配`\`字符|
    |`\ /`|匹配`/`字符|
    |`\ (`|匹配`(`字符|
    |`\ )`|匹配`}`字符|
    |`\ d`|匹配数字字符|
    |`\ D`|匹配非数字字符|
    |`\ w`|匹配字母、数字、下划线字符|
    |`\ W`|匹配字母、数字、下划线以外字符|
    |`\ s`|匹配空格（空格、Tab 等）|
    |`\ S`|匹配非空格字符|
    |`\ b`|匹配隐性边界|
    |`\ S`|匹配非隐性边界|
  </Table>
  <Quote>
    单词和符号之间会产生一个隐性边界，单词指英文或数字字符，符号指中文及其他符号字符（如空格和特殊符号）<br />
    纯单词也会在首尾处产生隐性边界，而纯符号则不会
  </Quote>
  <Image src="https://morgiana.oss-cn-beijing.aliyuncs.com/note/js-regexp-01.png" :width="250"></Image>
  <Code>{{`
    ---ts(匹配单个字符)
      const str = '123 abc .$\\/_'

      str.match(/./g)    // [ '1', '2', '3',  ' ', 'a', 'b', 'c',  ' ', '.', '$', '\\', '/', '_' ]
      str.match(/\\./g)   // [ '.' ]
      str.match(/\\\\/g)   // [ '\\' ]
      str.match(/\\//g)   // [ '/' ]
      str.match(/\\d/g)   // [ '1', '2', '3' ]
      str.match(/\\D/g)   // [ ' ', 'a',  'b', 'c', ' ',  '.', '$', '\\', '/', '_' ]
      str.match(/\\w/g)   // [ '1', '2', '3', 'a', 'b', 'c', '_' ]
      str.match(/\\W/g)   // [ ' ', ' ', '.', '$', '\\', '/' ]
      str.match(/\\s/g)   // [ ' ', ' ' ]
      str.match(/\\S/g)   // [ '1',  '2', '3', 'a', 'b',  'c', '.', '$', '\\', '/', '_' ]
    ---
    ---ts(隐性边界)
        let str 

        str = '123abc'
        console.log(str.match(/\\b/g))             // [ '', '' ]

        str = '咯咯哒'
        console.log(str.match(/\\b/g))             // null

        str = 'apple origin'
        console.log(str.match(/\\b/g))             // [ '', '', '', '' ]

        // 多个符号组合的情况
        str = '咯咯哒 &*^% \\\\ + -'
        console.log(str.match(/\\b/g))             // null，纯符号不会产生边界

        str = 'apple咯咯哒 &*^% \\\\ + -origin'
        console.log(str.match(/\\b/g))             // [ '', '', '', '' ]，多个符号只影响一次隐性边界

        // 一般使用场景为匹配一个特定单词
        str = 'gegeda gegedagegeda'
        console.log(str.match(/\\bgegeda\\b/g))     // [ 'gegeda' ]
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>###位置</Title>
  <Table>
    #匹配位置
    |符号|描述|
    ------------------
    |`^`|匹配一行字符的开头|
    |`$`|匹配一行字符的结尾|
  </Table>
  <Code>{{`
    ---ts(匹配位置)
      const str = '1221\n1331'

      str.match(/^1.../g)      // [ '1221' ]
      str.match(/...1$/g)      // [ '1331' ]
      str.match(/^1.../gm)     // [ '1221', '1331' ]
    ---
  `}}</Code>
  <Line></Line>

  <Title>###数量</Title>
  <Table>
    #匹配位置
    |符号|描述|
    ------------------
    |`*`|匹配任意个字符（包含 0）|
    |`?`|匹配 0 个或 1 个字符|
    |`+`|匹配至少 1 个字符|
    |`{ n }`|匹配正好出现 n 次的字符|
    |`{ n ,  m }`|匹配出现 n ~ m 次的字符|
    |`{ n , }`|匹配出现 n 次及以上的字符|
  </Table>
  <Code>{{`
    ---ts(匹配位置)
      reg = /a*bc/          // 匹配bc或任意个a后跟bc
      reg = /a?bc/          // 匹配bc或abc
      reg = /a+bc/          // 匹配abc或一个以上a后跟bc
      reg = /a{3}bc/        // 匹配aaabc
      reg = /(ab){3}c/      // 匹配abababc
      reg = /a{1,3}bc/      // 匹配abc或abbc或abbbc
      reg = /a{3,}bc/       // 匹配3个及3个以上a后跟bc
    ---
  `}}</Code>
  <Line></Line>

  <Title>###或关系</Title>
  <Table>
    #或关系
    |符号|描述|
    ------------------
    |` \| `|用于匹配多个字符的或关系|
    |`[ ]`|用于匹配单个字符的或关系，在该表达式中，所有特殊符号均不需要转义|
    |`[n-m]`|匹配 n-m 范围内的任意字符|
    |`[^x]`|匹配任意一个非 x 的字符|
  </Table>
  <Code>{{`
    ---ts(常见用法)
      reg = /[a-z]/     // 匹配任意一个小写字母
      reg = /[A-Z]/     // 匹配任意一个大写字母
      reg = /[A-z]/     // 匹配任意一个字母
      reg = /[0-9]/     // 匹配任意一个数字
      reg = /^[0-9]/    // 匹配任意一个非数字字符

      reg = /a|b/       // 匹配a或b
      reg = /[ab]/      // 匹配a或b
      reg = /a|bc|d/    // 匹配a或bc或d
      reg = /a[bc]d/    // 匹配abd或acd
      
      // 无需转义
      const str = '.\\\\/()'
      str.match(/[.\\/()]/g)    // [ '.', '/', '(', ')' ]
    ---
    
  `}}</Code>
  <Line></Line>

  <Title>##特殊匹配</Title>
  <Title>###策略</Title>
  <Text>贪婪匹配和惰性匹配是两种不同的匹配策略：</Text>
  <List>贪婪匹配：在匹配过程中尽可能地匹配字符，使用量词匹配如`*`、`+`、`?`、`{n,m}`等默认情况都是贪婪的</List>
  <List>惰性匹配：在匹配过程中尽可能少地匹配字符，在任意贪婪量词后加上`?`即可变为惰性匹配，如`*?`、`+?`等</List>
  <Code>{{`
    ---ts(小例子)
    const str = 'This is a <sample> text with <multiple> tags'

    // 贪婪匹配 尽可能匹配字符 直到最后一个>才停止
    const greedyRegex = /<.*>/
    const greedyMatch = str.match(greedyRegex)[0]
    console.log(greedyMatch)    // <sample> text with <multiple>

    // 惰性 尽可能少匹配字符 遇到第一个>即停止
    const lazyRegex = /<.*?>/
    const lazyMatch = str.match(lazyRegex)[0]
    console.log(lazyMatch)      // <sample>
    ---
  `}}</Code>
  <Line></Line>
  
  <Title>###断言</Title>
  <Text>简单来说，先/后行断言的作用是利用前后字符作为条件去匹配，并且条件字符不会包含在匹配中，因为它匹配的是一个位置，而非一个字符，如果需要包含则需要额外匹配语法</Text>
  <List>正先行断言：`X(?=Y)`表示匹配 X，且 X 后必须紧邻 Y</List>
  <List>负先行断言：`X(?!Y)`表示匹配 X，且 X 后不能紧邻 Y</List>
  <List>正后行断言：`(?&lt;=Y)X`表示匹配 X，且 X 前必须紧邻 Y</List>
  <List>负后行断言：`(?&lt;!Y)X`表示匹配 X，且 X 前不能紧邻 Y</List>
  <Quote>先/后行断言有浏览器兼容问题，使用时需要注意哦~</Quote>
  <Code>{{`
    ---ts(先后行断言)
      let str
      let reg

      // 正先行断言
      str = 'foo1 bar foo2 baz foo3 bar'
      reg = /foo.(?= bar)/g
      console.log(str.match(reg))           // [ 'foo1', 'foo3' ]

      // 负先行断言
      reg = /foo.(?! bar)/g
      console.log(str.match(reg))           // [ 'foo2' ]

      // 正后行断言
      str = 'foo bar1 fox bar2 foo bar3'
      reg = /(?<=foo )bar./g
      console.log(str.match(reg))           // [ 'bar1', 'bar3' ]

      // 负后行断言
      reg = /(?<!foo )bar./g
      console.log(str.match(reg))           // [ 'bar2' ]

      // 带上匹配条件字符
      reg = /.{4}(?<=foo )bar./g
      console.log(str.match(reg))           // [ 'foo bar1', 'foo bar3' ]
    ---
  `}}</Code>
  <Line></Line>


  <Title>##分组</Title>
  <Text>分组是一种在复杂模式中将子模式划分为可以独立匹配和操作的子单元的方法，分为以下几种功能：</Text>
  <List>子模式的分组和捕获：使用`( )`创建捕获组，这些捕获组可以将匹配的子模式保存起来，便于在后续操作中引用</List>
  <List>非捕获组：当需要分组但不想捕获匹配内容时，可以使用非捕获组`(?:...)`</List>
  <List>反向引用：可以对前面捕获的子组进行引用，有两种引用方式`\1`与`$1`，前者用于在正则表达式匹配过程中引用捕获组，后者用于在正则表达式替换过程中引用捕获组，`\1`代表第一个捕获组，`\2`代表第二个依此类推</List>
  <List>嵌套分组：可以嵌套捕获组，即一个捕获组内可以再包含其他的捕获组，嵌套后的捕获组编号依次递增，外层捕获组的编号总是小于其内部捕获组</List>
  <List>命名捕获组：可以使用`(?&lt;name&gt;)`为捕获组命名，提高可读性</List>
  <Code>{{`
    ---ts(创建分组)
      let reg 
      const str = '123-4567'

      // <原始>
      reg = /\d{3}-\d{4}/
      console.log(str.match(reg)) 
      // [ '123-4567', index: 0, input: '123-4567', groups: undefined ]

      /// <捕获组>
      reg = /(\d{3})-(\d{4})/
      console.log(str.match(reg)) 
      // [ '123-4567', '123', '4567', index: 0, input: '123-4567', groups: undefined ]

      /// <非捕获组>
      reg = /(?:\d{3})-(\d{4})/
      console.log(str.match(reg)) 
      // [ '123-4567', '4567', index: 0, input: '123-4567', groups: undefined ]
    ---
    ---ts(引用分组)
      // <原始>
      let reg = /(\\d{3})-(\\d{4})-\\d{3}/
      const str = '123-4567-123'

      console.log(reg.exec(str)[0])                 // 123-4567-123

      // <引用>
      reg = /(\\d{3})-(\\d{4})-\\1/

      console.log(reg.exec(str)[0])                 // 123-4567-123
      console.log(str.replace(reg, '($1)_$2'))      // (123)_4567
    ---
    ---ts(嵌套分组)
      const regex = /((\\d{3})-(\\d{2}))-(\\d{4})/
      const result = regex.exec('123-45-6789')

      console.log(result[0])    // '123-45-6789'
      console.log(result[1])    // '123-45'
      console.log(result[2])    // '123'
      console.log(result[3])    // '6789'
    ---
    ---ts(分组命名)
      const regex = /(?<areaCode>\\d{3})-(?<mainNumber>\\d{4})/
      const result = regex.exec('123-4567')

      console.log(result.groups.areaCode)       // '123'
      console.log(result.groups.mainNumber)     // '4567'
    ---
  
  `}}</Code>
  <Line></Line>

  <Title>##API</Title>
  <Api>
    @api - regexp.exec(str)
    @desc - 获取正则匹配信息
    @params - [str : string] 被检验字符串
    @return - [any[ ] | null] 一个检验信息数组，如果匹配不到则返回 null
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = 'abcd 1234'
      const reg = /^a../g

      console.log(reg.exec(str))        // [ 'abc', index: 0, input: 'abcd 1234', groups: undefined ]
    ---
  `}}</Code>
  <Line></Line>
  <Api>
    @api - regexp.test(str)
    @desc - 检验字符串是否满足正则匹配
    @params - [str : string] 被检验字符串
    @return - [boolean] 检验结果
  </Api>
  <Code>{{`
    ---ts(演示)
      const str = 'abcd 1234'
      const reg = /^a../g

      console.log(reg.test(str))        // true
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