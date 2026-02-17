# Deployment Guide: Serving Frontend from Backend

This guide explains how to deploy the application with the Strapi backend serving the frontend application through a single server endpoint.

## Overview

The application uses a custom Strapi middleware to serve the frontend (HTML, CSS, JavaScript, and other static assets) from the backend server. This eliminates the need to run separate frontend and backend servers in production.

## Architecture

```
Single Server (Strapi Backend)
├── API Routes (/api/*, /admin/*, /uploads/*)
│   └── Handled by Strapi routing system
└── All Other Routes
    ├── Static files (if they exist)
    └── index.html (SPA fallback)
```

## Prerequisites

- Node.js (version specified in package.json)
- npm or yarn
- Built frontend application
- Configured Strapi backend

## Development Mode

### Running Locally

1. **Start the backend in development mode:**
   ```bash
   cd backend
   npm run develop
   ```

2. **Access the application:**
   - Frontend: http://localhost:1337/
   - Admin Panel: http://localhost:1337/admin
   - API: http://localhost:1337/api/*

### Development Configuration

In development mode:
- Cache-Control: `no-cache` (for all static files)
- Hot reloading enabled for backend changes
- Frontend changes require browser refresh

## Production Mode

### Building for Production

1. **Build the frontend application:**
   ```bash
   # From project root
   npm run build
   ```
   This creates optimized production files (index.html, CSS, JS) in the project root and dist folder.

2. **Build the Strapi admin panel:**
   ```bash
   cd backend
   npm run build
   ```

### Running in Production

1. **Set environment to production:**
   ```bash
   export NODE_ENV=production
   ```
   
   Or on Windows:
   ```cmd
   set NODE_ENV=production
   ```

2. **Start the server:**
   ```bash
   cd backend
   npm run start
   ```

3. **Access the application:**
   - Frontend: http://your-domain.com/
   - Admin Panel: http://your-domain.com/admin
   - API: http://your-domain.com/api/*

### Production Configuration

In production mode:
- Cache-Control: `public, max-age=31536000` (1 year for static assets)
- Cache-Control: `no-cache` (for index.html to support SPA routing)
- Auto-reload disabled for better performance
- Optimized asset delivery

## Verifying Production Cache Headers

To verify that Cache-Control headers are set correctly in production:

1. **Start the server in production mode:**
   ```bash
   cd backend
   NODE_ENV=production npm run start
   ```

2. **Run the test script:**
   ```bash
   node backend/test-production-cache.js
   ```

3. **Or manually check with curl:**
   ```bash
   # Check static asset (should have long cache)
   curl -I http://localhost:1337/src/style.css
   
   # Check index.html (should have no-cache)
   curl -I http://localhost:1337/
   ```

Expected headers:
- Static assets (CSS, JS, images): `Cache-Control: public, max-age=31536000`
- index.html: `Cache-Control: no-cache`

## Environment Variables

### Required Variables

Create a `.env` file in the `backend` directory:

```env
# Server
HOST=0.0.0.0
PORT=1337

# Secrets
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Node Environment
NODE_ENV=production
```

### Security Considerations

- Never commit `.env` files to version control
- Use strong, unique secrets for production
- Rotate secrets regularly
- Use environment-specific configurations

## Deployment Options

### Option 1: Traditional Server (VPS, EC2, etc.)

1. **Install dependencies:**
   ```bash
   npm install --production
   cd backend
   npm install --production
   ```

2. **Build applications:**
   ```bash
   npm run build
   cd backend
   npm run build
   ```

3. **Use a process manager (PM2):**
   ```bash
   npm install -g pm2
   cd backend
   pm2 start npm --name "strapi-app" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure reverse proxy (nginx):**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:1337;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Option 2: Docker

Create a `Dockerfile` in the project root:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm install --production
RUN cd backend && npm install --production

# Copy application files
COPY . .

# Build applications
RUN npm run build
RUN cd backend && npm run build

# Expose port
EXPOSE 1337

# Set environment
ENV NODE_ENV=production

# Start application
CMD ["npm", "run", "start", "--prefix", "backend"]
```

Build and run:
```bash
docker build -t strapi-app .
docker run -p 1337:1337 -e NODE_ENV=production strapi-app
```

### Option 3: Platform as a Service (Heroku, Railway, etc.)

1. **Configure build command:**
   ```json
   {
     "scripts": {
       "build": "npm run build && cd backend && npm run build",
       "start": "cd backend && npm run start"
     }
   }
   ```

2. **Set environment variables** in the platform dashboard

3. **Deploy** using platform-specific commands

## Performance Optimization

### Recommended Optimizations

1. **Use a CDN** for static assets in production
2. **Enable gzip compression** in your reverse proxy
3. **Use HTTP/2** for better performance
4. **Implement rate limiting** for API endpoints
5. **Monitor server resources** and scale as needed

### Nginx Configuration Example

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Static file caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:1337;
        proxy_cache_valid 200 1y;
        add_header Cache-Control "public, max-age=31536000";
    }

    # Proxy all other requests
    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Troubleshooting

### Frontend Not Loading

1. **Check if index.html exists** in the project root
2. **Verify middleware configuration** in `backend/config/middlewares.ts`
3. **Check server logs** for errors
4. **Verify NODE_ENV** is set correctly

### Static Assets Not Loading

1. **Check file paths** in index.html (should be relative)
2. **Verify files exist** in the expected directories
3. **Check MIME types** in browser developer tools
4. **Review middleware logs** for file resolution issues

### API Routes Not Working

1. **Verify API routes** start with `/api/`, `/admin/`, or `/uploads/`
2. **Check CORS configuration** in `backend/config/middlewares.ts`
3. **Review Strapi logs** for routing errors

### Cache Issues

1. **Clear browser cache** or use incognito mode
2. **Verify Cache-Control headers** with curl or browser dev tools
3. **Check NODE_ENV** is set to production
4. **Restart the server** after configuration changes

## Monitoring and Maintenance

### Health Checks

Create a health check endpoint:
```bash
curl http://localhost:1337/api/health
```

### Log Management

- Use PM2 for log rotation: `pm2 logs strapi-app`
- Configure Strapi logging in `backend/config/server.ts`
- Monitor error logs regularly

### Backup Strategy

1. **Database backups** (regular automated backups)
2. **Media files backups** (`backend/public/uploads/`)
3. **Configuration backups** (`.env` files, configs)

## Security Checklist

- [ ] Strong, unique secrets in production
- [ ] HTTPS enabled (SSL/TLS certificate)
- [ ] CORS configured for production domains only
- [ ] Rate limiting enabled
- [ ] Security headers configured
- [ ] Regular dependency updates
- [ ] Database access restricted
- [ ] File upload limits configured
- [ ] Admin panel access restricted

## Support and Resources

- [Strapi Documentation](https://docs.strapi.io)
- [Strapi Deployment Guide](https://docs.strapi.io/dev-docs/deployment)
- [Strapi Community Discord](https://discord.strapi.io)

## Changelog

### Version 1.0.0
- Initial deployment guide
- Production cache optimization
- Multiple deployment options documented
