FROM node:20-slim AS builder
WORKDIR /app

# Install apt build deps to support native modules during build
RUN apt-get update && apt-get install -y --no-install-recommends \
  build-essential \
  python3 \
  ca-certificates \
  git \
  && rm -rf /var/lib/apt/lists/*

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build (client + server bundle)
COPY . .
# Increase Node memory for large builds and run build verbosely
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build --if-present

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
