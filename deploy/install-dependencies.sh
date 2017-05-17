#!/bin/bash

# Update packages
apt-get update

# Install curl
apt-get install \
  apt-transport-https \
  ca-certificates \
  curl \
  software-properties-common

# Install python
apt-get install python3

# Install pip
curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
python get-pip.py

# Install AWS CLI
pip install awscli

# Install Docker
apt-get install docker-ce