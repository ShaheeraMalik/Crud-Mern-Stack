# 1. Build stage
FROM node:18-alpine AS build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build   # if you have a build step; otherwise skip

# 2. Runtime stage
FROM node:18-alpine
WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app ./

# Expose the port your app listens on
EXPOSE 5000

ENTRYPOINT ["./scripts/entrypoint.sh"]
CMD ["npm", "start"]
