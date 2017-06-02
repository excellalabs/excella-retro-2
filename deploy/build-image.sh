#!/bin/bash
set -x

ENV_SUFFIX=""
if [ "$TRAVIS_BRANCH" == "master" ]; then
  ENV_SUFFIX=""
elif [ "$TRAVIS_BRANCH" == "staging" ]; then
  ENV_SUFFIX="-stg"
elif [ "$TRAVIS_BRANCH" == "production" ]; then
  ENV_SUFFIX="-prod"
fi

docker-compose build --pull

# docker-compose run excella-retro npm run lint
# docker-compose run ng test --browsers Chrome_no_sandbox -w false
# docker-compose run npm run e2e

docker-compose run excella-retro npm cache clean
docker-compose run excella-retro ng build --prod

if [ "$TRAVIS_BRANCH" == "production" ]; then
  docker-compose -f docker-compose-prod.yml up -d
fi
