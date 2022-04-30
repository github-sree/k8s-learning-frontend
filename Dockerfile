FROM nginx:alpine
COPY /dist/k8s-learning-frontend /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
# Permission
RUN chown root /usr/share/nginx/html/*
RUN chmod 755 /usr/share/nginx/html/*

# Expose port
EXPOSE 80

# Start
CMD ["nginx", "-g", "daemon off;"]