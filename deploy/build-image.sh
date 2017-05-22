#!/bin/bash

ENV_SUFFIX=""
if [ "$TRAVIS_BRANCH" == "master" ]; then 
  ENV_SUFFIX=""
elif [ "$TRAVIS_BRANCH" == "staging" ]; then 
  ENV_SUFFIX="-stg"
elif [ "$TRAVIS_BRANCH" == "production" ]; then 
  ENV_SUFFIX="-prod"
fi

docker-compose build --pull

docker-compose run --rm dev npm run lint
# docker-compose run --rm dev ng test --browsers Chrome_no_sandbox -w false
# ocker-compose run --rm dev npm run e2e

if [ "$TRAVIS_BRANCH" == "production" ]; then 
  sudo rm -rf .com.google.Chrome*
  docker-compose run --rm dev ng build --prod
  docker-compose -f docker-compose-prod.yml build --pull
fi