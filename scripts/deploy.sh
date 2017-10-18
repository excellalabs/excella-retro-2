set -ev
$(aws ecr get-login --no-include-email --region $AWS_DEFAULT_REGION)
docker image push $AWS_REPO_URL
docker run -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY silintl/ecs-deploy -r $AWS_DEFAULT_REGION -c $AWS_ECS_CLUSTER -n $AWS_SERVICE_NAME -i $AWS_REPO_URL:latest --timeout 1000
