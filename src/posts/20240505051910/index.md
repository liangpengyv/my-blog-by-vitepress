---
title: 快速入门脚手架(Node.js CLI)开发
categories:
  - 未分类
tags:
  - 无标签
date: 2024-05-04 21:19:10
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
</script>

<PostHeader :postId='2600253153' />

开发一个 Node.js CLI 脚手架，是创建高效开发工具的重要一步。本文将从基础概念入手，逐步深入开发过程，并以最小依赖实现第一个 CLI 工具。

## 一、基础概念与预备知识

### 1. 什么是 Shell 和 Bash？

- Shell：操作系统的命令解释器，允许用户与系统进行交互。常见的 Shell 包括 Bash、zsh、fish 等。
- Bash (Bourne Again Shell)：是 Linux 和 macOS 默认的 Shell，提供了丰富的命令和脚本支持。
- Shell 脚本允许自动化任务，许多 CLI 工具的核心逻辑往往需要与 Shell 交互。

### 2. 什么是 CLI 与 GUI？

- CLI（Command Line Interface，命令行接口）：用户通过命令输入与程序交互，如 git 或 npm。
- GUI（Graphical User Interface，图形用户界面）：用户通过窗口和按钮与系统交互，如 VSCode。

CLI 工具的优势在于：

- 自动化程度高、支持脚本化操作。
- 高效处理批量任务，开发时可远程执行。

## 二、脚手架开发的预备知识

### 1. 了解 Node.js 的能力

- Node.js 提供内置模块（如 fs、child_process 等），适合开发 CLI。
- Node.js 支持同步与异步 API，CLI 通常选择同步执行关键任务，确保顺序执行。

### 2. package.json 的 bin 字段

在 package.json 中配置 bin 字段，让你的脚手架可以全局执行。

```json
"bin": {
  "my-cli": "./index.js"
}
```

## 三、开发第一个脚手架

### 1. 初始化项目

```bash
mkdir my-cli && cd my-cli
npm init -y
touch index.js
```

### 2. 在 index.js 中实现基础 CLI

```javascript
#!/usr/bin/env node

const [,, command, ...args] = process.argv;

switch (command) {
  case 'greet':
    console.log(`Hello, ${args[0] || 'World'}!`);
    break;
  default:
    console.log('Usage: my-cli greet <name>');
}
```

> **解释** `const [,, command, ...args] = process.argv;`
> 
> 这行代码利用了 **解构赋值**，用于从 process.argv 中提取命令和参数。我们逐步解析这一部分代码，并解释为什么 command 前面有两个逗号。
>
> process.argv 是一个数组，包含运行 Node.js 脚本时传入的所有命令行参数。其中：
>
> - 第 0 个元素：Node.js 可执行文件的路径（如 /usr/local/bin/node）。
> - 第 1 个元素：正在执行的脚本路径（如 /Users/alice/my-cli/index.js）。
> - 第 2 个元素及之后：用户传入的命令和参数。
>
> 示例：
> 
> 如果用户运行如下命令：
>
> ```bash
> node index.js greet Alice
> ```
>
> 那么 process.argv 的值将是：
>
> ```javascript
> [
>   '/usr/local/bin/node',          // 第 0 个元素
>   '/Users/alice/my-cli/index.js', // 第 1 个元素
>   'greet',                        // 第 2 个元素（命令）
>   'Alice'                         // 第 3 个元素（参数）
> ]
> ```
> 
> 在 Node.js 中运行脚本时，第 0 个和第 1 个元素分别是 Node.js 可执行文件和脚本的路径。
> 
> 对于命令行工具，我们通常不需要这两个路径，因此直接跳过。

### 3. 本地测试

```bash
./index.js greet Alice
```

### 4. 配置全局运行

在 package.json 中添加 bin 字段：

```json
"bin": {
  "my-cli": "./index.js"
}
```

使用 npm link 进行本地测试：

```bash
npm link
my-cli greet Bob
```

## 四、核心原生实现

### 1. 读取用户输入（process.argv）

Node.js 的 process.argv 提供命令行参数的访问能力：

```javascript
const args = process.argv.slice(2);
console.log(`Arguments: ${args.join(' ')}`);
```

### 2. 文件系统操作（fs 模块）

创建和写入文件：

```javascript
const fs = require('fs');

fs.writeFileSync('hello.txt', 'Hello, Node.js CLI!');
console.log('File created: hello.txt');
```

### 3. 执行系统命令（child_process 模块）

通过 Shell 执行命令：

```javascript
const { execSync } = require('child_process');

const result = execSync('ls').toString();
console.log(result);
```

### 4. 处理用户交互（readline 模块）

简单实现用户输入：

```javascript
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is your name? ', (answer) => {
  console.log(`Hello, ${answer}!`);
  rl.close();
});
```

## 五、第三方库与框架介绍

### 1. commander：简化命令和参数处理。

```bash
npm install commander
```

```javascript
const { Command } = require('commander');
const program = new Command();

program
  .version('1.0.0')
  .command('greet <name>')
  .description('Say hello to someone')
  .action((name) => console.log(`Hello, ${name}!`));

program.parse(process.argv);
```

### 2. inquirer：增强用户交互体验。

```bash
npm install inquirer
```

```javascript
const inquirer = require('inquirer');

inquirer.prompt([
  { type: 'input', name: 'username', message: 'What is your name?' }
]).then(answers => console.log(`Hello, ${answers.username}!`));
```

### 3. chalk：为终端输出添加颜色。

```bash
npm install chalk
```

```javascript
const chalk = require('chalk');
console.log(chalk.green('Success!'));
```

## 六、总结

开发 CLI 脚手架并不复杂，只需掌握 Node.js 基础模块即可实现很多功能。在此基础上，你可以根据项目需求引入第三方库来增强用户体验。以下是脚手架开发的流程回顾：

1. 基础概念：理解 Shell、Bash、CLI 与 GUI 的区别。
2. 项目初始化：配置 package.json 的 bin 字段。
3. 核心实现：使用 process.argv、fs、child_process 等原生模块。
4. 扩展功能：根据需要引入第三方库（如 commander 和 inquirer）。

最后，分享一个自己开发的 Node.js CLI 工具：

[douban-scanner](https://www.npmjs.com/package/douban-scanner) —— 豆瓣扫描器，一个用来抓取豆瓣 “书影音” 数据的 CLI 工具