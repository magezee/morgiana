<template>
  <div :class="['note--code', {'expanded': codeBoxStatus === 'expanded'}]">
    <slot v-if="false"></slot>
    <div class="code-info">
      <div class="code-tabs">
        <div 
          v-for="(codeItem, index) in codeList" 
          :key="codeItem.desc"
          :class="['code-desc', { 'active': curCodeIndex === index }]" 
          @click="switchCodeContent(index)"
        >
          {{ codeItem.desc }}
        </div>
      </div>
      <div class="code-expanded" @click="expandCode">
        {{ expendText }}
      </div>
    </div>
    <div class="code">
      <pre 
        class="pre-code" 
        :style="{ height: codeBoxStatus === 'expanded' ? curCodeInfo?.wrapHeight : '0px' }"
        ><code :class="`language-${curCodeInfo?.language}`" v-html="curCodeInfo?.code" />
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import Prism from 'prismjs'
import loadLanguages from './prism/load-languages.js'

const slots = defineSlots()

const codeList = ref<Array<{
  language?: string,
  desc?: string,
  code?: string,
  wrapHeight?: string
}>>([])

const curCodeIndex = ref(0)
const codeBoxStatus = ref('expanded')

onMounted(() => {
  initCodeList()
})

const curCodeInfo = computed(() => {
  return codeList.value[curCodeIndex.value]
})

const expendText = computed(() => {
  return codeBoxStatus.value === 'expanded' ? '收起' : '展开'
})

const initCodeList = () => {
  const defaultSlotsChild = slots?.default()?.[0]?.children as string
  // 分类
  const codeListData = defaultSlotsChild.match(/---([\s\S]*?)---/g)
  codeList.value = codeListData?.map((codeData) => {
    // 拆分slot的字符数据
    const descInfo = codeData.match(/^---.*/)?.[0]
    const language = descInfo?.replace(/---|\(.*?\)/g, '') || ''
    const desc = descInfo?.replace(/^.*?\(|\)$/g, '')

    // 拆出原始字符数据并处理缩进问题
    const originalCode = codeData.replace(/^---.*|---$/g, '')
    const filterEndSpaceCode = originalCode.replace(/\s+$/g, '')
    const spaceCount = (filterEndSpaceCode.match(/^\s+/) as Array<string>)?.[0].length - 1
    const reg = new RegExp(`(?<=\\n) {${spaceCount}}`, 'g')
    const code = filterEndSpaceCode.replace(reg, '').replace(/^\n/, '')

    // 处理代码高亮
    loadLanguages(language) 
    const highlightCode = Prism.highlight(code, Prism.languages[language], language)
    const totalLineNamber = highlightCode.match(/\n/g)?.length! + 1 || 1
    const wrapHeight = `${totalLineNamber * 19.5 + 20}px`


    return {
      language,
      desc,
      code: highlightCode,
      wrapHeight
    }
  })!
}

const switchCodeContent = (index: number) => {
  curCodeIndex.value = index
  codeBoxStatus.value = 'expanded'
}

const expandCode = () => {
  if (codeBoxStatus.value === 'default') {
    codeBoxStatus.value = 'expanded'
  } else {
    codeBoxStatus.value = 'default'
  }
}
</script>


<style lang="less">
@import url('./prism/hightlight-style.less');
@import url('../../style/variables.less');

.note--code {
  position: relative;
  border-radius: 5px;
  margin: 10px 0;
  line-height: 1.5;
  word-spacing: normal;
  hyphens: none;
  overflow: auto;
  transition: .2s;

  .code-info {
    display: flex;
    align-items: center;
    border: .5px solid @Color[mono-v6];
    border-radius: 5px;
    font-size: 13px;
    color: @Color[mono-v3];
    background-color:  @Color[mono-v7];
    user-select: none;
    
    .code-tabs {
      display: flex;
      align-items: center;
      flex: 1;

      .code-desc:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }

      .code-desc {
        padding: 4px 10px;
        flex: 1;
        border-right: .5px solid @Color[mono-v6];
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        transition: .2s;
        
        cursor: pointer;
        &:hover {
          color: @Color[pink];
          background-color: @Color[mono-v6];
        }

        &.active {
          background-color: #fff;
        }
      }
    }

    .code-expanded {
      padding: 4px 10px;
      
      cursor: pointer;
      &:hover {
        color: @Color[pink];
      }
    }
  }

  &.expanded {
    .code-info {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      .code-tabs {
        .code-desc:first-child {
          border-bottom-left-radius: 0;
        }
      }
    }    
  }
  

  .pre-code {
    .codeStyle;
    position: relative;
    margin: 0;
    font-size: 13px;
    background: @Color[mono-v2];
    overflow-x: auto;
    overflow-y: hidden;
    transition: .3s;
    user-select: text;

    &::-webkit-scrollbar {
      width: 0px;
      height: 3px;
      background-color: transparent;

    }
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      border-radius: 8px;
      background-color: @Color[blue];
      transition: 0.3s ease-in-out;

      &:hover {
        background-color: @Color[pink];
      }
    }
    &::-webkit-scrollbar-track {
      border-radius: 8px;
      background-color: transparent;
    }
  }
}
</style>