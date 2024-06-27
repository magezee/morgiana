import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import registerNoteCompoment from './page/component/note'

import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)

registerNoteCompoment(app)
app.mount('#morgiana')