<template>
  <div class="note--outline">
    <div class="note-type" v-for="noteType in outline" :key="noteType.id">
      {{ noteType.desc }}
      <div class="note-sort-container">
        <div class="note-sort" v-for="noteSort in noteType.sort" :key="noteSort.id">
          <span class="sort-desc" @click="selectSort(noteSort.list[0].source[0].pathName)">{{ noteSort.desc }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { outline } from '../../../note/ouline'

const router = useRouter()

const selectSort = (notePathName) => {
  router.push(`/note/${notePathName}`)
}

</script>

<style lang="less">
@import url('../../style/variables.less');

.note--outline {
  background-color: #fff;
  display: flex;
  padding: 10px 5px;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 4px 2px 5px @Color[grey-light];
  
  
  
  .note-type {
    display: flex;
    flex-direction: column;
    gap: 4px;
    text-align: center;
    font-size: 15px;
    font-weight: 600;
    color: @Color[grey-dark];
    
    &:last-child {
      .note-sort-container {
        border: none;
      }
    }

    .note-sort-container {
      flex: 1;
      min-width: 100px;
      padding: 0 20px;
      border-right: .5px solid @Color[grey-light];
      .note-sort {
        font-size: 14px;
        color: @Color[grey];
        line-height: 1.5;
        text-align: start;

        .sort-desc {
          transition: .2s;
          cursor: pointer;

          &:hover {
            color: @Color[pink];
          }
        }
      }
    }
    
  }
  
}
</style>