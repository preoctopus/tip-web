FROM nginx:alpine

# Remove default nginx config and copy our custom 8080 config
RUN rm /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy application files to nginx html folder
COPY index.html /usr/share/nginx/html/
COPY index.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY cufet_data_compact.json /usr/share/nginx/html/

# Expose port 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
