# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js app for production
RUN npm run build

# Expose the port Next.js will run on
EXPOSE 3000

# Set the environment to production
ENV NODE_ENV=production

# Start the Next.js app in production mode
CMD ["npm", "start", "--", "-p", "3000"]
