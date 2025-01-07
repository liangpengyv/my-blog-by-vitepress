---
title: 宏任务、微任务，以及 Vue.js 中的 nextTick
categories:
  - 未分类
tags:
  - 无标签
date: 2021-11-16 19:35:12
---

在 JavaScript 的异步机制中，“宏任务”（Macro Task）和“微任务”（Micro Task）扮演着非常重要的角色。特别是当我们使用 Vue 2 或 Vue 3 进行前端开发时，nextTick 这个 API 与它们密切相关。本文将由浅入深，带你理解它们的区别，以及 nextTick 在 Vue 中的应用。

## 一、宏任务与微任务：事件循环的基础

### 1.1 什么是事件循环（Event Loop）？

JavaScript 是一种单线程的语言，意味着同一时间只能执行一段代码。为了解决阻塞问题，JavaScript 引入了事件循环机制，允许任务异步执行。事件循环的主要逻辑是：

1. 从任务队列中取出一个任务并执行（主线程）。
2. 如果任务内部产生异步操作（如定时器、Promise），这些任务会被放入不同队列。
3. 等到当前执行栈为空时，再根据优先级处理这些任务。

### 1.2 宏任务 vs. 微任务

在事件循环中，任务分为宏任务和微任务两类：

常见的宏任务（Macro Task）包括：

- setTimeout、setInterval
- DOM 渲染任务
- 用户交互事件（如点击、输入）

宏任务会先进入“任务队列”，等待前面的所有任务执行完毕后，才会进入主线程执行。

微任务（Micro Task）主要包括：

- Promise.then、queueMicrotask
- MutationObserver（监听 DOM 变化）

微任务的优先级高于宏任务，在当前宏任务执行完之后，会立刻执行微任务队列中的任务。

顺序总结：

1. 一个宏任务执行完毕后，检查所有的微任务并执行它们。
2. 微任务执行完毕后，事件循环再去执行下一个宏任务。

### 1.3 宏任务与微任务的简单示例

```javascript
console.log('script start');

setTimeout(() => {
  console.log('macro task - setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('micro task - Promise');
});

console.log('script end');
```

输出顺序：

```
script start
script end
micro task - Promise
macro task - setTimeout
```

解释：

1. console.log('script start') 和 console.log('script end') 属于主线程中的同步任务，按顺序执行。
2. setTimeout 的回调是宏任务，放入宏任务队列中。
3. Promise.then 是微任务，会在当前宏任务结束后立即执行。
4. 最后，setTimeout 的回调才会执行。

## 二、nextTick 在 Vue 2 和 Vue 3 中的作用

在 Vue 中，我们经常遇到这样的场景：修改数据后，DOM 并未立刻更新。这是因为 Vue 的响应式更新是异步的。为优化性能，Vue 会在本次事件循环结束后，统一执行所有的 DOM 更新任务。此时，nextTick 就派上了用场。

### 2.1 Vue 的异步 DOM 更新

Vue 会把数据变更后的 DOM 更新任务放入微任务队列中，而不是立即更新。假设我们在修改数据后立即访问 DOM，会发现 DOM 还没有反应过来。例如：

```javascript
this.count = 1;
console.log(this.$refs.counter.innerText); // 可能还是 0
```

要确保获取到最新的 DOM，需要等待下一次 DOM 更新完成。Vue 提供了 this.$nextTick 来解决这个问题。

## 三、Vue 2 和 Vue 3 中的 nextTick 使用

### 3.1 Vue 2 的 nextTick

在 Vue 2 中，this.$nextTick 是一个实例方法，用于等待 DOM 更新完成后执行回调：

```javascript
this.count = 1;
this.$nextTick(() => {
  console.log(this.$refs.counter.innerText); // 1
});
```

如果你需要确保多个数据变更后统一操作 DOM，可以将所有逻辑放在 nextTick 回调中。

```javascript
this.count = 1;
this.msg = 'Hello';
this.$nextTick(() => {
  console.log(this.$refs.counter.innerText); // 1
  console.log(this.$refs.message.innerText); // Hello
});
```

### 3.2 Vue 3 的 nextTick

在 Vue 3 中，nextTick 变成了一个顶层导出的函数，不再需要通过实例调用。使用方法如下：

```javascript
import { nextTick } from 'vue';

count.value = 1;
nextTick(() => {
  console.log(counterRef.value.innerText); // 1
});
```

Vue 3 的 nextTick 在 Composition API 中的使用更加灵活，因为你可以在任何地方调用它，而不需要依赖组件实例。

## 四、nextTick 底层原理分析

### 4.1 nextTick 的实现：微任务的运用

Vue 的 nextTick 内部实现非常巧妙，它利用了微任务机制（Promise 或 MutationObserver）来确保回调函数在 DOM 更新后执行。

Vue 2 的实现简要代码：

```javascript
function nextTick(cb) {
  Promise.resolve().then(cb);
}
```

Vue 3 的实现会更加复杂：

Vue 3 内部根据环境决定使用何种微任务，比如优先使用 queueMicrotask，在不支持的环境下降级为 Promise。

### 4.2 为什么不直接使用 setTimeout？

虽然 setTimeout 也可以异步执行任务，但它是宏任务，会导致回调的执行延迟。Vue 选择使用微任务（如 Promise），确保在本轮事件循环内尽快更新 DOM。

## 五、总结

- 宏任务和微任务是 JavaScript 异步机制中的重要概念。微任务优先于宏任务执行。
- Vue 的响应式更新是异步的，为了性能优化，Vue 会将多次数据更新合并到一个微任务中执行。
- nextTick 是 Vue 中用于确保 DOM 更新完成后执行回调的工具。在 Vue 2 中，它是实例方法，而在 Vue 3 中，它变成了顶层导出的函数。

了解了宏任务、微任务和 nextTick 后，你就能更好地掌握 Vue 的异步更新机制，写出更高效的代码！

