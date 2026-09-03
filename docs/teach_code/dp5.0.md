# DrissionPage 5.0 新特性文档
DrissionPage 5.0 完成底层全面重构，新增多项实用能力，涵盖多账号隔离、跨域操作、网络监听、下载、元素定位等核心功能，本文档整理纯新增特性 + 可直接运行代码示例。

## 安装方式
> 5.0 目前为预发布版本，安装命令：
```bash
pip install --pre --upgrade drissionpage
```

---

## 1. 新增独立浏览器上下文（多账号/独立代理）
支持创建多个隔离浏览器上下文，各上下文 **Cookie、代理完全独立**，单浏览器实现多账号并行操作。

```python
from DrissionPage import Chromium

browser = Chromium()

# 给单个上下文独立设置代理（账密代理也支持）
context = browser.new_context()
tab = context.new_tab("https://bing.com/")

context2 = browser.new_context()
tab2 = context2.new_tab("https://www.baidu.com/")

# 上下文常用操作
context.cookies()        # 获取当前上下文Cookie
context.close()          # 关闭上下文及所有标签页

context2.cookies()       # 获取当前上下文Cookie
context2.close()         # 关闭上下文及所有标签页
```

**核心亮点**
- 同一个浏览器实例，多套隔离环境，不用重复启动浏览器
- Cookie、存储、代理互相隔离，非常适合多账号业务
- 支持上下文级别代理配置

---

## 2. 新增跨域 Iframe 直接操作
无需手动获取 iframe 对象，直接通过标签页操作跨域 iframe 元素、监听数据包，原生支持跨域穿透。

```python
from DrissionPage import Chromium

tab = Chromium().latest_tab
tab.get("https://drissionpage.cn/demos/iframe_diff_domain.html")

# 直接获取跨域iframe内元素（无需get_frame）
ele = tab("新闻")
print(ele)
```

**核心亮点**
- 告别复杂的 `get_frame()` 切换操作
- 跨域 iframe 元素直接定位、点击、输入
- 监听网络也可穿透 iframe

---

## 3. 新增 WS/SSE 长连接监听 + 链式监听配置
全新支持 WebSocket、SSE 长连接抓包，监听配置改为链式写法，更简洁灵活，支持精准筛选请求类型。

```python
from DrissionPage import Chromium
from DrissionPage.items import WebSocketPacket
from pprint import pprint

tab = Chromium().latest_tab

# 仅监听GET请求 + WebSocket数据
tab.listen.set_method.GET(only=True)
tab.listen.set_res_type.WebSocket(only=True)
tab.listen.start()

# 访问网页
tab.get("https://wstool.js.org/")
tab.ele('xpath=//input[@placeholder="输入 WebSocket 服务器地址"]').input("wss://echo.websocket.org", clear=True)
tab.wait(0.5)
tab.ele('xpath=//button[normalize-space(.)="开启连接"]').click()

# 获取监听数据
while True:
    res: WebSocketPacket = tab.listen.wait()
    print("------------------------------------")
    print(res)
    info = {
        "data": res.data,
        "url": res.url,
        "resourceType": res.resourceType,
    }
    pprint(info)
```

**核心亮点**
- 原生支持 WebSocket、SSE 长连接数据包捕获
- 链式 API，可按请求方法、资源类型过滤
- 可拿到完整收发数据帧

---

## 4. 新增浏览器全局监听
通过浏览器对象监听所有标签页网络请求，适配多标签页批量抓包场景。

```python
from DrissionPage import Chromium

browser = Chromium()
browser.listen.set_res_type.Image(only=True)  # 仅监听图片资源
browser.listen.start()  # 全局监听所有标签页

tab = browser.new_tab("https://www.baidu.com/")
tab.ele('xpath=//a[@data-name="tjtieba"]').click()

# 遍历所有监听数据
while True:
    data = tab.listen.browser_wait()
    print(data.url)
    print(data.resourceType)
```

**核心亮点**
- 浏览器级别全局监听，所有 tab 的流量都捕获
- 适合多页面批量采集、爬虫批量抓包
- 和 tab 局部监听互不冲突

---

## 5. 新增账密格式代理支持
原生支持 `user:password` 账号密码代理，支持全局浏览器、单上下文两种设置方式。

```python
# 全局代理（所有上下文生效）
from DrissionPage import Chromium, ChromiumOptions

co = ChromiumOptions().set_proxy("http://user:pwd@127.0.0.1:7890")
browser = Chromium(co)

# 单上下文代理（仅当前上下文生效）
browser = Chromium()
context = browser.new_context(proxy="http://user:pwd@127.0.0.1:7890")
```

**核心亮点**
- 原生支持账密代理，不需要额外插件
- 两种粒度：浏览器全局 / 单个上下文隔离代理
- 和多账号上下文搭配使用效果极佳

---

## 6. 新增浏览器主动下载（支持Blob/PDF）
解决 Blob、PDF 无法直接下载问题，支持浏览器原生触发下载，自定义保存路径、重命名、文件冲突策略。

```python
from DrissionPage import Chromium, ChromiumOptions

# 禁用PDF预览，直接下载
co = ChromiumOptions().disable_pdf_preview()
tab = Chromium(co).latest_tab

# 触发浏览器下载
mission = tab.download.by_browser(
    url="目标文件地址",
    save_path="./download",
    rename="新文件名.pdf"
)
mission.wait()  # 等待下载完成
```

**核心亮点**
- 原生处理 blob 链接、pdf 预览拦截下载
- 可自定义保存目录、重命名文件
- 返回下载任务对象，可等待完成、获取状态

---

## 7. 新增鼠标轨迹可视化调试
开启后可实时显示鼠标运动轨迹，快速调试动作链、拖拽、点击异常问题。

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-
from DrissionPage import Chromium, ChromiumOptions

co = ChromiumOptions()
browser = Chromium(co)
tab = browser.latest_tab

tab.get('https://drissionpage.cn/')  # 访问网址
tab.set.show_trail()  # 显示鼠标轨迹
```

**核心亮点**
- 可视化鼠标移动轨迹，方便调试拖拽、hover、点击偏移
- 定位动作失败原因，自动化调试神器

---

# DrissionPage 5.0 新增特性总览表
| 功能 | 说明 |
|---|---|
| 独立浏览器上下文 | 单浏览器多隔离环境，Cookie、代理隔离，多账号 |
| 跨域 Iframe 直接操作 | 无需切换 frame，直接操作跨域 iframe 元素 |
| WS/SSE 长连接监听 | 抓 WebSocket、SSE，链式过滤监听配置 |
| 浏览器全局监听 | 监听浏览器全部标签页网络流量 |
| 账密代理支持 | 支持 user:pwd@ip 格式代理，全局/上下文级别 |
| 浏览器原生下载 | 支持 blob、pdf，自定义路径重命名 |
| 鼠标轨迹可视化 | 可视化鼠标轨迹，调试拖拽点击异常 |

