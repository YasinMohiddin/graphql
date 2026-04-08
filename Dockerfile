# --- Stage 1: Build & Dependencies ---
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package files first to leverage Docker layer caching
# This ensures 'npm ci' only runs if dependencies change
COPY package*.json ./

# Use 'npm ci' instead of 'npm install' for deterministic builds in CI
RUN npm i
RUN npm run prod

# Copy the rest of the application source code
COPY . .

# If you have a build step (e.g., TypeScript or React), uncomment below:
# RUN npm run build

# --- Stage 2: Production Runtime ---
FROM node:20-alpine AS runner

# Set Environment to production
ENV NODE_ENV=development

WORKDIR /app

# Security: Don't run as root. Alpine images come with a 'node' user.
RUN chown node:node /app
USER node

# Copy only the necessary artifacts from the builder stage
# We copy node_modules and the built code (if applicable)
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app .

# Expose the port your app runs on
EXPOSE 3000

# Use 'node' directly or a process manager like tini. 
# Avoid 'npm start' in Docker as it doesn't handle OS signals (SIGTERM) well.
CMD ["node", "src/index.js"]
