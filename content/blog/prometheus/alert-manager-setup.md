---
title: Prometheus Alert Manger Setup
date: "2021-01-07T22:12:03.284Z"
tags:
    - prometheus
    - Alert Mananger
    - setup
    - soundcloud
---

# Overview of Alert Manager

## What is Alert Manager?

The Alertmanager handles alerts sent by client applications such as the Prometheus server. It takes care of deduplicating, grouping, and routing them to the correct receiver integration such as email, PagerDuty, or OpsGenie. It also takes care of silencing and inhibition of alerts.

## Installation

```shell
$ cd /opt/prometheus
$ git clone https://github.com/prometheus/alertmanager.git
$ cd alertmanager
$ make build
```

This will clone the alertmanager, and then we can go to alertmanager directory switch to which ever version we want to use and run the `make build` which will run all the rules and compile the shell script to build an executable file needed to run the alert manager.


## Configuration

**Prometheus Server Side**
```yaml
groups:
- name: MyMetrics #(1)
  rules:
  - alert: InstanceDown #(2)
    expr: up{job='dev-metrics'} == 0 #(3)
    for: 30m
    labels:
      severity: high
    annotations:
      summary: "Instance {{ $labels.instance }} down"
      description: "{{ $labels.instance }} of job {{ $labels.job }} has been down for more than 30 minutes."
```
> **NOTE** This configuration will go in the Prometheus Sever and should be included in `rules_files` as `nameofthefile.rules.yml` to easily identify it.

1. Name of the metric to identify this metric group.
2. Alert name that will be used to identify this rule.
3. Expression that we want to use to trigger the alerts on and  `job='dev-metrics'` is the `job_name` in our prometheus config file.

**Alert Manager Side**
```yaml
global:
  resolve_timeout: 5m
  smtp_smarthost: 'smtp.host.com' #(1)
  smtp_from: 'prometheus_alerts@hostdomain.com' #(2)
  smtp_require_tls: false #(3)

route:
  group_by: ['job']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 5m
  receiver: 'web_dev-mails' #(4)
receivers:
- name: 'web_dev-mails' #(5)
  email_configs:
  - to: 'email1@mydomain.com, email2@mydomain.com' #(6)
```
1. Our Smtp host name that we want to use to send emails.
2. The name that will be sent from.
3. If you want to use ssl or not. `default is true`
4. Name of the receiver group.
5. Receivers group name that is used to group email receivers.
6. Comma separated emails on which we want to send email alerts to.

```shell
$ cd /opt/prometheus/alertmanager
$ ./alertmanager --config.file=./alertmanager.yml  & echo $! > alertmanager.pid
```

To spin up alert manager go to alert manager directory, and the run the above command. `--config.file=./alertmanager.yml` will tell which config file to use. `$! > alertmanager.pid` will write the pid to file for later use.
