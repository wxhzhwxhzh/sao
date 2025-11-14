fetch('https://v1.hitokoto.cn/?max_length=35')
  .then(r => r.json())
  .then(d => {
    const element = document.querySelector('.tagline');
    element && (element.innerText = `『${d.hitokoto}』—— ${d.creator} 《${d.from}》`);
  })
  .catch(e => console.error('请求失败：', e));