import { ref } from 'vue'
import { defineStore } from 'pinia'
export const useSerialNoStore = defineStore(
  'serialNo',
  () => {
    const serialNo = ref<string>('')
    function setSerialNoStore(params: string) {
      serialNo.value = params
    }
    function clearSerialNoStore() {
      serialNo.value = ''
    }
    return { serialNo, setSerialNoStore, clearSerialNoStore }
  },
  {
    persist: true //开启持久化
  }
)
