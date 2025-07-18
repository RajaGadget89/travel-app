# System Patterns & Architecture

## High-Level Architecture
- Next.js (React) frontend with TailwindCSS for UI/UX
- Backend logic via Next.js API routes
- Booking data stored in Google Sheets via API
- Dockerized for local development (macOS ARM/M Series compatible)
- Deployed to Vercel for production
- Cloudflare Tunnel for secure external access during development

## Key Decisions
- Use of serverless API routes for backend logic (scalable, Vercel-friendly)
- Static data for packages initially, with future plans for DB integration
- No user authentication or admin system in MVP 