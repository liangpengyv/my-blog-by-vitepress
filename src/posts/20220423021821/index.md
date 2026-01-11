---
title: 在 PowerShell 中使用 Git
categories:
  - 未分类
tags:
  - 无标签
date: 2022-04-22 18:18:21
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
import EditInfo from '../../_components/EditInfo.vue'
import BackToTop from '../../_components/BackToTop.vue'
</script>


<PostHeader :postId='2600233413' />

## 前言

在 macOS 下 git 命令行工具默认有着很好的 tab 补全功能，而在 Windows 下通过 exe 安装的 git 程序，看起来就有些简陋。

其自带的 Unix Shell 环境模拟窗口 Git Bash，有着丑陋的外观，即便可以通过配置字体、颜色等手段稍加改善，但其一会儿类 Unix 工具链环境的反馈，一会儿 Windows cmd 工具链混搭的集成环境，着实容易让人精神分裂。

为了更好的自始至终统一使用体验，我们通常会将 git 程序添加到 全局 path 中（引导安装程序即可选配），然后在 cmd 或 PowerShell（通常是功能更强大的 PowerShell）中调用 git。

然而在 PowerShell 中调用 git 时，我们丧失了 tab 补全功能。

这里，我们介绍使用 [Posh-Git](https://github.com/dahlbyk/posh-git) 这个扩展包，从而在 PowerShell 中应用 git 的 tab 补全。

## 安装 Post-Git

### 配置脚本执行权限

在可以运行 PowerShell 脚本之前，你需要将本地的 ExecutionPolicy 设置为 RemoteSigned

在 PowerShell 中执行下面的命令，更精细化的配置参见 [微软文档 Set-ExecutionPolicy](https://learn.microsoft.com/zh-cn/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-7.2)

```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine
```

### 使用包管理器安装 posh-git

在 PowerShell 中执行下面的命令，通过包管理器来安装 posh-git

```
Install-Module posh-git -Scope CurrentUser -Force
Install-Module posh-git -Scope CurrentUser -AllowPrerelease -Force # 带有 PowerShell Core 支持的更新的 beta 版
```

如果你想为所有的用户安装 posh-git，请使用 `-Scope AllUsers` 并在管理员权限启动的 PowerShell 控制台中执行。

### 更新 PowerShell 提示符

要在你的提示符中包含 Git 信息，那么需要导入 Posh-Git 模块。 要让 PowerShell 在每次启动时都导入 Posh-Git，请执行 `Add-PoshGitToProfile` 命令， 它会在你的 $profile 脚本中添加导入语句。此脚本会在每次打开新的 PowerShell 终端时执行。

```
Import-Module posh-git
Add-PoshGitToProfile -AllHosts
```

更多详细内容，参见：[Git 文档：A1.9 附录 A: 在其它环境中使用 Git - Git 在 PowerShell 中使用 Git](https://git-scm.com/book/zh/v2/附录-A%3A-在其它环境中使用-Git-Git-在-PowerShell-中使用-Git)

## 自定义 posh-git 提示符

当您导入 posh-git 模块时，它将用新的提示功能替换 PowerShell 的默认提示功能。当当前目录位于 Git 存储库中时，posh-git 提示功能将显示 Git 状态摘要信息。如果 posh-git 检测到您有自己的自定义提示功能，则不会替换提示功能。

这里可以通过编辑当前用户 ps1 文件，实现自定义提示符：

```sh
echo $Profile
```

得到形如下方的绝对路径，表示当前用户 ps1 配置文件默认加载位置

```
C:\Users\liang\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1
```

打开并编辑这个文件，加入下面的内容：

```sh
$GitPromptSettings.DefaultPromptPrefix.Text = 'PS [$(Get-Date -f "HH:mm:ss")] '
$GitPromptSettings.DefaultPromptPrefix.ForegroundColor = [ConsoleColor]::Magenta
$GitPromptSettings.DefaultPromptAbbreviateHomeDirectory = $true
$GitPromptSettings.BeforePath = '{'
$GitPromptSettings.AfterPath = '}'
$GitPromptSettings.DefaultPromptPath.ForegroundColor = 0xFFA500
$GitPromptSettings.BeforePath.ForegroundColor = 0xFFA500
$GitPromptSettings.AfterPath.ForegroundColor = 0xFFA500
$GitPromptSettings.DefaultPromptBeforeSuffix.Text = '`n'
```

你将获得一个同时拥有 时间、家目录缩写、git 状态的提示符，它会像下面这样：

![自定义提示符](https://github.com/user-attachments/assets/18c98970-cc0f-42c1-8fd9-7e1a656b19da)

更多详细内容，参见：[GitHub - dahlbyk/posh-git - Customizing the posh-git prompt](https://github.com/dahlbyk/posh-git?tab=readme-ov-file#customizing-the-posh-git-prompt)

## 顺便说下中文乱码问题

PowerShell 下 `git log` 中文、`git status` 文件名等，可能存在中文乱码的问题。

可以向下面一样配置 git：

```
git config --global core.quotepath false
git config --global gui.encoding utf-8
git config --global i18n.commit.encoding utf-8
git config --global i18n.logoutputencoding utf-8
```

一劳永逸的方式：

系统设置 -> 管理语言设置，打开旧版的区域设置窗口

更改系统区域设置 -> Beta 版：使用 Unicode UTF-8 提供全球语言支持，勾选它，重启✅



<EditInfo editLink='https://github.com/liangpengyv/my-blog-by-fluxpress/issues/30' lastUpdated='2024-11-16 19:37:50' />


<BackToTop />