import { type App } from 'vue'

import Code from './Code.vue'
import Line from './Line.vue'
import Title from './Title.vue'
import Text from './Text.vue'
import Table from './Table.vue'
import Image from './Image.vue'
import List from './List.vue'
import Refer from './Refer.vue'
import Quote from './Quote.vue'
import Tip from './Tip.vue'
import Api from './Api.vue'
import ShowCss from './ShowCss.vue'

export {
  Code,
  Line,
  Title,
  Text,
  Table,
  Image,
  List,
  Refer,
  Quote,
  Tip,
  Api,
  ShowCss
}

const registerNoteCompoment = (app: App) => {
  app.component('Code', Code)
  app.component('Text', Text)
  app.component('Title', Title)
  app.component('Quote', Quote)
  app.component('List', List)
  app.component('Table', Table)
  app.component('Line', Line)
  app.component('Refer', Refer)
  app.component('Image', Image)
  app.component('Tip', Tip)
  app.component('Api', Api)
  app.component('ShowCss', ShowCss)

}

export default registerNoteCompoment