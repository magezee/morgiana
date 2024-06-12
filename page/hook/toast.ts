import { createApp, ref } from 'vue'
import ToastContainer from '../component/ui/ToastContainer.vue'

const toastList = ref<Array<{ id: number, message: string }>>([])
const maxShowToastCount = ref(5)

const mountToastContainer = () => {
  const toastApp = createApp(ToastContainer, { toastList: toastList.value })
  const mountNode = document.createElement('div')
  mountNode.className = 'toast-container'
  document.body.querySelector('#morgiana')?.appendChild(mountNode)
  toastApp.mount(mountNode)
}

const addToast = (message) => {
  
  if (!document.body.querySelector('.toast-container')) {
    mountToastContainer()
  }
  const id = Date.now()
  toastList.value.push({ id, message })
  if (toastList.value.length -1 >= maxShowToastCount.value) {
    removeToast()
  } else {
    setTimeout(() => {
      removeToast()
    }, 3000)
  }
} 

const removeToast = () => {
  toastList.value.shift()
}


const useToast = () => addToast

export default useToast