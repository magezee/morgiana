# morgiana
## 启动

**调试**

如果需要调试项目，启用该命令并根据 `CLI` 提示操作

```bash
npm run start
```
**部署**

默认情况下，部署静态项目只需要通过项目内的`shell`脚本即可自动通过 `docker` 部署项目

```bash
./update-docker.sh
```

**监听 webhook**

需要启用 `webhook` 功能，则需要额外再启动一个监听用的 `node` 服务，此时

需要确保部署的服务器上有 `node` 以及 `pm2` 环境

```bash
pm2 start npm -- run webhook-server
```



