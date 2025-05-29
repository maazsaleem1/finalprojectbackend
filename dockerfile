# Use official Node.js image as base
FROM node:20 as build

# Create app directory
WORKDIR /app

# Install dependencies first for better layer caching
COPY package*.json ./

# Install production dependencies
RUN npm install 

# Copy application files
COPY . .

# Create the uploads directory
RUN mkdir -p public/uploads

# Expose the application port
EXPOSE 8002

# Command to run the application
CMD ["npm", "run", "dev"]