# 1. Build stage
FROM node:18-alpine AS build
WORKDIR /usr/src/app

# Copy package manifests and install deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build the React app
COPY . .
RUN npm run build

# 2. Production stage
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Remove default nginx assets
RUN rm -rf ./*

# Copy built assets from build stage
COPY --from=build /usr/src/app/build .

# Copy custom nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port and launch
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
