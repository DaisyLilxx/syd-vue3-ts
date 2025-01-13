<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useHeaderStore } from '@/stores/index'
import wx from 'weixin-js-sdk-ts'
const router = useRouter()
const props = defineProps({})
const HeaderStore = useHeaderStore()
const weixinChat = window.localStorage.getItem('weixinChat') == 'true'
const goCompleteMess = () => {
  if (HeaderStore.headers['wechat-token']) router.push('/completeMess')
  else {
    if (weixinChat) {
      wx.miniProgram.navigateTo({ url: '/pages/login/login?referPage=/completeMess' })
    } else {
      router.push({ path: '/login', query: { referPage: '/completeMess' } })
    }
  }
}
</script>
<template>
  <div class="fixBottom">
    <div class="botCont">
      <div class="cont">
        <h2 class="tit">精准测额还差一步</h2>
        <p class="text">马上完善资料，即可获取精准额度</p>
        <div class="step">
          <div class="progress"></div>
          <span>60%</span>
        </div>
      </div>
      <div class="comSubBtn" @click="goCompleteMess">去测额</div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.fixBottom {
  height: 514px;
  .botCont {
    position: fixed;
    bottom: -16px;
    left: -12px;
    height: 514px;
    background: url(@/assets/images/productList/img04@2x.png) no-repeat;
    background-size: cover;
    width: calc(100% + 24px);
    .cont {
      padding: 140px 91px 60px;
      .tit {
        font-weight: 600;
        font-size: 36px;
        line-height: 48px;
      }
      .text {
        color: #575757;
        font-size: 28px;
        margin-bottom: 40px;
        line-height: 48px;
      }
      .step {
        width: 594px;
        height: 12px;
        background: #d2e5f1;
        border-radius: 20px;
        position: relative;
        .progress {
          width: 372px;
          height: 12px;
          background: linear-gradient(270deg, #ff228e 0%, #5e22ff 30%, #3bcdff 87%, #1ef1e6 100%);
          border-radius: 20px;
        }
        span {
          position: absolute;
          left: 336px;
          width: 76px;
          height: 36px;
          background: #1f66fb;
          border-radius: 20px;
          border: 2px solid #ffffff;
          font-weight: 600;
          font-size: 24px;
          color: #ffffff;
          line-height: 34px;
          text-align: center;
          top: -15px;
        }
      }
    }
  }
}
</style>
