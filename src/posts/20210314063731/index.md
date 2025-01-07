---
title: 一种适合小团队的Git协作流程
categories:
  - 未分类
tags:
  - 无标签
date: 2021-03-13 22:37:31
---

> 团队开发中，遵循一个合理、清晰的Git使用流程，是非常重要的
>
> 否则，每个人都提交一堆杂乱无章的commit，项目很快就会变得难以协调和维护

### 分支介绍

1. **master - 主分支**
   * 所有提供给用户使用的正式版本，都在这个主分支上发布
   * 开发者在此分支 **不可进行 `push` 操作**
2. **dev - 开发分支**
   * 日常开发所使用的分支，开发者完成的阶段性功能模块将首先被合并到此分支
   * 此分支亦是团队内部测试、阶段性工作验证所使用的分支
   * 开发者在此分支 **不可进行 `push` 操作**，只能通过 **Pull Request** 的方式将个人分支合并到此分支
   * 开发过程中，要经常与此分支保持同步
3. **feature/xxx - 特性分支**
   * 用于某个功能模块的开发，例如：张三创建了一个 `feature/package-manager` 分支负责开发包管理器模块
   * 当该功能模块开发任务完成后，通过 **Pull Request** 的形式进行请求合并，管理员 **Code Review** 通过后，将该分支合并到 `dev` 分支；此后，该分支将被删除
   * 一旦完成开发，它们就会被合并进 `dev` 分支**（仅能通过 Pull Request 的方式）**，然后被删除
   * 此类分支由开发者个人管理和使用， **可以进行 `push` 操作**
   * 开发过程中，此类分支要经常与 `dev` 分支保持同步
4. **hotfix/xxx - 补丁分支**
   * 用于紧急修复 Bug 的分支，可以由 `master` 或 `dev` 分支创建
   * 同 `feature/xxx` 分支一样，一旦修复工作完成，它们就会被合并进 `master` 或 `dev` 分支 **（仅能通过 Pull Request 的方式）**，然后就被删除

### 工作流程

```shell
# 开发前克隆 dev 分支到本地
git clone -b dev https://github.com/liangpengyv/vue-mvvm.git
```

#### 第一步：新建分支

首先，每次开发新功能，都应该新建一个单独的分支

```shell
# 获取 dev 分支最新代码
git checkout dev
git pull

# 新建一个特性分支
git branch feature/xxx
# 切换到该特性分支，进行开发
git checkout feature/xxx
```

#### 第二部：提交分支

分支修改后，就可以提交了

```shell
# 提交代码
git add .
git commit

# 开发过程中，将本地仓库开发中的特性分支 push 到远程仓库（可选的）
git push -u origin feature/xxx
```

`git push` 的 `-u` 参数，表示将远程仓库 `origin/feature/xxx` 与 本地仓库 `feature/xxx` 建立关联，下一次执行 `push` 命令，可省略后面的远程仓库名和分支名，直接输入 `git push` 即可

#### 第三步：与 dev 主干同步

分支的开发过程中，要经常与 `dev` 主干保持同步

```shell
# 获取 dev 分支最新代码
git checkout dev
git pull

# 切换回当前开发的特性分支
git checkout feature/xxx
# 合并 dev 分支到当前分支
git merge dev
```

#### 第四步：发出 Pull Request

完成当前特性分支的所有开发任务，进行最后一次 **与 dev 主干同步** 工作，并提交到远程仓库以后，就可以发出 **Pull Request 到 dev 分支**，然后请求管理员进行 **Code Review** ，确认可以合并到 `dev` 分支

```shell
# 最后进行一次步骤三的同步工作

# 提交到远程仓库
git checkout feature/xxx
git push origin feature/xxx

# 在 GitHub 管理界面创建 Pull Request，等待管理员进行 Code Review
```

#### 第五步：清理无用的分支

某个特性分支开发任务全部完成后，应删除它

```shell
# 首先，切换回 dev 分支
git checkout dev

# 先删除远程特性分支
git push origin -d feature/xxx

# 再删除本地特性分支
git branch -d feature/xxx
```

