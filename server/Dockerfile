FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Create typst directory if not exists
RUN mkdir -p typst

# Build TypeScript code
RUN npm run build

# Expose the port
EXPOSE 8080

# Start the server
CMD ["node", "dist/server.js"] 