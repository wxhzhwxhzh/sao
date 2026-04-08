
// 访问量统计
const observer = new MutationObserver((mutations, obs) => {
  const link = document.querySelector('a.title');
  if (link) {
    const img = Object.assign(document.createElement('img'), {
      src: 'https://visitor-badge.laobi.icu/badge?page_id=wxhzhwxhzh.sao',
      style: 'margin-left: 3px; vertical-align: middle;'
    });
    link.appendChild(img);
    console.log('访问量统计添加成功');
    obs.disconnect(); // 停止监听，防止重复添加
  }
});

// 开始监听整个文档
observer.observe(document.body, { childList: true, subtree: true });

// 随机言
fetch('https://v1.hitokoto.cn/?max_length=35')
  .then(r => r.json())
  .then(data => {
    const element = document.querySelector('.tagline');
    element && (element.innerText = `『${data.hitokoto}』—— ${data.creator} 《${data.from}》`);
    console.log(data)
  })
  .catch(e => console.error('请求失败：', e));