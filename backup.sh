#!/bin/bash

# ตั้งชื่อไฟล์ zip พร้อมวันที่และเวลา
NOW=$(date +"%Y%m%d_%H%M%S")
ZIP_NAME="travel-app-backup_$NOW.zip"

# ไฟล์และโฟลเดอร์ที่ต้องการ backup
INCLUDE=(
  ".env.backup"
  "package.json"
  "package-lock.json"
  "Dockerfile"
  "Dockerfile.dev"
  "docker-compose.yml"
  "docker-compose.dev.yml"
  "next.config.js"
  "public"
  "pages"
  "app"
  "src"
  ".gitignore"
  ".dockerignore"
  ".cursorignore"
  "reset-dev.sh"
)

# สร้าง zip file
echo "📦 Creating backup: $ZIP_NAME"
zip -r "$ZIP_NAME" "${INCLUDE[@]}" > /dev/null

echo "✅ Backup complete → $ZIP_NAME"

