# Docker 换源完整教程

## 目录
- [什么是 Docker 镜像源](#什么是-docker-镜像源)
- [为什么需要换源](#为什么需要换源)
- [常用的国内镜像源](#常用的国内镜像源)
- [换源方法](#换源方法)
- [验证配置](#验证配置)
- [常见问题解决](#常见问题解决)
- [实际使用示例](#实际使用示例)

## 什么是 Docker 镜像源

Docker 镜像源（Registry Mirror）是 Docker 镜像的存储和分发服务。默认情况下，Docker 使用官方的 Docker Hub（`registry-1.docker.io`）作为镜像源。

当我们执行 `docker pull redis` 时，Docker 实际上是从 `registry-1.docker.io/library/redis` 下载镜像。

## 为什么需要换源

在中国大陆使用 Docker Hub 官方源经常遇到以下问题：

1. **网络速度慢**：下载镜像耗时很长
2. **连接超时**：经常出现 `context deadline exceeded` 错误
3. **连接不稳定**：下载过程中断，需要重复尝试

因此，使用国内的镜像加速器可以大大提升 Docker 使用体验。

## 常用的国内镜像源

| 提供商 | 镜像地址 | 说明 |
|--------|----------|------|
| 阿里云 | `https://xxxxxx.mirror.aliyuncs.com` | 需要注册获取专属地址 |
| 腾讯云 | `https://mirror.ccs.tencentyun.com` | 公共服务 |
| 网易 | `https://hub-mirror.c.163.com` | 公共服务 |
| 中科大 | `https://docker.mirrors.ustc.edu.cn` | 公共服务 |
| 七牛云 | `https://reg-mirror.qiniu.com` | 公共服务 |
| DaoCloud | `https://f1361db2.m.daocloud.io` | 公共服务 |

## 换源方法

### 方法一：配置 Docker 镜像加速器（推荐）

这是最常用和推荐的方法，配置一次后所有 `docker pull` 命令都会使用加速器。

#### Linux 系统配置

1. **创建或编辑 Docker 配置文件**
   ```bash
   sudo mkdir -p /etc/docker
   sudo nano /etc/docker/daemon.json
   ```

2. **添加镜像源配置**
   ```json
   {
     "registry-mirrors": [
       "https://hub-mirror.c.163.com",
       "https://docker.mirrors.ustc.edu.cn",
       "https://reg-mirror.qiniu.com"
     ]
   }
   ```

3. **重启 Docker 服务**
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart docker
   ```

#### Windows 系统配置

1. 右键点击系统托盘中的 Docker Desktop 图标
2. 选择 "Settings" 或"设置"
3. 在左侧菜单中选择 "Docker Engine"
4. 在 JSON 配置中添加镜像源：
   ```json
   {
     "registry-mirrors": [
       "https://hub-mirror.c.163.com",
       "https://docker.mirrors.ustc.edu.cn"
     ]
   }
   ```
5. 点击 "Apply & Restart"

#### macOS 系统配置

1. 点击系统菜单栏中的 Docker Desktop 图标
2. 选择 "Preferences" 或"偏好设置"
3. 选择 "Docker Engine"
4. 添加镜像源配置（同 Windows）
5. 点击 "Apply & Restart"

### 方法二：使用阿里云个人镜像加速器

阿里云提供个人专属的镜像加速器，速度通常更快且更稳定。

1. **注册阿里云账号**
   访问 [阿里云容器镜像服务](https://cr.console.aliyun.com/)

2. **获取专属加速器地址**
   - 登录后进入容器镜像服务控制台
   - 点击左侧"镜像工具" → "镜像加速器"
   - 复制专属的加速器地址

3. **配置加速器**
   按照页面提供的操作文档配置，通常是修改 `/etc/docker/daemon.json`：
   ```json
   {
     "registry-mirrors": ["https://xxxxxx.mirror.aliyuncs.com"]
   }
   ```

### 方法三：直接使用国内镜像仓库

如果不想修改全局配置，可以直接从国内镜像仓库拉取：

```bash
# 从阿里云拉取
docker pull registry.cn-hangzhou.aliyuncs.com/library/redis:latest

# 从腾讯云拉取
docker pull ccr.ccs.tencentyun.com/library/redis:latest

# 重新标记为常用名称
docker tag registry.cn-hangzhou.aliyuncs.com/library/redis:latest redis:latest
```

## 验证配置

### 检查镜像源配置

```bash
# 查看 Docker 信息，确认镜像源配置
docker info

# 查找 Registry Mirrors 部分
docker info | grep -A 10 "Registry Mirrors"
```

正确配置后应该看到类似输出：
```
Registry Mirrors:
 https://hub-mirror.c.163.com/
 https://docker.mirrors.ustc.edu.cn/
```

### 测试下载速度

```bash
# 删除本地镜像（如果存在）
docker rmi redis:latest

# 测试下载速度
time docker pull redis:latest
```

### 测试镜像源连通性

```bash
# 测试网易镜像源
curl -I https://hub-mirror.c.163.com/v2/

# 测试中科大镜像源
curl -I https://docker.mirrors.ustc.edu.cn/v2/

# 正常返回应该是 HTTP/1.1 200 OK 或 HTTP/2 200
```

## 常见问题解决

### 问题1：DNS 解析失败

**错误信息：**
```
Could not resolve host: mirror.ccs.tencentyun.com
```

**解决方法：**
1. 检查网络连接
2. 更换 DNS 服务器：
   ```bash
   # 临时修改 DNS
   echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
   echo "nameserver 114.114.114.114" | sudo tee -a /etc/resolv.conf
   ```
3. 使用其他可用的镜像源

### 问题2：镜像源不可用

**错误信息：**
```
Error response from daemon: Get https://xxx: dial tcp: lookup xxx on 127.0.0.53:53: no such host
```

**解决方法：**
1. 测试镜像源可用性
2. 从配置中移除不可用的源
3. 使用多个镜像源作为备选

### 问题3：权限不足

**错误信息：**
```
Got permission denied while trying to connect to the Docker daemon socket
```

**解决方法：**
```bash
# 将用户添加到 docker 组
sudo usermod -aG docker $USER

# 重新登录或执行
newgrp docker
```

### 问题4：配置文件格式错误

**错误信息：**
```
unable to configure the Docker daemon with file /etc/docker/daemon.json
```

**解决方法：**
1. 检查 JSON 格式是否正确
2. 使用在线 JSON 验证工具检查语法
3. 确保文件编码为 UTF-8

## 实际使用示例

### 示例1：拉取常用镜像

```bash
# 拉取不同版本的镜像
docker pull redis:latest
docker pull redis:6.2
docker pull nginx:alpine
docker pull mysql:8.0
docker pull node:16

# 查看下载的镜像
docker images
```

### 示例2：构建包含基础镜像的 Dockerfile

```dockerfile
# Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# 构建镜像
docker build -t my-node-app .
```

### 示例3：使用 docker-compose 

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    image: nginx:alpine
    ports:
      - "80:80"
  
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: password
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

```bash
# 启动服务
docker-compose up -d
```

## 最佳实践建议

1. **使用多个镜像源**：配置多个镜像源作为备选，提高可用性
2. **定期测试**：定期测试镜像源的可用性和速度
3. **选择稳定的源**：优先选择大厂提供的镜像源，如阿里云、腾讯云
4. **个人专属源**：对于企业用户，建议使用阿里云等提供的个人专属加速器
5. **备份配置**：备份 Docker 配置文件，便于在不同环境中快速部署

## 总结

通过配置 Docker 镜像加速器，可以显著提升在中国大陆使用 Docker 的体验。推荐使用配置文件的方式进行全局设置，这样一次配置，所有的 Docker 操作都能享受加速服务。

如果遇到问题，可以按照本教程的故障排除部分进行诊断和解决。记住，不同的镜像源可能在不同时间段有不同的表现，保持配置的灵活性很重要。