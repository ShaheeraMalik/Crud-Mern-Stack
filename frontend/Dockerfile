# 1. Build stage
FROM node:18-alpine AS build

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source & build
COPY . .
RUN npm run build

# 2. Runtime stage
FROM nginx:alpine

# Replace default Nginx config if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Serve React build output
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Launch Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
