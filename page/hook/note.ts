import { createApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import MarkText from '../component/note/MarkText.vue'


const renderMarkTextToStr = async (type: string, content: string, url?: string) => {
  const dom = await renderToString(createApp(MarkText, { type, content, url }))
  return dom 
}

const asyncReplace =(str: string, reg: RegExp, asynFn: Function) => {
  const tasks = [] as Array<any>
  let result
  while(result = reg.exec(str)) {
    const task = asynFn(result[0])
    tasks.push(task)
  }
  return Promise.all(tasks).then((replacements) => {
    let i = 0
    return str.replace(reg, () => replacements[i++]) 
  })
}

/** @description 处理md写法的文本样式 */
const useMarkdownText = async (innerHtml='') => {
  let resultHtml = innerHtml
  // 匹配行内代码
  resultHtml = await asyncReplace(resultHtml, /`.*?`/g, async (match) => {
    const targetStr = match.slice(1, -1)
    return await renderMarkTextToStr('code', targetStr)
  })
  // 匹配着重符号
  resultHtml = await asyncReplace(resultHtml, /\*\*.*?\*\*/g, async (match) => {
    const targetStr = match.slice(2, -2)
    return await renderMarkTextToStr('blob', targetStr)
  })
  // 匹配超链接
  resultHtml = await asyncReplace(resultHtml, /\[(.*?)\]\((.*?)\)/g, async (match) => {
    const linkDesc = match.match(/(?<=^\[).*(?=\]\()/)?.[0]
    const linkUrl = match.match(/(?<=\]\().*(?=\))/)?.[0]
    return await renderMarkTextToStr('link', linkDesc, linkUrl)
  })

  resultHtml = resultHtml.replace(/&amp;.*?;/g, (match) => {
    return {
      '&amp;amp;': '&amp;',
      '&amp;lt;': '&lt;',
      '&amp;gt;': '&gt;'
    }[match] || ''
  })

  return resultHtml
}


export {
  useMarkdownText
}

