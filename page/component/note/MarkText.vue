<template>
  <span :class="['note--mark-text', type]">
    <a class="mark-link"
      v-if="props.type === 'link'"
      target="_blank"
      :href="props.url"
    >
      {{ props.content }}
    </a>
    <span v-else>{{ content }}</span>
  </span>
</template>

<script setup lang="ts">

interface NoteMarkTextProps {
  type?: 'code' | 'blob' | 'link',
  content?: string,
  url?: string
}

const props = defineProps<NoteMarkTextProps>()
const type = props.type || 'code'

const jumpToTargetWebsite = () => {
  if (props.type !== 'link') return
  window.open(props.url)
}
</script>

<style scoped lang="less">
@import url('../../style/variables.less');

.note--mark-text {
  &.code {
    padding: 0.2em 0.4em;
    margin: 0 5px;
    border-radius: 6px;
    color: @Color[red];
    font-size: 85%;
    line-height: 1.5;
    word-wrap: break-word;
    background-color: rgba(212,212,212,0.2);
  }

  &.blob {
    color: @Color[mono-v2];
    font-weight: bold;
  }

  &.link {
    display: inline-block;
    margin: 0 5px;
    font-size: 16px;
    color: @Color[blue-light];
    line-height: 1.5;
    word-wrap: break-word;
    cursor: pointer;

    &:hover {
      color: @Color[blue];
      animation-name: hoverAnimation-noteLink;
      animation-duration: .2s;
      animation-iteration-count: infinite;
    }

    .mark-link {
      text-decoration: none;
      color: inherit;
    }
  }
}


@keyframes hoverAnimation-noteLink {
  25% {
    transform: translate(.5px, .5px);
  }

  50% {
    transform: translate(.5px, -.5px);
  }

  75% {
    transform: translate(.5px, .5px);
  }

  100% {
    transform: translate(-.5px, -.5px);
  }
}
</style>
