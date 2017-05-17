#!/bin/bash

# Update packages
sudo apt-get update

# Install curl
sudo apt-get install \
  apt-transport-https \
  ca-certificates \
  curl \
  software-properties-common

# Install python
sudo apt-get install python3

# Install pip
curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
sudo python get-pip.py

# Install AWS CLI
sudo pip install awscli

# Install Docker
sudo apt-get install docker-ce