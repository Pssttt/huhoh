# Build stage
FROM node:25-alpine AS builder

WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./frontend/
RUN cd frontend && npm ci --legacy-peer-deps

COPY frontend ./frontend
WORKDIR /app/frontend

RUN npm run build

# Production stage
FROM nginx:alpine

COPY frontend/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
