import { fileURLToPath, URL } from 'node:url'
import eslintPlugin from 'vite-plugin-eslint'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
//直接引用会报提示 ts类型检测报错 需要配置
import pxtoViewPort from 'postcss-px-to-viewport'
// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return defineConfig({
    base: './',
    plugins: [
      vue(),
      vueJsx(),
      eslintPlugin({
        cache: false
      })
    ],
    // 配置css 配置postcss 设置px转换
    css: {
      preprocessorOptions: {
        less: {
          math: 'always', // 括号内才使用数学计算
          globalVars: {
            // 全局变量
            mainColor: 'red'
          }
        }
      },
      postcss: {
        plugins: [
          pxtoViewPort({
            // unitToConvert: 'px', // 要转化的单位
            viewportWidth: 750, // UI设计稿的宽度
            unitPrecision: 3 // 转换后的精度，即小数点位数
            // propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
            // viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
            // fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
            // selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
            // minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
            // mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
            // replace: true, // 是否转换后直接更换属性值
            // landscape: false // 是否处理横屏情况
          })
        ]
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: '0.0.0.0', // 或者设置为特定的 IP，比如 '192.168.1.100'
      port: 3000, // 端口号
      open: true // 启动时自动打开浏览器
    }
    // server: {
    //   host: true, // 设置为true，则局域网内部都能访问
    //   port: 3200,
    //   strictPort: true, //为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
    //   open: false,
    //   proxy: {
    //     '/dstp-client/': {
    //       logLevel: 'debug',
    //       target: 'https://dstp-dev.dstp.com.cn',
    //       changeOrigin: true
    //       // rewrite: (path) => path.replace(/^\/dstp-client/, '')
    //     }
    //   }
    // }
  })
}
