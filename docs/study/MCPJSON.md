# MCP Servers 配置入门指南

## 简介

MCP (Model Context Protocol) 是一个开放协议，允许 AI 应用程序安全地连接到数据源。本指南将详细介绍如何配置 `mcpServers` JSON 配置文件。

## 配置文件位置

### Claude Desktop

**macOS:**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

**Linux:**
```
~/.config/claude/claude_desktop_config.json
```

## 基本配置结构

```json
{
  "mcpServers": {
    "server-name": {
      "command": "执行命令",
      "args": ["参数数组"],
      "cwd": "工作目录",
      "env": {
        "环境变量": "值"
      }
    }
  }
}
```

## 配置参数详解

### 必需参数

#### `command`
- **类型**: 字符串
- **描述**: 要执行的命令或可执行文件路径
- **示例**: `"python"`, `"node"`, `"uv"`, `"/usr/bin/python3"`

#### `args`
- **类型**: 字符串数组
- **描述**: 传递给命令的参数列表
- **示例**: `["script.py"]`, `["-m", "server"]`, `["run", "main.py"]`

### 可选参数

#### `cwd`
- **类型**: 字符串
- **描述**: 命令执行的工作目录
- **示例**: `"/path/to/project"`, `"~/projects/my-server"`

#### `env`
- **类型**: 对象
- **描述**: 环境变量键值对
- **示例**: 
```json
{
  "PYTHONPATH": "/path/to/modules",
  "API_KEY": "your-api-key"
}
```

## 常见配置示例

### 1. Python MCP Server

```json
{
  "mcpServers": {
    "file-system": {
      "command": "python",
      "args": ["-m", "mcp_server_filesystem"],
      "cwd": "/Users/username/mcp-servers"
    }
  }
}
```

### 2. Node.js MCP Server

```json
{
  "mcpServers": {
    "web-scraper": {
      "command": "node",
      "args": ["dist/index.js"],
      "cwd": "/path/to/web-scraper-server"
    }
  }
}
```

### 3. 使用 uv 的 Python Server

```json
{
  "mcpServers": {
    "data-analysis": {
      "command": "uv",
      "args": ["run", "python", "-m", "data_server"],
      "cwd": "/path/to/data-analysis-server"
    }
  }
}
```

### 4. 带环境变量的配置

```json
{
  "mcpServers": {
    "api-server": {
      "command": "python",
      "args": ["server.py"],
      "cwd": "/path/to/api-server",
      "env": {
        "API_KEY": "your-secret-key",
        "DEBUG": "true",
        "PORT": "8080"
      }
    }
  }
}
```

## 高级配置示例

### 多个 MCP Servers

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "python",
      "args": ["-m", "mcp_server_filesystem"],
      "cwd": "/Users/username/servers"
    },
    "database": {
      "command": "python",
      "args": ["-m", "mcp_server_database"],
      "cwd": "/Users/username/servers",
      "env": {
        "DATABASE_URL": "postgresql://user:pass@localhost/db"
      }
    },
    "web-search": {
      "command": "node",
      "args": ["dist/search-server.js"],
      "cwd": "/Users/username/js-servers"
    }
  }
}
```

### 使用虚拟环境

```json
{
  "mcpServers": {
    "ml-server": {
      "command": "/path/to/venv/bin/python",
      "args": ["-m", "ml_server"],
      "cwd": "/path/to/project",
      "env": {
        "PYTHONPATH": "/path/to/project/src"
      }
    }
  }
}
```

### uv 项目配置

```json
{
  "mcpServers": {
    "modern-python-server": {
      "command": "uv",
      "args": [
        "run",
        "--python", "3.11",
        "python", "-m", "my_server"
      ],
      "cwd": "/path/to/uv-project",
      "env": {
        "UV_PROJECT_ENVIRONMENT": ".venv"
      }
    }
  }
}
```

## 调试和故障排除

### 1. 启用详细日志

```json
{
  "mcpServers": {
    "debug-server": {
      "command": "python",
      "args": ["-v", "-m", "server"],
      "cwd": "/path/to/server",
      "env": {
        "DEBUG": "true",
        "LOG_LEVEL": "DEBUG"
      }
    }
  }
}
```

### 2. 测试服务器连接

在配置前，先在终端测试命令是否正常工作：

```bash
# 测试 Python server
cd /path/to/server
python -m my_server

# 测试 uv server
cd /path/to/uv-project
uv run python -m my_server

# 测试 Node.js server
cd /path/to/js-server
node dist/index.js
```

### 3. 常见错误和解决方案

#### 错误：找不到命令
```json
{
  "command": "/usr/bin/python3",  // 使用绝对路径
  "args": ["-m", "server"]
}
```

#### 错误：模块未找到
```json
{
  "env": {
    "PYTHONPATH": "/path/to/your/modules"
  }
}
```

#### 错误：权限问题
确保可执行文件有执行权限：
```bash
chmod +x /path/to/your/script
```

## 最佳实践

### 1. 路径管理
- 使用绝对路径避免路径问题
- 在 `cwd` 中设置正确的工作目录
- 确保所有依赖文件都在正确位置

### 2. 环境隔离
- 为每个服务器使用独立的虚拟环境
- 通过环境变量传递配置信息
- 避免硬编码敏感信息

### 3. 错误处理
- 在开发阶段启用详细日志
- 先在命令行测试服务器
- 逐步添加复杂配置

### 4. 安全考虑
- 不要在配置文件中直接存储敏感信息
- 使用环境变量或外部配置文件
- 限制服务器访问权限

## 配置文件模板

### 基础模板

```json
{
  "mcpServers": {
    "my-server": {
      "command": "python",
      "args": ["-m", "my_mcp_server"],
      "cwd": "/path/to/project"
    }
  }
}
```

### 完整模板

```json
{
  "mcpServers": {
    "server-name": {
      "command": "execution-command",
      "args": ["arg1", "arg2", "--flag"],
      "cwd": "/path/to/working/directory",
      "env": {
        "VAR1": "value1",
        "VAR2": "value2"
      }
    },
    "another-server": {
      "command": "another-command",
      "args": ["different", "args"],
      "cwd": "/different/path"
    }
  }
}
```

## 验证配置

### 1. JSON 格式验证
使用在线 JSON 验证器或命令行工具：
```bash
# 使用 jq 验证 JSON 格式
jq . claude_desktop_config.json
```

### 2. 功能测试
重启 Claude Desktop 应用程序，检查是否能正常连接到 MCP servers。

### 3. 日志检查
查看 Claude Desktop 的日志文件，确认服务器启动状态。

---

通过遵循本指南，你应该能够成功配置和管理 MCP servers。记住在做任何更改后重启 Claude Desktop 应用程序以使配置生效。