#!/bin/bash

IMAGE_NAME="morgiana-web"
HOST_PORT=80
CONTAINER_PORT=80

echo "停止并刪除旧容器..."
docker stop $(docker ps -a -q --filter ancestor=$IMAGE_NAME) && docker rm $(docker ps -a -q --filter ancestor=$IMAGE_NAME)

echo "刪除旧镜像..."
docker rmi -f $IMAGE_NAME

echo "构建新镜像..."
docker build -t $IMAGE_NAME .

echo "运行新容器..."
docker run -d -p $HOST_PORT:$CONTAINER_PORT $IMAGE_NAME

echo "Done!"