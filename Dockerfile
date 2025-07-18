# Stage 1: Base Image for Development and Build Process
# This stage will contain all necessary tools and node_modules for `npm run dev` and `npm run build`
FROM node:20-alpine AS development

# Update APK repositories and install build tools for native modules (e.g., sharp)
# These are crucial for Next.js image optimization features on Alpine/ARM
RUN apk update && apk upgrade && \
apk add --no-cache \
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

# Set working directory inside the container
WORKDIR /app

# Copy package.json and lockfile to leverage Docker's cache
# This ensures that npm ci only runs if package.json or package-lock.json changes
COPY package.json package-lock.json ./

# Install all dependencies (development and production dependencies)
RUN npm ci --loglevel verbose

# Copy all source code from local machine into the container
COPY . .

# Set environment variables necessary for Next.js build configuration
# NEXT_OUTPUT="standalone" is crucial for generating a self-contained production build
ENV NEXT_OUTPUT="standalone"
# NEXT_SHARP_PATH helps sharp find its native binaries in the Alpine environment
ENV NEXT_SHARP_PATH="/usr/local/lib/node_modules/sharp"

# =========================================================
# PRODUCTION BUILD STAGE (Used for generating the optimized production output)
# This stage takes the result of the 'development' stage and runs `npm run build`
# You could potentially remove this stage if only ever deploying to Vercel/similar
# as they handle build process themselves. But it's good for self-hosting.
FROM development AS builder_prod

# Run Next.js build command to create the production ready output
# This will generate the .next/standalone folder
RUN npm run build


# =========================================================
# FINAL IMAGE FOR DEVELOPMENT (running npm run dev)
# This is the image that `docker-compose up` will primarily use for local development.
# It reuses the 'development' stage as it contains all necessary node_modules for `npm run dev`.
FROM development AS final_dev

# Expose the default port for the Next.js development server (3000)
# This tells Docker that the container will listen on this port.
EXPOSE 3000

# The CMD is set by docker-compose.yml for development, typically `npm run dev`


# =========================================================
# FINAL IMAGE FOR PRODUCTION (for later deployment / self-hosting)
# This stage is highly optimized for production, containing only the necessary files.
# It is commented out for now as you are focusing on development.
# Uncomment and build this stage when you are ready for production deployment.
# FROM node:20-alpine AS production

# ENV NODE_ENV production
# WORKDIR /app

# COPY --from=builder_prod /app/.next/standalone ./

# EXPOSE 3000 # Next.js production server defaults to 3000, you can change it here.
# CMD ["node", "server.js"]
