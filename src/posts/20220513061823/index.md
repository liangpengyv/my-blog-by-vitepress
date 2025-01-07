---
title: 基于 axios 手写文件上传，实现进度监听、上传中断
categories:
  - 未分类
tags:
  - 无标签
date: 2022-05-12 22:18:23
---

要基于 axios 手写一个文件上传组件，并实现以下功能：

1. 选择文件并上传
2. 监听上传进度
3. 支持上传中断（取消请求）
4. 处理成功和失败的回调

下面是一个完整的实现代码示例：

## 1. 安装依赖

```bash
npm install axios
```

## 2. 代码实现

**HTML 模板示例：**

```html
<div id="app">
  <input type="file" id="fileInput" />
  <button id="uploadButton">上传</button>
  <button id="cancelButton">取消上传</button>
  <div id="progress">上传进度: 0%</div>
</div>
```

**JavaScript 代码实现：**

```javascript
import axios from 'axios';

let cancelTokenSource = null; // 用于取消上传

// 监听文件选择并上传
document.getElementById('uploadButton').addEventListener('click', () => {
  const fileInput = document.getElementById('fileInput');
  if (fileInput.files.length === 0) {
    alert('请选择文件');
    return;
  }

  const file = fileInput.files[0];
  uploadFile(file);
});

// 取消上传
document.getElementById('cancelButton').addEventListener('click', () => {
  if (cancelTokenSource) {
    cancelTokenSource.cancel('上传已取消');
  }
});

// 文件上传逻辑
function uploadFile(file) {
  const url = 'https://your-upload-endpoint.com/upload'; // 替换为实际上传地址

  // 创建 Axios 的取消令牌
  cancelTokenSource = axios.CancelToken.source();

  // 创建表单数据
  const formData = new FormData();
  formData.append('file', file);

  axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    cancelToken: cancelTokenSource.token,
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      document.getElementById('progress').innerText = `上传进度: ${percentCompleted}%`;
    },
  })
  .then((response) => {
    alert('上传成功');
    console.log(response.data);
  })
  .catch((error) => {
    if (axios.isCancel(error)) {
      console.log('上传被取消:', error.message);
    } else {
      console.error('上传失败:', error);
      alert('上传失败');
    }
  });
}
```

## 3. 代码说明

- 选择文件并上传：用户点击上传按钮时，调用 uploadFile 函数，将文件上传到指定的服务器端。
- 监听上传进度：使用 onUploadProgress 回调函数来实时更新进度。
- 支持上传中断：使用 axios.CancelToken 创建可取消的请求，并在用户点击“取消上传”按钮时触发中断。
- 处理错误：区分普通错误和用户主动取消上传的情况。

## 4. 效果预览

- 进度监听：上传时，页面上会实时显示百分比。
- 取消上传：上传过程中的任何时间都可以中断请求。

## 5. 服务器端（可选参考）

后端需要支持接收 multipart/form-data 请求。如果你使用的是 Node.js，可以用 express 搭配 multer 处理文件上传。

```javascript
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.post('/upload', upload.single('file'), (req, res) => {
  console.log('文件信息:', req.file);
  res.send({ status: '上传成功' });
});

app.listen(3000, () => {
  console.log('服务器启动在 http://localhost:3000');
});
```

这个组件实现了完整的文件上传流程，你还可以根据需要进一步定制，比如支持多个文件、添加更多的上传校验等。