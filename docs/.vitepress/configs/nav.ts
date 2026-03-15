/* configs/nav.ts */
import type { DefaultTheme } from 'vitepress';

export const nav: DefaultTheme.Config['nav'] = [
  { text: '首页', link: '/' },
  { text: '标签', link: '/content/tags/' },
  { text: '归档', link: '/archive/' },
  { text: '导航', link: '/nav/' },
  {
    text: '学习笔记',
    items: [
      {
        text: '前端',
        link: '/content/biji/frontend/',
      },
      {
        text: '后端',
        link: '/content/biji/backend/',
      },
      {
        text: '设计模式',
        link: '/content/biji/design-patterns/',
      },
      {
        text: '文档搭建',
        link: '/content/biji/doc-build/',
      },
      {
        text: '手写Vue源码',
        link: '/content/biji/vue/',
      },
    ],
  },
  { text: '记录', link: '/content/shiyi/' },
  // { text: '剪影', link: '/about/' },
];
