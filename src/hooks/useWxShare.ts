import { getJsSDKConfigApi } from '@/apis/api'
import { initConfig, setShareInfo } from '@/hooks/useWxSDK'

export function useWxShare(shareConfig: { title: string; imgUrl: string; desc: string }) {
  const shareUrl = window.location.href.split('#')[0]

  getJsSDKConfigApi(shareUrl).then((config) => {
    // 调用后端接口获取config相关信息
    initConfig(config).then(() => {
      // 注入wx.config成功后，设置微信分享相关
      setShareInfo({
        ...shareConfig,
        link: shareUrl
      })
    })
  })
}
