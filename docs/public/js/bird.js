function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    console.log(dateTimeString);
    console.log("骚神网站已成功加载..");
}

// 调用函数以获取当前日期和时间
getCurrentDateTime();


//  用事件委托的方法  点击图片  放大图片  点击遮罩层  关闭图片
// 创建遮罩层
const overlay = document.createElement('div');
overlay.style.position = 'fixed';
overlay.style.top = 0;
overlay.style.left = 0;
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
overlay.style.display = 'none';
overlay.style.justifyContent = 'center';
overlay.style.alignItems = 'center';
overlay.style.zIndex = 1000;
overlay.style.cursor = 'pointer'; // 点击遮罩层关闭

// 创建用于显示大图的元素
const overlayImage = document.createElement('img');
overlayImage.style.maxWidth = '90%';
overlayImage.style.maxHeight = '90%';
overlay.appendChild(overlayImage);

// 将遮罩层添加到 body 中
document.body.appendChild(overlay);

// 使用事件委托来处理图片点击
document.body.addEventListener('click', function (event) {
    // 确保点击的是图片元素
    if (event.target.tagName === 'IMG') {
        // 获取点击的图片的原始大小
        const imageSrc = event.target.src;

        // 设置遮罩层中的大图
        overlayImage.src = imageSrc;

        // 显示遮罩层
        overlay.style.display = 'flex';
    }
});

// 关闭遮罩层的函数
overlay.addEventListener('click', function () {
    overlay.style.display = 'none';
});
