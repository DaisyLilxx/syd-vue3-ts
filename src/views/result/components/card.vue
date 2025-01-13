<script setup lang="ts">
import { toThousandsWithSmallNum } from '@/utils/common.ts'
const props = defineProps<{
  isBig: boolean
  data: object
}>()
let imgUrlPre = import.meta.env.VITE_APP_BASE_URL
console.log('props', props)
</script>
<template>
  <div class="card" :class="{ bigCrad: isBig }">
    <div class="head">
      <img
        :src="`${imgUrlPre}/dstp-op/rest/api/app/financial/picture/preview?path=${props.data.bankIconUrl}`"
      /><span>{{ props.data.bank }}｜{{ props.data.productName }}</span>
    </div>
    <div class="text1">预测可借贷额度({{ props.data.currency }})</div>
    <h2 class="text2">{{ toThousandsWithSmallNum(props.data.creditAmount) }}</h2>
    <div class="text3">{{ props.data.interestRateDescribe }}</div>
    <slot name="action"></slot>
  </div>
</template>
<style lang="less" scoped>
.card {
  padding: 34px 52px 74px;
  width: calc(100% - 32px);
  margin: 0 auto;
  height: 384px;
  color: #ffffff;
  &:nth-child(odd) {
    background: url(@/assets/images/result/jieguoye_img01@2x.png) no-repeat;
    background-size: 100%;
  }
  &:nth-child(even) {
    background: url(@/assets/images/result/jieguoye_img02@2x.png) no-repeat;
    background-size: 100%;
  }
  &.bigCrad {
    &:nth-child(odd) {
      background: url(@/assets/images/result/1.png) no-repeat;
      background-size: 100%;
      height: 490px;
    }
    &:nth-child(even) {
      background: url(@/assets/images/result/2.png) no-repeat;
      background-size: 100%;
      height: 490px;
    }
  }
  .head {
    display: flex;
    align-items: center;
    font-size: 36px;
    line-height: 42px;
    margin-bottom: 44px;
    img {
      width: 52px;
      height: 52px;
      margin-right: 20px;
      border-radius: 26px;
    }
  }
  .text1 {
    font-size: 28px;
    line-height: 40px;
    margin-bottom: 6px;
  }
  .text2 {
    font-weight: bold;
    font-size: 72px;
    line-height: 84px;
    margin-bottom: 10px;
  }
  .text3 {
    font-weight: 500;
    font-size: 28px;
    line-height: 40px;
  }
}
</style>
