import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Headers } from '@/types/index'
export const useHeaderStore = defineStore(
  'headerStore',
  () => {
    const headers = ref<Headers>({ openId: '', channelCode: '' })
    function setHeaderStore(params: Headers) {
      headers.value = { ...headers.value, ...params }
    }
    function clearHeaderStore() {
      headers.value = { openId: '', channelCode: '' }
    }
    return { headers, setHeaderStore, clearHeaderStore }
  },
  {
    persist: true //开启持久化
  }
)
