---
title: JavaScript 浮点数与 0 按位或，实现舍弃小数位取整
categories:
  - 未分类
tags:
  - 无标签
date: 2023-06-07 19:12:36
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
import EditInfo from '../../_components/EditInfo.vue'
import BackToTop from '../../_components/BackToTop.vue'
</script>


<PostHeader :postId='2600239050' />

今天工作时，在项目中发现一处有趣的 JavaScript 代码，它将一个浮点数与 0，进行了一个 **按位或** 运算。开始还不清楚所谓何意，后来通过测试和查证才知道。

原来，使用 **按位或运算符 (|)** 可以将浮点数转为整数，并舍弃小数部分。这是因为按位操作会将数字隐式转换为 **32 位整数**，从而舍弃小数部分。示例代码如下：

```javascript
let num = 5.67;
let result = num | 0;  // 按位或运算
console.log(result);   // 输出: 5
```

**原理：**

1. **按位或 (|)** 运算符会将操作数转换为32位有符号整数。
2. 浮点型的小数部分在转换过程中会被截断，而不是四舍五入。

**优点：**

-	性能好：比 Math.floor()、parseInt() 等函数更快。
-	简洁：代码简单，易于书写。

**注意事项：**

1. 只能处理 **32位整数范围内的数值** （即：-2^31 到 2^31 - 1）。对于超出此范围的数，结果可能不准确。
2. 如果需要 **向下取整** 或处理 **负数**，可以改用 Math.floor()：

```javascript
console.log(-5.67 | 0);     // 输出: -5
console.log(Math.floor(-5.67)); // 输出: -6
```

**结论：**

所以，num | 0 确实是一种快速、简便的方式来舍弃小数部分取整，但要注意其处理负数的行为和范围限制。



<EditInfo editLink='https://github.com/liangpengyv/my-blog-by-fluxpress/issues/35' lastUpdated='2024-10-20 17:38:07' />


<BackToTop />