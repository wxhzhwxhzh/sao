# 13. Command Line API

启用 `includeCommandLineAPI: True` 后可用的特殊 API：

```javascript
$()        // document.querySelector()
$$()       // document.querySelectorAll()
$x()       // XPath 查询
inspect()  // 在 DevTools 中检查元素
copy()     // 复制到剪贴板
clear()    // 清除控制台
dir()      // 显示对象属性
dirxml()   // 显示 XML/HTML
keys()     // 对象键数组
values()   // 对象值数组
```