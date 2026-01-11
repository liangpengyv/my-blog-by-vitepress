---
title: macOS - 给 Terminal(终端)配置网络代理
categories:
  - 未分类
tags:
  - 无标签
date: 2023-01-02 17:21:53
---

<script setup lang="ts">
import PostHeader from '../../_components/PostHeader.vue'
import EditInfo from '../../_components/EditInfo.vue'
import BackToTop from '../../_components/BackToTop.vue'
</script>


<PostHeader :postId='2600235592' />

> 与浏览器不同，mac 的终端默认并没有开启代理模式，也就是说即使我们电脑安装了代理客户端，在终端中也是无法使用代理的。下面通过样例演示如何对终端配置网络代理。

## 1. 确定客户端端口

首先我们打开使用的代理客户端设置界面，查看其开放的 HTTP 端口，比如我这里是 1087

![监听端口](https://github.com/user-attachments/assets/dd94ba23-ee92-4016-87d6-9840209f637e)

## 2. 配置代理

macOS Catalina 之后，Mac 使用 zsh 作为默认的 Shell 终端，我们这里就以 zsh 配置为例展示配置方法。

修改 `~/.zshrc` 配置文件

```sh
vim ~/.zshrc
```

向其中添加如下内容：

```sh
# Turn on and off all_proxy
alias proxy="export all_proxy=http://127.0.0.1:1087 && echo 'Already turn on all_proxy to http://127.0.0.1:1087'"
alias unproxy="unset all_proxy && echo 'Already turn off all_proxy'"
```

保存退出 vim 后，执行如下命令，使配置生效

```sh
source ~/.zshrc
```

## 3. 测试

首先我们使用 curl 命令查看终端目前的 IP：

```sh
curl ipinfo.io
```

得到类似下面的结果，可以看出确实使用的是国内的 IP 地址：

```json
{
  "ip": "...",
  "region": "Guangdong",
  "country": "CN",
  "timezone": "Asia/Shanghai",
  // ...
}
```

接着我们执行 `proxy` 命令开启终端代理模式（仅针对当前会话生效）：

```sh
proxy
```

再次使用 curl 命令查看可以发现变成了国外的 IP（代理服务器的 IP）：

```json
{
  "ip": "...",
  "region": "Tokyo",
  "country": "JP",
  "timezone": "Asia/Tokyo",
  // ...
}
```

如果需要关闭代理模式，执行如下命令即可：

```sh
unproxy
```


<EditInfo editLink='https://github.com/liangpengyv/my-blog-by-fluxpress/issues/34' lastUpdated='2024-10-20 17:35:27' />


<BackToTop />