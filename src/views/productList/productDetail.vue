<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getProductDetail } from '@/apis/api'
import fixBottom from './components/fixBottom.vue'
const route = useRoute()
const resData = ref({})
console.log('router', route)
onMounted(() => {
  getProductDetail(route.query.id as string).then((res) => {
    resData.value = res.data.data!
  })
})
</script>
<template>
  <div class="pageBg productDetail">
    <div class="main">
      <div class="block">
        <span class="span span1"></span>
        <div class="cont">
          <div class="name">适用客户</div>
          <div class="text">{{ resData.applicableCustomer }}</div>
        </div>
      </div>
      <div class="block">
        <span class="span span2"></span>
        <div class="cont">
          <div class="name">
            {{ resData.productName == '信用证融资' ? '开证服务费' : '年化利率' }}
          </div>
          <div class="text">{{ resData.interestRate }}</div>
        </div>
      </div>
      <div class="block">
        <span class="span span3"></span>
        <div class="cont">
          <div class="name">授信额度({{ resData.currency }})</div>
          <div class="text">{{ resData.limitAmount }}</div>
        </div>
      </div>
      <div class="block">
        <span class="span span4"></span>
        <div class="cont">
          <div class="name">还款方式</div>
          <div class="text">{{ resData.repaymentMode }}</div>
        </div>
      </div>
      <div class="block">
        <span class="span span5"></span>
        <div class="cont noBor">
          <div class="name">还款期限</div>
          <div class="text">{{ resData.repaymentPeriod }}</div>
        </div>
      </div>
    </div>
    <div class="tipText">
      各数字金融产品为对应资金方所有，资金方承担贷款审核、放款的责任。展示额度和利率仅供参考，最终利率和额度请以资金方审批为准。
    </div>
    <fixBottom />
  </div>
</template>
<style lang="less" scoped>
.productDetail {
  padding-top: 32px;
  background-color: #f6f9fc;
  .main {
    background: url(@/assets/images/productList/bg02@2x.png) no-repeat;
    background-size: cover;
    min-height: 738px;
    padding: 62px 62px 32px 80px;
    .block {
      display: flex;
      margin-bottom: 24px;
      .span {
        display: inline-block;
        width: 32px;
        height: 32px;
        margin-right: 12px;
        &.span1 {
          background: url(@/assets/images/productList/icon_name1@2x.png) no-repeat;
          background-size: 32px 32px;
        }
        &.span2 {
          background: url(@/assets/images/productList/icon_name2@2x.png) no-repeat;
          background-size: 32px 32px;
        }
        &.span3 {
          background: url(@/assets/images/productList/icon_name3@2x.png) no-repeat;
          background-size: 32px 32px;
        }
        &.span4 {
          background: url(@/assets/images/productList/icon_name4@2x.png) no-repeat;
          background-size: 32px 32px;
        }
        &.span5 {
          background: url(@/assets/images/productList/icon_name5@2x.png) no-repeat;
          background-size: 32px 32px;
        }
      }
      .cont {
        padding-bottom: 22px;
        border-bottom: 2px solid #dee4f1;
        width: calc(100% - 44px);
        &.noBor {
          border-bottom: none;
        }
        .name {
          font-weight: 600;
          font-size: 24px;
          color: #1451d1;
          line-height: 34px;
          margin-bottom: 12px;
        }
        .text {
          font-size: 28px;
          color: #2b2b2b;
          line-height: 40px;
        }
      }
    }
  }
  .tipText {
    margin: 10px 29px 29px;
    font-size: 24px;
    color: #8b8b8b;
    line-height: 32px;
  }
}
</style>
