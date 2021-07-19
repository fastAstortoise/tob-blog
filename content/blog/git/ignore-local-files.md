---
title: Ignore local files on git
date: "2021-07-16T10:27:00.284Z"
tags:
- git
---

# How to ignore local files from being pushed to remote

If we want to ignore local files, that we have pulled from remote. We have made some changes locally but do not want them to change by pull, and we do not want those changes to push either. We can use the following command.
```shell
git update-index --assume-unchanged FILENAME
```
