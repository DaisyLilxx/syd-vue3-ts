<script setup lang="ts">
import wx from 'weixin-js-sdk-ts'
import { useRoute, useRouter } from 'vue-router'
import { dealParamFromWxWebView } from '@/utils/common'
import { useUserStore, useHeaderStore } from '@/stores/index'

import { getJsSDKConfigApi } from '@/apis/api'
import { initConfig, setShareInfo } from '@/hooks/useWxSDK'
import Tabbar from '@/components/tabbar.vue'
const route = useRoute()
const router = useRouter()
const UserStore = useUserStore()
const HeaderStore = useHeaderStore()
const weixinChat = window.localStorage.getItem('weixinChat') == 'true'
let loginRes = route.query.loginRes as string
dealParamFromWxWebView()
const goList = () => {
  if (loginRes || HeaderStore.headers['wechat-token']) {
    router.push({ path: 'resultList' })
  } else {
    if (weixinChat) {
      // 跳转微信原生登陆页
      wx.miniProgram.navigateTo({ url: '/pages/login/login?referPage=/my' })
    } else {
      router.push({ path: 'login', query: { referPage: '/my' } })
    }
  }
}
// 签名验证不通过，暂时没用到jssdk需要签名的功能，先忽略
// const shareUrl = window.location.href.split('?')[0]
// console.log('urrrr', { url: shareUrl })
// getJsSDKConfigApi({ url: shareUrl }).then((config) => {
//   // 调用后端接口获取config相关信息
//   initConfig({ jsApiList: ['chooseImage'], ...config.data.data })
//     .then(() => {
//       console.log('ok')
//       // 注入wx.config成功后，设置微信分享相关
//       // wx.chooseImage({
//       //   count: 1, // 默认选择一张图片
//       //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
//       //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机
//       //   success(res) {
//       //     console.log('res', res)
//       //     // const tempFilePaths = res.tempFilePaths
//       //     // console.log('选择的图片路径：', tempFilePaths)
//       //     // 可以将图片路径展示在H5页面或上传到服务器
//       //   },
//       //   fail(err) {
//       //     console.error('图片选择失败', err)
//       //   },
//       //   cancel() {}
//       // })
//     })
//     .catch((e) => {
//       console.log('cuola', e)
//     })
// })

// const chooseImageFromMiniProgram = () => {
//   // wx.config({
//   //   debug: true,
//   //   appId: 'wxa395f566e7b56ca3',
//   //   nonceStr: 'QMWs2c90Oi6XxmTs',
//   //   timestamp: 1728377153,
//   //   signature: 'f2c58a0f48f1df3dc493c483881b98f6093ddf22',
//   //   jsApiList: ['chooseImage'], // 确保 'chooseImage' 在接口列表中
//   //   openTagList: []
//   // })

//   // wx.ready(() => {
//   //   console.log('JSSDK 配置成功')
//   // })

//   // wx.error((err) => {
//   //   console.error('JSSDK 配置失败', err)
//   // })
//   console.log('wx', wx)
//   console.log('wx.miniProgram', wx.miniProgram)
//   // wx.chooseImage({
//   //   count: 1, // 默认选择一张图片
//   //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图
//   //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机
//   //   success(res) {
//   //     const tempFilePaths = res.tempFilePaths
//   //     console.log('选择的图片路径：', tempFilePaths)
//   //     // 可以将图片路径展示在H5页面或上传到服务器
//   //   },
//   //   fail(err) {
//   //     console.error('图片选择失败', err)
//   //   },
//   //   cancel() {}
//   // })
// }
const goLogin = () => {
  if (weixinChat) {
    wx.miniProgram.navigateTo({ url: '/pages/login/login?referPage=/my' })
  } else {
    router.push({ path: 'login', query: { referPage: '/my' } })
  }
}
</script>
<template>
  <div class="pageBg my">
    <!-- 上传图片功能测试 -->
    <!-- <button @click="chooseImageFromMiniProgram()">测试选择图片</button> -->
    <div class="company">
      <img src="@/assets/images/my/profile_touxiang@2x.png" />
      <div>
        <h3 class="name" v-if="UserStore.userMess && UserStore.userMess.username">
          {{ UserStore.userMess.username }}
        </h3>
        <h3 class="name" v-else @click="goLogin">请登录</h3>
        <!--     <div class="phone">{{ UserStore.userMess.username }}</div> -->
      </div>
    </div>
    <div class="cont">
      <div class="list">
        <van-cell title="测额记录" is-link @click="goList" :border="false">
          <template #icon>
            <span class="span span1"></span>
          </template>
          <template #right-icon>
            <span class="arrow"></span>
          </template>
        </van-cell>
        <van-cell title="联系客服" is-link to="customerService" :border="false">
          <template #icon>
            <span class="span span2"></span>
          </template>
          <template #right-icon>
            <span class="arrow"></span>
          </template>
        </van-cell>
      </div>
    </div>
    <!-- <div class="loginBar">
      <van-cell title="退出登录" to="" :border="false">
        <template #icon>
          <span class="span span3"></span>
        </template>
      </van-cell>
    </div> -->
    <Tabbar :active="2"></Tabbar>
  </div>
</template>
<style lang="less" scoped>
.my {
  background-color: #f6f9fc;
  min-height: 100vh;
  padding-bottom: 60px;
  .company {
    display: flex;
    align-items: center;
    padding: 52px 72px 60px;
    color: #fff;
    img {
      width: 128px;
      height: 128px;
      margin-right: 24px;
    }
    .name {
      font-weight: 600;
      font-size: 36px;
      line-height: 50px;
    }
    .phone {
      font-size: 28px;
      line-height: 40px;
    }
  }
  .cont {
    background: url(@/assets/images/my/bg02@2x.png) no-repeat;
    background-size: 100% 100%;
    width: 718px;
    height: 548px;
    margin: 0 auto;
    margin-bottom: 380px;
    .list {
      padding: 146px 78px 22px 76px;
    }
  }
  .span {
    display: inline-block;
    width: 48px;
    height: 48px;
    margin-right: 20px;
    &.span1 {
      background: url(@/assets/images/my/icon_ceejilu@2x.png) no-repeat;
      background-size: 100% 100%;
    }
    &.span2 {
      background: url(@/assets/images/my/icon_ceejilu1@2x.png) no-repeat;
      background-size: 100% 100%;
    }
    &.span3 {
      background: url(@/assets/images/my/icon_ceejilu3@2x.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .arrow {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(@/assets/images/my/personal_center_icon_forward03@2x.png) no-repeat;
    background-size: 100% 100%;
  }
  .loginBar {
    width: calc(100% - 56px);
    margin: 0 auto;
    border-radius: 32px;
    height: 120px;
    background: #ffffff;
    display: flex;
    padding-left: 64px;
    :deep(.van-cell) {
      margin-bottom: 0;
    }
  }
  :deep(.van-cell) {
    align-items: center;
    padding: 0;
    margin-bottom: 48px;
    border-radius: 32px;
  }
  :deep(.van-cell__title) {
    font-weight: 600;
    font-size: 30px;
    color: #2b2b2b;
    line-height: 42px;
  }
}
</style>
