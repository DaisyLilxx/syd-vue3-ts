<script setup lang="ts">
import wx from 'weixin-js-sdk-ts'
import { useRouter, useRoute } from 'vue-router'
import { useHeaderStore } from '@/stores/index'
import { ref, watch } from 'vue'
const router = useRouter()
const HeaderStore = useHeaderStore()
const weixinChat = window.localStorage.getItem('weixinChat') == 'true'
console.log(weixinChat)
console.log('window.localStorage.getItem', window.localStorage.getItem('weixinChat'))
const props = defineProps<{
  active: number
}>()
// 使用 ref 创建本地状态
const localActive = ref(props.active)
// 监听 `active` prop 的变化
watch(
  () => props.active,
  (newVal) => {
    localActive.value = newVal
  }
)
const onChange = (index: number) => {
  console.log('index', index)
  switch (index) {
    case 0:
      if (weixinChat) {
        // 跳转微信原生tabIndex
        wx.miniProgram.redirectTo({ url: '/pages/tabIndex/tabIndex' })
      } else {
        router.push('/tabIndex')
      }

      break
    case 1:
      if (weixinChat) {
        // 跳转微信原生index
        wx.miniProgram.redirectTo({ url: '/pages/index/index' })
      } else {
        router.push('/')
      }

      break
    case 2:
      if (weixinChat) {
        // 跳转微信原生页
        wx.miniProgram.redirectTo({ url: '/pages/my/my' })
      } else {
        router.push('/my')
      }

      break
  }
}
</script>
<template>
  <van-tabbar
    v-model="localActive"
    active-color="#1F66FB"
    inactive-color="#2B2B2B"
    :placeholder="true"
    safe-area-inset-bottom
    class="tabbar"
    @change="onChange"
  >
    <van-tabbar-item class="index"
      ><div class="flex-center">
        <img v-if="active == 0" src="~@/assets/images/index/index_active.png" class="indexImg" />
        <img v-else src="~@/assets/images/index/2.png" class="indexImg" />
      </div>
      <div>首页</div></van-tabbar-item
    >
    <van-tabbar-item class="index"
      ><div class="flex-center">
        <img v-if="active == 1" src="~@/assets/images/tabIndex/11_active.png" class="indexImg2" />
        <img v-else src="~@/assets/images/tabIndex/11.png" class="indexImg2" />
      </div>
      <div>数据信用评估额度</div></van-tabbar-item
    >
    <van-tabbar-item class="my"
      ><div class="flex-center">
        <img v-if="active == 2" src="~@/assets/images/index/1.png" class="myImg" />
        <img v-else src="~@/assets/images/index/person_normal.png" class="myImg" />
      </div>
      <div>我的</div></van-tabbar-item
    >
  </van-tabbar>
</template>
<style lang="less" scoped>
.tabbar {
  height: 136px !important;
  :deep(.van-tabbar) {
    height: 136px;
  }
  :deep(.van-tabbar-item) {
    padding-top: 26px;
    padding-bottom: 16px;
    font-size: 20px;
    line-height: 28px;
    .van-tabbar-item__text {
      margin-bottom: 5px;
    }
    .indexImg {
      width: 34px;
      height: 32px;
      margin-bottom: 10px;
    }
    .indexImg2 {
      width: 33px;
      height: 36px;
      margin-bottom: 10px;
    }
    .myImg {
      width: 28px;
      height: 34px;
      margin-bottom: 8px;
    }
    .flex-center {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
