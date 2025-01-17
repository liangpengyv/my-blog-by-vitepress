---
title: Markdown简明手册
categories:
  - 未分类
tags:
  - 无标签
date: 2016-09-10 11:46:17
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
</script>

<PostHeader :postId='2600206217' />

**Markdown** 是一种轻量级标记语言，创始人为约翰·格鲁伯（John Gruber）。它允许人们“使用易读易写的纯文本格式编写文档，然后转换成有效的``XHTML``(或者``HTML``)文档”。这种语言吸收了很多在电子邮件中已有的纯文本标记的特性。

John Gruber 在 2004 年创造了 Markdown 语言，在语法上有很大一部分是跟亚伦·斯沃茨（Aaron Swartz）共同合作的。这个语言的目的是希望大家使用“易于阅读、易于撰写的纯文字格式，并选择性的转换成有效的 ``XHTML`` (或是``HTML``)”。其中最重要的设计是可读性，也就是说这个语言应该要能直接在字面上的被阅读，而不用被一些格式化指令标记 (像是 ``RTF`` 与 ``HTML``)。 因此，它是现行电子邮件标记格式的惯例，虽然它也借鉴了很多早期的标记语言，如：``setext``、``Texile``、``reStructuredText``。 许多网站都使用 Markdown 或是其变种，例如：``GitHub``、``reddit``、``Diaspora``、``Stack Exchange``、``OpenStreetMap`` 与 ``SourceForge`` 让用户更利于讨论。

Markdown同时还是一个由Gruber编写的``Perl``脚本：``Markdown.pl``。它把用markdown语法编写的内容转换成有效的、结构良好的``XHTML``或``HTML``内容，并将左尖括号``<``和``&``号替换成它们各自的字符实体引用。它可以用作单独的脚本，Blosxom和Movable Type的插件又或者BBEdit的文本过滤器。

Markdown也已经被其他人用``Perl``和别的编程语言重新实现，其中一个``Perl``模块放在了CPAN(Text::Markdown)上。它基于一个BSD风格的许可证分发并可以作为几个内容管理系统的插件。

*引自维基百科 [Markdown](https://zh.wikipedia.org/wiki/Markdown)*

## **1. 斜体和粗体**

使用 * 和 ** 表示斜体和粗体。

### 示例：

> 这是 \*斜体\*，这是 \**粗体\**。

### 效果：

这是 *斜体*，这是 **粗体**。

## **2. 分级标题**

使用 # 表示一级标题，使用 ## 表示二级标题。

### 示例：

> \# 这是一个一级标题

> \## 这是一个二级标题

> \### 这是一个三级标题

### 效果：

# 这是一个一级标题

## 这是一个二级标题

### 这是一个三级标题

## **3. 外链接**

使用 \[描述](链接地址) 为文字增加外链接。

### 示例：

> 这是去往 \[本人博客](https://www.laoliang.ink) 的链接。

### 效果：

这是去往 [本人博客](https://www.laoliang.ink) 的链接。

## **4. 无序列表**

使用 *，+，- 表示无序列表。

### 示例：

> \- 无序列表项 1
> \- 无序列表项 2
> \- 无序列表项 3

### 效果：

- 无序列表项 1
- 无序列表项 2
- 无序列表项 3

## **5. 有序列表**

使用数字和点表示有序列表。

### 示例：

> 1. 有序列表项 一
> 2. 有序列表项 二
> 3. 有序列表项 三

### 效果：

1. 有序列表项 一
2. 有序列表项 二
3. 有序列表项 三

## **6. 文字引用**

使用 > 表示文字引用。

### 示例：

> \> 野火烧不尽，春风吹又生。

### 效果：

> 野火烧不尽，春风吹又生。

## **7. 行内代码块**

使用 \`代码` 表示行内代码块。

### 示例：

> 让我们聊聊 \`html`。

### 效果：

让我们聊聊 `html`。

## **8.  代码块**

支持四十一种编程语言的语法高亮的显示，行号显示。

### 非代码示例：

> \`\`\`
> $ sudo apt-get install vim-gnome
> \`\`\`

### 非代码效果：

```
$ sudo apt-get install vim-gnome
```

### Python 示例：

> \`\`\`python
import sys

> for s in sys.stdin:
    a = [int(i) for i in s.split()]
    print (a[0] + a[1])
\`\`\`

### Python 效果：

```python
import sys

for s in sys.stdin:
    a = [int(i) for i in s.split()]
    print (a[0] + a[1])
```

### JavaScript 示例：

> \`\`\` javascript
function fib(n) {
  var a = 1, b = 1;
  var tmp;
  while (--n >= 0) {
    tmp = a;
    a += b;
    b = tmp;
  }
  return a;
}

> document.write(fib(10));
> \`\`\`

### JavaScript 效果：

``` javascript
function fib(n) {
  var a = 1, b = 1;
  var tmp;
  while (--n >= 0) {
    tmp = a;
    a += b;
    b = tmp;
  }
  return a;
}

document.write(fib(10));
```

## **9.  插入图像**

使用 \!\[描述](图片链接地址) 插入图像。

### 示例：

> !\[我的头像](https://avatars.githubusercontent.com/u/23415234?s=460&u=246c673b3fe369d7146089bce615857f0aaf09a6&v=4)

### 效果：

![我的头像](https://avatars.githubusercontent.com/u/23415234?s=460&u=246c673b3fe369d7146089bce615857f0aaf09a6&v=4)