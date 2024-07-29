<template>
  <div class="slot-container" ref="slotContainer" v-if="load">
    <slot></slot>
  </div>
  <div class="note--table">
    <div class="table-desc">
      <div class="desc-text">{{ tableInfo?.desc}}</div>
    </div> 
    <div class="table-container">
      <section class="table-title">
        <ul>
          <li v-for="title in tableInfo?.header" :key="title">{{ title }}</li>
        </ul>
      </section>
      
      <section class="table-cell" v-for="(rowData, index) in tableInfo?.cell" :key="index">
        <ul>
          <li 
            v-for="(data, index) in rowData" 
            v-html="data"
            :key="data" 
            :style="{ whiteSpace: nowrapRow.includes(index+1) ? 'nowrap' : 'initial' }"
          >
          </li>
        </ul>
      </section>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMarkdownText } from '../../hook/note'
interface NoteTableProps {
  nowrapRow?: Array<number>,
}
const props = defineProps<NoteTableProps>()
const slotContainer = ref<HTMLElement>()

const nowrapRow = props.nowrapRow || []
const load = ref(true)
const tableInfo = ref<{
  desc: string,
  header: Array<string>,
  cell: Array<Array<string>>
}>()

// 规定格式如下: 
// #这是表格描述
// |表头1|表头2|表头2|
// -----------------(3个-符号及以上区分表头)
// |单元1|单元2|单元3|
// |单元4|单元5|单元6|

onMounted(async () => {
  const originalHtml = slotContainer.value?.innerHTML
  // 挑选数据
  const tableDesc = originalHtml?.match(/(?<=#).*?(?=\|)/)?.[0]
  const tableHeader = originalHtml?.match(/(?<=\|).*?(?=\|\s-{3,})/)?.[0].split('|')
  const tableColumn = tableHeader?.length
  const tableCellHtml = originalHtml?.slice(originalHtml?.match(/(?<=-{3})\s(?=\|)/)?.index)

  // 由于换行符的影响,因此取出一行的数据后，手动剔除下一个数据,使用\|来表示表格数据里的|符号从而不影响文本判断顺序
  // 先随便用个占位符转义|,之后再转义回来
  // 同时处理文本的md样式
  const filterTableCellHtml = tableCellHtml?.replace(/\\\|/g, '{placeholder}')
  const renderMarkText = await useMarkdownText(filterTableCellHtml)
  const tableRowData = renderMarkText.split('|')
  const tableCell = [] as Array<Array<string>>

  while(tableRowData?.length! >= tableColumn!) {
    const tableRow = tableRowData?.splice(0, tableColumn! + 1).slice(1).map((cellData) => {
      return cellData.replace(/\{placeholder\}/g, '|')
    })
    tableCell.push([...tableRow!])
  }
  
  tableInfo.value = {
    desc: tableDesc!,
    header: tableHeader!,
    cell: tableCell!
  }
  load.value = false
})

</script>


<style scoped lang="less">
@import url('../../style/variables.less');

.note--table {
  width: 100%;
  margin: 15px 0;
  font-family: SourceHanSansSubset;
  color: @Color[mono-v2];
  overflow-x: auto;
  
  
  .table-desc {
    position: sticky;
    left: 0;
    right: 0;
    padding: 4px 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border: .5px solid #ddd;
    border-bottom: none;
    font-size: 13px;
    text-align: center;
    color: @Color[mono-v3];
  }

  .table-container {
    display: table;
    width: 100%;
    border-bottom: .5px solid #ddd;
    border-right: .5px solid #ddd;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    user-select: text;
    
    .table-title {
      display: table-header-group;
      font-weight: 600;
      background-color: rgba(223, 223, 223, .2);
    }

    .table-cell {
      display: table-row-group;
      font-size: 13px;
      color: @Color[mono-v3];

      &:nth-child(odd) {
        background-color: rgba(223, 223, 223, .2);
      }

      &:last-child ul {
       
        & li:first-child {
          border-bottom-left-radius: 8px;
        }
        & li:last-child {
          border-bottom-right-radius: 8px;
        }
         
      }
    }

    ul {
      display: table-row;
      li {
        display: table-cell;
        padding: 6px 12px;
        border-top: .5px solid #ddd;
        border-left: .5px solid #ddd;
      }
    }
  }
}

</style>
