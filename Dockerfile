# Stage 1: Build/Preparation
FROM nginx:stable-alpine

# Remove default Nginx config so we can use our custom one
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Clean out the default Nginx directory
RUN rm -rf /usr/share/nginx/html/*

# Copy all the website assets (HTML, assets/, images/) into the Nginx HTML folder
# .dockerignore ensures we don't copy markdown or python files
COPY . /usr/share/nginx/html/

# Expose port 8080 to the outside world
EXPOSE 8080

# Start Nginx and run in the foreground
CMD ["nginx", "-g", "daemon off;"]
