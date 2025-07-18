# Travel App

A modern travel booking website built with Next.js, TailwindCSS, and TypeScript. Features responsive design, engaging UI/UX, and booking integration with Google Sheets.

## Features
- Landing page with video hero and trip cards
- Trip detail and booking form (multi-step, payment slip upload)
- Data storage via Google Sheets API
- Next.js API routes for backend logic
- Dockerized local development (macOS ARM/M Series compatible)
- Ready for Vercel deployment
- Cloudflare Tunnel for secure external access

## Getting Started

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for local dev)
- [Node.js](https://nodejs.org/) (if running locally without Docker)
- [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/) (for external access)

### Local Development
```sh
docker-compose up --build
```

App will be available at http://localhost:3000

### Vercel Deployment
Push to GitHub and connect your repo to Vercel for seamless deployment.

### Cloudflare Tunnel
To expose your local app externally:
```sh
cloudflared tunnel --url http://localhost:8080
```

## License
MIT
