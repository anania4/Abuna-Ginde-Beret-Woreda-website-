# Quick Start Guide

## Single Server Setup ✅

Your application is now configured to run on a single server with the following structure:

```
http://localhost:1337/        → Frontend (Your Website)
http://localhost:1337/admin   → Backend (Strapi Admin Panel)
http://localhost:1337/api/*   → API Endpoints
```

## First Time Setup

### 1. Build Everything

```bash
# Build the frontend
npm run build

# Build the backend admin panel
cd backend
npm run build
cd ..
```

### 2. Start the Server

```bash
cd backend
npm start
```

### 3. Access Your Application

Open your browser and navigate to:
- **Website**: http://localhost:1337
- **Admin Panel**: http://localhost:1337/admin

## Development Mode

For development with hot-reload:

```bash
# Terminal 1: Run frontend dev server (optional, for frontend development)
npm run dev

# Terminal 2: Run backend in development mode
cd backend
npm run develop
```

In development mode:
- Frontend dev server: http://localhost:5173 (with hot-reload)
- Backend serves built frontend: http://localhost:1337
- Admin panel: http://localhost:1337/admin

## Verification

Run the verification script to confirm everything is working:

```bash
node verify-routing.cjs
```

Expected output:
```
✅ http://localhost:1337       → Frontend (Your Website)
✅ http://localhost:1337/admin → Backend (Strapi Admin Panel)
✅ http://localhost:1337/api/* → API Endpoints
```

## Troubleshooting

### Admin Panel Shows 404

If `/admin` returns 404, you need to build the admin panel:

```bash
cd backend
npm run build
npm start
```

### Frontend Not Loading

Make sure the frontend is built:

```bash
npm run build
```

This creates the `dist/` directory with your production frontend files.

### Port 1337 Already in Use

Find and kill the process using port 1337:

```bash
# Windows
netstat -ano | findstr :1337
taskkill /PID <process_id> /F

# Linux/Mac
lsof -i :1337
kill -9 <process_id>
```

## Production Deployment

See [OPEN-APPLICATION.md](OPEN-APPLICATION.md) for detailed production deployment instructions.
