---
title: 如何减少关键路径渲染（Critical Rendering Path）
categories:
  - 未分类
tags:
  - 无标签
date: 2022-11-22 23:13:11
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
import EditInfo from '../../_components/EditInfo.vue'
</script>


<PostHeader :postId='2600234282' />

**关键路径渲染（Critical Rendering Path，CRP）** 是指浏览器将 HTML、CSS 和 JavaScript 解析为可视页面的过程。CRP 的优化直接影响 **页面的首次内容呈现时间** 和用户的 **加载体验**。在现代前端开发中，减少关键路径渲染的时间已成为提升网页性能的关键环节。本文将逐步讲解 CRP 的工作原理，并提供实用的优化策略。

## 一、什么是关键路径渲染（CRP）？

浏览器渲染页面的过程大致如下：

1. HTML 解析为 DOM 树：浏览器逐行解析 HTML 代码，构建 DOM（Document Object Model）树。
2. CSS 解析为 CSSOM 树：同时解析 CSS，构建 CSSOM（CSS Object Model）树。
3. 合并 DOM 和 CSSOM 树：生成渲染树（Render Tree），决定哪些元素可见。
4. 布局和绘制：浏览器计算元素的位置和大小（布局），然后将其绘制到屏幕。

如果某些资源（如 JS 或 CSS 文件）未及时加载并阻塞了这个过程，就会延长页面的首屏呈现时间，导致用户体验下降。

## 二、如何减少关键路径渲染的时间？

减少 CRP 的时间，主要依赖减少资源体积、缩短加载时间和优化资源的解析顺序。以下是一些行之有效的优化策略。

### 1. 减少阻塞资源

#### 1.1 延迟加载 JavaScript

JavaScript 文件会阻塞 HTML 的解析，因此可以使用 defer 或 async 来延迟脚本加载。

```javascript
<!-- 使用 async 加载，脚本下载完成后立即执行 -->
<script src="script.js" async></script>

<!-- 使用 defer 加载，脚本在 HTML 解析完成后执行 -->
<script src="script.js" defer></script>
```

推荐：将不影响页面首屏展示的 JS 脚本标记为 defer。

#### 1.2 内联关键 CSS

将首屏展示所需的 CSS内联到 HTML 中，减少 CSS 文件的加载延迟。

```html
<style>
  body { margin: 0; font-family: sans-serif; }
  .hero { background-color: #4CAF50; height: 100vh; }
</style>
```

### 2. 压缩和优化资源

#### 2.1 使用 Gzip 或 Brotli 压缩

启用服务器端压缩，减少 HTML、CSS 和 JavaScript 文件的传输体积。

```bash
# 在 nginx 配置中启用 Gzip
gzip on;
gzip_types text/plain text/css application/javascript;
```

#### 2.2 使用 Tree Shaking 和代码拆分

通过 Tree Shaking 移除未使用的代码，并利用代码拆分减少首次加载的资源量。

```javascript
// Tree Shaking 示例，只打包实际使用的函数
import { usedFunction } from './utils';
usedFunction();
```

### 3. 优化 CSS 和字体加载

#### 3.1 减少 CSS 文件体积

- 删除未使用的 CSS。
- 使用 CSS 压缩工具（如 cssnano）。

#### 3.2 使用字体加载优化

使用 font-display: swap 避免字体阻塞渲染。

```css
@font-face {
  font-family: 'CustomFont';
  src: url('custom-font.woff2') format('woff2');
  font-display: swap;
}
```

### 4. 使用缓存提升加载速度

1. 启用浏览器缓存：设置 HTTP 头，如 Cache-Control 和 ETag，确保静态资源被缓存。
2. 使用 Service Worker：利用 PWA 技术，将资源缓存到本地，提高页面的离线访问能力。

### 5. 优先加载关键资源

#### 5.1 使用 <link rel="preload">

预加载关键资源，确保它们尽快开始下载。

```html
<link rel="preload" href="styles.css" as="style">
<link rel="preload" href="script.js" as="script">
```

#### 5.2 使用 <link rel="prefetch">

为非关键资源使用预获取策略，提高后续页面加载速度。

```html
<link rel="prefetch" href="next-page.html">
```

### 6. 减少重排与重绘

- 避免频繁操作 DOM：合并多次 DOM 修改，减少重排开销。
- 使用 CSS 动画代替 JavaScript 动画：CSS 动画通常性能更好。
- 避免触发 Layout Thrashing：避免在 JS 中频繁读取和写入 DOM 属性。

## 三、常见问题与解决方案

### 问题 1：如何判断哪些资源属于关键资源？

解决方案：使用 Chrome DevTools 的“性能面板”查看加载的资源，并标记延迟页面渲染的关键资源。

### 问题 2：如何避免字体加载造成的闪烁（FOIT）？

解决方案：为字体添加 font-display: swap，让浏览器使用系统字体进行替代，直至自定义字体加载完成。

### 问题 3：如何减少第三方库对渲染的影响？

解决方案：

- 使用 async 或 defer 延迟加载第三方 JS 脚本，如广告、分析工具等。
- 利用动态导入按需加载部分第三方依赖。
- 使用轻量替代库，如用 day.js 替代 moment.js。

### 问题 4：如何避免图片加载影响页面首屏渲染？

解决方案：

- 使用 lazyload 延迟加载首屏外的图片。
- 将小图片转换为 Base64 格式内联到 HTML 中，减少 HTTP 请求。
- 使用 srcset 和 sizes 优化响应式图片加载。

### 问题 5：如何优化首次访问与返回访问的性能差异？

解决方案：

- 配置 Service Worker 将关键资源缓存到本地，缩短后续访问时间。
- 使用 HTTP/2 或 HTTP/3 多路复用技术，提升首次访问时的资源加载速度。

### 问题 6：如何监控并持续优化 CRP？

解决方案：

- 使用 Lighthouse 或 Web Vitals 插件定期生成性能报告。
- 集成 Google Analytics 的 First Input Delay (FID) 指标，实时分析页面交互性能。
- 持续关注 CLS（Cumulative Layout Shift），减少布局偏移问题。

## 四、总结

减少关键路径渲染时间对于提升网页性能和用户体验至关重要。通过减少阻塞资源、压缩和优化资源、优先加载关键内容和减少重排与重绘，我们可以有效缩短页面的首次内容呈现时间。

在实际项目中，优化 CRP 是一个持续的过程。建议借助 Chrome DevTools 等工具，实时监控性能瓶颈，并逐步优化。优化后的页面不仅能显著提升加载速度，也能提高用户的访问体验，带来更高的转化率。

<EditInfo editLink='https://github.com/liangpengyv/my-blog-by-fluxpress/issues/33' lastUpdated='2024-10-20 17:34:40' />