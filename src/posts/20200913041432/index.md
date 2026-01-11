---
title: git stash 命令详解
categories:
  - 未分类
tags:
  - 无标签
date: 2020-09-12 20:14:32
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
import EditInfo from '../../_components/EditInfo.vue'
import BackToTop from '../../_components/BackToTop.vue'
</script>


<PostHeader :postId='2600217574' />

## 1. 开篇：啥子是 git stash？

你在开发时是不是遇到过这种情况：代码改了一半，突然有个紧急任务来了，比如老板喊你切换到另一个分支修个 Bug。问题来了，你这没提交的代码咋办？提交了怕污染代码库，不提交又不想丢掉。
这时候，git stash 就派上用场了！它就像一个临时储物柜，帮你把当前的修改存起来，等你忙完了再拿出来继续干活。

## 2. 基础用法：怎么存？怎么拿？

### （1）存起来：git stash

执行以下命令，就能把当前工作区的修改存到”储物柜”里：

```bash
git stash
```

效果：你的工作区会变得干干净净，就像啥子都没改过一样。

### （2）取出来：git stash pop

等你忙完了，回到原来的分支，可以用下面的命令把改动拿回来：

```bash
git stash pop
```

效果：储物柜里的东西回来了，而且这条存档就自动删掉了。

### （3）只想看一眼：git stash apply

有时候你只是想把改动拿回来看看，但不想删掉储物柜里的存档：

```bash
git stash apply
```

区别：存档还在，你可以多次 apply。

## 3. 深入探索：stash 的更多玩法

### （1）查看所有存档：git stash list

你可能不止一次用 stash，用这个命令可以列出所有的存档：

```bash
git stash list
```

输出可能像这样：

```
stash@{0}: WIP on main: 123abc4 修复样式问题
stash@{1}: WIP on feature: 添加用户登录功能
```

stash@{0} 是最新的存档，数字越大，说明存的时间越久。

### （2）恢复指定存档：git stash apply stash@{n}

如果你想恢复某个特定的存档，比如 stash@{1}：

```bash
git stash apply stash@{1}
```

### （3）删掉存档：git stash drop

存档用完了或者不需要了，可以用下面的命令删除：

```bash
git stash drop stash@{0}
```

### （4）全部清理：git stash clear

不想一个个删？直接全部清掉：

```bash
git stash clear
```

## 4. 进阶用法：部分保存与冲突处理

### （1）只保存未跟踪的文件：git stash -u

默认情况下，stash 只保存已跟踪的文件。如果你有些新文件还没 git add，可以用：

```bash
git stash -u
```

这样连没跟踪的文件也一块存起来。

### （2）解决冲突：stash pop 也会出问题？

如果你在 stash pop 的时候，和当前分支代码有冲突，那 Git 会提示冲突，和 git merge 的冲突处理一样，需要手动修改完再提交：

```bash
# 修改冲突文件后
git add .
git commit -m "解决冲突"
```

## 5. 总结：git stash 的正确姿势

1. 救急神器：适合临时切换任务、不想提交一半改动的时候用。
2. 谨慎使用：如果你 stash 太多次而不清理，容易忘记存了啥子。
3. 配合 pop 和 apply：合理选择是直接删掉存档（pop），还是保留存档（apply）。

## 6. 结语：工具虽小，管用就行

git stash 这个命令看起简单，但在开发工作中真是个大救星！它让你不再因为各种紧急情况而打乱手头的代码节奏。只要掌握好 stash 的基本用法和一些进阶技巧，你就能更从容地在多个任务之间切换，再也不怕自己的代码乱七八糟了。


<EditInfo editLink='https://github.com/liangpengyv/my-blog-by-fluxpress/issues/18' lastUpdated='2024-10-20 17:20:46' />


<BackToTop />