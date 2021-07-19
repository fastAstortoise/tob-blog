---
title: Set username and password permanently
date: "2021-07-16T09:56:00.284Z"
tags:
- git
---

# How to set username and password globally in git permanently

1. Verify that you credentials are in `wincerd` or not
    ```shell
    git config --global credential.helper
    ```
2. Check if the output is **NOT** `wincerd`
   
3. Run `config` command to add username and password permanently globally
    ```shell
    git config --global credential.helper wincred
    ```
4. Run **STEP 1** to verify
