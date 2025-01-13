<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { selection, matchProduct } from '@/apis/api'
import type { Item, SubItem } from '@/types/index'
import { useSerialNoStore } from '@/stores/index'
const router = useRouter()
const serialNoStore = useSerialNoStore()
const personDisable = ref(true)
const selectionObj = ref<{ [key: string]: any }>({})
const isLoading = ref(false)
const getData = async () => {
  let res = await selection()
  res.data.data!.map((item: Item, index: number) => {
    if (item.itemNo == 'MV1001' && item.values.length) {
      revenueSources.value = item?.values[0]?.value
      chooseSourceUl(0, item?.values[0])
    }
    selectionObj.value[item.itemNo] = item
  })
}
onMounted(() => {
  getData()
})
const revenueSources = ref<string | number>('')
const establishmentYear = ref<string | number>('')
const registrationLocation = ref<string | number>('')
const brandManagement = ref<string | number>('')
const involvingImportExportTrade = ref<string | number>('')
const projectType = ref<string | number>('')
const establishmentYear_text = ref('')
const registrationLocation_text = ref('')
const brandManagement_text = ref('')
const involvingImportExportTrade_text = ref('')
const projectType_text = ref('')
const chooseLi = ref(0)
const isShow1016 = ref(false)
const isShow1017 = ref(false)
const isShow1018 = ref(false)
const setChooseLi = (index: number) => {
  chooseLi.value = index
}
const sourceUlActive = ref(0)
const chooseSourceUl = (index: number, item: SubItem) => {
  sourceUlActive.value = index
  revenueSources.value = item.value
  let show1016Arr = [1, 2, 3]
  let show1017Arr = [1, 2, 3]
  let show1018Arr = [5]
  if (show1016Arr.includes(item.value)) {
    isShow1016.value = true
  } else isShow1016.value = false
  if (show1017Arr.includes(item.value)) {
    isShow1017.value = true
  } else isShow1017.value = false
  if (show1018Arr.includes(item.value)) {
    isShow1018.value = true
  } else isShow1018.value = false
}

const onSubmit = (values: any) => {
  isLoading.value = true
  let formData = {
    revenueSources: revenueSources.value,
    establishmentYear: establishmentYear.value,
    registrationLocation: registrationLocation.value,
    brandManagement: brandManagement.value,
    involvingImportExportTrade: involvingImportExportTrade.value,
    projectType: projectType.value
  }
  matchProduct(formData)
    .then((res) => {
      let { data } = res
      serialNoStore.setSerialNoStore(data.data!.serialNo)
      isLoading.value = false
      router.push({ path: '/productList' })
    })
    .catch((e) => {
      isLoading.value = false
    })
}
const showPicker = ref(false)
type selectTypeItem = {
  text: string
  value: number
}
const popTit = ref<string>('')
const columns = ref<selectTypeItem[]>([])
const currentPopKey = ref<string>('')
// 定义 Picker 选项的类型
interface PickerOption {
  text: string
  value: number | string
}
const onConfirm = ({ selectedOptions }: { selectedOptions: PickerOption[] }) => {
  let selectValue = selectedOptions[0].value
  let selectText = selectedOptions[0].text
  switch (currentPopKey.value) {
    case 'MV1002':
      establishmentYear.value = selectValue
      establishmentYear_text.value = selectText
      break
    case 'MV1003':
      registrationLocation.value = selectValue
      registrationLocation_text.value = selectText
      break
    case 'MV1016':
      brandManagement.value = selectValue
      brandManagement_text.value = selectText
      break
    case 'MV1017':
      involvingImportExportTrade.value = selectValue
      involvingImportExportTrade_text.value = selectText
      break
    case 'MV1018':
      projectType.value = selectValue
      projectType_text.value = selectText
      break
  }
  showPicker.value = false
}
const showPop = (key: string) => {
  currentPopKey.value = key
  popTit.value = selectionObj.value[key].itemName
  columns.value = selectionObj.value[key].values
  showPicker.value = true
}
</script>
<template>
  <div class="limitCalculationEdit">
    <van-form @submit="onSubmit" required="auto">
      <div class="formBlock">
        <div class="head">
          <h2>请填写您的基本信息</h2>
          <h2>以便匹配适合您的数字金融产品</h2>
        </div>
        <div class="cont comFormCont">
          <ul class="typeUl">
            <li :class="{ active: chooseLi == 0 }" @click="setChooseLi(0)">
              <img
                src="~@/assets/images/limitCalculationEdit/icon_gouxuan1.png"
                v-if="chooseLi == 0"
                class="check"
              />
              <img src="~@/assets/images/limitCalculationEdit/able.png" v-else class="check" />
              <img
                src="~@/assets/images/limitCalculationEdit/icon_qiyerongzi@2x.png"
                class="typeImg"
              />
              <h2>企业融资</h2>
            </li>
            <li :class="{ active: chooseLi == 1 }" @click="setChooseLi(personDisable ? 0 : 1)">
              <img
                src="~@/assets/images/limitCalculationEdit/icon_gouxuan2.png"
                v-if="personDisable"
                class="check"
              />
              <img
                src="~@/assets/images/limitCalculationEdit/icon_gouxuan1.png"
                v-if="chooseLi == 1"
                class="check"
              />
              <img
                src="~@/assets/images/limitCalculationEdit/able.png"
                v-if="!personDisable && chooseLi == 0"
                class="check"
              />
              <img
                src="~@/assets/images/limitCalculationEdit/icon_gerenrongzi@2x.png"
                class="typeImg2"
                v-if="!personDisable"
              />
              <img
                src="~@/assets/images/limitCalculationEdit/disableP.png"
                class="typeImg2"
                v-if="personDisable"
              />
              <h2>个人融资</h2>
            </li>
          </ul>
          <p class="textName">
            <span>*</span>{{ selectionObj['MV1001'] && selectionObj['MV1001'].itemName }}
          </p>
          <ul class="sourceUl" v-if="selectionObj['MV1001']">
            <li
              v-for="(item, index) in selectionObj['MV1001'].values"
              :key="index"
              :class="{ active: sourceUlActive == index }"
              @click="chooseSourceUl(index, item)"
            >
              {{ item.text }}
            </li>
          </ul>
          <div v-if="selectionObj['MV1002']">
            <van-field
              v-model="establishmentYear_text"
              name="establishmentYear_text"
              readonly
              class="comFieldInp noBor comSelectInp"
              :label="selectionObj['MV1002'].itemName"
              label-align="top"
              placeholder="请选择"
              @click="showPop('MV1002')"
              :rules="[
                {
                  required: true,
                  message: `请选择${selectionObj['MV1002'].itemName}`
                }
              ]"
            >
            </van-field>
          </div>
          <div v-if="selectionObj['MV1003']">
            <van-field
              v-model="registrationLocation_text"
              name="registrationLocation_text"
              readonly
              class="comFieldInp noBor comSelectInp"
              :label="selectionObj['MV1003'].itemName"
              label-align="top"
              placeholder="请选择"
              @click="showPop('MV1003')"
              :rules="[{ required: true, message: `请选择${selectionObj['MV1003'].itemName}` }]"
            >
            </van-field>
          </div>
          <div v-if="selectionObj['MV1016'] && isShow1016">
            <van-field
              v-model="brandManagement_text"
              name="brandManagement_text"
              readonly
              class="comFieldInp noBor comSelectInp"
              :label="selectionObj['MV1016'].itemName"
              label-align="top"
              placeholder="请选择"
              @click="showPop('MV1016')"
              :rules="[{ required: true, message: `请选择${selectionObj['MV1016'].itemName}` }]"
            >
            </van-field>
          </div>
          <div v-if="selectionObj['MV1017'] && isShow1017">
            <van-field
              v-model="involvingImportExportTrade_text"
              name="involvingImportExportTrade_text"
              readonly
              class="comFieldInp noBor comSelectInp"
              :label="selectionObj['MV1017'].itemName"
              label-align="top"
              placeholder="请选择"
              @click="showPop('MV1017')"
              :rules="[{ required: true, message: `请选择${selectionObj['MV1017'].itemName}` }]"
            >
            </van-field>
          </div>
          <div v-if="selectionObj['MV1018'] && isShow1018">
            <van-field
              v-model="projectType_text"
              name="projectType_text"
              readonly
              class="comFieldInp noBor comSelectInp"
              :label="selectionObj['MV1018'].itemName"
              label-align="top"
              placeholder="请选择"
              @click="showPop('MV1018')"
              :rules="[{ required: true, message: `请选择${selectionObj['MV1018'].itemName}` }]"
            >
            </van-field>
          </div>
        </div>
      </div>
      <van-button
        class="btn"
        round
        block
        type="primary"
        native-type="submit"
        :disabled="isLoading"
        :loading="isLoading"
        loading-text="提交中..."
      >
        提交
      </van-button>
      <!-- <div class="btn" @click="submit">提交</div> -->
    </van-form>
    <van-popup v-model:show="showPicker" round position="bottom" overlay-class="timeSelect">
      <van-picker
        :title="popTit"
        class="comTimePickerC"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<style lang="less" scoped>
.limitCalculationEdit {
  background: url('https://static.dstp.com.cn/img/bg03@2x.png') no-repeat;
  background-size: 100% 826px;
  padding-top: 422px;
  background-color: #abe2ff;
  padding-bottom: 30px;
  background-position: 0 -164px;
  .formBlock {
    width: calc(100% - 32px);
    min-height: 1132px;
    margin: 0 auto 24px;
    .comFormCont {
      .comFieldInp {
        background: transparent;
      }
    }
    .head {
      padding-top: 54px;
      text-align: center;
      background: url(@/assets/images/limitCalculationEdit/bgTop.png) no-repeat;
      background-size: cover;
      width: calc(100% - 32px);
      height: 158px;
      margin-bottom: -18px;
      h2 {
        font-size: 30px;
        color: #ffffff;
        line-height: 42px;
      }
    }
    .cont {
      background: url(@/assets/images/limitCalculationEdit/bg02@2x.png) no-repeat;
      background-size: 100% 100%;
      padding: 70px 52px 100px;
      .typeUl {
        width: 100%;
        padding: 0 20px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 60px;
        li {
          width: 260px;
          height: 236px;
          background: #ffffff;
          box-shadow: 0px 4px 12px 0px rgba(222, 222, 222, 0.5);
          border-radius: 32px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .typeImg {
            width: 94px;
            height: 108px;
            margin-bottom: 16px;
          }
          .typeImg2 {
            width: 94px;
            height: 100px;
            margin-bottom: 18px;
          }
          .check {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 28px;
            height: 28px;
          }
          h2 {
            font-weight: 600;
            font-size: 32px;
            line-height: 44px;
          }
          &.active {
            border: 4px solid #1f66fb;
          }
        }
      }
    }
    .textName {
      font-weight: 600;
      font-size: 24px;
      line-height: 34px;
      margin-bottom: 30px;
      span {
        color: #f5173d;
      }
    }
    .sourceUl {
      padding: 0 28px 40px 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      border-bottom: 2px solid #f1f1f1;
      li {
        width: 272px;
        height: 70px;
        background: #edf4fd;
        font-weight: 600;
        font-size: 26px;
        color: #6b6b6b;
        line-height: 70px;
        border-radius: 36px;
        text-align: center;
        margin-bottom: 20px;
        &.active {
          background: #1f66fb;
          color: #ffffff;
        }
      }
    }
  }
  .btn {
    background: url(@/assets/images/limitCalculationEdit/btn_normal@2x.png) no-repeat;
    background-size: 100%;
    height: 100px;
    line-height: 100px;
    font-weight: 600;
    font-size: 36px;
    color: #ffffff;
    width: calc(100% - 58px);
    margin: 24px 29px 0;
    text-align: center;
    border: none;
  }
}
</style>
