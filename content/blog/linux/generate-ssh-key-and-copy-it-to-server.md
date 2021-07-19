---
title: Generating ssh key
date: "2021-07-15T01:44:00.284Z"
tags:
- linux
- ssh-key
---

# How to generate SSH key pair and copy it to server

We will be using ssh-keygen utility, which is widely used and almost available on every OS.

1. Generate key and add comment, so you can find the key easily. `-t` flag define the type of encryption you want to use to generate the key. `ed25519` is recommended way to generate the key.
    ```shell
    ssh-keygen -t ed25519 -C "my work station" 
    cat ~/.ssh/id_ed25519.pub | clip
    ```

2. Either you can copy and paste the public key to server's authorized_keys file, or you can use `ssh-copy-id` with the server information to copy.
    ```shell 
   #Using cat to copy and paste public key to server 
   cat ~/.ssh/id_ed25519.pub | clip
   #Using ssh-copy-id to copy key to server
   ssh-copy-id user_name@server_address
    ```

>**NOTE:** You don't have to generate the public key for every server. You can just copy one public key to any server.
