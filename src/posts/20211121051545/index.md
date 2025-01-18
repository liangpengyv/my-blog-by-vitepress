---
title: 详解防抖与节流
categories:
  - 未分类
tags:
  - 无标签
date: 2021-11-20 21:15:45
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
import EditInfo from '../../_components/EditInfo.vue'
</script>


<PostHeader :postId='2600231364' />

在前端开发中，**防抖（Debounce）和节流（Throttle）**是两个优化频繁操作的常用技巧。它们主要用于减少高频率触发的事件处理次数，提升性能。本文将由浅入深地介绍这两者的原理、实现方式及应用场景，并比较它们的异同。

## 一、为什么需要防抖与节流？

在浏览器中，有一些事件会频繁触发，比如：

- 窗口 resize、scroll 事件：用户移动滚轮或拖拽窗口时会连续触发。
- 输入框 keyup 事件：用户快速输入内容时会在每次按键后触发。

如果这些事件都直接绑定了处理函数，可能会触发大量不必要的计算，导致页面卡顿或响应迟缓。

防抖和节流应运而生，帮助我们控制事件触发频率，避免性能瓶颈。

## 二、防抖（Debounce）

### 1. 防抖的定义

防抖的核心是多次触发同一事件时，只执行最后一次。即：事件被触发后，只有在指定时间内没有再次触发，处理函数才会执行。如果事件在等待时间内又触发了，则重新计时。

### 2. 防抖的实现

```javascript
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);  // 每次触发时清除之前的计时器
    timeout = setTimeout(() => {
      func.apply(this, args);  // 最后一次触发后执行
    }, delay);
  };
}
```

### 3. 应用场景

- 搜索框：用户输入时避免每次按键都发送请求，只有停止输入一段时间后再进行搜索。
- 窗口调整：防止频繁 resize 事件导致页面频繁重绘。

## 三、节流（Throttle）

### 1. 节流的定义

节流的核心是规定在单位时间内只能执行一次，即使在这段时间内事件被多次触发，处理函数也只会按规定间隔执行。

### 2. 节流的实现

时间戳版

```javascript
function throttle(func, interval) {
  let lastTime = 0;  
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      func.apply(this, args);
    }
  };
}
```

定时器版

```javascript
function throttle(func, interval) {
  let timeout;
  return function (...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(this, args);
      }, interval);
    }
  };
}
```

### 3. 应用场景

-	页面滚动事件：滚动过程中每隔一段时间触发一次，而非每像素移动都触发。
-	按钮防重复点击：避免用户频繁点击按钮导致多次触发请求。

## 四、防抖与节流的区别

| 特性 | 防抖(Debounce) | 节流(Throttle) |
| :-: | :-: | :-: |
| 触发方式 | 多次触发后只执行最后一次 | 每隔固定间隔执行一次 |
| 适合场景 | 用户停止频繁操作后执行处理逻辑 | 持续执行过程中限制调用频率 |
| 实现方式 | 基于计时器 | 基于时间戳或定时器 |
| 效果 | 避免短时间内的频繁触发 | 限制高频操作的处理次数 |

## 五、如何选择？

1. 用户停止操作后需要进行处理：选用防抖。例如搜索框输入、防止多次提交表单。
2. 限制操作频率：选用节流。例如页面滚动、窗口大小调整等需要频繁触发的事件。

## 六、结合防抖与节流

在某些复杂场景中，可能需要结合防抖和节流的特点。
举例：在页面滚动时进行懒加载时，我们希望：

- 滚动时限频触发（节流），减少性能消耗；
- 停止滚动后立即处理剩余任务（防抖），确保用户停下后能立刻看到内容。

可以使用如下方式：

```javascript
function debounceThrottle(func, delay, interval) {
  let lastTime = 0;
  let timeout;

  return function (...args) {
    const now = Date.now();

    if (now - lastTime >= interval) {
      lastTime = now;
      func.apply(this, args);
    } else {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        lastTime = Date.now();
        func.apply(this, args);
      }, delay);
    }
  };
}
```

七、总结

防抖和节流是前端开发中的重要性能优化手段，能有效减少不必要的事件处理。防抖适用于停止操作后的处理逻辑，节流适用于持续操作的限频处理。理解两者的异同与应用场景，能帮助我们编写更加高效的代码。



<EditInfo editLink='https://github.com/liangpengyv/my-blog-by-fluxpress/issues/26' lastUpdated='2024-10-20 17:31:30' />