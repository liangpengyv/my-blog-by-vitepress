---
title: JavaScript 支持哪些模块加载方式
categories:
  - 未分类
tags:
  - 无标签
date: 2021-10-28 21:16:29
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
import EditInfo from '../../_components/EditInfo.vue'
</script>


<PostHeader :postId='2600230269' />

在 JavaScript 中，导入模块的方式根据使用的模块规范（如 CommonJS、ESM 等）有所不同。下面介绍几种常见的导入方式：

## 1. CommonJS 模块导入

- 用于 Node.js 环境（也可以在支持的工具中使用，如 Webpack）。
- 语法：require

```javascript
const fs = require('fs'); // 导入 Node 内置模块
const myModule = require('./myModule'); // 导入本地模块
```

- 特性：
  - 模块导入是同步的。
  -	常用于老版本项目和 Node.js 中。

## 2. ESM（ECMAScript Module）导入

-	原生支持的 ES6 模块系统。现代前端项目和 Node.js (v12+) 支持 ESM。

```javascript
// 导入默认导出
import defaultExport from './myModule.js';

// 导入命名导出
import { namedExport1, namedExport2 } from './myModule.js';

// 重命名导入的变量
import { namedExport as alias } from './myModule.js';

// 导入所有内容为对象
import * as myModule from './myModule.js';

// 动态导入
const module = await import('./myModule.js');
```

-	特性：
	-	更加模块化，支持 tree-shaking。
	-	可与 async/await 配合动态导入。

## 3. AMD（Asynchronous Module Definition）导入

-	常见于老的前端工具（如 RequireJS）。

```javascript
require(['./myModule'], function (myModule) {
  // 模块加载完成后的操作
});
```

-	特性：
	-	适用于浏览器，支持异步加载模块。
	-	不常见于现代项目。

## 4. UMD（Universal Module Definition）导入

-	兼容 CommonJS、AMD 和全局变量的模块。

```javascript
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['dependency'], factory); // AMD
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('dependency')); // CommonJS
  } else {
    root.myModule = factory(root.dependency); // 浏览器全局
  }
}(this, function (dependency) {
  // 模块逻辑
}));
```

-	特性：
	-	用于需要同时支持多种环境的库。

## 5. 全局变量方式导入

-	不使用模块系统，通过 \<script\> 标签引入脚本。

```html
<script src="myModule.js"></script>
<script>
  console.log(window.myModule); // 直接访问全局变量
</script>
```

-	特性：
	-	适合简单页面，但无法实现模块隔离。

## 总结：什么时候用哪种导入方式？

-	Node.js：推荐使用 ESM (import)，但 CommonJS (require) 仍然广泛支持。
-	现代前端项目：推荐使用 ESM 导入。
-	老旧项目或浏览器兼容性需求：可能使用 AMD 或 UMD。
-	简单静态页面：直接使用全局变量导入。

如需在 ESM 和 CommonJS 间兼容，你可能需要配置工具（如 Rollup、Webpack）或添加 .cjs、.mjs 文件后缀来区分模块类型。



<EditInfo editLink='https://github.com/liangpengyv/my-blog-by-fluxpress/issues/24' lastUpdated='2024-10-20 17:30:50' />