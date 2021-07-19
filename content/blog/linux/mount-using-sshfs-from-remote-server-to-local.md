---
title: Mount remote directory to local directory
date: "2021-07-16T10:24:00.284Z"
tags:
- linux
- sshfs
---

# How to mount a remote directory on the local file system
```shell
sudo sshfs -o allow_other  username@remote-server-ip-or-url:/ /mnt/local-directory/   
```
