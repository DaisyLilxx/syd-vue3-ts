// 1. 引入你需要的组件
import {
  Button,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Form,
  Field,
  Checkbox,
  Picker,
  Popup,
  Toast,
  Cell,
  CellGroup,
  Loading,
  Icon,
  Sticky
} from 'vant'

import Vconsole from 'vconsole'

// 2. 引入组件样式
import 'vant/lib/index.css'
import './assets/main.css'
import './assets/css/common.less'
import { createApp } from 'vue'
import pinia from '@/stores/index' // 引入pinia状态管理库

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(Cell)
app.use(Sticky)
app.use(Loading)
app.use(CellGroup)
app.use(Tab)
app.use(Tabs)
app.use(Icon)
app.use(Toast)
app.use(Picker)
app.use(Button)
app.use(Tabbar)
app.use(Form)
app.use(Field)
app.use(Checkbox)
app.use(TabbarItem)
app.use(Popup)
app.use(router)

app.mount('#app')
console.log('import.meta.env.VITE_APP_BASE_URL-aa', import.meta.env.VITE_APP_BASE_URL)
if (
  import.meta.env.VITE_APP_BASE_URL == 'https://dstp-dev.dstp.com.cn' ||
  import.meta.env.VITE_APP_BASE_URL == 'https://dstp-fat.dstp.com.cn'
) {
  // 测试和开发打开，生产不能打开
  new Vconsole()
}
const userAgent = navigator.userAgent.toLowerCase()
if (userAgent.includes('miniprogram')) {
  window.localStorage.setItem('weixinChat', 'true')
} else window.localStorage.setItem('weixinChat', 'false')
