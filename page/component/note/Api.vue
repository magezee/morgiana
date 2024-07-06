<template>
  <div class="note--api">
    <div class="api-content" v-if="apiInfo">
      <div class="api-code">
        <SvgIcon class="api-icon" id="api" :useExternalColor="true"></SvgIcon>
        <span v-html="apiInfo.api" />
      </div>
      <div class="api-desc">
        <SvgIcon class="explain-icon" id="explain" :useExternalColor="true"></SvgIcon>
        <span v-html="apiInfo.desc" />
      </div>
      <div class="api-params-list" v-show="apiInfo.params?.[0]?.name">
        <SvgIcon class="params-icon" id="params" :useExternalColor="true"></SvgIcon>
        <span>参数列表：</span>
        <div class="api-params" v-for="apiParams in apiInfo.params">
          
          <span class="parmas-name" v-html="apiParams.name" />
          <span class="parmas-desc" v-html="apiParams.desc" />
        </div>
      </div>
      
      <div class="api-return" v-if="apiInfo.return?.name">
        <SvgIcon class="return-icon" id="return" :useExternalColor="true"></SvgIcon>
        <span class="return-name" v-html="apiInfo.return.name" />
        <span v-html="apiInfo.return.desc" />
      </div>
    </div>
    <div class="slot-container" ref="containerRef" v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * <Api>
    @api - array.reduce(callback, initValue?)
    @desc - 从后向前遍历数组，每个元素都执行一遍从
    @params - [callback:Function] 参数说明
    @params - [initValue] 参数说明
    @return - [undefine] 返回值说明
  </Api>
 */
import { ref, onMounted, nextTick } from 'vue'
import { useMarkdownText } from '../../hook/note'

import SvgIcon from '../ui/SvgIcon.vue'

const containerRef = ref<HTMLElement>()
const apiInfo = ref()

const formatData = (apiInfo: string) => {
  const infoList = apiInfo.split('@').filter((item) => item !== ' ')

  return infoList.reduce((pre, cur, index) => {
    const splitInfo = cur.split(' - ')
    const keyword = splitInfo[0]

    if (keyword === 'desc' || keyword === 'api') {
      pre[keyword] = splitInfo[1]
    } 
    else {
      const descName = splitInfo[1].match(/^\[.*\] /g)?.[0]!

      const descData = {
        name: descName.slice(1, -2),
        desc: splitInfo[1].replace(descName, '')
      }

      if (keyword === 'params') {
        (pre['params'] as Array<any>).push(descData)
      }

      if (keyword === 'return') {
        pre['return'] = descData
      }
    }
    return pre
  }, { params: [] })
}

onMounted(() => {
  apiInfo.value = formatData(containerRef.value?.innerHTML!)

  // 暂时先这样强制添加上marktext特性
  nextTick(async () => {
    apiInfo.value.desc = await useMarkdownText(apiInfo.value?.desc)
    apiInfo.value?.params.forEach(async(item) => {
      if (item) {
        item.desc = await useMarkdownText(item.desc)
      }
    })
    if (apiInfo.value.return) {
      apiInfo.value.return.desc = await useMarkdownText(apiInfo.value.return.desc)
    }
  })
  
})

</script>

<style scoped lang="less">
@import url('../../style/variables.less');
.icon-style(@size, @color) {
  display: inline-block;
  width: @size;
  height: @size;
  margin-right: 6px;
  fill: @color;
  vertical-align: sub;
}

.name-style() {
  padding: 0.2em 0.4em;
  margin: 0 5px;
  border-radius: 6px;
  color: @Color[red];
  font-size: 85%;
  line-height: 1.5;
  word-wrap: break-word;
  background-color: rgba(212,212,212,0.2);
}

.note--api {
  .api-content {
    font-size: 14px;
    color: @Color[mono-v3];
    .api-code {
      font-size: 16px;
      font-weight: 600;
      color: @Color[purple];

      .api-icon {
        .icon-style(22px, @Color[purple]);
      }
     
    }

    .api-desc {
      .explain-icon {
        .icon-style(16px, @Color[mono-v3]);
        margin-right: 10px
      }
    }

    .api-params-list {
      .params-icon {
        .icon-style(16px, @Color[mono-v3]);
        margin-right: 10px;
      }

      .api-params {
        padding-left: 22px;
        .parmas-name {
          .name-style()
        }
      }
    }

    .api-return {
      .return-icon {
        .icon-style(16px, @Color[mono-v3]);
      }

      .return-name {
        .name-style()
      }
    }
  }
}
</style>
