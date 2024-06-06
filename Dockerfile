### STAGE 1: Build ###
FROM node AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm ci

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
ADD nginx.conf /etc/nginx/
# RUN groupadd -g 1002360000 nginx && \
# useradd -l -r -d /home/nginx -u 1002360000 -g nginx nginx && \
#  chown -R nginx:nginx /var/log/nginx /var/lib/nginx && \
#  chown -R nginx:nginx /etc/nginx/* && chown -R nginx:nginx /var/run/ && \
#  chown -R nginx:nginx /usr/share/nginx/
# USER nginx
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*
RUN cd /usr/src/app && ls -l
## copy over the artifacts in dist folder to default nginx public folder
COPY --from=build /usr/src/app/dist/k8s-learning-frontend /usr/share/nginx/html

EXPOSE 8099

CMD ["nginx", "-g", "daemon off;"]
