---
title: Java赋值操作符注意事项及方法调用中的别名问题
categories:
  - 未分类
tags:
  - 无标签
date: 2016-11-18 16:16:22
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
import EditInfo from '../../_components/EditInfo.vue'
import BackToTop from '../../_components/BackToTop.vue'
</script>


<PostHeader :postId='2600207240' />

让我们先来回顾一下Java中的一些特性 ~~

## **一切都是对象**

**“如果我们说另一种不同的语言，那么我们就会发觉一个有些不同的世界。”**
**<center>——Luduing Wittgerstein(1889-1951)</center>**

**尽管Java是基于C++的，但是相比之下，Java是一种更“纯粹”的面向对象程序设计语言。**

Java语言假设我们只是进行面向对象的程序设计。也就是说，在开始用Java进行设计之前，必须将思想转化到面向对象的世界中来。这个入门基本功，可以使你具备使用这样一门编程语言编程的能力，这种语言学习起来更简单，也比许多其他OOP语言更易用。


## **用引用操作对象**

每种编程语言都有自己的操作内存中元素的方式。有时候，程序员必须注意将要处理的数据是什么类型。你是直接操作元素， 还是用某种给予特殊语法的间接表示（例如C和C++里的指针）来操作对象？

所有这一切在Java里都得到了简化。一切都被视为对象，因此可采用单一固定的语法。尽管一切都看做对象，但操作的标识符实际上是对象的一个“引用”（reference）。


## **特例（基本类型）**

在程序设计中经常用到一系列类型，他们需要特殊对待。可以把它们想象成“基本”类型。之所以特殊对待，是因为new将对象存储在“堆”里，故用new创建一个对象——特别是小的、简单的变量，往往不是很有效。因此，对于这些类型，Java采用与C和c++相同的方法。也就是说，不用new来创建变量，而是创建一个并非是引用的“自动”变量。这个变量直接存储“值”，并置于堆栈中，因此更加高效。


## **举例（有关赋值操作）**

**在开始问题之前我们先来看这样一段代码**

```java
class Tank {
	int level;
}

public class Assignment {
	public static void main(String[] args) {
		Tank t1 = new Tank();
		Tank t2 = new Tank();
		t1.level = 9;
		t2.level = 47;
		System.out.println("No.1: t1.level:" + t1.level + ", t2.level:"
				+ t2.level);
		t1 = t2;
		System.out.println("No.2: t1.level:" + t1.level + ", t2.level:"
				+ t2.level);
		t1.level = 27;
		System.out.println("No.3: t1.level:" + t1.level + ", t2.level:"
				+ t2.level);
	}
}

```

**运行结果**

```
No.1: t1.level:9, t2.level:47
No.2: t1.level:47, t2.level:47
No.3: t1.level:27, t2.level:27
```

**为什么是这样一个结果呢？**

**其实** Tank类非常简单，它的两个实例（t1和t2）是在main()里创建的。对每个Tank类对象的level域都赋予了一个不同的值，然后，将t2赋给t1， 接着又修改了t1。在许多编程语言中，我们可能会期望t1和t2总是相互独立的。但由于赋值操作的是一个对象的引用，所以修改t1的同时也改变了t2！这是由于t1和t2包含的是相同的引用，它们指向相同的对象。（原本t1包含的对对象的引用，是指向一个值为9的对象。在对t1赋值的时候，这个引用被覆盖了，也就是丢失了；而那个不再被引用的对象会由“垃圾回收器”自动清理。）

这种特殊的现象通常称作“别名现象”，是Java操作对象的一种基本方式。在这个例子中，如果想避免别名问题应该怎么办呢？可以这样写：
```
t1.level = t2.level;
```
这样便可以保持两个对象彼此独立，而不是将t1和t2绑定到相同的对象。但你很快就会意识到，直接操作对象内的域容易导致混乱，并且，违背了良好的面向对象程序设计的原则。这可不是一个小问题，所以从现在开始大家就应该留意，为对象赋值可能会产生意想不到的结果。


## **方法调用中的别名问题**

**将一个对象传递给方法时，也会产生别名问题：**

```java
class Letter{
	char c;
}

public class PassObject {
	static void f (Letter y){
		y.c = 'z';
	}
	public static void main(String[] args){
		Letter x = new Letter();
		x.c = 'a';
		System.out.println("1: x.c: " + x.c);
		f(x);
		System.out.println("2: x.c: " + x.c);
	}
}
```

**输出结果**

```
1: x.c: a
2: x.c: z
```

在很多编程语言中，方法f()似乎要在他的作用域内复制其参数Letter的一个副本；但实际上只是传递了一个引用。所以代码行
```
y.c = 'z';
```

实际改变的是f()之外的对象。

别名引起的问题及其解决方法是很复杂的话题，但是你现在就应该知道它的存在，并在使用中注意这个陷阱。


<EditInfo editLink='https://github.com/liangpengyv/my-blog-by-fluxpress/issues/7' lastUpdated='2024-10-20 17:04:39' />


<BackToTop />