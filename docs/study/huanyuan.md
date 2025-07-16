# 包管理工具临时更换源指南

本文档介绍了 pip、apt、docker、npm 四个常用包管理工具临时更换国内镜像源的方法。

## pip 临时更换源

### 使用方法

```bash
# 使用清华源
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ package_name

# 使用阿里源
pip install -i https://mirrors.aliyun.com/pypi/simple/ package_name

# 使用中科大源
pip install -i https://pypi.mirrors.ustc.edu.cn/simple/ package_name
```

### 示例

```bash
# 安装 numpy
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ numpy

# 升级 pip
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ --upgrade pip
```

## apt 临时更换源

### 方法一：临时修改 sources.list

```bash
# 备份原配置文件
sudo cp /etc/apt/sources.list /etc/apt/sources.list.backup

# 替换为清华源
sudo sed -i 's/archive.ubuntu.com/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list

# 更新包列表
sudo apt update

# 用完后恢复原配置
sudo cp /etc/apt/sources.list.backup /etc/apt/sources.list
```

### 方法二：使用 -o 选项指定源

```bash
sudo apt-get -o Acquire::http::proxy="http://mirrors.tuna.tsinghua.edu.cn/ubuntu/" update
```

## npm 临时更换源

### 方法一：使用 --registry 参数

```bash
# 使用淘宝源安装包
npm install --registry https://registry.npmmirror.com package_name

# 使用中科大源
npm install --registry https://npmreg.proxy.ustclug.org/ package_name

# 使用腾讯云源
npm install --registry https://mirrors.cloud.tencent.com/npm/ package_name
```

### 方法二：临时设置配置

```bash
# 查看当前源
npm config get registry

# 临时设置淘宝源
npm config set registry https://registry.npmmirror.com

# 安装包（会使用设置的源）
npm install package_name

# 恢复默认源
npm config set registry https://registry.npmjs.org/
```

### 方法三：使用 nrm 工具管理源

```bash
# 全局安装 nrm
npm install -g nrm --registry https://registry.npmmirror.com

# 查看可用源
nrm ls

# 切换到淘宝源
nrm use taobao

# 切换回官方源
nrm use npm

# 测试源速度
nrm test
```

### 方法四：使用 .npmrc 文件

```bash
# 在项目根目录创建 .npmrc 文件
echo "registry=https://registry.npmmirror.com" > .npmrc

# 安装依赖（会使用 .npmrc 中的配置）
npm install

# 删除 .npmrc 文件恢复默认
rm .npmrc
```

### yarn 换源方法

```bash
# 查看当前源
yarn config get registry

# 临时设置淘宝源
yarn config set registry https://registry.npmmirror.com

# 安装包
yarn add package_name

# 恢复默认源
yarn config set registry https://registry.yarnpkg.com
```

## Docker 临时更换源

### 方法一：临时修改 daemon.json

```bash
# 创建 docker 配置目录
sudo mkdir -p /etc/docker

# 写入镜像源配置
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
EOF

# 重启 Docker 服务
sudo systemctl restart docker
```

### 方法二：单次拉取时指定镜像源

```bash
# 从阿里云拉取 Ubuntu 镜像
docker pull registry.cn-hangzhou.aliyuncs.com/library/ubuntu:latest

# 从网易云拉取 nginx 镜像
docker pull hub-mirror.c.163.com/library/nginx:latest
```

### 方法三：设置环境变量（临时）

```bash
export DOCKER_REGISTRY_MIRROR=https://docker.mirrors.ustc.edu.cn
```

## 常用国内镜像源汇总

### Python PyPI 镜像源

| 源名称 | 镜像地址 |
|--------|----------|
| 清华大学 | https://pypi.tuna.tsinghua.edu.cn/simple/ |
| 阿里云 | https://mirrors.aliyun.com/pypi/simple/ |
| 中科大 | https://pypi.mirrors.ustc.edu.cn/simple/ |
| 豆瓣 | https://pypi.douban.com/simple/ |
| 华为云 | https://mirrors.huaweicloud.com/repository/pypi/simple/ |

### Ubuntu APT 镜像源

| 源名称 | 镜像地址 |
|--------|----------|
| 清华大学 | mirrors.tuna.tsinghua.edu.cn |
| 阿里云 | mirrors.aliyun.com |
| 中科大 | mirrors.ustc.edu.cn |
| 华为云 | mirrors.huaweicloud.com |
| 网易 | mirrors.163.com |

### npm/yarn 镜像源

| 源名称 | 镜像地址 |
|--------|----------|
| 淘宝 NPM 镜像 | https://registry.npmmirror.com |
| 中科大 | https://npmreg.proxy.ustclug.org/ |
| 腾讯云 | https://mirrors.cloud.tencent.com/npm/ |
| 华为云 | https://mirrors.huaweicloud.com/repository/npm/ |
| 官方源 | https://registry.npmjs.org/ |

### Docker 镜像源

| 源名称 | 镜像地址 |
|--------|----------|
| 中科大 | https://docker.mirrors.ustc.edu.cn |
| 网易云 | https://hub-mirror.c.163.com |
| 百度云 | https://mirror.baidubce.com |
| 阿里云 | https://registry.cn-hangzhou.aliyuncs.com |
| 腾讯云 | https://mirror.ccs.tencentyun.com |

## 注意事项

1. **临时性**：以上所有方法都是临时的，重启服务或重新打开终端后会恢复默认设置。

2. **备份配置**：在修改配置文件前，建议先备份原文件，以便出现问题时快速恢复。

3. **网络环境**：选择镜像源时，建议选择地理位置相近的源，通常速度会更快。

4. **可用性**：镜像源的可用性可能会发生变化，如果某个源无法访问，可以尝试其他源。

5. **权限问题**：修改系统配置文件需要 root 权限，请确保有足够的权限执行相关命令。

## 快速选择建议

- **教育网用户**：推荐使用清华、中科大等教育网镜像源
- **企业用户**：推荐使用阿里云、华为云等商业镜像源
- **个人用户**：可以根据网络情况选择速度最快的源
- **Node.js 开发者**：推荐使用淘宝 NPM 镜像或 nrm 工具管理多个源

## 常用命令速查

### 一键设置常用源

```bash
# Python pip 设置淘宝源
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/

# npm 设置淘宝源
npm config set registry https://registry.npmmirror.com

# yarn 设置淘宝源
yarn config set registry https://registry.npmmirror.com
```

### 一键恢复默认源

```bash
# pip 恢复默认源
pip config unset global.index-url

# npm 恢复默认源
npm config set registry https://registry.npmjs.org/

# yarn 恢复默认源
yarn config set registry https://registry.yarnpkg.com
```