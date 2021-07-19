---
title: Extract and install from tar.gz file
date: "2021-07-16T10:45:00.284Z"
tags:
- linux
---

# How to Untar and install from tar file

1. Extract `tar` file.
    ```shell
    tar -xzf archive-name.tar.gz
    ```
2. Go to the `archive-name` folder
   ```shell
   cd archive-name
   ```
3. Then run the configuration `./configure` and `make` and `make install` script
   ```shell
   ./configure
   make
   make install
   ```
