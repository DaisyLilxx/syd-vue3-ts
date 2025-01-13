<script setup lang="ts">
import { ref, onMounted } from 'vue'
import cardCom from './components/card.vue'
import { getHistory } from '@/apis/api'
import empty from '@/components/empty.vue'
import type { objectType } from '@/types/index'
const List = ref<objectType[]>([])
const loading = ref(true)
onMounted(() => {
  getHistory().then((res) => {
    console.log('res', res)
    List.value = res.data.data!
    loading.value = false
    console.log(' List.value', List.value)
  })
})
</script>
<template>
  <div class="result">
    <van-loading class="comLoading" v-if="loading" />
    <empty text="暂无测额记录" v-if="!loading && !List.length" />
    <template v-if="!loading && List.length">
      <div v-for="(item, index) in List" :key="index">
        <div class="head">
          <span>测额时间：</span><span>{{ item.dateTime }}</span>
        </div>
        <cardCom :data="subitem" v-for="(subitem, subindex) in item.data" :key="subindex">
        </cardCom>
      </div>
    </template>
  </div>
</template>
<style lang="less" scoped>
.result {
  background: url(@/assets/images/result/jieguoye_bg01@2x.png) no-repeat;
  background-size: 100% 672px;
  background-position: 0 -176px;
  padding-top: 32px;
  padding-bottom: 32px;
  height: auto;
  .head {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    font-size: 32px;
    line-height: 44px;
    padding: 0 40px 0 44px;
    margin-bottom: 12px;
  }
}
</style>
