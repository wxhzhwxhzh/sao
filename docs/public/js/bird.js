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
const overlay = $('<div>').css({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    cursor: 'pointer' // 点击遮罩层关闭
});

// 创建用于显示大图的元素
const overlayImage = $('<img>').css({
    maxWidth: '90%',
    maxHeight: '90%'
});
overlay.append(overlayImage);

// 将遮罩层添加到 body 中
$('body').append(overlay);

// 使用事件委托来处理图片点击
$('body').on('click', 'img', function (event) {
    // 获取点击的图片的原始大小
    const imageSrc = $(this).attr('src');

    // 设置遮罩层中的大图
    overlayImage.attr('src', imageSrc);

    // 显示遮罩层
    overlay.css('display', 'flex');
});

// 关闭遮罩层的函数
overlay.on('click', function () {
    $(this).css('display', 'none');
});
