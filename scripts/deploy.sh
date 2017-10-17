aws ecr get-login --no-include-email --region $AWS_DEFAULT_REGION
docker image push $AWS_REPO_URL
docker run silintl/ecs-deploy -k $accesskey -s $secretkey -r $AWS_DEFAULT_REGION -c $AWS_ECS_CLUSTER -n $AWS_SERVICE_NAME -i $AWS_REPO_URL:latest --timeout 1000
