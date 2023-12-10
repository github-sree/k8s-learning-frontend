FROM ubuntu:20.04
USER root

RUN apt update && \
    apt install -y nginx
ADD nginx.conf /etc/nginx/

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