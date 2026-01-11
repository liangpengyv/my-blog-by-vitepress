import { defineConfig } from 'vitepress'
import markdownItTaskCheckbox from 'markdown-it-task-checkbox'

export default defineConfig({
  title: '老梁有墨',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/avatar.png' }]],

  vite: {
    server: {
      host: true,
    },
  },

  srcDir: 'src',
  cleanUrls: true,
  sitemap: {
    hostname: 'https://www.laoliang.ink/',
  },

  markdown: {
    config: (md) => {
      md.use(markdownItTaskCheckbox)
    },
  },

  themeConfig: {
    nav: [
      { text: '归档', link: '/archives/index', activeMatch: '/archives/' },
      // { text: '分类', link: '/categories/index', activeMatch: '/categories/' },
      // { text: '标签', link: '/tags/index', activeMatch: '/tags/' },
      { text: '读书', link: '/books/index', activeMatch: '/books/' },
      { text: '关于', link: '/about/index', activeMatch: '/about/' },
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文章',
            buttonAriaLabel: '搜索文章',
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            displayDetails: '显示详细列表',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    logo: '/avatar.png',
    socialLinks: [
      // {
      //   icon: {
      //     svg: '<svg height="512px" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M119.9,336.1c-30.8,0-55.9,25.1-55.9,55.8c0,30.8,25.1,55.6,55.9,55.6c30.9,0,55.9-24.9,55.9-55.6   C175.8,361.2,150.8,336.1,119.9,336.1z"/><path d="M64,192v79.9c48,0,94.1,14.2,128,48.1c33.9,33.9,48,79.9,48,128h80C320,308.1,204,192,64,192z"/><path d="M64,64v79.9c171,0,303.9,133,303.9,304.1H448C448,236.3,276,64,64,64z"/></g></svg>',
      //   },
      //   link: '/atom.xml',
      // },
      {
        icon: {
          svg: '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M256 352c-16.53 0-33.06-5.422-47.16-16.41L0 173.2V400C0 426.5 21.49 448 48 448h416c26.51 0 48-21.49 48-48V173.2l-208.8 162.5C289.1 346.6 272.5 352 256 352zM16.29 145.3l212.2 165.1c16.19 12.6 38.87 12.6 55.06 0l212.2-165.1C505.1 137.3 512 125 512 112C512 85.49 490.5 64 464 64h-416C21.49 64 0 85.49 0 112C0 125 6.01 137.3 16.29 145.3z"/></svg>',
        },
        link: 'mailto:me@laoliang.ink',
      },
      {
        icon: 'github',
        link: 'https://github.com/liangpengyv',
      },
      {
        icon: 'bilibili',
        link: 'https://space.bilibili.com/222021151',
      },
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
