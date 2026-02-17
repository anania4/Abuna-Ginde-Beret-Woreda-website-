# Routing Configuration Summary

## Overview

Your application now runs on a **single server** with intelligent routing that separates frontend, backend admin, and API endpoints.

## URL Structure ✅

```
┌─────────────────────────────────────────────────────────────┐
│                    http://localhost:1337                    │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
   ┌─────────┐         ┌─────────┐       ┌──────────┐
   │    /    │         │ /admin  │       │  /api/*  │
   │         │         │         │       │          │
   │Frontend │         │ Backend │       │   API    │
   │Website  │         │  Admin  │       │Endpoints │
   └─────────┘         └─────────┘       └──────────┘
```

## Route Handling

### 1. Frontend Routes (/)
- **Pattern**: `/`, `/about`, `/contact`, etc.
- **Handler**: Static Frontend Middleware
- **Serves**: Built frontend from `dist/` directory
- **Features**:
  - Serves `index.html` for root route
  - Serves static assets (CSS, JS, images)
  - SPA fallback for client-side routing

### 2. Backend Admin (/admin)
- **Pattern**: `/admin`, `/admin/*`
- **Handler**: Strapi Admin Panel
- **Serves**: Strapi administration interface
- **Features**:
  - Content management
  - Media library
  - User management
  - System settings

### 3. API Routes (/api/*)
- **Pattern**: `/api/*`
- **Handler**: Strapi API Router
- **Serves**: JSON API responses
- **Examples**:
  - `/api/sectors` - Get all sectors
  - `/api/news` - Get all news
  - `/api/projects` - Get all projects

### 4. Other Strapi Routes
- `/uploads/*` - Media files
- `/_health` - Health check endpoint
- `/i18n/*` - Internationalization
- `/users-permissions/*` - User authentication

## Middleware Order

The middleware stack processes requests in this order:

```typescript
[
  'strapi::logger',      // 1. Log all requests
  'strapi::errors',      // 2. Error handling
  'strapi::security',    // 3. Security headers
  'strapi::cors',        // 4. CORS configuration
  'strapi::poweredBy',   // 5. X-Powered-By header
  'strapi::query',       // 6. Query parsing
  'strapi::body',        // 7. Body parsing
  'strapi::session',     // 8. Session handling
  'strapi::favicon',     // 9. Favicon serving
  'strapi::public',      // 10. Public uploads folder
  'global::static-frontend'  // 11. Custom static middleware
]
```

## How It Works

### Request Flow

```
Incoming Request
    │
    ├─ Is it /admin or /api/* ?
    │  └─ YES → Strapi handles it (Admin Panel or API)
    │
    └─ NO → Static Frontend Middleware
        │
        ├─ Does static file exist?
        │  └─ YES → Serve the file
        │
        └─ NO → Serve index.html (SPA fallback)
```

### Example Requests

1. **GET /**
   - Middleware: Static Frontend
   - Response: `dist/index.html`
   - Content-Type: `text/html`

2. **GET /assets/index-BSPGHGbv.css**
   - Middleware: Static Frontend
   - Response: CSS file from `dist/assets/`
   - Content-Type: `text/css`

3. **GET /admin**
   - Middleware: Strapi Admin
   - Response: Admin panel HTML
   - Content-Type: `text/html`

4. **GET /api/sectors**
   - Middleware: Strapi API
   - Response: JSON data
   - Content-Type: `application/json`

5. **GET /some-page** (doesn't exist)
   - Middleware: Static Frontend
   - Response: `dist/index.html` (SPA fallback)
   - Content-Type: `text/html`

## Security Features

### Path Validation
- Prevents directory traversal attacks
- Validates all file paths
- Rejects paths containing `..`

### Route Priority
- API routes always take precedence
- Static files only served from allowed directories
- Admin panel protected by Strapi authentication

## Cache Configuration

### Development Mode
```javascript
cacheControl: 'no-cache'
```

### Production Mode
```javascript
cacheControl: 'public, max-age=31536000'  // 1 year
```

Note: `index.html` always uses `no-cache` to support SPA routing.

## Testing

Verify the routing configuration:

```bash
node verify-routing.cjs
```

Expected output:
```
✅ http://localhost:1337       → Frontend (Your Website)
✅ http://localhost:1337/admin → Backend (Strapi Admin Panel)
✅ http://localhost:1337/api/* → API Endpoints
```

## Files Involved

### Middleware Implementation
- `backend/src/middlewares/static-frontend.ts` - Custom static file middleware

### Configuration
- `backend/config/middlewares.ts` - Middleware stack configuration

### Frontend Build
- `dist/` - Built frontend files (created by `npm run build`)

### Backend Build
- `backend/dist/` - Built backend files
- `backend/node_modules/@strapi/admin/dist/` - Built admin panel

## Benefits

✅ **Single Port**: Everything runs on port 1337
✅ **Simplified Deployment**: One server to manage
✅ **No CORS Issues**: Frontend and backend on same origin
✅ **Clean URLs**: Professional URL structure
✅ **SPA Support**: Client-side routing works seamlessly
✅ **Security**: Path validation and route prioritization
✅ **Performance**: Production caching for static assets
