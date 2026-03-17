# 常用命令集锦（带注释版，直接复制可用）

## GitHub 加速
```bash
# GitHub 加速地址导航
https://ghproxy.link/

# aria2c 多线程下载 GitHub 文件，-x16 -s16 为最大线程加速
aria2c -x 16 -s 16 -k 1M https://ghfast.top/https://github.com/Loyalsoldier/geoip/releases/latest/download/Country.mmdb
```

## 网络与端口转发
```bash
# 查看当前公网 IP
curl ipinfo.io

# 本地开启 Socks5 代理，端口 1080
ssh -D 1080 root@18.152.211.132

# 本地端口 9090 映射到远程 9090，用于访问远端 Web 面板
ssh -L 9090:127.0.0.1:9090 root@18.152.211.132
```

## Mihomo 网页配置
```bash
# 浏览器打开即可远程配置 Mihomo
https://metacubex.github.io/metacubexd/#/config
```

## 环境安装命令
```bash
# 下载 Docker 官方安装脚本
curl -fsSL https://get.docker.com -o install-docker.sh

# 安装 cnpm，使用阿里云镜像，加速 npm 安装
npm install -g cnpm --registry=https://registry.npmmirror.com

# Linux/macOS 一键安装 uv（Python 包/环境管理工具）
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows PowerShell 安装 uv
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# 将当前项目以可编辑模式安装为全局命令，使用清华 PyPI 源
uv tool install -e . -i https://pypi.tuna.tsinghua.edu.cn/simple/
```

## uv相关设置

```toml
# 清华源
[[tool.uv.index]]
name = "tsinghua"
url = "https://pypi.tuna.tsinghua.edu.cn/simple"
default = true

```