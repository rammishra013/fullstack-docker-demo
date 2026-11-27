# Stage 1: Build & Patch Dependencies
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev && npm audit fix --force

# Stage 2: Patched Production Runtime
FROM node:22-alpine
WORKDIR /app

# Patch OS-level CVEs (OpenSSL, musl, zlib)
RUN apk update && apk upgrade --no-cache

# Remove unused package managers from runtime
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx /opt/yarn*

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/node_modules ./node_modules
COPY server.js ./

USER appuser
EXPOSE 5000
CMD ["node", "server.js"]
