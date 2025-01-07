import { defineConfig } from 'vitepress'
import markdownItTaskCheckbox from 'markdown-it-task-checkbox'

export default defineConfig({
  title: '老梁有墨',
  description: 'A VitePress Site',

  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/avatar.png' }]],

  srcDir: 'src',
  cleanUrls: true,
  markdown: {
    config: (md) => {
      md.use(markdownItTaskCheckbox)
    },
  },

  themeConfig: {
    nav: [
      { text: '归档', link: '/archives/index', activeMatch: '/archives/' },
      { text: '分类', link: '/categories/index', activeMatch: '/categories/' },
      { text: '标签', link: '/tags/index', activeMatch: '/tags/' },
      { text: '关于', link: '/about/index', activeMatch: '/about/' },
    ],

    logo: '/avatar.png',
    socialLinks: [
      { icon: 'rss', link: '/atom.xml' },
      { icon: 'email', link: 'mailto:me@laoliang.ink' },
      { icon: 'github', link: 'https://github.com/liangpengyv' },
      { icon: 'bilibili', link: 'https://space.bilibili.com/222021151' },
    ],
    footer: {
      copyright: `版权所有 © 2015 - ${new Date().getFullYear()} By <a href="/about/" style="text-decoration: none">老梁</a><br /><a href="http://beian.miit.gov.cn/" target="__blank" style="text-decoration: none">蜀ICP备18017114号-1</a>`,
      message: '',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    outline: {
      label: '页面导航',
    },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
})
