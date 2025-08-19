import { defineConfig } from 'vitepress';
import { svgs } from './m/svgs.js';
import { head_config } from './m/head.js';
import { nav_config } from './m/nav.js';
import { sidebar_config } from './m/sidebar.js';
import { search_config } from './m/search.js';

// 主题配置
const theme_config={
    logo: './fav2.png',
    nav: nav_config,
    sidebar: sidebar_config,
    // 设置搜索框的样式
    search: search_config,

    socialLinks: [
      { icon: { svg: svgs.gitee }, link: 'https://github.com/vuejs/vitepress' },
      { icon: { svg: svgs.bilibili }, link: 'https://space.bilibili.com/48179703' },
    ],
    footer: {
      message: '一个专门教学新手Drissionpage的网站.',
      copyright: 'Copyright © 2023-saossionpage'
    },
    markdown: {
      theme: {
        light: 'min-light',
        dark: 'one-dark-pro'
      },
      image: {
        lazyLoading: true
      },
      lineNumbers: true,
    },
  }


// 网站配置
export default defineConfig({
  // base需要改成github仓库名
  base: "/sao/",
  title: "骚神网站",
  description: "Asao VitePress Site",
  head: head_config,
  ignoreDeadLinks: true,  
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: theme_config,
});
