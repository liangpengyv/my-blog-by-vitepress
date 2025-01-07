---
title: 一文彻底搞懂 CORS 及常见开发调试的解决方案
categories:
  - 未分类
tags:
  - 无标签
date: 2021-10-25 19:25:21
---

## 前言

你是否在开发前后端分离项目时遇到过 **跨域资源共享 (CORS)** 的报错？  
比如，明明后端已经返回了数据，前端却弹出一个 **"Access-Control-Allow-Origin"** 的错误。这篇文章将带你深入理解 CORS 的原理，并分享一些常见的开发调试解决方案，帮你在开发过程中游刃有余。

## 什么是 CORS？

**CORS**（Cross-Origin Resource Sharing）是一种 **浏览器安全机制**，用于限制来自不同源的请求，以防止潜在的跨站攻击。

简单来说，**"同源"** 是指：  
- **协议**、**域名**、**端口号** 三者相同  
  例如：`https://example.com:8080` 和 `https://example.com:80` 因端口号不同，就被视为 **不同源**。

浏览器对跨源请求的限制，主要是为了保护用户信息。CORS 的出现，允许服务器明确声明哪些跨源请求是允许的，从而控制前端是否可以正常访问这些资源。

---

## 浏览器中的 CORS 行为

浏览器根据 **HTTP 请求方法** 对跨域请求分为两类：

1. **简单请求 (Simple Request)**  
2. **预检请求 (Preflight Request)**  

### 简单请求

如果满足以下条件，浏览器会直接发送请求：

- 请求方法是 `GET`、`POST` 或 `HEAD`。
- 请求头是**简单头**：如 `Accept`、`Content-Type: text/plain` 等。
- 没有使用复杂的自定义头。

**示例：**
```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('CORS 错误:', error));
```

如果服务器允许这个跨域请求，响应头中会包含如下内容：

```
Access-Control-Allow-Origin: *
```

\* 表示允许任何来源的请求访问资源。

### 预检请求

对于复杂请求（如 PUT、DELETE 或带有自定义头的请求），浏览器会在发送请求前，先发起一个 OPTIONS 请求，这就是 预检请求。

**示例：**
```javascript
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Custom-Header': 'foobar'
  },
  body: JSON.stringify({ name: 'John' })
});
```

预检请求的目的是询问服务器：

“这个请求可以发送吗？如果可以，我该如何发送？”

**响应示例：**
```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://myfrontend.com
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: X-Custom-Header
```

## CORS 常见错误及解决方案

### 错误 1：No ‘Access-Control-Allow-Origin’ header is present

这是最常见的错误，表示服务器没有返回 Access-Control-Allow-Origin 头。

**解决方案：**

在服务器端增加响应头：

```javascript
// Node.js 示例
const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有来源
  next();
});

app.get('/data', (req, res) => {
  res.json({ message: 'Hello, CORS!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

注意：生产环境中尽量不要使用 *，而是指定具体的来源，避免安全隐患。

### 错误 2：CORS Preflight Did Not Succeed

这是由于 **预检请求** 被服务器拒绝。

**解决方案：**

确保服务器正确处理 OPTIONS 请求：

```javascript
app.options('/data', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://myfrontend.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Custom-Header');
  res.sendStatus(204);
});
```

如果使用 NGINX 代理服务，可以配置：

```nginx
location /api/ {
    if ($request_method = OPTIONS) {
        add_header 'Access-Control-Allow-Origin' 'https://myfrontend.com';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'X-Custom-Header';
        return 204;
    }
}
```

## 如何在开发环境中绕过 CORS？

在开发过程中，为了快速调试，你可以采用以下方法：

### 方法 1：使用 Chrome 禁用 CORS 检查

你可以通过命令行启动 Chrome，禁用 CORS 检查：

```bash
open -na "Google Chrome" --args --disable-web-security --user-data-dir=/tmp/cors
```

**注意：** 此方法仅适用于开发环境，不要在生产环境中使用。

### 方法 2：使用代理服务器

你可以通过前端设置 反向代理，将跨域请求转发到同源服务器。例如，在本地的 webpack 中配置：

```javascript
// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.example.com',
        changeOrigin: true, // 解决跨域问题
        pathRewrite: { '^/api': '' }, // 重写路径，将 /api 去掉
      },
    },
  },
};
```

**使用说明：**

1. 上述配置将前端发往 /api 的请求代理到 https://api.example.com。
2. changeOrigin: true 可以伪造请求来源，避免目标服务器拒绝求。
3. pathRewrite 将匹配到的 /api 前缀去掉，保证请求路径正确射。

### 方法 3：安装 CORS 浏览器插件

一些浏览器插件可以绕过 CORS 检查，例如 CORS Unblock。虽然方便，但这种方法存在安全风险，建议慎用。

## 小结

CORS 是现代 Web 开发中的重要机制，它帮助浏览器保护用户数据的安全。理解其工作原理并合理配置服务器，可以有效避免开发中的跨域问题。

总结一下，我们可以：

1. 在服务器端设置 Access-Control-Allow-Origin 响应头。
2. 正确处理 预检请求，避免 CORS 请求被拒绝。
3. 在开发环境中使用代理或临时禁用 CORS 检查，提升调试效率。

希望这篇文章能帮助你彻底搞懂 CORS，并在开发过程中得心应手。如果你遇到其他跨域问题，欢迎在评论区交流！

