# Docker 常用命令参考手册

## 镜像相关命令

### 搜索和拉取镜像
```bash
# 搜索镜像
docker search nginx

# 拉取镜像
docker pull nginx
docker pull nginx:1.20  # 指定版本

# 查看本地镜像
docker images
docker image ls

# 删除镜像
docker rmi nginx
docker rmi image_id
```
### 国内镜像源
```bash


# 使用 Python 3.9 的 slim 版本作为基础镜像
FROM docker.m.daocloud.io/library/python:3.9-slim

https://docker-0.unsee.tech
https://docker.1panel.live
https://registry.dockermirror.com
https://docker.imgdb.de
https://docker.m.daocloud.io
https://hub.firefly.store
https://hub.littlediary.cn
https://hub.rat.dev
https://dhub.kubesre.xyz
https://cjie.eu.org
https://docker.1panelproxy.com
https://docker.hlmirror.com
https://hub.fast360.xyz
https://dockerpull.cn
https://cr.laoyou.ip-ddns.com
https://docker.melikeme.cn
https://docker.kejilion.pro

```

### 构建镜像
```bash
# 从Dockerfile构建镜像
docker build -t myapp:1.0 .
docker build -t myapp:1.0 -f Dockerfile.prod .

# 给镜像打标签
docker tag nginx:latest myregistry.com/nginx:v1.0
```

## 容器相关命令

### 运行容器
```bash
# 基本运行
docker run nginx

# 常用参数组合
docker run -d -p 8080:80 --name mynginx nginx
docker run -it ubuntu /bin/bash
docker run -d -v /host/path:/container/path nginx
docker run -e ENV_VAR=value nginx
```

### 容器管理
```bash
# 查看容器
docker ps           # 运行中的容器
docker ps -a        # 所有容器
docker ps -q        # 只显示容器ID

# 启动/停止/重启容器
docker start container_name
docker stop container_name
docker restart container_name
docker kill container_name    # 强制停止

# 删除容器
docker rm container_name
docker rm -f container_name   # 强制删除运行中的容器
```

### 进入和操作容器
```bash
# 进入运行中的容器
docker exec -it container_name /bin/bash
docker exec -it container_name sh

# 查看容器日志
docker logs container_name
docker logs -f container_name     # 实时查看
docker logs --tail 100 container_name

# 查看容器详细信息
docker inspect container_name

# 查看容器资源使用
docker stats
docker stats container_name
```

## Docker Compose 命令

```bash
# 启动服务
docker-compose up
docker-compose up -d          # 后台运行

# 停止和删除
docker-compose down
docker-compose stop
docker-compose rm

# 查看服务状态
docker-compose ps
docker-compose logs
docker-compose logs service_name

# 重新构建
docker-compose build
docker-compose up --build
```

## 常用运行参数详解

### 基本参数
```bash
-d, --detach          # 后台运行
-i, --interactive     # 保持STDIN打开
-t, --tty            # 分配伪终端
--name               # 指定容器名称
--rm                 # 容器停止时自动删除
```

### 端口和网络
```bash
-p, --publish        # 端口映射 host:container
-P, --publish-all    # 映射所有暴露端口
--network            # 指定网络
--link               # 链接到其他容器（已废弃）
```

### 存储相关
```bash
-v, --volume         # 挂载卷 host:container
--mount              # 更详细的挂载选项
--volumes-from       # 从其他容器挂载卷
```

### 环境和资源
```bash
-e, --env            # 设置环境变量
--env-file           # 从文件读取环境变量
-w, --workdir        # 设置工作目录
-u, --user           # 指定用户
-m, --memory         # 限制内存使用
--cpus               # 限制CPU使用
```

## 系统清理命令

```bash
# 清理未使用的资源
docker system prune              # 清理停止的容器、未使用的网络等
docker system prune -a           # 清理所有未使用的镜像

# 单独清理
docker container prune           # 清理停止的容器
docker image prune              # 清理悬空镜像
docker volume prune             # 清理未使用的卷
docker network prune            # 清理未使用的网络

# 查看Docker占用空间
docker system df
```

## 实用示例

```bash
# 运行一个Web服务器
docker run -d -p 80:80 --name webserver nginx

# 运行MySQL数据库
docker run -d -p 3306:3306 --name mysql \
  -e MYSQL_ROOT_PASSWORD=password \
  -v mysql_data:/var/lib/mysql \
  mysql:8.0

# 临时运行Ubuntu进行调试
docker run -it --rm ubuntu:20.04 /bin/bash

# 查看容器文件系统变化
docker diff container_name

# 将容器保存为镜像
docker commit container_name new_image_name

# 导出导入镜像
docker save -o nginx.tar nginx:latest
docker load -i nginx.tar
```

## 常用命令快速参考

| 功能 | 命令 | 说明 |
|------|------|------|
| 拉取镜像 | `docker pull image_name` | 从仓库下载镜像 |
| 运行容器 | `docker run -d -p 8080:80 nginx` | 后台运行并映射端口 |
| 查看容器 | `docker ps` | 查看运行中的容器 |
| 停止容器 | `docker stop container_name` | 停止指定容器 |
| 进入容器 | `docker exec -it container_name bash` | 进入容器交互式终端 |
| 查看日志 | `docker logs -f container_name` | 实时查看容器日志 |
| 删除容器 | `docker rm container_name` | 删除停止的容器 |
| 删除镜像 | `docker rmi image_name` | 删除本地镜像 |
| 系统清理 | `docker system prune` | 清理未使用的资源 |

## 小贴士

1. **善用 `--help` 参数**：任何命令后加 `--help` 可以查看详细帮助
   ```bash
   docker run --help
   docker-compose up --help
   ```

2. **使用别名提高效率**：
   ```bash
   alias dps='docker ps'
   alias dimg='docker images'
   alias dlog='docker logs -f'
   ```

3. **组合使用命令**：
   ```bash
   # 停止所有容器
   docker stop $(docker ps -q)
   
   # 删除所有停止的容器
   docker rm $(docker ps -aq)
   
   # 删除所有悬空镜像
   docker rmi $(docker images -f "dangling=true" -q)
   ```

4. **使用 `.dockerignore` 文件**：构建镜像时排除不必要的文件

5. **多阶段构建**：减少最终镜像大小的有效方法

这些是 Docker 最常用的命令和参数，掌握这些基本可以满足日常使用需求。建议从基础的 `run`、`ps`、`logs`、`exec` 开始练习。