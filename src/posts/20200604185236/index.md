---
title: 模拟实现 JavaScript 的 apply call 及 bind 函数
categories:
  - 未分类
tags:
  - 无标签
date: 2020-06-04 10:52:36
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
</script>

<PostHeader :postId='2600217490' />

在 JavaScript 中，`apply`、`call` 和 `bind` 方法都是为了改变某个函数运行时的上下文（context）而存在的，换句话说，就是为了改变函数体内部 `this` 的指向。

## 改变 this 指向

我们看下面一段代码：

```javascript
var name = 'GlobalName'
var obj = {
    name: 'ObjName'
}

function getName(arg1, arg2) {
    console.log(this.name, arg1, arg2)  // 函数内部调用 this
}

// this 指向全局对象
getName(1, 2)
// 预期输出：GlobalName 1 2

// 改变 this 指向为 obj
getName.apply(obj, [1, 2])
getName.call(obj, 1, 2)
getName.bind(obj, 1, 2)()
// 预期输出：
// ObjName 1 2
// ObjName 1 2
// ObjName 1 2
```

通过上面一段代码可以看出，我们可以通过 `apply`、`call` 和 `bind` 方法，改变调用 `getName()` 函数的 **运行时上下文**，从而改变运行时函数内部的 `this` 指向。

## 三个方法的功能区别

### Function.prototype.apply()

**`apply()`** 方法调用一个具有给定`this`值的函数，以及以一个数组（或[类数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#working_with_array-like_objects)）的形式提供的参数。

### Function.prototype.call()

**`call()`** 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。

> **注意：**call() 方法的作用和 apply() 方法类似，区别就是 `call()` 方法接受的是 **参数列表**，而 `apply()` 方法接受的是 **一个参数数组**。

### Function.prototype.bind()

**`bind()`** 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

> **注意：**`bind()` 是返回对应函数，便于稍后调用，`apply()` 、`call()` 则是立即调用。

## 模拟实现 apply、call 及 bind

### 实现 myApply()

```javascript
// 实现 apply 函数
Function.prototype.myApply = function (context) {
    // 判断调用 myApply 的是 function 吗
    if (typeof this !== 'function') {
        throw new Error('type error')
    }

    // 获取参数
    let args = arguments[1]

    // 将调用函数设置为对象的方法
    context.fn = this

    // 调用函数
    let result = context.fn(...args)

    // 删除属性
    delete context.fn

    return result
}
getName.myApply(obj, [1, 2])  // 预期输出：ObjName 1 2
```

### 实现 myCall()

```javascript
// 实现 call 函数
Function.prototype.myCall = function (context) {
    // 判断调用 myCall 的是 function 吗
    if (typeof this !== 'function') {
        throw new Error('type error')
    }

    // 获取参数
    let args = [...arguments].slice(1)

    // 将调用函数设置为对象的方法
    context.fn = this

    // 调用函数
    let result = context.fn(...args)

    // 删除属性
    delete context.fn

    return result
}
getName.myCall(obj, 1, 2)  // 预期输出：ObjName 1 2
```

### 实现 myBind()

```javascript
// 实现 bind 函数
Function.prototype.myBind = function (context) {
    // 判断 myBind 的是 function 吗
    if (typeof this !== 'function') {
        throw new Error('type error')
    }

    // 获取参数
    let args = [...arguments].slice(1)

    // 将调用函数暂存
    let fn = this

    return function () {
        return fn.myApply(context, args)
    }
}
getName.myBind(obj, 1, 2)()  // 预期输出：ObjName 1 2
```