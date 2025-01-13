<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getProductList } from '@/apis/api'
import { useSerialNoStore } from '@/stores/index'
import type { MatchProduct } from '@/types/index'
import fixBottom from './components/fixBottom.vue'
import empty from '@/components/empty.vue'
const router = useRouter()
const route = useRoute()
const loading = ref(true)
const serialNoStore = useSerialNoStore()
const goDetail = (id: number) => {
  router.push({ path: '/productDetail', query: { id } })
}
let imgUrlPre = import.meta.env.VITE_APP_BASE_URL
const dataList = ref<MatchProduct[]>([])
onMounted(() => {
  getProductList({ serialNo: serialNoStore.serialNo }).then((res) => {
    dataList.value = res.data.data!
    loading.value = false
  })
})
</script>
<template>
  <div class="productList">
    <div class="mainWrap">
      <div class="main">
        <p class="tip">为您匹配到以下金融产品</p>
        <van-loading class="comLoading" v-if="loading" />
        <empty
          text="暂无符合您条件的金融产品"
          :hasEmptyBg="false"
          v-if="!loading && !dataList.length"
        />
        <ul class="list" v-if="!loading && dataList.length">
          <li
            :class="index % 2 == 0 ? 'orange' : 'pruple'"
            v-for="(item, index) in dataList"
            :key="index"
          >
            <img
              :src="`${imgUrlPre}/dstp-op/rest/api/app/financial/picture/preview?path=${item.bankIconUrl}`"
              class="bankImg"
            />
            <div class="rightCont">
              <div class="head">
                <span class="name">{{ item.bank }}｜{{ item.productName }}</span>
                <div class="detail" @click="goDetail(item.productId)">
                  <span class="search_icon"></span>详情
                </div>
              </div>
              <div class="moneyCont">
                <div>
                  <div class="name">额度({{ item.currency }}）</div>
                  <div class="money">{{ item.limitAmount }}</div>
                </div>
                <div>
                  <div class="name">
                    {{ item.productName == '信用证融资' ? '开证服务费' : '利率' }}
                  </div>
                  <!-- <div class="money">2.95%<span class="small">起</span></div> -->
                  <div class="money">{{ item.interestRate }}</div>
                </div>
              </div>
            </div>
          </li>
          <!-- <li class="pruple">
            <img src="~@/assets/images/productList/icon_banklogo@2x.png" class="bankImg" />
            <div class="rightCont">
              <div class="head">
                <span class="name">中国银行｜科技通宝</span>
                <div class="detail" @click="goDetail"><span class="search_icon"></span>详情</div>
              </div>
              <div class="moneyCont">
                <div>
                  <div class="name">额度(元）</div>
                  <div class="money">20～400w</div>
                </div>
                <div>
                  <div class="name">利率</div>
                  <div class="money">2.95%<span class="small">起</span></div>
                </div>
              </div>
            </div>
          </li> -->
        </ul>
      </div>
    </div>
    <fixBottom v-if="dataList.length" />
  </div>
</template>
<style lang="less" scoped>
.productList {
  background: url(@/assets/images/index/home_bg01@2x.png) no-repeat;
  background-size: 100% 866px;
  background-color: #fff;
  width: 100%;
  padding-top: 46px;
  .comSubBtn {
    width: calc(100% - 84px);
    margin: 0 42px 46px;
  }
  .mainWrap {
    overflow-x: hidden;
    height: auto;
  }
  .main {
    background: url(@/assets/images/productList/img01@2x.png) no-repeat;
    background-position: 0 0;
    background-size: 100%;
    padding: 10px 27px;
    margin: 0;
    margin-left: -12px;
    margin-bottom: 40px;
    width: calc(100% + 24px);
    min-height: 100vh;
    height: 100%;
    .tip {
      padding: 40px 0 0 60px;
      font-weight: 600;
      font-size: 32px;
      color: #ffffff;
      line-height: 44px;
      margin-bottom: 80px;
    }
    .list {
      li {
        width: 100%;
        min-height: 290px;
        display: flex;
        padding: 42px 52px 42px 54px;
        &.orange {
          background: url(@/assets/images/productList/img02@2x.png) no-repeat;
          background-size: 100% 100%;
        }
        &.pruple {
          background: url(@/assets/images/productList/img03@2x.png) no-repeat;
          background-size: 100% 100%;
        }
        .bankImg {
          width: 52px;
          height: 52px;
          margin-right: 20px;
          border-radius: 26px;
        }
        .rightCont {
          width: calc(100% - 72px);
          .head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #f1f1f1;
            .name {
              font-weight: 500;
              font-size: 30px;
              line-height: 42px;
              flex-shrink: 0;
              width: calc(100% - 140px);
            }
            .detail {
              min-width: 100px;
              height: 40px;
              background: #e9f3ff;
              border-radius: 32px;
              display: flex;
              align-items: center;
              padding: 10px 18px;
              color: #1f66fb;
              font-size: 20px;
              .search_icon {
                display: inline-block;
                margin-right: 4px;
                width: 20px;
                height: 20px;
                background: url(@/assets/images/productList/icon_chakanxiangqing@2x.png) no-repeat;
                background-size: cover;
              }
            }
          }
          .moneyCont {
            display: flex;
            padding-top: 26px;
            > div {
              width: 50%;
            }
            .name {
              font-size: 28px;
              color: #6b6b6b;
              line-height: 40px;
              margin-bottom: 6px;
            }
            .money {
              font-weight: bold;
              font-size: 44px;
              color: #2b2b2b;
              line-height: 56px;
              .small {
                font-size: 32px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
