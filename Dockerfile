FROM ubuntu:20.04
USER root
## install angular components
ENV NODE_VERSION=16.13.0
RUN apt update && apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

FROM node:alpine as build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

RUN apt update && apt install -y nginx
ADD nginx.conf /etc/nginx/
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

RUN groupadd -g 1002360000 nginx && \
useradd -l -r -d /home/nginx -u 1002360000 -g nginx nginx && \
 chown -R nginx:nginx /var/log/nginx /var/lib/nginx && \
 chown -R nginx:nginx /etc/nginx/* && chown -R nginx:nginx /var/run/ && \
 chown -R nginx:nginx /usr/share/nginx/
USER nginx
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## copy over the artifacts in dist folder to default nginx public folder
COPY dist/ /usr/share/nginx/html

EXPOSE 8099

CMD ["nginx", "-g", "daemon off;"]
