---
title: 手动实现 JavaScript 迭代器
categories:
  - 未分类
tags:
  - 无标签
date: 2022-11-21 20:33:23
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
import EditInfo from '../../_components/EditInfo.vue'
import BackToTop from '../../_components/BackToTop.vue'
</script>


<PostHeader :postId='2600234163' />

在 JavaScript 中，迭代器是一个非常强大的工具。它允许我们逐步遍历集合中的元素，如数组、字符串、Map 等。然而，除了使用内置的迭代器（如 for...of、Array.prototype.entries() 等），我们还可以手动实现自己的迭代器来满足特殊需求。今天我们就从零开始，逐步带你了解如何实现一个 JavaScript 迭代器。

## 一、什么是迭代器？

迭代器的本质是一个对象，它提供了一种标准化的访问数据的方法。它需要具备两个关键要素：

1. **next() 方法：** 每次调用时，返回一个包含 value 和 done 属性的对象。
2. **状态跟踪：** 用于记录当前迭代的进度。

返回的对象结构为：

```javascript
{ value: <当前值>, done: <是否结束> }
```

- value 表示当前迭代项的值。
- done 是一个布尔值，用于表示迭代是否结束。

## 二、内置迭代器的简单例子

在继续之前，我们先来看一个数组的内置迭代器：

```javascript
const arr = [1, 2, 3];
const iterator = arr[Symbol.iterator]();

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

这里我们使用了数组的内置 Symbol.iterator 方法。每次调用 next() 都会依次获取数组的下一个元素，直到所有元素遍历完成。

## 三、手动实现一个简单的迭代器

我们现在尝试手动实现一个基本的迭代器。目标是实现一个能遍历数组的自定义迭代器。

```javascript
function createArrayIterator(arr) {
  let index = 0;
  
  return {
    next() {
      if (index < arr.length) {
        return { value: arr[index++], done: false };
      } else {
        return { value: undefined, done: true };
      }
    }
  };
}

const iterator = createArrayIterator([10, 20, 30]);

console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: 30, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

**代码说明：**

1. createArrayIterator 函数接收一个数组作为参数。
2. 每次调用 next()，都会返回当前数组元素并将索引前进一位。
3. 当数组遍历完成后，返回 { value: undefined, done: true }。

## 四、为对象添加迭代器

我们可以通过 Symbol.iterator 为任何对象定义自定义的迭代逻辑。这样，我们的对象也能在 for...of 循环中使用。下面，我们为一个自定义对象实现迭代器。

```javascript
const range = {
  start: 1,
  end: 5,
  
  [Symbol.iterator]() {
    let current = this.start;
    const end = this.end;

    return {
      next() {
        if (current <= end) {
          return { value: current++, done: false };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

for (const num of range) {
  console.log(num); // 输出 1 2 3 4 5
}
```

**代码说明：**

1. range 对象表示一个范围，从 start 到 end。
2. 在对象内部使用 Symbol.iterator 定义了一个迭代器。
3. for...of 会自动调用对象的 [Symbol.iterator]() 方法来获取迭代器。

## 五、实现无限迭代器

有时候，我们需要创建一个无限序列，比如生成斐波那契数列。下面是一个无限斐波那契迭代器的实现：

```javascript
function fibonacciIterator() {
  let [prev, curr] = [0, 1];
  
  return {
    next() {
      [prev, curr] = [curr, prev + curr];
      return { value: prev, done: false };
    }
  };
}

const fib = fibonacciIterator();
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
console.log(fib.next().value); // 5
console.log(fib.next().value); // 8
```

**代码说明：**

- 每次调用 next()，斐波那契序列都会前进一位，并返回当前的值。
- 无限序列的迭代器没有终止条件，因此 done 始终为 false。

## 六、可迭代对象与迭代器的区别

1. 可迭代对象：具有 [Symbol.iterator]() 方法的对象，可以在 for...of 中使用，如数组、字符串等。
2. 迭代器：实现了 next() 方法的对象，每次调用 next() 返回一个 { value, done } 对象。

**总结：** 可迭代对象内部使用迭代器来实现元素的逐个访问。for...of 只是对迭代器的一种封装。


<EditInfo editLink='https://github.com/liangpengyv/my-blog-by-fluxpress/issues/32' lastUpdated='2024-10-20 17:34:22' />


<BackToTop />