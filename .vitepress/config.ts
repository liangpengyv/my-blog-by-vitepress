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
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m3.55 13.8l-4.08-2.51c-.3-.18-.48-.5-.48-.85V7.75c.01-.41.35-.75.76-.75s.75.34.75.75v4.45l3.84 2.31c.36.22.48.69.26 1.05c-.22.35-.69.46-1.05.24"/></svg>',
        },
        link: '/clock',
      },
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M15 7.29V3c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v4.29c0 .13.05.26.15.35l2.5 2.5c.2.2.51.2.71 0l2.5-2.5c.09-.09.14-.21.14-.35M7.29 9H3c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h4.29c.13 0 .26-.05.35-.15l2.5-2.5c.2-.2.2-.51 0-.71l-2.5-2.5A.48.48 0 0 0 7.29 9M9 16.71V21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-4.29a.47.47 0 0 0-.15-.35l-2.5-2.5c-.2-.2-.51-.2-.71 0l-2.5 2.5c-.09.09-.14.21-.14.35m7.35-7.56l-2.5 2.5c-.2.2-.2.51 0 .71l2.5 2.5c.09.09.22.15.35.15H21c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1h-4.29a.45.45 0 0 0-.36.14"/></svg>',
        },
        link: '/adrift',
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
