# Use a slim Debian-based Node image so we can install tput (ncurses)
FROM node:18-bullseye-slim

# Create app directory
WORKDIR /app

# Install system deps (ncurses provides tput)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ncurses-bin \
    && rm -rf /var/lib/apt/lists/*

# Copy package files and install dependencies (root script installs frontend/backend as needed)
COPY package.json package-lock.json ./
RUN npm ci --silent

# Copy rest of repo
COPY . ./

# Build the frontend (and backend dependencies) using root build script
RUN npm run build

# Expose default Render port
EXPOSE 10000

# Start the backend via the root `start` script which runs backend start
CMD [ "npm", "start" ]
