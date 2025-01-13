<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getItemValue, calculateResult } from '@/apis/api'
import { useSerialNoStore } from '@/stores/index'
import { dealParamFromWxWebView } from '@/utils/common'
import type { CalculateResultParam } from '@/types/index'
const router = useRouter()
const isLoading = ref(false)
const SerialNoStore = useSerialNoStore()

const isShow1018 = ref(false)
const isShow1017 = ref(false)
const isShow1016 = ref(false)
const isShow1001 = ref(false)
const contactData = ref<{ [key: string]: any }>({})

dealParamFromWxWebView()
const formData = ref<CalculateResultParam>({
  averageMonthlyReceivableB2B: '',
  averageMonthlyReceivableB2C: '',
  distributorMonthlyPurchaseAmount: '',
  entName: '',
  enterpriseLoanBalance: '',
  governmentBiddingContractAmount: '',
  lastYearImportExportTradeAmount: '',
  lastYearNetProfit: '',
  lastYearOperatingIncome: '',
  purchaseToPaymentTime: '',
  serialNo: ''
})
let countTime: number | null = null
const time = ref(10)
const onSubmit = (values: CalculateResultParam) => {
  console.log('submit', values)
  formData.value.serialNo = SerialNoStore.serialNo
  isLoading.value = true
  if (countTime) return
  countTime = setInterval(function () {
    time.value--
    if (time.value == 0) {
      clearInterval(countTime!)
    }
  }, 1000)
  calculateResult(formData.value).then((res) => {
    if (res.data.flag == 'SUCCESS') {
      if (countTime) clearInterval(countTime!)
      router.push('/result')
    }
  })
}
onMounted(() => {
  getItemValue({ serialNo: SerialNoStore.serialNo }).then((res) => {
    contactData.value = res.data.data!
    console.log('contactData.value', contactData.value)
    if (contactData.value['MV1018']) isShow1018.value = true
    if (contactData.value['MV1017']) isShow1017.value = true
    if (contactData.value['MV1016']) isShow1016.value = true
    if (contactData.value['MV1001']) isShow1001.value = true
  })
})
const onInput = (e: any, key: keyof CalculateResultParam) => {
  let val: string = e.target.value
  // 最多只允许输入12位正数并限制最多2位小数的正则
  const regex = /^\d{1,12}(\.\d{1,2})?$/
  console.log('aaa', regex.test(val))
  // 如果输入的值符合正则规则，更新值
  if (regex.test(val)) {
    formData.value[key] = val
  } else {
    val = val
      .replace(/[^0-9.]/g, '') // 移除非数字和小数点
      .replace(/^0+(\d)/, '$1') // 移除多余的前导0
      .replace(/(\..*)\./g, '$1') // 删除多余的小数点
      .replace(/^(\d{12})\d+/, '$1') // 限制整数部分最多12位
      .replace(/(\.\d{2})\d+/, '$1') // 限制小数点后最多2位
    formData.value[key] = val
  }
}
// 最多只允许输入12位正数或负数并限制最多2位小数的正则
const onInputFs = (e: any, key: keyof CalculateResultParam) => {
  let val = e.target.value
  // 最多只允许输入12位正数或负数并限制最多2位小数的正则
  const regex = /^-?\d{0,12}(\.\d{0,2})?$/
  // 如果输入的值符合正则规则，更新值
  if (regex.test(val)) {
    formData.value[key] = val
  } else {
    val = val
      .replace(/[^0-9.-]/g, '') // 移除所有非数字、非负号和小数点的字符
      .replace(/(\..*)\./g, '$1') // 确保只允许一个小数点
      .replace(/(?!^)-/g, '') // 确保负号只允许在开头
      .replace(/^(-?\d{12})\d*(\.\d*)?/, '$1$2') // 限制整数部分最多12位
      .replace(/(\.\d{2})\d+/, '$1') // 限制小数点后最多2位
    // 更新 formData 和输入框的值
    formData.value[key] = val
    e.target.value = val // 更新输入框的值
  }
}
onBeforeUnmount(() => {
  if (countTime) clearInterval(countTime) // 组件卸载时清除定时器，避免内存泄漏
})
</script>
<template>
  <div class="pageBg completeMess" v-if="!isLoading">
    <van-form @submit="onSubmit" required="auto">
      <div class="main">
        <div class="head">
          <div>提供更多信息，快速了解自己的数据潜</div>
          <div>力，获得更详细的授信额度预测数据</div>
        </div>
        <div class="comFormCont">
          <van-field
            class="comFieldInp"
            v-model="formData.entName"
            name="entName"
            label="企业名称"
            maxlength="32"
            placeholder="请填入企业名称"
            label-align="top"
            :rules="[{ required: true, message: '请填入企业名称' }]"
          >
          </van-field>
          <van-field
            class="comFieldInp"
            v-model="formData.lastYearOperatingIncome"
            name="lastYearOperatingIncome"
            type="number"
            @input="(e) => onInput(e, 'lastYearOperatingIncome')"
            label="上一自然年营业收入"
            placeholder="请填入上一自然年营业收入"
            label-align="top"
            :rules="[{ required: true, message: '请填入上一自然年营业收入' }]"
          >
            <template #right-icon>
              <span>万元</span>
            </template>
          </van-field>
          <van-field
            class="comFieldInp"
            v-model="formData.lastYearNetProfit"
            name="lastYearNetProfit"
            type="text"
            @input="(e) => onInputFs(e, 'lastYearNetProfit')"
            label="上一自然年净利润"
            placeholder="请填入上一自然年净利润"
            label-align="top"
            :rules="[{ required: true, message: '请填入上一自然年净利润' }]"
          >
            <template #right-icon>
              <span>万元</span>
            </template>
          </van-field>
          <van-field
            class="comFieldInp"
            type="number"
            v-model="formData.enterpriseLoanBalance"
            name="enterpriseLoanBalance"
            @input="(e) => onInput(e, 'enterpriseLoanBalance')"
            label="企业借款余额"
            placeholder="请填入企业借款余额"
            label-align="top"
            :rules="[{ required: true, message: '请填入企业借款余额' }]"
          >
            <template #right-icon>
              <span>万元</span>
            </template>
          </van-field>

          <van-field
            v-if="isShow1018"
            class="comFieldInp"
            type="number"
            v-model="formData.governmentBiddingContractAmount"
            name="governmentBiddingContractAmount"
            @input="(e) => onInput(e, 'governmentBiddingContractAmount')"
            label="政府招标项目合同金额"
            placeholder="请填入政府招标项目合同金额"
            label-align="top"
            :rules="[{ required: true, message: '请填入政府招标项目合同金额' }]"
          >
            <template #right-icon>
              <span>万元</span>
            </template>
          </van-field>

          <van-field
            v-if="isShow1017 && contactData['MV1017'] == '涉及进出口贸易'"
            class="comFieldInp"
            type="number"
            v-model="formData.lastYearImportExportTradeAmount"
            name="lastYearImportExportTradeAmount"
            @input="(e) => onInput(e, 'lastYearImportExportTradeAmount')"
            label="上一自然年进出口贸易额"
            placeholder="请填入上一自然年进出口贸易额"
            label-align="top"
            :rules="[{ required: true, message: '请填入上一自然年进出口贸易额' }]"
          >
            <template #right-icon>
              <span>万元</span>
            </template>
          </van-field>
          <van-field
            v-if="isShow1016 && contactData['MV1016'] == '有品牌经销权'"
            type="number"
            class="comFieldInp"
            v-model="formData.distributorMonthlyPurchaseAmount"
            name="distributorMonthlyPurchaseAmount"
            @input="(e) => onInput(e, 'distributorMonthlyPurchaseAmount')"
            label="品牌经销商月均采购金额"
            placeholder="请填入品牌经销商月均采购金额"
            label-align="top"
            :rules="[{ required: true, message: '请填入品牌经销商月均采购金额' }]"
          >
            <template #right-icon>
              <span>万元</span>
            </template>
          </van-field>

          <van-field
            v-if="isShow1016 && contactData['MV1016'] == '有品牌经销权'"
            v-model="formData.purchaseToPaymentTime"
            name="purchaseToPaymentTime"
            class="comFieldInp noBor"
            label="从采购到回款耗时多少天"
            label-align="top"
            type="digit"
            maxlength="3"
            placeholder="填入从采购到回款耗时多少天"
            :rules="[{ required: true, message: '请填入从采购到回款耗时多少天' }]"
          >
            <template #right-icon>
              <span>天</span>
            </template>
          </van-field>
          <van-field
            v-if="isShow1001 && contactData['MV1001'] == '线上电商平台销售'"
            class="comFieldInp"
            type="number"
            v-model="formData.averageMonthlyReceivableB2B"
            name="averageMonthlyReceivableB2B"
            @input="(e) => onInput(e, 'averageMonthlyReceivableB2B')"
            label="电商平台月均应收账款余额（B2B）"
            placeholder="请填入电商平台月均应收账款余额"
            label-align="top"
            :rules="[{ required: true, message: '请填入电商平台月均应收账款余额' }]"
          >
            <template #right-icon>
              <span>万元</span>
            </template>
          </van-field>
          <van-field
            v-if="isShow1001 && contactData['MV1001'] == '线上电商平台销售'"
            class="comFieldInp"
            type="number"
            v-model="formData.averageMonthlyReceivableB2C"
            name="averageMonthlyReceivableB2C"
            @input="(e) => onInput(e, 'averageMonthlyReceivableB2C')"
            label="电商平台月均应收账款余额（B2C）"
            placeholder="请填入电商平台月均应收账款余额"
            label-align="top"
            :rules="[{ required: true, message: '请填入电商平台月均应收账款余额' }]"
          >
            <template #right-icon>
              <span>万元</span>
            </template>
          </van-field>
        </div>
      </div>
      <van-button class="comSubBtn" round block type="primary" native-type="submit">
        提交
      </van-button>
      <!--   <div class="comSubBtn" @click="submitAct">提交</div> -->
    </van-form>
  </div>
  <div class="pageBg completeMess2" v-if="isLoading">
    <div class="submitLoading">
      <img src="https://static.dstp.com.cn/img/loading.gif" class="loadImg" />
      <h2 class="tit">额度测算中</h2>
      <div class="text">
        正在努力为您测算，请稍等…<span>{{ time }}s</span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.completeMess {
  background-color: #f6f9fc;
  padding-top: 0;
  padding-bottom: 30px;
  .main {
    height: auto;
    width: calc(100% - 32px);
    margin: 0 auto;
    margin-bottom: 24px;
    .head {
      padding-top: 54px;
      text-align: center;
      background: url(@/assets/images/limitCalculationEdit/bgTop.png) no-repeat;
      background-size: 100%;
      width: calc(100% - 32px);
      height: 158px;
      margin-bottom: -10px;
      font-size: 30px;
      color: #ffffff;
      line-height: 42px;
      padding-left: 32px;
    }
    .comFormCont {
      padding-top: 20px;
      background: #ffffff;
      box-shadow: 0px 4px 12px 0px rgba(222, 222, 222, 0.5);
      border-radius: 32px;
    }
  }
}
.completeMess2 {
  padding-top: 20px;
  padding-bottom: 30px;
}
.comSelectInp {
  :deep(.van-field__body) {
    width: 552px;
  }
  :deep(.van-field__value) {
    &::after {
      display: inline-block;
      position: absolute;
      content: '天';
      font-size: 28px;
      right: 0;
      top: 16px;
      line-height: 40px;
    }
  }
}
.submitLoading {
  text-align: center;
  width: calc(100% - 56px);
  height: 1398px;
  background: #ffffff;
  box-shadow: 0px 4px 12px 0px rgba(222, 222, 222, 0.5);
  border-radius: 32px;
  margin: 0 auto;
  padding-top: 198px;
  .loadImg {
    width: 385px;
    margin: 0 auto 100px;
  }
  .tit {
    font-weight: 600;
    font-size: 44px;
    line-height: 60px;
    margin-bottom: 30px;
  }
  .text {
    font-size: 28px;
    color: #575757;
    line-height: 40px;
    span {
      color: #fe2525;
    }
  }
}
</style>
