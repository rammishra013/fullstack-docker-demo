# Stage 1: Prepare static assets
FROM alpine:3.19 AS builder
WORKDIR /build
COPY index.html .

# Stage 2: Serve with patched Nginx
FROM nginx:alpine

# Patch OS-level CVEs (upgrades libxml2 to 2.13.9-r5+)
RUN apk update && apk upgrade --no-cache

# Remove default nginx config and add custom proxy config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/
COPY --from=builder /build/index.html /usr/share/nginx/html/index.html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
