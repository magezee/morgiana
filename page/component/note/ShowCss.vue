<template>
  <div class="note--show-css">
    <div class="input-warp">
      <div class="input-tip">Tip&nbsp;&nbsp;&nbsp; 点击值更改效果</div>
      <div class="code-input">
        <div class="css-property" v-for="style in props.styles">
          <span class="property-key">{{ style.property }}</span>
          <span>: </span>
          <span 
            class="property-value" 
            ref="cssValueRef" 
            contenteditable="true" 
            @keydown.enter="listenEnter"
            @blur="changeCssValue($event, style.property)"
          >
            {{ style.value }}
          </span>
          <span>;</span>
        </div>
      </div>
    </div>
    

    <div class="show-wrap" ref="showWrapRef">
      <div class="show-tip">效果展示</div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted }from 'vue'

const props = defineProps<{
  targetClass: string,
  styles: Array<{
    property: string,
    value: string,
  }>,
}>()



const showWrapRef = ref<HTMLElement>()
const targetElement = ref<HTMLElement>()
const cssStyle = ref()

const changeCssValue =(event: Event, property: string) => {
  const content = (event.target as HTMLElement)?.innerText
  cssStyle.value = {
    ...cssStyle.value,
    [property]: content
  }
  updateStyle()
}

const updateStyle  = () => {
  targetElement.value && Object.assign(targetElement.value.style, cssStyle.value)
}

const listenEnter = (event) => {
  event.preventDefault()
  event.target.blur()
}

onMounted(() => {
  targetElement.value = showWrapRef.value?.querySelector(`.${props.targetClass}`)!
  cssStyle.value = props.styles.reduce<any>((pre, cur) => {
    pre[cur.property] = cur.value
    return pre
  }, {})

  updateStyle()
})



</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.note--show-css {

  .input-warp {
    .input-tip {
      display: flex;
      align-items: center;
      height: 15px;
      padding-left: 5px;
      border-top-left-radius: 4px;
      font-size: 12px;
      color: @Color[mono-v2];
      background: @Color[blue];
      clip-path: polygon(0 0, 25px 0, 40px 15px, 0 15px);
      transition: .2s;
      user-select: none;
      
      cursor: pointer;

      &:hover {
        
        clip-path: polygon(0 0, 135px 0, 150px 15px, 0 15px);
      }
    }
    .code-input {
      padding: 10px 12px;
      border-start-start-radius: 4px;
      border-start-end-radius: 4px;
      border-top-left-radius: 0;
      font-family: Menlo, Monaco, Consolas, "Andale Mono", "Ubuntu Mono", "Courier New", monospace;
      font-size: 13px;
      color: #d4d4d4;
      text-align: left;
      background: @Color[mono-v2];
      
      .css-property {
        .property-key {
          color: #9cdcfe;
        }

        .property-value {
          box-sizing: content-box;
          border: 1px solid transparent;
          border-radius: 4px;
          color: #CE9178;
          outline: none;
          cursor: pointer;
          
          &:focus {
            padding: 0 10px;
            border: 1px solid #CE9178;
          }
        }

      }
    }
  }

  .show-wrap {
    position: relative;
    padding: 15px;
    border-end-start-radius: 4px;
    border-end-end-radius: 4px;
    border: 3px solid #b7a7d7;
    border-top: 0;

    .show-tip {
      position: absolute;
      top: 0;
      left: 50%;
      padding: 0 10px;
      border-radius: 4px;
      font-size: 12px;
      color: @Color[mono-v2];
      line-height: 1.5;
      background-color: #b7a7d7;
      transform: translate(-50%, -50%);
      user-select: none;
    }
  }
}
</style>
