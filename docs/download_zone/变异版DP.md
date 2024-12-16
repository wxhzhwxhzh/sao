# 👹变异版Drissionpage

> 代码仓库 https://gitee.com/haiyang0726/saodrissionpage 



## 变异1.所见即所得的语法定位
```

#!/usr/bin/env python
# -*- coding:utf-8 -*-
#-导入库
from DrissionPage import Chromium
# 导入变异版本DrissionPage的tab
from SaoDrissionPage import SaoTab 


# 创建页面对象
tab = Chromium().latest_tab
# 访问网页-
tab.get("https://www.baidu.com/")


# 开启变异版本的tab
tab=SaoTab(tab)


# 变异特性1.所见即所得的语法定位
输入框=tab.ele('tag:input@@id=kw')
搜索按钮=tab.ele('<input type="submit" value="百度一下" id="su" >')
```

## 变异2.完全模拟人类行为动作的动作链

```



tab.human_actions.move_to(输入框).click().type('床前明月光，疑是地上霜')
搜索按钮.click()

```

## 变异3.彻底模仿移动端  动态变换
```
# 变异特性3.彻底模仿移动端  动态变换
tab.mobile_mode(True)

# 访问网页-
tab.wait(1)
tab.get("https://www.baidu.com/")


移动端输入框=tab.ele('<input type="search" autocorrect="off"  id="index-kw" >')
移动端搜索按钮=tab.ele('<button id="index-bn" class="se-bn " type="submit">百度一下</button>')
tab.human_actions.move_to(移动端输入框).click().type('床前明月光，疑是地上霜')
移动端搜索按钮.click()



input("按任意键退出")

```

-  更多炸裂更新中... 关注  骚神网  https://wxhzhwxhzh.github.io/sao/  关注bilibili  视频号加粉丝一键三连

- 变异特性1.所见即所得的语法定位
- 变异特性2.完全模拟人类行为动作的动作链
- 变异特性3.彻底模仿移动端  动态变换
- 后续版本的新变异特性
-  动态切换IP代理 支持账号密码 登录    tab.change_proxy()
-  自动识别验证码  自动识别拼图验证码 和 滑动验证码 和 数字验证码     tab.auto_captcha() 
-  按照数据类型进行分类的数据监听 和 全浏览器数据监听 tab.data_listener()  browser.data_listener()    