---
title: Monitor cron jobs
date: "2021-07-16T10:41:00.284Z"
tags:
- linux
---

# Monitor all cron jobs
```shell
tail -f /var/log/syslog | grep CRON
```
