<script setup lang="ts">
import type { FormInstance } from 'vant'
import { ref, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { sendMobileCode, login } from '@/apis/api'
import { useHeaderStore, useUserStore } from '@/stores/index'
import type { LoginParam } from '@/types/index'
import yhxy from './components/yhxy.vue'
import ysxy from './components/ysxy.vue'
let countInterval: number | null = null
const HeaderStore = useHeaderStore()
const UserStore = useUserStore()
const username = ref('')
const router = useRouter()
const route = useRoute()
const authCode = ref('')
const checked = ref(false)
const hasSendCode = ref(false)
const countText = ref('获取验证码')
const isShowYhxy = ref(false)
const isShowYsxy = ref(false)
const formRef = ref<FormInstance>()
const onSubmit = (values: LoginParam) => {
  if (!checked.value) {
    return
  }
  login(values)
    .then((res) => {
      const { data } = res
      if (data.flag == 'SUCCESS' || data.token) {
        UserStore.setUserMessStore(data.userinfo)
        HeaderStore.setHeaderStore({ 'wechat-token': data.token })
        if (route.query.referPage) router.replace({ path: route.query.referPage as string })
      }
    })
    .catch((e) => {
      console.log(e)
    })
}
const getCode = () => {
  if (hasSendCode.value) return
  formRef.value
    ?.validate('username')
    .then(() => {
      // 如果验证通过，执行获取验证码的逻辑
      console.log('验证码已发送')
      sendMobileCode({ mobile: username.value }).then((res) => {
        hasSendCode.value = true
        let time = 60
        countText.value = `${time}s后重发`
        countInterval = setInterval(() => {
          if (time == 1) {
            hasSendCode.value = false
            clearInterval(countInterval!)
            countText.value = `获取验证码 `
          } else {
            time--
            countText.value = `${time}s后重发`
          }
        }, 1000)
        console.log(res.data)
      })
    })
    .catch((error) => {
      // 验证未通过，提示错误信息
      console.log('error', error)
    })
}
const showYhxy = () => {
  isShowYhxy.value = true
}
const showYsxy = () => {
  isShowYsxy.value = true
}
onUnmounted(() => {
  if (countInterval) {
    clearInterval(countInterval)
  }
})
</script>
<template>
  <div class="login">
    <h2 class="tit">欢迎来到</h2>
    <img src="~@/assets/images/login/story_logo@2x.png" class="company" />
    <div class="main">
      <van-form @submit="onSubmit" ref="formRef">
        <van-field
          v-model="username"
          class="fieldInp phoneInp"
          name="username"
          type="number"
          placeholder="请输入手机号"
          maxlength="11"
          :rules="[{ required: true, message: '请输入手机号' }]"
        >
        </van-field>
        <van-field
          v-model="authCode"
          name="authCode"
          class="fieldInp codeInp"
          type="tel"
          placeholder="请输入验证码"
          maxlength="6"
          :rules="[{ required: true, message: '请输入验证码' }]"
        >
          <template #button>
            <div
              class="codeBtn"
              :class="hasSendCode ? 'disableBtn' : ''"
              :disabled="hasSendCode"
              @click="getCode"
            >
              {{ countText }}
            </div>
          </template>
        </van-field>
        <div class="checkWrap">
          <van-checkbox
            shape="square"
            name="checkedFlag"
            v-model="checked"
            :rules="[{ required: true, message: '请勾选协议' }]"
            >已阅读并同意</van-checkbox
          ><span class="xy"
            ><span @click="showYhxy">《用户协议》</span>、<span @click="showYsxy"
              >《隐私政策》</span
            ></span
          >
        </div>
        <div class="comNormalSubBtn" :class="checked ? '' : 'comNormalSubBtnDisabled'">
          <van-button round block type="primary" class="actBtn" native-type="submit">
            提交
          </van-button>
        </div>
        <p class="p">若您没有注册账号，点击登录后系统会自动为您注册。</p>
      </van-form>
    </div>
  </div>
  <!-- 圆角弹窗（底部） -->
  <van-popup
    v-model:show="isShowYhxy"
    :closeable="true"
    round
    position="bottom"
    :style="{ height: '80%' }"
  >
    <yhxy />
  </van-popup>
  <van-popup
    v-model:show="isShowYsxy"
    :closeable="true"
    round
    position="bottom"
    :style="{ height: '80%' }"
  >
    <ysxy />
  </van-popup>
</template>
<style lang="less" scoped>
.login {
  background: url('https://static.dstp.com.cn/img/bg01@2x.png') no-repeat;
  background-size: 100% 866px;
  background-color: #fff;
  background-position: 0 -164px;
  padding-top: 66px;
  padding-bottom: 14px;
  .van-cell:after {
    display: none;
  }
  .company {
    margin: 10px 0 70px 66px;
    width: 446px;
    height: 106px;
  }
  .tit {
    font-weight: 600;
    font-size: 48px;
    color: #001d3f;
    line-height: 66px;
    margin-left: 70px;
  }
  .main {
    background: url(@/assets/images/login/loginBg.png) no-repeat;
    background-size: 100% 1128px;
    width: calc(100% - 32px);
    margin: 0 auto;
    height: 1128px;
    padding: 106px 52px 20px;

    .fieldInp {
      margin-bottom: 40px;
      :deep(.van-field__error-message) {
        font-size: 28px;
        padding-top: 5px;
        line-height: 35px;
        padding-left: 108px;
      }
      :deep(.van-field__body) {
        border-radius: 50px;
        border: 2px solid #dbe5f9;
        padding: 26px 48px 26px 108px;
        font-size: 32px;
        line-height: 44px;
        position: relative;
      }
      &.phoneInp {
        :deep(.van-field__body) {
          &::before {
            content: '';
            display: inline-block;
            width: 32px;
            height: 32px;
            background: url(@/assets/images/login/shouji-2@2x.png) no-repeat;
            background-size: 100%;
            position: absolute;
            left: 54px;
            top: 34px;
          }
        }
      }
      &.codeInp {
        :deep(.van-field__body) {
          &::before {
            flex-shrink: 0;
            content: '';
            display: inline-block;
            width: 32px;
            height: 32px;
            background: url(@/assets/images/login/yanzhengma@2x.png) no-repeat;
            background-size: 100%;
            position: absolute;
            left: 54px;
            top: 34px;
          }
        }
      }
    }
    .p {
      margin-top: 40px;
      text-align: center;
      font-size: 24px;
      color: #8b8b8b;
      line-height: 32px;
    }
    .phoneIcon {
    }
    .codeIcon {
      display: inline-block;
      width: 32px;
      height: 32px;
      background: url(@/assets/images/login/yanzhengma@2x.png) no-repeat;
      background-size: 100%;
    }
    .codeBtn {
      font-size: 28px;
      color: #1f66fb;
      line-height: 40px;
      &.disableBtn {
        color: #8b8b8b;
      }
    }
    :deep(.van-field__label) {
      width: auto;
      display: flex;
      align-items: center;
    }
    .checkWrap {
      display: flex;
      padding-left: 60px;
      font-size: 24px;
      color: #575757;
      line-height: 34px;
      margin-bottom: 148px;
      .xy {
        color: #1f66fb;
      }
    }
    .comNormalSubBtn {
      margin: 0;
      width: 100%;
      .actBtn {
        background: none;
        border: none;
        height: 100px;
        line-height: 100px;
        font-weight: 600;
        font-size: 36px;
      }
    }
  }
}
</style>
