FROM node:20-slim AS builder
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build (client + server bundle)
COPY . .
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

# Install runtime deps only
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

# Copy build artifacts
COPY --from=builder /app/dist ./dist

EXPOSE 5000
ENV PORT=5000

CMD ["node", "dist/index.cjs"]
