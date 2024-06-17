# 前端项目构建
FROM node:latest as build
WORKDIR /app
COPY . *.json ./
RUN npm install
COPY . .
CMD [ "npm", "run", "update" ]
CMD [ "npm", "run", "build" ]

# 获取构建文件并启动服务
# FROM node:latest
# WORKDIR /app

# COPY --from=build /app/dist ./dist
# COPY --from=build /app/server ./server
# COPY --from=build /app/node_modules ./node_modules
# COPY --from=build /app/package.json ./package.json

EXPOSE 80
CMD [ "npm", "run", "server" ]