#! /bin/bash

bash ./install-dependencies.sh
bash ./build-image.sh
bash ./push-to-ecr.sh
