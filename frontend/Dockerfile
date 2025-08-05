# 1. Build stage
FROM node:18-alpine AS build
WORKDIR /usr/src/app

# Install deps
COPY package*.json ./
RUN npm install

# Copy sources & build
COPY . .
RUN npm run build

# 2. Runtime stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default assets (optional)
RUN rm -rf ./*

# Copy React build output
COPY --from=build /usr/src/app/build .

# Copy custom Nginx config from `frontend/nginx/default.conf`
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
