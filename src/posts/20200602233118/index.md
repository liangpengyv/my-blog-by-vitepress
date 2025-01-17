---
title: JavaScript 创建对象，从古至今
categories:
  - 未分类
tags:
  - 无标签
date: 2020-06-02 15:31:18
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
</script>

<PostHeader :postId='2600217392' />

JavaScript 的对象系统是这个语言的基石之一。随着 JavaScript 的不断演进，对象创建的方式也在逐步丰富。本篇将带你回顾 JavaScript 中创建对象的多种方式，从早期的经典用法到现代的高级特性。

## 1. 最基础的对象字面量

JavaScript 最简单、最直观的对象创建方式就是使用对象字面量。这是一种简洁的语法，非常适合用来创建简单对象。

```javascript
const person = {
  name: "Alice",
  age: 25,
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

person.greet(); // 输出: Hi, I'm Alice
```

优点：

-	简单易懂，语法直观
-	适合创建静态数据结构

缺点：

-	适用于简单对象，复杂逻辑难以复用

## 2. 构造函数：带来可复用性

JavaScript 在早期版本（ES5 之前）没有类的概念，但通过构造函数模拟类的功能。构造函数是用 function 定义的，并与 new 关键字一起使用。

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function () {
  console.log(`Hi, I'm ${this.name}`);
};

const bob = new Person("Bob", 30);
bob.greet(); // 输出: Hi, I'm Bob
```

优点：

-	实现了简单的面向对象编程
-	通过 prototype 共享方法，节省内存

缺点：

-	语法不够直观，相比其他语言的类显得笨拙

## 3. ES6 类：语法糖的出现

在 ES6（2015）中，JavaScript 引入了类（class）关键字，进一步优化了面向对象编程的体验。类本质上是对构造函数的封装，但语法更加清晰。

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

const charlie = new Person("Charlie", 35);
charlie.greet(); // 输出: Hi, I'm Charlie
```

优点：

-	更符合面向对象语言的习惯
-	支持继承和静态方法

缺点：

-	只是语法糖，本质上还是基于 prototype

## 4. 工厂函数：灵活的对象创建

有时候，我们希望避免 new 关键字的使用，并灵活控制对象的创建逻辑。这时，工厂函数是一种很好的选择。工厂函数是返回对象的普通函数，不依赖类和构造函数。

```javascript
function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(`Hi, I'm ${name}`);
    }
  };
}

const dave = createPerson("Dave", 28);
dave.greet(); // 输出: Hi, I'm Dave
```

优点：

-	不需要 new 关键字，避免 this 绑定问题
-	适合复杂对象创建逻辑和闭包

缺点：

-	不具备类的继承特性，需要手动管理方法共享

## 5. 对象的动态扩展与 Object.create()

JavaScript 允许动态扩展对象，也可以通过 Object.create() 创建基于某个原型的对象。这种方法提供了更灵活的继承方式。

```javascript
const protoPerson = {
  greet() {
    console.log(`Hi, I'm ${this.name}`);
  }
};

const emily = Object.create(protoPerson);
emily.name = "Emily";
emily.greet(); // 输出: Hi, I'm Emily
```

优点：

-	直接创建继承关系，避免类的复杂性
-	非常适合需要原型链操作的场景

缺点：

-	不如 class 语法直观

## 6. ES2020 的私有属性：更加完善的类支持

在 ES2020 中，引入了私有属性（# 开头），让 JavaScript 的类系统更接近传统面向对象语言。

```javascript
class Person {
  #secret; // 私有属性

  constructor(name, age, secret) {
    this.name = name;
    this.age = age;
    this.#secret = secret;
  }

  revealSecret() {
    console.log(`My secret is: ${this.#secret}`);
  }
}

const frank = new Person("Frank", 40, "I love coding");
frank.revealSecret(); // 输出: My secret is: I love coding
```

优点：

-	提供真正的私有属性，提升数据封装性
-	避免意外访问和修改

缺点：

-	旧版浏览器不支持，需要 Babel 等工具转译

## 7. 总结：百花齐放的对象创建方式

JavaScript 对象的创建方式，从最简单的字面量，到构造函数模拟类，再到现代的class 和 私有属性，每一种方式都有其特定的应用场景和优劣。

-	字面量：快速创建简单对象
-	构造函数：模拟类，支持原型共享
-	class：语法更优雅，适合复杂对象
-	工厂函数：灵活控制对象逻辑
-	Object.create()：灵活操作原型链
-	私有属性：提高封装性

未来，随着 JavaScript 的持续发展，我们可能会看到更多对象相关的新特性被引入。希望这篇博客能帮助你理清思路，选择最适合的方式来创建和管理对象。