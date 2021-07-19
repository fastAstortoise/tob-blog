---
title: Change remote on git
date: "2021-07-16T09:31:00.284Z"
tags:
- git
---

# How to change the remote url on git

1. Verify what url is being used currently
    ```shell
    git remote -v     
    ```
2. Once we verify what url is being used we can run the 
`git remote set-url` to set the origin.
   ```shell
    git remote set-url origin git@github.com:USERNAME/REPOSITORY.git
    ```
