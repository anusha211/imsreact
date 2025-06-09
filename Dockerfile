# Step 1: Use an official node image as the base image
FROM node:18-alpine AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code
COPY . .

# Step 6: Build the React app
RUN npm run build

# Step 7: Use an Nginx image to serve the React app
FROM nginx:alpine

# Step 8: Copy the build files to the Nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose the port Nginx is running on
EXPOSE 80

# Step 10: Start Nginx
CMD ["nginx", "-g", "daemon off;"]
