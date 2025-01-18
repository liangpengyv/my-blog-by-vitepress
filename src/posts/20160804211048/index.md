---
title: Git常用命令笔记
categories:
  - 未分类
tags:
  - 无标签
date: 2016-08-04 13:10:48
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
import EditInfo from '../../_components/EditInfo.vue'
</script>


<PostHeader :postId='2600206104' />

*注：本文引自图灵社区系列杂志《码农·进击的Java（总第16期）》，部分有删减，仅用于个人备忘笔记及交流使用*

> 作者/颜海镜

> 90后一枚，活跃在各个技术社区，常以歪脖无脸男作为头像，专注于 Web 前端开发已有三个年头，关注 HTML/CSS/JavaScript 等技术，目前就职于北京金山软件，坚信 Web 赢在未来。热爱思考，热爱开源分享，常翻译些外文博客，此外还爱好读书，羽毛球，乒乓球，相声，铁杆钢丝，当然非常热爱写代码了，http://yanhaijing.com/ 是我的个人博客。

起初的时候我使用 github for windows 这个客户端，再切换到多分支的时候被自动转换换行符坑的不浅，后来阅读了 [《git详解》](http://www.open-open.com/lib/view/open1328069609436.html)系列文章，对 Git 的了解深入了一步，这篇文章记录个人常用的一些命令，和记不住大一些命令。

## **安装**

在 Windows 上安装 ``Git`` 同样轻松，我们可以到 https://git-scm.com/downloads 下载对应操作系统的安装包。

安装完成之后，就可以使用命令行的 git 工具（已经自带了 ssh 客户端）了，另外还有一个图形界面的 Git 项目管理工具。

## **配置**

### **配置账号信息**
```
git config --global user.name yourname
git config --global user.email youname@example.com

git config --list #查看配置的信息

git help config #获取帮助信息
```

### **配置自动换行（自动转换坑太大）**
```
git config --global core.autocrlf input #提交到 git 是自动将换行符转换为lf
```

### **配置密钥**
```
ssh-keygen -t rsa -C yourname@example.com #生成密钥

ssh -T git@github.com #测试是否成功
```

## **新建仓库**
```
git init #初始化
git status #获取状态
git add file #.或*代表全部添加
git commit -m "message" #此处注意乱码
git remote add origin git@github.com:yourname/test.git #添加源
git push -u origin master #push同时设置默认跟踪分支
```

## **从现有仓库克隆**
```
git clone git://github.com/yourname/data.git
git clone git://github.com/schacon/grit.git mypro #克隆到自定义文件夹
```

## **本地**
```
git add * #跟踪新文件

rm * & git rm * #移除文件
git rm -f * #移除文件
git rm --cached * #取消跟踪
git mv file_from file_to #重命名跟踪文件

git log #查看提交记录

git commit #提交更新记录
git commit -m "message"
git commit -a #跳过使用暂存区域，把所有已经跟踪过的文件暂存起来一并提交
git commit -amend #修改最后一次提交

git reset HEAD * #取消已经暂存的文件

git checkout -- file #取消对文件的修改（从暂存区去除file）
git checkout branch|tag|commit -- file_name #从仓库取出 file 覆盖当前分支
git checkout -- . #从暂存区取出文件覆盖工作区
```

## **分支**
```
git branch #列出本地分支
git branch -r #列出远端分支
git branch -a #列出所有分支
git branch -v #查看各个分支最后一个提交对象的信息
git branch --merge #查看已经合并到当前分支的分支
git branch --no-merge #查看未合并到当前分支的分支

git branch test #新建 test 分支
git checkout test #切换到 test 分支
git checkout -b test #新建并切换到 test 分支
git checkout -b test dev #基于 dev 新建 test 分支，并切换

git branch -d test #删除 test 分支
git branch -D test #强制删除 test 分支

git merge test #将 test 分支合并到当前分支
git rebase master #将 master 分支智商超前的提交，变基到当前分支
```

## **远端**
```
git fetch origin_name branch_name #拉取远端上指定分支
git merge origin_name branch_name #合并远端上指定分支
git push origin_name branch_name #推送到远端上指定分支
git push origin_name local_branch:server_branch #推送到远端上指定分支

git checkout -b test origin/dev #基于远端 dev 新建 test 分支

git push origin :server #删除远端分支
```

## **源**

``Git`` 是一个分布式代码管理工具，所以可以支持多个仓库，在 ``Git`` 里，服务器上的仓库在本地称之为 ``remote``。

个人开发时，多源用的可能不多，但多源其实非常有用。

```
git remote add origin1 git@github.com/yourname/data.git

git remote #显示全部源
git remote -v #显示全部源+详细信息

git remote rename origin1 origin2 #重命名

git remote rm origin1 #删除

git remote show origin1 #查看指定源的全部信息
```

## **标签**

当开发到一定阶段时，给程序打标签是非常棒的习惯。

```
git tag #列出现有标签
git tag v0.1 #新建标签
git tag -a v0.1 -m "My version 1.4" #新建带注释标签

git checkout tag_name #切换到标签

git push origin v1.5 #推送分支到源上
git push origin --tags #一次性推送所有分支

git tag -d v0.1 #删除标签
git push origin :refs/tags/v0.1 #删除远程标签
```

## **总结**

啊哈！终于总结完了，以后不会的时候，再也不用到处去找了。

其实还有两个最有用的命令未提到。
```
git help * #获取命令的帮助信息
git status #获取当前的状态，非常有用，因为 Git 会提示接下来的能做的事情
```


<EditInfo editLink='https://github.com/liangpengyv/my-blog-by-fluxpress/issues/4' lastUpdated='2024-10-20 17:01:55' />