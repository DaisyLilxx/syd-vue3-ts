import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useUserStore = defineStore(
  'userMess',
  () => {
    const userMess = ref<{ [key: string]: any }>({})
    function setUserMessStore(params: { [key: string]: any }) {
      userMess.value = params
    }
    function clearUserMessStore() {
      userMess.value = {}
    }
    return { userMess, setUserMessStore, clearUserMessStore }
  },
  {
    persist: true //开启持久化
  }
)
