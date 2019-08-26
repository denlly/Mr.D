# 如何在 mac 或 window 环境下搭建简单的 http server

## 在现有的环境下安装 Python 的开发环境

[Python 官网](https://www.python.org/downloads/)

由于 Python 分 2 和 3 两个版本。因此在启动 http server 时候会略有不同

```bash
// 进入server的根目录
$ cd [server_root]

// 执行命令 如果不写 server_port 则默认8000
$ python -m SimpleHTTPServer [server_port]
或者
$ python3 -m http.server [server_port]
//
```

![image](https://user-images.githubusercontent.com/16236428/63666999-c9a57900-c804-11e9-9d07-e6addcf2864c.png)
