<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import cardCom from './components/card.vue'
import { useSerialNoStore } from '@/stores/index'
import { getCalculateResult } from '@/apis/api'
import empty from '@/components/empty.vue'
const SerialNoStore = useSerialNoStore()
const List = ref([])
const loading = ref(true)
const router = useRouter()
const goCustomer = () => {
  router.push('/customerService')
}
onMounted(() => {
  // 测试流水号 'CE202409181142190019'
  getCalculateResult({ serialNo: SerialNoStore.serialNo }).then((res) => {
    console.log('res', res)
    List.value = res.data.data!
    console.log('List.valueList.value', List.value)
    loading.value = false
    console.log(' List.value', List.value)
  })
})
</script>
<template>
  <div class="result">
    <van-loading class="comLoading" v-if="loading" />
    <empty
      text="不满足授信条件，暂无法评估您的授信额度。"
      :hasEmptyBg="false"
      v-if="!loading && !List.length"
    />

    <template v-if="!loading && List.length">
      <cardCom :isBig="true" :data="item" v-for="(item, index) in List" :key="index">
        <template #action>
          <div class="whiteWrap">
            <button class="comWhiteBtn" @click="goCustomer" type="button">立即申请</button>
            <div class="comRightIcon">{{ item.promotionLabel }}</div>
          </div>
        </template>
      </cardCom>
    </template>
  </div>
</template>
<style lang="less" scoped>
.result {
  background: url(@/assets/images/result/jieguoye_bg01@2x.png) no-repeat;
  background-size: 100% 672px;
  background-position: 0 -176px;
  padding-top: 88px;
  min-height: 100vh;
  height: 100%;
  padding-bottom: 32px;
}
</style>
