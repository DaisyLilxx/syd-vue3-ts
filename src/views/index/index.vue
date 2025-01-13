<script setup lang="ts">
import Tabbar from '@/components/tabbar.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { dealParamFromWxWebView } from '@/utils/common'
const router = useRouter()
const active = ref(0)
const demoList = [
  {
    menu: '外贸企业',
    tit: '广州DB物流供应链有限公司',
    subTit: '李总',
    cont: 'DSTP使我们能够运用自身及上下游企业发布在全球数源中心的报关、采购、销售、库存等确权数据，放大信用价值，成功申请到交通银行的信用证融资产品，获得了5000万元的信用证额度，为我们的外综服、跨境品牌经销等业务提供了强大助力，还有效降低了交易风险。',
    icon: ''
  },
  {
    menu: '品牌经销商',
    tit: 'XC商贸有限公司',
    subTit: '萧总',
    cont: '我们一直从事品牌经销生意，今年加入了全球数源中心，凭采购、销售等确权数据获得了平安银行数字贷产品上百万元的授信额度批复，这笔资金让我们进一步铺设了经销业务网，更好、更稳定地加强与品牌方的合作关系。',
    icon: ''
  },
  {
    menu: '电商企业',
    tit: '健T有限公司',
    subTit: '*总',
    cont: 'DSTP让我们库存数据、商品数据等资产焕发活力，信用价值倍增，轻松斩获1.2亿港币融资。这笔资金如同及时雨，极大地促进了公司资金的流转与运用，为跨境电商业务的稳健经营与全球扩张提供了高效支持。',
    icon: ''
  },
  {
    menu: '科技型企业',
    tit: '广州XTW信息科技有限公司',
    subTit: '孙总',
    cont: '在DSTP的帮助下，我们运用发布在全球数源中心的企业经营纳税信息、专利信息等确权数据，极大地降低了融资的准入门槛，成功获得浦发银行的近百万元贷款额度批复，高效满足资金周转需求，这无疑也是对我们科技创新能力和市场潜力的肯定。',
    icon: ''
  },
  {
    menu: '个体工商户',
    tit: 'MP快餐店',
    subTit: '吴老板',
    cont: 'DSTP帮助我们利用门店流量数据、税务数据，获得招商银行的五十万元的贷款额度批复，年化利率才3.5%，成本很低，这解决了我们近期的燃眉之急，让我们不愁进货问题，还能多搞点促销吸引顾客，生意越做越顺心了。',
    icon: ''
  }
]
const goTest = () => {
  router.push('/limitCalculationEdit')
}
onMounted(() => {
  dealParamFromWxWebView()
})
</script>
<template>
  <div class="index pageBg">
    <section class="top">
      <img src="~@/assets/images/index/font.png" class="logo" />
      <h2 class="head">数据要素 x 金融服务</h2>
      <p class="p">
        依托全球数源中心的数据规则，DSTP数源贷模型帮助您将数据资产转化为信用价值，智能推荐众多银行的数字金融产品，助您获得更优的融资体验。
      </p>
    </section>
    <section class="block2">
      <p class="p">您知道吗?您的数据有无限潜力</p>
      <div class="map">
        <span class="span span1">经营及纳税数据</span>
        <span class="span span2">物流数据</span>
        <span class="span span3">报关数据</span>
        <span class="span span4">电商数据</span>
        <span class="span span5">采销数据</span>
        <span class="span span6">门店流量数据</span>
        <span class="span span7">库存数据</span>
        <span class="span span8">专利数据</span>
        <img src="~@/assets/images/index/home_tableview@2x.png" class="mapImg" />
      </div>
      <div class="goTestBtn" @click="goTest">立即测算</div>
      <p class="orangeFont">数据信用额度高至 100000000元</p>
    </section>
    <section class="block3">
      <h3 class="comhead">客户案例</h3>
      <van-tabs
        v-model:active="active"
        swipeable
        animated
        :ellipsis="false"
        title-inactive-color="#2B2B2B"
        title-active-color="#1F66FB"
      >
        <van-tab
          v-for="(item, index) in demoList"
          :title="item.menu"
          :key="index"
          title-class="tabTit"
        >
          <div class="tabCont">
            <img src="~@/assets/images/index/company.png" class="img" />
            <h2 class="tit">{{ item.tit }}</h2>
            <p class="subTit"></p>
            <p class="text">{{ item.cont }}</p>
          </div>
        </van-tab>
      </van-tabs>
    </section>
    <section class="block4">
      <h3 class="comhead">全球数源中心金融服务共建方</h3>
      <ul>
        <li><img src="~@/assets/images/index/icon_1.png" /></li>
        <li><img src="~@/assets/images/index/icon_6.png" /></li>
        <li><img src="~@/assets/images/index/icon_2.png" /></li>
        <li><img src="~@/assets/images/index/icon_3.png" /></li>
        <li><img src="~@/assets/images/index/icon_4.png" /></li>
        <li><img src="~@/assets/images/index/icon_5.png" /></li>
      </ul>
    </section>
    <section class="footer">
      <p class="p">融资服务由银行提供</p>
      <p class="p">数据发布、确权与管理由企业依托全球数源中心自主控制</p>
      <p class="p">
        数源贷模型版权所有
        <span>©粤港澳国际供应链（广州）有限公司</span>
      </p>
    </section>
    <Tabbar :active="1"></Tabbar>
  </div>
</template>
<style lang="less" scoped>
.index {
  background-color: #f6f9fc;
  width: 100%;
  height: auto;
  .top {
    width: 100%;
    padding: 0 60px 32px;
    .logo {
      width: 382px;
      height: 46px;
      margin: 0 auto;
      margin-bottom: 18px;
    }
    .head {
      width: 286px;
      height: 46px;
      background: radial-gradient(0% 0% at 0% 0%, #e6eeff 0%, #fefeff 100%);
      border-radius: 22px 22px 22px 22px;
      border: 3px solid #ffffff;
      text-align: center;
      padding: 0px 17px;
      font-size: 27px;
      color: #1f66fb;
      line-height: 46px;
      margin: 0 auto;
      margin-bottom: 36px;
    }
    .p {
      font-family: 'Source Han Sans Light';
      font-size: 24px;
      color: #ffffff;
      line-height: 36px;
    }
  }

  .block2 {
    background: url(@/assets/images/index/home_bg02@2x.png) no-repeat;
    background-size: 100% 882px;
    height: 882px;
    margin: 0 16px;
    text-align: center;
    .head1 {
      font-weight: 550;
      padding-top: 48px;
      padding-bottom: 16px;
      font-size: 32px;
      line-height: 44px;
    }
    .head2 {
      font-weight: bold;
      font-size: 92px;
      line-height: 106px;
      margin-bottom: 56px;
    }
    .p {
      font-weight: 600;
      font-size: 32px;
      color: #ffffff;
      line-height: 44px;
      padding-top: 72px;
    }
    .map {
      width: 324px;
      height: 324px;
      margin: 0 auto;
      margin-top: 94px;
      position: relative;
      margin-bottom: 124px;
      .span {
        position: absolute;
        font-size: 20px;
        line-height: 28px;
        &.span1 {
          top: -40px;
          left: 50%;
          margin-left: -3.5em;
        }
        &.span2 {
          top: 30px;
          right: -2.5em;
        }
        &.span3 {
          top: 50%;
          margin-top: -0.5em;
          right: -5em;
        }
        &.span4 {
          bottom: 30px;
          right: -2.5em;
        }
        &.span5 {
          bottom: -40px;
          left: 50%;
          margin-left: -2em;
        }
        &.span6 {
          bottom: 4vw;
          left: -4.5em;
        }
        &.span7 {
          top: 50%;
          margin-top: -0.5em;
          left: -5em;
        }
        &.span8 {
          top: 30px;
          left: -2.5em;
        }
      }
      .mapImg {
        width: 324px;
        height: 324px;
      }
    }
    .goTestBtn {
      cursor: pointer;
      background: url(@/assets/images/index/home_btn_default@2x.png) no-repeat;
      background-size: 100%;
      font-size: 36px;
      color: #ffffff;
      line-height: 50px;
      width: 480px;
      height: 112px;
      margin: 0 auto;
      padding-top: 20px;
    }
    .orangeFont {
      font-size: 24px;
      color: #ff7e00;
      line-height: 36px;
    }
  }
  .block3 {
    margin-top: 44px;
    margin-bottom: 100px;
    .comhead {
      margin-bottom: 42px;
    }
    :deep(.van-tabs__wrap) {
      height: auto;
    }
    :deep(.van-tabs__nav) {
      padding-bottom: 34px;
      background: #f6f9fc;
    }
    :deep(.van-tabs__line) {
      bottom: 20px;
      width: 56px;
      height: 6px;
      background-color: #1f66fb;
    }
    :deep(.van-tab.tabTit) {
      font-size: 28px;
      padding: 0 40px;
      line-height: 40px;
    }
    .tabCont {
      background: url(@/assets/images/index/home_bg03@2x.png) no-repeat;
      background-size: 100% 680px;
      width: calc(100% - 56px);
      margin: 0 auto;
      text-align: center;
      padding: 50px 63px 46px;
      min-height: 680px;
      .img {
        width: 130px;
        height: 130px;
        margin: 0 auto;
        margin-bottom: 20px;
      }
      .tit {
        font-size: 32px;
        color: #ffffff;
        line-height: 44px;
        margin-bottom: 8px;
      }
      .subTit {
        font-size: 24px;
        color: #ffffff;
        line-height: 34px;
        margin-bottom: 106px;
      }
      .text {
        font-size: 28px;
        color: #2b2b2b;
        line-height: 40px;
        text-align: left;
      }
    }
  }
  .block4 {
    ul {
      margin-top: 30px;
      width: 100%;
      padding: 0 78px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        margin-bottom: 24px;
        img {
          width: 158px;
          height: 64px;
        }
      }
    }
  }
  .footer {
    text-align: center;
    color: #8c8c8c;
    font-size: 20px;
    line-height: 28px;
    padding-top: 16px;
    padding-bottom: 40px;
    span {
      color: #1f66fb;
    }
  }
  .comhead {
    font-weight: 500;
    font-size: 32px;
    color: #2b2b2b;
    line-height: 44px;
    text-align: center;
    &::before {
      display: inline-block;
      content: '';
      background: url(@/assets/images/index/home_sign01@2x.png) no-repeat;
      background-size: 100%;
      width: 80px;
      height: 12px;
      margin-right: 36px;
    }
    &::after {
      display: inline-block;
      content: '';
      background: url(@/assets/images/index/home_sign02@2x.png) no-repeat;
      background-size: 100%;
      width: 80px;
      height: 12px;
      margin-left: 36px;
    }
  }
}
</style>
