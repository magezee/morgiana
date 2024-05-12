import { type RouterOptions } from 'vue-router'

import NoteTemplate from './page/template/NoteTemplate.vue'

const routes: RouterOptions['routes'] = [
  {
    path: '/',
    component: NoteTemplate,
    children: [
      {
        path: '/',
        component: NoteTemplate,
      }
    ]
  },
  {
    path: '/note/:notePath',
    component: NoteTemplate
  },
]

export default routes