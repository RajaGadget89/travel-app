# ✅ STAGE 1: Development base (ติดตั้ง dependencies)
FROM node:20-alpine AS development

RUN apk add --no-cache \
  build-base \
  python3 \
  git \
  vips-dev \
  autoconf \
  automake \
  libtool \
  libffi-dev \
  nasm \
  gcompat \
  jpeg-dev \
  cairo-dev \
  pango-dev \
  gdk-pixbuf-dev \
  libwebp-dev

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --loglevel verbose
COPY . .

ENV NEXT_OUTPUT=standalone
ENV NEXT_SHARP_PATH="/usr/local/lib/node_modules/sharp"

# ✅ STAGE 2: Build the production output
FROM development AS builder_prod
RUN npm run build

# ✅ STAGE 3: Final Production Image (copy only what's needed)
FROM node:20-alpine AS final_production

ENV NODE_ENV=production
WORKDIR /app

# ✅ สำคัญ: Copy static assets อย่างครบถ้วน
COPY --from=builder_prod /app/.next/standalone ./
COPY --from=builder_prod /app/.next/static ./.next/static
COPY --from=builder_prod /app/public ./public
COPY --from=builder_prod /app/next.config.t_

