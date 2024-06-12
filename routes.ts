import { type RouterOptions } from 'vue-router'

import Home from './page/template/Home.vue'
import HomeIndex from '/page/component/base/HomeIndex.vue'
import HomeNote from '/page/component/base/HomeNote.vue'
import NoteTemplate from './page/template/NoteTemplate.vue'

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        component: HomeIndex
      },
      {
        path: '/home-note',
        component: HomeNote
      }
    ]
  },
  {
    path: '/note/:notePath',
    component: NoteTemplate
  },
]

export default routes