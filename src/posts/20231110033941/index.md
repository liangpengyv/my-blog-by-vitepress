---
title: 从 Dark 看编程语言空安全特性
categories:
  - 未分类
tags:
  - 无标签
date: 2023-11-09 19:39:41
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
import EditInfo from '../../_components/EditInfo.vue'
import BackToTop from '../../_components/BackToTop.vue'
</script>


<PostHeader :postId='2600252953' />

> 前段时间想做一个小工具 APP，考虑想用 Flutter 实现，于是去看了看 Dart 语言，发现一个比较有意思的特性 —— “空安全”，这里和大家聊一聊。
> 

## 什么是空安全

空安全是指编程语言的类型系统能够区分可为空的类型和不能为空的类型，这种区别可以防止空引用错误（Null Reference Errors）。

## Dart 的空安全

Dart 在 2.12 版本引入了空安全。

### ****可空和非空类型****

在 Dart 中，所有类型默认都是非空的。例如，如果你声明一个 `String` 类型的变量，Dart 会假设它永远不会为空：

![永远不会为空](https://github.com/user-attachments/assets/0cf903bc-5ebf-4918-97df-b4a6f3db17cf)

且不能将它赋予 `null` 值：

![不能赋予null](https://github.com/user-attachments/assets/c4a58901-22c5-4cd6-b679-9efbbcdfca60)

如果你想声明一个可以为空的 `String`，你需要在类型后面加上 `?`：

![声明可为空的String](https://github.com/user-attachments/assets/87d72624-ec6b-41ad-bb39-4887f41b0247)

### ****处理可空值****

与 JS 类似，Dart 也提供了几种方式来处理可能为空的值。

例如，可以使用 `??` 操作符来提供一个默认值：

![提供一个默认值](https://github.com/user-attachments/assets/0816b23c-4422-40f6-9c09-70e53439809f)

可以使用 `?.` 操作符，在对象为空时，跳过方法调用或属性访问，避免抛出空引用错误：

![抛出空引用错误](https://github.com/user-attachments/assets/0a8f795e-f724-4b29-9231-db0449a10b54)

针对上面这种情况，如果编译器解析出你去访问一个可能为空的对象的属性或方法时，没有使用 `?.` 操作符，这会在编译时就会报错，避免了运行时才暴露问题：

![避免了运行时才暴露错误](https://github.com/user-attachments/assets/a4ceae0b-32a8-4714-a8cf-02f3c8f6511b)

### 空值断言操作符 `!` 的使用

当我们排除变量或参数的可空的可能后，可以通过 `!` 来告诉编译器这个可空的变量或者参数不可空，这对我们进行方法传参或将可空的参数传递给一个不可空的入参时特别有用。

引用 Dart 文档中的一个例子⬇️：（From：[Dart｜ 空值断言操作符](https://dart.cn/null-safety/understanding-null-safety#null-assertion-operator)）

![Dart文档中的一个例子](https://github.com/user-attachments/assets/4625d9d6-9163-4fc5-9ce3-25da9f18fec8)

由于 `error` 属性是可空的，在返回结果成功时，它不会有值。我们通过仔细观察类可以看出，当消息为空时，我们永远不会访问 `error`。但为了知晓这个行为，必须要理解 `code` 的值与 `error` 的可空性之间的联系。类型检查器看不出这种联系。

换句话说，作为代码的人类维护者，我们知道在使用 `error` 时，它的值不会是 `null`，并且我们需要对其进行断言。通常你可以通过使用 `as` 转换来断言类型，这里你也可以这样做：

![通过as转换来断言类型](https://github.com/user-attachments/assets/ad56d4c8-dd96-4788-9e27-75ae7df4f937)

编译时的报错消失了！⬆️

如果在运行时，将 `error` 转换为非空的 `String` 类型出现了无法转换的错误，会抛出一个异常。若转换成功，一个非空的字符串就会回到我们的手上，让我们可以进行方法调用。

“排除可空性的转换”的场景频繁出现，这促使了 Dart 带来了新的短小精悍的语法。一个作为后缀的感叹号标记 (`!`) 会让左侧的表达式转换成其对应的非空类型。所以上面的函数等效于：

![非空类型转换](https://github.com/user-attachments/assets/73a9abf1-9c7b-44eb-acdd-bc8ef88acde3)

当原有的类型非常繁琐的时候，这个只有一个字符的 “`!` 操作符” 就会非常顺手。如果仅仅是为了将一个类型转换为非空，就需要写出类似于 `as Map<TransactionProviderFactory, List<Set<ResponseFilter>>>` 这样的代码，会让这个过程变得非常烦人。

## TypeScript 开启严格空值检查

> 目前很多主流编程语言都对空安全有自己的支持，比如：Kotlink、Swift、Rust，包括我们熟悉的 TypeScript，其实也可以手动开启严格空值检查。
> 

TypeScript 里，JS 中的基本数据类型 `undefined` 和 `null` 两者各自有自己的类型分别叫做 `undefined` 和 `null`。

默认情况下 `null` 和 `undefined` 是所有类型的子类型。 就是说你可以把 `null` 和 `undefined` 赋值给 `number` 类型的变量。

例如下面的代码，在 TS 中是完全可以执行的：

![TS中支持情况](https://github.com/user-attachments/assets/af8bc49b-cc84-44ac-a4f6-3485e8a99244)

### ****strictNullChecks****

TypeScript 2.0 增加了对 **不可为空类型** 的支持。有一种新的 **严格空值检查** 模式，他提供了 **`strictNullChecks`** 来限制对空值的检查，可以通过在命令行上添加 `--strictNullChecks` 参数来启功严格空值检查，也可以在项目的 `tsconfig.json` **文件中启用 `strictNullChecks` 编译器选项。

在TS中，为了各版本的兼容，`strictNullChecks` 的默认值是 `false`，我们需要手动设置为 `true`：

```json
{
  "compilerOptions": {
    "strictNullChecks": true
    // ...
  }
}
```

此时，我们刚刚的代码，就无法通过编译器检查了：

![无法通过编译器检查](https://github.com/user-attachments/assets/2637f818-4214-48cc-a4fe-a0d5b2098919)

### 变量如何可以为空

开启严格空值检查后，如果我们想要一个变量可以接受空值，我们该怎么办呢？

1. 使用联合类型
    
    比如下面的代码，`username` 可以接受 `null` 类型的值，但是无法接受 `undefined` 的值：
    

![可以接受null但是无法接受undefined](https://github.com/user-attachments/assets/96af8db4-e01e-4f4e-8c5f-b34a572b9382)

1. 在 Object 中使用 `?` 可选属性
    
    首先，联合类型可以在 Object 中使用：
    
    ![联合类型可以在Object中使用](https://github.com/user-attachments/assets/ce7bfc49-6d77-4945-b9e8-4795efe1edcd)
    
    这里我们设置 `age` 的类型为 `number` 和 `undefined`，下面的两种用法都是正确的：
    
    ![两种用法都是正确的](https://github.com/user-attachments/assets/e373f2b4-fcc6-46b0-8d33-748260be3eba)
    
    如果我们想要下面的效果，不需要手动给 `age` 赋值：
    
    ![不需要手动给age赋值](https://github.com/user-attachments/assets/e9591a66-bb08-43a4-a6fb-3b130df70663)
    
    此时我们就需要用到 `?` 来使属性成为可选，这样我们就可以完全省略 `age` 属性的定义。
    
    ![省略age属性的定义](https://github.com/user-attachments/assets/2d67a308-2f66-41c7-acef-13578e93c3e9)
    
    在这种情况下：`undefined` 类型会自动添加到联合类型中。因此，以下所有赋值都是正确的：
    
    ![以下所有赋值都是正确的](https://github.com/user-attachments/assets/a0b2f7e8-fc59-48e1-b53a-d9ce82103052)
    

## 引入空安全的好处

- 可以将原本运行时的空值引用错误，变为编译时的分析错误
- 增强程序的健壮性，有效避免由Null而导致的崩溃
- 由于空安全特性的存在，编译层面可以做很多优化

<EditInfo editLink='https://github.com/liangpengyv/my-blog-by-fluxpress/issues/37' lastUpdated='2024-10-20 17:46:35' />


<BackToTop />