// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    if (typeof window !== 'undefined') {
      const isWechat = /micromessenger/i.test(navigator.userAgent)
      if (isWechat) {
        alert('可能无法加载某些外部资源\n\n建议使用外部浏览器打开\n\n以获得最佳浏览体验')
      }
    }
  },
} satisfies Theme
