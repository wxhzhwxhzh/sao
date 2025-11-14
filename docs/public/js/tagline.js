fetch('https://v1.hitokoto.cn/?max_length=35')
  .then(r => r.json())
  .then(data => {
    const element = document.querySelector('.tagline');
    element && (element.innerText = `『${data.hitokoto}』—— ${data.creator} 《${data.from}》`);
    console.log(data)
  })
  .catch(e => console.error('请求失败：', e));