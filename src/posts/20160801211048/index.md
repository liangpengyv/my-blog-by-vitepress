---
title: Git快速入门（一）
categories:
  - 未分类
tags:
  - 无标签
date: 2016-08-01 13:10:48
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
import EditInfo from '../../_components/EditInfo.vue'
</script>


<PostHeader :postId='2600205337' />

## **为什么要写此系列教程**

我是一个有着严重拖延的人，对于新鲜事物很感兴趣，但是执行力很差。编辑此篇教程既是对自己学习新工具的总结，更是对自己办事执行力上的考验。

好，下面我们进入正题。

## **关于版本控制**

什么是 **“版本控制”**？我为什么要关心它呢？ 版本控制是一种记录一个或若干文件内容变化，以便将来查阅特定版本修订情况的系统。 在本书所展示的例子中，我们对保存着软件源代码的文件作版本控制，但实际上，你可以对任何类型的文件进行版本控制。

如果你是位图形或网页设计师，可能会需要保存某一幅图片或页面布局文件的所有修订版本（这或许是你非常渴望拥有的功能），采用版本控制系统（VCS）是个明智的选择。有了它你就可以将某个文件回溯到之前的状态，甚至将整个项目都回退到过去某个时间点的状态，你可以比较文件的变化细节，查出最后是谁修改了哪个地方，从而找出导致怪异问题出现的原因，又是谁在何时报告了某个功能缺陷等等。使用版本控制系统通常还意味着，就算你乱来一气把整个项目中的文件改的改删的删，你也照样可以轻松恢复到原先的样子。但额外增加的工作量却微乎其微。

——*摘自《Pro Git 2nd Edition (2014)》*

![Pro Git](https://git-scm.com/images/progit2.png)

本篇教程只是带领大家快速了解 Git，并掌握 Git 的基础用法。
更多规范详细教程请参考：
官方文档 [Pro Git](https://git-scm.com/book/en/v2) （可切换中文版哦）

## **Git的安装及环境配置**

### **Linux下的安装**
由于 Git 和 Linux 操作系统是同一个作者，因此 Git 在 Linux 上的安装是最简单方便的。比如你用的是 Ubuntu 系统，只需要打开 shell 界面，并输入：
```
sudo apt-get install git
```
按下回车后输入密码，即可完成 Git 的安装。

如果是老一点的 Linux 系统，要把命令改为：
```
sudo apt-get install git-core
```
因为以前有个软件也叫GIT（GNU Interactive Tools），结果Git就只能叫git-core了。由于Git名气实在太大，后来就把GNU Interactive Tools改成gnuit，git-core正式改为git。

### **Windows下的安装**

虽然 Windows 常被程序员诟病是最烂的开发平台，不过我相信在中国，你最有可能使用的还是 Windows 操作系统。不同于 Linux，Windows 上无法通过一行命令就完成安装，我们需要把 Git 的安装包到 [官网下载](https://git-scm.com/downloads) 下来，之后一直点击“下一步”就可以完成安装了。

### **Mac下的安装**

哈哈，穷小子买不起苹果电脑，没办法给大家演示，不过安装方法都是大同小异，命令行、第三方工具、官网直接下载……

## **创建版本库**

### **初次运行Git前的配置**

如果你使用的是 Linux 系统，就先打开 shell 界面，如果用的是 Windows 系统，就从开始里找到 Git Bash 并打开。

首先应该配置一下你的身份，这样在提交代码的时候 Git 就可以知道是谁提交的了，命令如下所示：
```
git config --global user.name "Your name"
git config --global user.email "Your email"
```

配置完成后你还可以使用同样的命令查看是否配置成功，只需要将最后的名字和邮箱地址去掉即可，向下面这样：
```
git config --global user.name
git config --global user.email
```

以上的基础信息配置，作用域是针对全局的（global），也就是说，在当前机器下，默认创建的所有版本仓库都会应用此配置信息，如果想要单独针对某一个仓库设定不同的配置信息，可以针对指定仓库单独配置。

### **初始化仓库**

然后我们就可以开始常见代码仓库了，仓库（Repository）适用于保存版本管理所需信息的地方，所有本地提交的代码都会被提交代码仓库中，如果有需要的还可以再推送到远程仓库中。

首先移动到想要创建仓库的文件夹下：
```
cd ./YourRepositoryFolder
```

初始化仓库：
```
git init
```

这时，在你保存 Git 仓库的文件夹下就会生成一个隐藏的 ``.git`` 文件夹，这个文件夹就是用来记录本地所有的 Git 操作的，可以通过 ``ls -al`` 查看一下。

如果你想要删除本地仓库，只需要删除这个文件夹就行了。

### **提交本地代码**

代码仓库简历完之后就可以提交代码了，其实提交代码也非常简单，只需要使用 ``add`` 和 ``commit`` 命令就可以了，``add`` 命令用于把想要提交的代码先添加进来（设置 追踪），而 ``commit`` 则是真正的去执行提交操作。

首先我们在刚刚的文件夹下创建两个新文件 ``one.txt`` 和 ``two.txt``，我们可以通过以下命令将其添加到进来：
```
git add one.txt
git add two.txt
```

也可以一次性添加所有文件：
```
git add .
```

期间，我们可以通过以下命令来随时查看工作区状态：
```
git status
```

接下来我们可以来提交一下，输入如下命令：
```
git commit -m "First commit"
```

注意，在 ``commit`` 命令后面，我们一定要通过 ``-m`` 参数来加上提交的描述信息，没有描述信息的提交被认为是不合法的。这样所有的代码就已经成功提交了！


<EditInfo editLink='https://github.com/liangpengyv/my-blog-by-fluxpress/issues/1' lastUpdated='2024-10-20 17:00:56' />