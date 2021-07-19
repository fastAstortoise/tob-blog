---
title: Setting permissions to files and folders in linux
date: "2021-07-13T01:44:00.284Z"
tags:
- linux
- permissions
---

# How to add permissions to file and folders

Commands that we can use to find all the directories and change it's permissions to 755 

```shell
find ./{folder name} -type d -exec chmod 755 {} \;
```

This command will find the child directories of root folder.

`-type d` tells find command to look for directories

`-exec chmod 755 {}\;` executes `chmod` on all the directories and `{}` will be replaced by every found folder. `\;` will tell shell where the `exec` command is ending.

```shell
find ./{folder name} -type f -exec chmod 644 {} \;
```
Above command will look for all the files in every file in recursive way and assign permissions to them.

`-type f` tells find command to look for files only.

`-exec chmod 644 {}\;` executes and assign permission to each file.
