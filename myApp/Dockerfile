# Use an official Node.js runtime as a parent image
FROM node:22.12.0

# Set the working directory
WORKDIR /frontendApp

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install serve to serve the build
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["serve", "-s", "browser", "-l", "8080"]