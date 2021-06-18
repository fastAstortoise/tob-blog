---
title: Prometheus Grafana Setup
date: "2021-01-10T22:12:03.284Z"
tags:
    - prometheus
    - grafana
    - setup
    - soundcloud
---

# Overview of Grafana

## What is Grafana ?

The Grafana project was started by Torkel Ödegaard in 2014 and has the last couple of years become one of the most popular open source projects on GitHub. It allows you to query, visualize and alert on metrics and logs no matter where they are stored.

## Installation
```
$ cd /opt/prometheus
$ wget https://dl.grafana.com/oss/release/grafana-7.3.7.linux-amd64.tar.gz
$ tar -zxvf grafana-7.3.7.linux-amd64.tar.gz
```
This will download the `tar.gz` file which is a zipped file. `tar -zxvf` will unzip the file and put everything grafana-7.3.7 folder and you can rename it to grafana or keep the same.


## Starting Up Instance

```
$ cd /opt/prometheus/grafana
$  ./bin/grafan-serve web  & echo $! > grafana.pid
```
To spin up the grafana instance we can run `./bin/grafana-serve web` and then `echo $! > grafana.pid` will write the process id to file for later access.

## Accessing the Instance

Once it's up and running you can access grafana at `localhost:3000`
