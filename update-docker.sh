#!/bin/bash

IMAGE_NAME="morgiana-web"
HOST_PORT=80
CONTAINER_PORT=80

echo "停止并刪除旧容器..."
docker stop $(docker ps -a -q --filter ancestor=$IMAGE_NAME) && docker rm $(docker ps -a -q --filter ancestor=$IMAGE_NAME)

echo "刪除旧镜像..."
docker rmi -f $IMAGE_NAME

echo "执行docker compose"
docker compose up -d

echo "Done!"