---
title: script元素脚本加载详解
categories:
  - 未分类
tags:
  - 无标签
date: 2021-03-20 21:50:35
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
</script>

<PostHeader :postId='2600227503' />

> 我们知道，将 JavaScript 插入 HTML 的主要方法是使用 `<script>` 元素。这个元素是由网景公司创造出来，并最早在 Netscape Navigator 2 中实现的。后来，这个元素被正式加入到 HTML 规范。
>
> 为了更好地了解 JavaScript 在 HTML 中的加载情况，我们先简单介绍一些基础知识。

`<script>` 元素有下列 8 个属性：

- **`async`** : 可选。表示应该立即开始下载脚本，但不能组织其他页面动作，比如下载资源或等待其他脚本加载。只对外部脚本文件有效。
- `charset` : 可选。使用 `src` 属性指定的代码字符集。这个属性很少使用，因为大多数浏览器不在乎它的值。
- `crossorigin` : 可选。配置相关请求 CORS（跨域资源共享）设置。默认不适用 CORS。crossorigin="anonymous" 配置文件请求不必设置凭据标志。
- **`defer`** : 可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有效。在 IE7 及更早的版本中，对行内脚本也可以指定这个属性。
- `integrity` : 可选。允许比对接收到和指定的加密签名以验证子资源完整性（SRI，Subresource Integrity）。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络（CDN，Content Delivery Network）不会提供恶意内容。
- `language` : 废弃。最初用于表示代码块中的脚本语言（如“JavaScript”、“JavaScript 1.2”或“VBScript”）。大多数浏览器都会忽略这个属性，不应该再使用它。
- **`src`** : 可选。表示包含要执行的代码的外部文件。
- `type` : 可选。代替 `language`，表示代码块中脚本语言的内容类型（也称 MIME 类型）。按照惯例，这个值始终都是 `text/javascript` ，尽管 `text/javascript` 和 `ecmascript` 都已经废弃了。JavaScript 文件的 MIME 类型通常是 `application/x-javascript` ，不过给 `type` 属性这个值有可能 **导致脚本被忽略**。在非 IE 的浏览器中有效的其他值还有 `application/javascript` 和 `application/ecmascript` 。如果这个是 **`module`** ，则代码会被当成 ES6 模块，而且只有这时候代码中才能出现 **`import`** 和 **`export`** 关键字。

## 外部 JavaScript 的加载与解释

使用 `src` 属性解析外部资源时，会向 `src` 属性指定的路径发送一个 GET 请求，以取得相应资源，假定是一个 JavaScript 文件。这个初始的请求不受浏览器同源策略限制，但返回并执行的 JavaScript 则受限制。当然，这个请求仍然受父页面 HTTP/HTTPS 协议的限制。

默认状态下，浏览器会按照 `<script>` 在页面中出现的顺序依次解释它们，前提是它们没有使用 `defer` 和 `async` 属性。第二个 `<script>` 元素的代码必须在第一个 `<script>` 元素的代码解释完毕才能开始解释，第三个则必须等第二个解释完，以此类推。

## 标签位置

过去，所有 `<script` 元素都被放在页面的 `<head>` 标签内，如下面的例子所示：

```html
<!DOCTYPE html>
<html>
<head>
    <title>Document</title>
    <script src="example11.js"></script>
    <script src="example12.js"></script>
</head>
<body>
    <!-- 这里是页面内容 -->
</body>
</html>
```

这种做法的主要目的是把外部的 CSS 和 JavaScript 文件都集中放到一起。不过，把所有 JavaScript 文件都放在 `<head>` 里，也就意味着必须把所有 JavaScript 代码都下载、解析和解释完成后，才能开始渲染页面（页面在浏览器解析到 `<body>` 的起始标签时开始渲染）。对于需要很多 JavaScript 的页面，这会导致页面渲染的明显延迟，在此期间浏览器窗口完全空白。未解决这个问题，现代 Web 应用程序通常将所有 JavaScript 引用放在 `<body>` 元素中的页面内容后面，如下面的例子所示：

```html
<!DOCTYPE html>
<html>
<head>
    <title>Document</title>
</head>
<body>
    <!-- 这里是页面内容 -->
    <script src="example11.js"></script>
    <script src="example12.js"></script>
</body>
</html>
```

这样一来，页面会在处理 JavaScript 代码之前完全渲染页面。用户会感觉页面加载更快了，因为浏览器显示空白页面的时间短了。

## 推迟脚本执行（defer）

HTML 4.01 为 `<script>` 元素定义了一个叫 `defer` 的属性。这个属性表示脚本在执行的时候不会改变页面的结构。也就是说，脚本会被延迟到整个页面都解析完毕后再运行。因此，在 `<script>` 元素上设置 `defer` 属性，相当于告诉浏览器立即下载，但延迟执行。

```html
<!DOCTYPE html>
<html>
<head>
    <title>Document</title>
    <script defer src="example11.js"></script>
    <script defer src="example12.js"></script>
</head>
<body>
    <!-- 这里是页面内容 -->
</body>
</html>
```

虽然这个例子中的 `<script>` 元素包含在页面的 `<head>` 中，但它们会在浏览器解析到结束的 `</html>` 标签后才会执行。HTML5 规范要求脚本应该按照它们出现的顺序执行，因此第一个推迟的脚本会在第二个推迟的脚本之前执行，而且两者会在 DOMContentLoaded 事件之前执行。不过在实际当中，推迟执行的脚本不一定总会按顺序执行或者在 DOMContentLoaded 事件之前执行，因此最好只包含一个这样的脚本。

## 异步执行脚本（async）

HTML5 为 `<script>` 元素定义了 `async` 属性。从改变脚本处理方式上看，`async` 属性与 `defer` 类似。当然，它们两者也都只适用于外部脚本，都会告诉浏览器立即开始下载。不过，与 `defer` 不同的是，标记为 `async` 的脚本并不保证能按照它们出现的次序执行，比如：

```html
<!DOCTYPE html>
<html>
<head>
    <title>Document</title>
    <script async src="example11.js"></script>
    <script async src="example12.js"></script>
</head>
<body>
    <!-- 这里是页面内容 -->
</body>
</html>
```

在这个例子中，第二个脚本可能先于第一个脚本执行。因此，重点在于它们之间没有依赖关系。给脚本添加 `async` 属性的目的是告诉浏览器，不必等脚本下载和执行完后再加载页面，同样也不必等到该一步脚本下载和执行后再加载其他脚本。正因为如此，异步脚本不应该在加载期间修改 DOM。

异步脚本保证会在页面的 load 事件前执行，但可能会在 DOMContentLoaded 之后或之前。

## 脚本加载时机对比

![script脚本加载时机](https://github.com/user-attachments/assets/33d124ea-b3ff-4738-b5c3-93b14a96057e)

我们上一张图👆

> - 绿色 parser：指的是 HTML 引擎的解析，解析 HTML 文本的解析器
>
> - 蓝色 fetch：代表的是获取脚本资源
> - 红色 execution：代表的脚本的执行

### 默认情况下

默认情况下，脚本的加载和解析执行，会中断 HTML 文本的解析。

这是由于，由于 JS 解析引擎 和 浏览器渲染引擎，是互斥的，JS 在解析执行过程中，GUI渲染线程会被挂起（渲染的当前状态会被保存）。当 JS 执行结束后，渲染线程才会继续。

### 使用 defer 属性时

使用 `defer` 属性，脚本的获取加载过程不会中断 HTML 文本的解析，而是通过异步的方式获取脚本。但是，此时脚本的解析执行，仍然要等到 HTML 文本的解析结束后。

### 使用 async 属性时

使用 `async` 属性时，与 `defer` 相似的是，脚本的加载同样是异步的方式，不同的是，脚本的解析执行不依赖 HTML 文档的解析结束，脚本会在加载完成后立即解析执行，且这时候会中断 HTML 文本的解析。

### 针对 type="module" 的加载执行

上面的基础知识部分提到，使用 `type="module"` 标记的 `<script>` 元素，代码会被当成 ES6 模块。

这时候脚本的加载和执行逻辑默认和 `defer` 属性标记时的规则是一致的，当遇到 `<script>` 标签元素时，脚本会从模块入口异步开始加载，过程中可能会分叉去加载引用的其他脚本，最后回到入口模块，整个加载过程不会中断 HTML 文本的解析。而脚本的解析执行则像加了 `defer` 属性一样，需要等待 HTML 文本解析结束后才能开始。

若 使用 `type="module"` 时，同时使用 `async` 属性，那么脚本的解析执行会在加载完成后立即进行，且解析执行过程会中断 HTML 文本的解析。

## 总结

我们知道 `<script>` 标签是在网页中使用 JavaScript 的最根本的机制，所以，对这些加载时机和各种属性的理解，对我们将来做性能优化和提升脚本的安全性是非常重要的。