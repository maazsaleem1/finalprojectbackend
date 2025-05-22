# Use official Node.js image as base
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first for better layer caching
COPY package*.json ./

# Install production dependencies
RUN npm install 

# Copy application files
COPY . .

# Create the uploads directory
RUN mkdir -p public/uploads

# Environment variables (you can also pass these at runtime)
ENV NODE_ENV=production
ENV PORT=8002

# Expose the application port
EXPOSE 8002

# Command to run the application
CMD ["npm", "run", "serve"]