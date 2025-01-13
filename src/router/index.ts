import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition // 返回保存的滚动位置
    } else {
      return { top: 0 } // 跳转时滚动到顶部
    }
  },
  routes: [
    {
      path: '/',
      redirect: (to) => {
        return '/index'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/index/index.vue')
    },
    {
      path: '/tabIndex',
      name: 'tabIndex',
      component: () => import('../views/tabIndex/index.vue')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('../views/my/my.vue')
    },
    {
      // 额度测算-基本信息填写
      path: '/limitCalculationEdit',
      name: 'limitCalculationEdit',
      component: () => import('../views/limitCalculation/limitCalculationEdit.vue')
    },
    {
      // 匹配产品
      path: '/productList',
      name: 'productList',
      component: () => import('../views/productList/productList.vue')
    },
    {
      // 匹配产品详情
      path: '/productDetail',
      name: 'productDetail',
      component: () => import('../views/productList/productDetail.vue')
    },
    {
      // 登陆
      path: '/login',
      name: 'login',
      component: () => import('../views/login/login.vue')
    },
    {
      // 完善资料-额度预测
      path: '/completeMess',
      name: 'completeMess',
      component: () => import('../views/completeMess/completeMess.vue')
    },
    {
      // 融资额度预测结果页
      path: '/result',
      name: 'result',
      component: () => import('../views/result/result.vue')
    },
    {
      // 测额记录
      path: '/resultList',
      name: 'resultList',
      component: () => import('../views/result/resultList.vue')
    },
    {
      // 客服
      path: '/customerService',
      name: 'customerService',
      component: () => import('../views/customerService/customerService.vue')
    },
    {
      // 数据采集工具
      path: '/dataAcquisition',
      name: 'dataAcquisition',
      component: () => import('../views/dataAcquisition/index.vue')
    },
    {
      // 数据管理可视链服务
      path: '/dataManage',
      name: 'dataManage',
      component: () => import('../views/dataManage/index.vue')
    },
    {
      // 企业数据运营控制塔
      path: '/dataOperations',
      name: 'dataOperations',
      component: () => import('../views/dataOperations/index.vue')
    },
    {
      // 融资数据集成服务
      path: '/dataIntegration',
      name: 'dataIntegration',
      component: () => import('../views/dataIntegration/index.vue')
    },
    {
      // 客服
      path: '/tabCustomerService',
      name: 'tabCustomerService',
      component: () => import('../views/tabCustomerService/index.vue')
    }
  ]
})

export default router
