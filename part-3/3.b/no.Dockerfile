# Stage 1: Building the backend
FROM node:14 AS backend-builder

WORKDIR /app/backend

# Copy backend files and install dependencies
COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# Stage 2: Building the frontend
FROM node:14 AS frontend-builder

WORKDIR /app/frontend

# Copy frontend files and install dependencies
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .

# Build the frontend
RUN npm run build

# Stage 3: Final stage
FROM node:14

WORKDIR /app

# Copy backend and built frontend from previous stages
COPY --from=backend-builder /app/backend /app
COPY --from=frontend-builder /app/frontend/dist /app/public

# Expose the ports your app uses
EXPOSE 3001 5173

# Command to run your application (update this according to your start script)
CMD ["npm", "run", "dev"]
