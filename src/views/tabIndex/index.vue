<script setup lang="ts">
import wx from 'weixin-js-sdk-ts'
import Tabbar from '@/components/tabbar.vue'
import { useRouter } from 'vue-router'
import { dealParamFromWxWebView } from '@/utils/common'
const router = useRouter()
const goBland = () => {
  // window.location.href = 'https://book.yunzhan365.com/hyokc/csci/mobile/index.html'
  window.location.href = 'https://dstp.com/'
}
const goPg = () => {
  if (window.localStorage.getItem('weixinChat') == 'true') {
    wx.miniProgram.redirectTo({ url: '/pages/index/index' })
  } else router.push({ path: '/' })
}
dealParamFromWxWebView()
</script>
<template>
  <div class="tabIndex">
    <h2 class="head">激活数据资产，开启数据价值变现之旅</h2>
    <div class="stepWrap">
      <ul class="stepUl">
        <li>
          <img src="@/assets/images/tabIndex/4.png" />
          <p>加入数源</p>
        </li>
        <li><van-icon name="arrow" /></li>
        <li>
          <img src="@/assets/images/tabIndex/7.png" />
          <p>数据发布</p>
        </li>
        <li><van-icon name="arrow" /></li>
        <li>
          <img src="@/assets/images/tabIndex/8.png" />
          <p>数据管理</p>
        </li>
        <li><van-icon name="arrow" /></li>
        <li>
          <img src="@/assets/images/tabIndex/12.png" />
          <p>数据应用</p>
        </li>
      </ul>
    </div>
    <div class="blockList">
      <div @click="router.push({ path: 'dataAcquisition' })">
        <img src="@/assets/images/tabIndex/6.png" />
        <p>数据采集工具</p>
      </div>
      <div @click="router.push({ path: 'dataOperations' })">
        <img src="@/assets/images/tabIndex/10.png" />
        <p>数据控制塔</p>
      </div>
      <div @click="router.push({ path: 'dataManage' })">
        <img src="@/assets/images/tabIndex/9.png" />
        <p>数据可视链</p>
      </div>
      <div @click="router.push({ path: 'dataIntegration' })">
        <img src="@/assets/images/tabIndex/5.png" />
        <p>融资数据集成</p>
      </div>
    </div>
    <div class="cardBlue">
      <p>快速测算数据信用额度</p>
      <img src="@/assets/images/tabIndex/13.png" />
      <button class="pgBtn" @click="goPg">立即评估</button>
    </div>
    <div class="cardGray">
      <h3>DSTP，释放数据价值，开拓数据新视界</h3>
      <p @click="goBland">品牌故事>></p>
    </div>
    <Tabbar :active="0"></Tabbar>
  </div>
</template>
<style lang="less" scoped>
.tabIndex {
  //background: url(https://static.dstp.com.cn/img/tabIndex_bg.png?v=1.1) no-repeat;
  background: url(@/assets/images/tabIndex/tabIndex_bg.png?v=1.1) no-repeat;
  background-size: 100% 452px;
  background-color: #f5f5f5;
  width: 100%;
  padding-top: 104px;
  height: 100%;
  min-height: 100vh;
  .head {
    font-size: 36px;
    color: #ffffff;
    line-height: 36px;
    text-align: center;
    margin-bottom: 92px;
  }
}
.stepWrap {
  width: calc(100% - 60px);
  margin: 0 auto;
  margin-top: 192px;
  background: #ffffff;
  border-radius: 20px 20px 20px 20px;
  padding-top: 35px;
  padding-bottom: 55px;
  display: flex;
  justify-content: center;
  .stepUl {
    display: flex;
    font-family: 'Source Han Sans Medium';
    li {
      img {
        width: 70px;
        height: 70px;
        margin: 0 auto;
        margin-bottom: 17px;
      }
      p {
        font-size: 24px;
        line-height: 30px;
      }
      .van-icon-arrow {
        margin: 21px 24px 21px 34px;
        color: #3979fd;
        font-size: 24px;
      }
    }
  }
}
.blockList {
  width: calc(100% - 56px);
  margin: 65px auto 89px;
  display: flex;
  justify-content: space-between;
  font-family: 'Source Han Sans Medium';
  > div {
    cursor: pointer;
  }
  img {
    width: 80px;
    height: 80px;
    margin: 0 auto;
  }
  p {
    font-size: 26px;
    text-align: center;
    margin-top: 18px;
  }
}
.cardBlue {
  width: calc(100% - 60px);
  height: 273px;
  margin: 0 auto;
  background: url(@/assets/images/tabIndex/2.png) no-repeat;
  background-size: 100%;
  padding: 68px 43px;
  margin-bottom: 53px;
  p {
    font-size: 30px;
    color: #ffffff;
    margin-bottom: 11px;
  }
  img {
    width: 298px;
    height: 29px;
    margin-bottom: 31px;
  }
  .pgBtn {
    width: 134px;
    height: 37px;
    background: #ffffff;
    border-radius: 17px 17px 17px 17px;
    font-size: 22px;
    color: #1550dd;
  }
}
.cardGray {
  width: calc(100% - 60px);
  height: 201px;
  padding: 66px 0 0;
  margin: 0 auto 10px;
  background: url(@/assets/images/tabIndex/1.png) no-repeat;
  background-size: 100%;
  text-align: center;
  h3 {
    font-family: 'Source Han Sans Medium';
    font-size: 30px;
    line-height: 30px;
    margin-bottom: 16px;
  }
  p {
    font-size: 24px;
    line-height: 24px;
  }
}
</style>
