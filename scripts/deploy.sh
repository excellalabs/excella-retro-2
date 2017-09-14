aws ecr get-login --no-include-email --region $AWS_REGION
docker image push $AWS_REPO_URL
docker run silintl/ecs-deploy -c $AWS_ECS_CLUSTER -n $AWS_SERVICE_NAME -i $AWS_REPO_URL:latest -r $AWS_REGION --timeout 1000 -k $AWS_ACCESS_KEY_ID -s $AWS_SECRET_ACCESS_KEY
