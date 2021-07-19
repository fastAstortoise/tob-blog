---
title: Configuring Angular/Single page applications on apache/apache2
date: "2021-07-16T09:27:00.284Z"
tags:
- linux
- htaccess
---

# How to configure `.htaccess` on apache for angular and other Single Page Applications

Allow the `.htaccess` to override the main configuration by using `AllowOverride All` settings.

```shell
<Directory "/www/htdocs">
    AllowOverride All
</Directory>
```

In `.htaccess`, we can have our override rules. In the rules below we serve different project from different directories when ever we receive a request.

```shell
RewriteEngine On
    # If an existing asset or directory is requested go to it as it is
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
    RewriteRule ^ - [L]
    # If the requested resource doesn't exist, use index.html
RewriteRule "^app1/(.*)$" "app1/index.html" [B,PT]
RewriteRule "^app2/(.*)$" "app2/index.html" [B,PT]
RewriteRule "^app3/(.*)$" "app3/index.html" [B,PT]
RewriteRule "^app4/(.*)$" "app4/index.html" [B,PT]
RewriteRule ^ /index.html
```
