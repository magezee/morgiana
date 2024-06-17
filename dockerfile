FROM node:latest

WORKDIR /docker-marisue
COPY . /marisue-project-container
WORKDIR /marisue-project-container
RUN npm install 
CMD [ "npm", "run", "dev:server" ]

