ENV_SUFFIX="-demo"
if [ "$CI_BRANCH" == "master" ]; then 
  ENV_SUFFIX="-demo"
elif [ "$CI_BRANCH" == "staging" ]; then 
  ENV_SUFFIX="-stg"
elif [ "$CI_BRANCH" == "production" ]; then 
  ENV_SUFFIX="-prod"
fi

docker-compose -f src/docker-compose$ENV_SUFFIX.yml build
docker-compose -f src/docker-compose$ENV_SUFFIX.yml up -d && docker ps