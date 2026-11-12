# Build stage
FROM node:22-slim AS builder
WORKDIR /app
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm exec expo export --platform web

# Final stage: nginx-unprivileged ja roda como UID 101 (sem root)
FROM nginxinc/nginx-unprivileged:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8080
