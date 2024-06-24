<template>
  <div class="note--api">
    <div class="api-content" v-if="apiInfo">
      <div class="api-code">
        <SvgIcon class="api-icon" id="api" :useExternalColor="true"></SvgIcon>
        <span>{{ apiInfo.api }}</span>
      </div>
      <div class="api-desc">
        <SvgIcon class="explain-icon" id="explain" :useExternalColor="true"></SvgIcon>
        <span>{{ apiInfo.desc }}</span>
      </div>
      <div class="api-params-list" v-show="apiInfo.params?.[0]?.name">
        <SvgIcon class="params-icon" id="params" :useExternalColor="true"></SvgIcon>
        <span>参数列表：</span>
        <div class="api-params" v-for="apiParams in apiInfo.params">
          
          <span class="parmas-name">{{ apiParams.name }}</span>
          <span class="parmas-desc">{{ apiParams.desc }}</span>
        </div>
      </div>
      
      <div class="api-return" v-if="apiInfo.return?.name">
        <SvgIcon class="return-icon" id="return" :useExternalColor="true"></SvgIcon>
        <span class="return-name">{{ apiInfo.return.name }}</span>
        <span>{{ apiInfo.return.desc}}</span>
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
    @params - [callback:Function]参数说明
    @params - [initValue]参数说明
    @return - [undefine]返回值说明
  </Api>
 */
import { ref, onMounted } from 'vue'

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
      const descStrArr = splitInfo[1].split(']')
      const descData = {
        name: descStrArr[0].replace('[', ''),
        desc: descStrArr[1]
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
