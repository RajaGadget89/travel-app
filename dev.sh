#!/bin/bash
echo "🚨 Cleaning old .next build..."
rm -rf .next

echo "📦 Building dev container (no-cache)..."
docker compose -f docker-compose.dev.yml down
docker builder prune -f
docker compose -f docker-compose.dev.yml build --no-cache
docker compose -f docker-compose.dev.yml up -d

