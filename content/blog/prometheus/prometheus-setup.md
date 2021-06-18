---
title: Prometheus Setup
date: "2021-01-14T22:12:03.284Z"
tags:
    - prometheus
    - server
    - setup
    - soundcloud
---


# Overview of Prometheus Server

## What is Prometheus?

[Prometheus](https://prometheus.io/docs/introduction/overview/) is an open-source systems monitoring and alerting toolkit originally built at [SoundCloud](https://soundcloud.com/). Since its inception in 2012, many companies and organizations have adopted Prometheus, and the project has a very active developer and user community. It is now a standalone open source project and maintained independently of any company. To emphasize this, and to clarify the project's governance structure, Prometheus joined the [Cloud Native Computing Foundation](https://www.cncf.io/) in 2016 as the second hosted project, after [Kubernetes](https://kubernetes.io/).


## Installation

Prometheus is based on `GO lang`. You must install it on the system and add `GOPATH` to the path variables so that it can be accessible by prometheus scripts.

```
$ mkdir -p /opt/prometheus/prom-server
$ cd /opt/prometheus/prom-server
$ git clone https://github.com/prometheus/prometheus.git
$ cd prometheus
$ make build
```

## Configuration

```yaml
global:
  scrape_interval: 15s
  scrape_timeout: 10s
  evaluation_interval: 15s
  external_labels:
    monitor: monitoring-service #(1)
alerting:
  alertmanagers:
    - scheme: http
      timeout: 10s
      api_version: v1
      static_configs:
        - targets:
            - localhost:9093 #(2)
rule_files:
  - your-server.rules.yml #(3)
scrape_configs: #(4)
  - job_name: prometheus  
    honor_timestamps: true
    scrape_interval: 15s
    scrape_timeout: 10s
    metrics_path: /metrics
    scheme: http
    static_configs:
      - targets:
          - localhost:9090
  - job_name: dev-metrics
    honor_timestamps: true
    scrape_interval: 5s
    scrape_timeout: 5s
    metrics_path: /services/actuator/prometheus #(5)
    scheme: http
    static_configs:
      - targets: #(6)
          #- **.220.*.**
          #- **.220.*.**
  - job_name: dtv-system-node-metrics
    honor_timestamps: true
    scrape_interval: 5s
    scrape_timeout: 5s
    metrics_path: prometheus-metrics
    scheme: http
    static_configs:
      - targets:
          #- yourhost1.com:port
          #- yourhost2.com:port
```

1. Label that will be used to identify service.
2. List of targets where alert manager instance will be running.
3. List of rules on which you want trigger alerts.
4. List of configs where you will add the jobs and path to the exposed prometheus metrics.
5. Path to the prometheus expose metrics
6. List of target/host:Port where your services for metrics are running.

## Starting Up Prometheus components

```
$ cd /opt/prometheus/prom-server
$ ./prometheus --config.file=./prometheus.yml --web.enable-lifecycle  & echo $! >  prometheus.pid // (1)

``` 

1. Goto directory where prometheus resides and tell it which config file you want to run using flag `--config.file`. `--web.enable-lifecycle` will enable the web hooks to reload and do other things with just `cURL` requests and finally `& ehco $! > prometheus.pid` will write the process id to file so that we can easily identify the process later.


## Restarting Prometheus Configuration
Following web api can be used to reload the configuration on prometheus.

```
curl -X POST http://prometheus-server(app 5):port(9090)/-/reload
```
