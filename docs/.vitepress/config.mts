import { defineConfig } from 'vitepress';
import { nav } from './configs';
import { sidebar } from './configs';

export default defineConfig({
  base: '/',
  title: '橙黄橘绿',
  description: '记录学习笔记，分享技术文章。',
  lastUpdated: true,
  appearance: false,
  ignoreDeadLinks: true,
  //markdown配置
  markdown: {
    image: {
      lazyLoading: true,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    //手机端深浅模式文字修改
    darkModeSwitchLabel: '深浅模式',
    //返回顶部文字修改
    returnToTopLabel: '返回顶部',
    nav,
    sidebar,
    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2019-${new Date().getFullYear()} present xia`,
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '重置搜索',
            footer: {
              selectText: '选择',
              navigateText: '切换',
            },
          },
        },
      },
    },
  },
});
