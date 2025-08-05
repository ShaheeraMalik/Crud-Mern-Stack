# Use the official Node.js 18 image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy app source
COPY . .

# Expose the port your app listens on
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
