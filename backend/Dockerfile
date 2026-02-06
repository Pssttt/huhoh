# Build stage
FROM node:25-alpine AS builder
RUN apk add --no-cache openssl
WORKDIR /app
COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm ci --legacy-peer-deps
COPY backend ./backend
WORKDIR /app/backend
RUN npx prisma generate
WORKDIR /app
RUN cd backend && npm run build

# Production stage
FROM node:25-alpine
WORKDIR /app
RUN apk add --no-cache curl openssl

COPY backend/package.json backend/package-lock.json ./backend/
RUN cd backend && npm ci --legacy-peer-deps --omit=dev

COPY --from=builder /app/backend/dist ./backend/dist

WORKDIR /app/backend

EXPOSE 3000
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "src/index.ts"]
