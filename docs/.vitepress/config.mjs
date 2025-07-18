import { defineConfig } from 'vitepress'
const svgs = {
  bilibili: '<svg t="1733806613970" class="icon" viewBox="0 0 1129 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4272" width="200" height="200"><path d="M234.909 9.656a80.468 80.468 0 0 1 68.398 0 167.374 167.374 0 0 1 41.843 30.578l160.937 140.82h115.07l160.936-140.82a168.983 168.983 0 0 1 41.843-30.578A80.468 80.468 0 0 1 930.96 76.445a80.468 80.468 0 0 1-17.703 53.914 449.818 449.818 0 0 1-35.406 32.187 232.553 232.553 0 0 1-22.531 18.508h100.585a170.593 170.593 0 0 1 118.289 53.109 171.397 171.397 0 0 1 53.914 118.288v462.693a325.897 325.897 0 0 1-4.024 70.007 178.64 178.64 0 0 1-80.468 112.656 173.007 173.007 0 0 1-92.539 25.75h-738.7a341.186 341.186 0 0 1-72.421-4.024A177.835 177.835 0 0 1 28.91 939.065a172.202 172.202 0 0 1-27.36-92.539V388.662a360.498 360.498 0 0 1 0-66.789A177.03 177.03 0 0 1 162.487 178.64h105.414c-16.899-12.07-31.383-26.555-46.672-39.43a80.468 80.468 0 0 1-25.75-65.984 80.468 80.468 0 0 1 39.43-63.57M216.4 321.873a80.468 80.468 0 0 0-63.57 57.937 108.632 108.632 0 0 0 0 30.578v380.615a80.468 80.468 0 0 0 55.523 80.469 106.218 106.218 0 0 0 34.601 5.632h654.208a80.468 80.468 0 0 0 76.444-47.476 112.656 112.656 0 0 0 8.047-53.109v-354.06a135.187 135.187 0 0 0 0-38.625 80.468 80.468 0 0 0-52.304-54.719 129.554 129.554 0 0 0-49.89-7.242H254.22a268.764 268.764 0 0 0-37.82 0z m0 0" fill="#20B0E3" p-id="4273"></path><path d="M348.369 447.404a80.468 80.468 0 0 1 55.523 18.507 80.468 80.468 0 0 1 28.164 59.547v80.468a80.468 80.468 0 0 1-16.094 51.5 80.468 80.468 0 0 1-131.968-9.656 104.609 104.609 0 0 1-10.46-54.719v-80.468a80.468 80.468 0 0 1 70.007-67.593z m416.02 0a80.468 80.468 0 0 1 86.102 75.64v80.468a94.148 94.148 0 0 1-12.07 53.11 80.468 80.468 0 0 1-132.773 0 95.757 95.757 0 0 1-12.875-57.133V519.02a80.468 80.468 0 0 1 70.007-70.812z m0 0" fill="#20B0E3" p-id="4274"></path></svg>',
  gitee: '<svg t="1733806856930" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5238" width="200" height="200"><path d="M512 1021.72444445A509.72444445 509.72444445 0 1 1 512 2.27555555a509.72444445 509.72444445 0 0 1 0 1019.4488889z m257.99338667-566.37667556H480.54272a25.19495111 25.19495111 0 0 0-25.19495111 25.19495111v62.91456c0 13.90819555 11.28675555 25.19495111 25.12213333 25.19495111h176.21902223c13.98101333 0 25.19495111 11.28675555 25.1949511 25.12213334v12.59747555c0 41.72458667-33.78744889 75.51203555-75.51203555 75.51203555H367.23825778a25.19495111 25.19495111 0 0 1-25.12213333-25.12213333V417.62816c0-41.72458667 33.78744889-75.51203555 75.43921777-75.51203555h352.43804445c13.83537778 0 25.12213333-11.28675555 25.12213333-25.19495112v-62.91456a25.19495111 25.19495111 0 0 0-25.12213333-25.19495111h-352.43804445a188.74368 188.74368 0 0 0-188.74368 188.81649778v352.36522667c0 13.90819555 11.28675555 25.19495111 25.19495111 25.19495111h371.22503112a169.88387555 169.88387555 0 0 0 169.95669333-169.88387556V480.54272a25.19495111 25.19495111 0 0 0-25.19495111-25.19495111z" fill="#C71D23" p-id="5239"></path></svg>',

}
// 网页头部配置
const head_config = [
  ['link', { rel: 'icon', href: './fav2.png' }],
  ['script', { src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js' }],
  ['script', { src: './js/bird.js' }],
];


// 导航栏配置
const nav_config = [
  { text: '🏡Home', link: '/' },
  {
    text: '🍎骚神插件',
    items: [
      { text: '🥒使用手册', link: '/dp_helper/基本用法' },
      { text: '👑VIP版本', link: '/dp_helper/下载安装' },
      { text: '🙂免费版本(7.9)', link: '/dp_helper/下载安装' },
      { text: '插件实用手册最新版', link: 'https://docs.qq.com/aio/p/sc4xdbyayxdf36f?p=CDNmOdRjNMOM5hGBSjJQ2X' },
    ]
  },
  { text: '源码', link: '/teach_code/实战代码' },
  { text: '下载', link: '/download_zone/下载专区' },
  { text: '法宝', link: '/download_zone/法宝专区' },
  { text: '变异骚神库', link: '/download_zone/变异版DP' },
  { text: '程序员手册', link: 'http://8.152.211.132:9667/index.html' },
  {
    text: '💋传送点',
    items: [
      { text: '0.🌏️全能导航', link: '/public/hao123' },
      { text: '1.DP官网', link: 'http://drissionpage.cn/' },
      { text: '2.🐛虫盒', link: 'https://spiderbox.cn/' },
      { text: '3.vitpress教学', link: 'https://docs.bugdesigner.cn/docs/Tutorial/vitepress.html' },
      { text: '4.CurlConverter', link: 'https://curlconverter.com/' },
      { text: '5.骚神博客', link: 'https://wxhzhwxhzh.github.io/saossion_code_helper_online/' },
      { text: '6.😀Emoji大全', link: 'https://emoji6.com/emojiall/' },
      { text: '7.MD文件编辑', link: 'https://www.bejson.com/md/' },
      { text: '8.浏览器插件旧文档', link: 'https://wxhzhwxhzh.github.io/dp_helper_doc/' },
      { text: '9.CDP 文档', link: 'https://chromedevtools.github.io/devtools-protocol/' },
      { text: '10.菜鸟编程导航', link: 'https://cainiao-coder.com/' },
      { text: '11.浏览器插件博客', link: 'https://wxhzhwxhzh.github.io/dp_helper_doc/' },
      { text: '12.爬虫工具库', link: 'https://spidertools.cn/#/' },
      { text: '13.爬虫靶场', link: 'https://scrape.center/' },
      { text: '14.指纹检测', link: 'https://bot.sannysoft.com/' },
      { text: '15.JSON4U 在线编辑器', link: 'https://json4u.cn/editor' },
      { text: '16.DrissionPage工具库', link: 'https://wxhzhwxhzh.github.io/dptool' },
      { text: '17.腾讯文档插件手册', link: 'https://docs.qq.com/aio/p/sc4xdbyayxdf36f?p=CDNmOdRjNMOM5hGBSjJQ2X' },
      { text: '18.JSON可视化', link: 'https://jsoncrack.com/editor' },
      { text: '19.WebSocket在线测试', link: 'http://www.websocket-test.com/' },
      { text: '20.x-cmd', link: 'https://cn.x-cmd.com/' },
      { text: '21.DrissionPage代码启动助手', link: 'https://wxhzhwxhzh.github.io/dpcode/' },
      
    ]
  },
  {
    text: '其他',
    items: [

      { text: '凡人修仙传', link: 'https://www.bilibili.com/bangumi/play/ss28747?spm_id_from=333.337.0.0' },
      { text: '牧神记', link: 'https://www.bilibili.com/bangumi/play/ss45969?spm_id_from=333.337.0.0' },
      { text: 'newsNow', link: 'https://newsnow.busiyi.world/' },
      { text: 'Linux换源', link: 'https://linuxmirrors.cn/other/' },
      { text: '爱壹帆排行榜', link: 'https://www.iyf.tv/rank/all' },
      { text: 'RunWeb', link: 'https://uiwjs.github.io/react-run-web/' },
      { text: 'github rank', link: 'https://wangchujiang.com/github-rank/trending.html' },
      { text: 'chrome插件官方文档', link: 'https://developer.chrome.com/docs/extensions?hl=zh-cn' },
      { text: '换源教程', link: '/study/huanyuan.md' },
      { text: ' LibreTV', link: 'http://8.152.211.132:8989/' },

    ]
  }

];

//侧边栏配置

const sidebar_config=[

  {
    text: '骚神插件使用说明',
    items: [
      { text: '基本用法', link: '/dp_helper/基本用法' },
      { text: '高级用法', link: '/dp_helper/高阶用法' },
      { text: 'VIP版本用法', items: [
        { text: '🐵万能复制', link: '/dp_helper/万能复制/万能复制.md' },
        { text: '🦨元素筛选', link: '/dp_helper/元素筛选/元素筛选器' },
        { text: '🦓逆向助手', link: '/dp_helper/逆向助手/逆向助手' },
        { text: '🐭键鼠记录器', link: '/dp_helper/键鼠记录/键鼠记录器' },
        { text: '🦔文档速查', link: '/dp_helper/文档速查/文档速查.md' },
  
      ] },
    ]
  },
  {
    text: '骚神插件安装下载',
    items: [
      { text: '下载', link: '/dp_helper/下载安装' },
      { text: '安装', link: '/dp_helper/下载安装' },

    ]
  },
  {
    text: '下载专区',
    items: [
      { text: '🦜下载专区', link: '/download_zone/下载专区' },
      { text: '🗡️法宝专区', link: '/download_zone/法宝专区' },


    ]
  },
  {
    text: '实战代码',
    items: [
      { text: '🐳骚神课源码', link: '/teach_code/实战代码' },
    ]
  },
];


// 搜索框配置
const search_config = {
  provider: 'local',
  options: {
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档',
      },
      modal: {
        noResultsText: '无法找到相关结果',
        resetButtonTitle: '清除查询条件',
        footer: {
          selectText: '选择',
          navigateText: '切换',
        },
      },
    },
  },
};



// 网站配置
var config = {
  base: "/sao/",
  title: "骚神网站",
  description: "Asao VitePress Site",

  // https://vitepress.dev/reference/default-theme-config
  head: head_config,
  
  themeConfig: {
    logo: './fav2.png',
    nav:nav_config,
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
}

// https://vitepress.dev/reference/site-config
export default defineConfig(config);
