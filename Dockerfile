# Build stage
FROM node:20-slim AS builder
WORKDIR /app
RUN npm install -g pnpm
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npx expo export --platform web

# Final stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
