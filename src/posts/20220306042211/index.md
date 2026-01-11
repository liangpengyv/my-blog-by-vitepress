---
title: 如何封装一个 JavaScript 的轻量级事件总线（Event Bus）
categories:
  - 未分类
tags:
  - 无标签
date: 2022-03-05 20:22:11
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
import EditInfo from '../../_components/EditInfo.vue'
import BackToTop from '../../_components/BackToTop.vue'
</script>


<PostHeader :postId='2600231651' />

## 1. 引言

在前端开发中，组件之间的通信是一项常见需求。虽然常用的库（如 Redux 或 Vuex）可以解决状态管理问题，但有时我们只需要一个简单的事件总线（Event Bus），来让组件之间交换事件，而不引入复杂的状态管理工具。

接下来我们将一步步实现一个轻量级 JavaScript 事件总线，并介绍其应用场景和最佳实践。

## 2. 什么是事件总线？

事件总线是一种 发布-订阅模式（Publish-Subscribe）的实现。其核心思想是将事件的发布者和订阅者解耦，让它们无需直接相互依赖。事件总线扮演的是一个中央通道的角色，负责协调不同组件之间的事件通知。

## 3. 实现一个简单的事件总线

下面我们使用 JavaScript 的原生能力来封装一个简单易用的事件总线。

基础实现：

```javascript
class EventBus {
  constructor() {
    this.events = new Map(); // 使用 Map 存储事件
  }

  // 注册事件监听器
  on(eventName, listener) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName).push(listener);
  }

  // 触发事件
  emit(eventName, ...args) {
    if (this.events.has(eventName)) {
      this.events.get(eventName).forEach(listener => listener(...args));
    }
  }

  // 取消注册事件监听器
  off(eventName, listener) {
    if (!this.events.has(eventName)) return;
    const listeners = this.events.get(eventName).filter(fn => fn !== listener);
    this.events.set(eventName, listeners);
  }

  // 清除所有事件监听器
  clear() {
    this.events.clear();
  }
}

// 导出一个单例事件总线
const eventBus = new EventBus();
export default eventBus;
```

## 4. 使用方法

### 4.1 注册事件监听器

```javascript
import eventBus from './eventBus';

// 注册一个事件监听器
eventBus.on('userLoggedIn', (user) => {
  console.log(`用户 ${user.name} 已登录`);
});
```

### 4.2 触发事件

```javascript
// 触发 'userLoggedIn' 事件
eventBus.emit('userLoggedIn', { name: 'Alice' });
```

输出：

```
用户 Alice 已登录
```

### 4.3 取消事件监听

```javascript
const onUserLoggedOut = () => console.log('用户已登出');

// 注册并取消监听器
eventBus.on('userLoggedOut', onUserLoggedOut);
eventBus.off('userLoggedOut', onUserLoggedOut);

// 尝试触发（不会有任何输出）
eventBus.emit('userLoggedOut');
```

### 4.4 清除所有事件

```javascript
// 清除所有事件监听器
eventBus.clear();
```

## 5. 进阶功能：一次性监听（once）

有时候，我们希望某个监听器只响应一次事件，这可以通过扩展 on 方法来实现。

```javascript
class EventBus {
  // 省略其他方法...

  // 一次性监听事件
  once(eventName, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(eventName, wrapper); // 自动取消监听
    };
    this.on(eventName, wrapper);
  }
}
```

使用 once 监听事件

```javascript
eventBus.once('dataLoaded', (data) => {
  console.log('数据已加载:', data);
});

// 第一次触发会响应
eventBus.emit('dataLoaded', [1, 2, 3]); // 输出: 数据已加载: [1, 2, 3]

// 第二次触发不会响应
eventBus.emit('dataLoaded', [4, 5, 6]);
```

## 6. 常见应用场景

- 组件通信：在 React、Vue 等框架中，实现兄弟组件或跨层级组件的通信。
- 全局状态管理：用于简易的全局事件通知，比如用户登录、登出事件。
- 异步事件处理：监听某些异步任务的状态变更，如网络请求完成或 WebSocket 消息接收。
- 解耦模块之间的依赖：减少模块之间的直接调用，提升代码的可维护性。

## 7. 性能优化与注意事项

- 内存泄漏：确保在组件销毁或不再需要事件时取消监听器，否则可能导致内存泄漏。
- 事件名规范：为事件命名时，建议使用命名空间风格，如 user:login，以防止事件名冲突。
- 频繁触发的事件：对于高频事件（如滚动或鼠标移动），可以结合 **节流（throttle）或防抖（debounce）** 来优化性能。

## 8. 总结

通过本文的介绍，我们实现了一个简单且高效的事件总线，并展示了它在实际开发中的使用场景。相比于 Redux 等复杂的状态管理库，这种轻量级的事件总线能满足许多日常需求，尤其适用于中小型项目或临时状态共享的场景。

如果你有更多需求，比如需要持久化事件状态、事件队列等功能，可以在此基础上进一步扩展。



<EditInfo editLink='https://github.com/liangpengyv/my-blog-by-fluxpress/issues/28' lastUpdated='2024-10-20 17:32:03' />


<BackToTop />