# Tasks: Django Serve React Frontend

## Phase 1: Django Configuration Updates

### 1.1 Update Django Settings for Port 3000
- [x] Modify Django settings to support running on port 3000
- [x] Update CORS configuration for localhost:3000
- [x] Verify ALLOWED_HOSTS includes localhost and 127.0.0.1

### 1.2 Configure React Build Directory Integration
- [x] Verify TEMPLATES configuration points to frontend/dist
- [x] Verify STATICFILES_DIRS includes frontend/dist/assets
- [x] Test that React build files are accessible

### 1.3 Update URL Configuration
- [x] Verify URL patterns maintain correct priority order
- [x] Ensure React assets are served from /assets/ prefix
- [x] Confirm React fallback pattern excludes admin/api/static/media

## Phase 2: React Frontend Configuration

### 2.1 Update React API Configuration
- [x] Modify frontend/src/config.ts for unified server setup
- [x] Set production API_BASE_URL to relative '/api'
- [x] Maintain development API_BASE_URL as absolute URL
- [x] Update image URL handling for unified server

### 2.2 Verify React Build Configuration
- [x] Confirm Vite builds to frontend/dist directory
- [x] Verify assets are placed in frontend/dist/assets
- [x] Test that build process creates proper directory structure

## Phase 3: Server Integration Testing

### 3.1 Test Unified Server Functionality
- [x] Start Django server on port 3000
- [x] Verify React frontend loads at http://localhost:3000/
- [ ] Verify Django admin loads at http://localhost:3000/admin/
- [ ] Test API endpoints at http://localhost:3000/api/

### 3.2 Test Static Asset Serving
- [ ] Verify React CSS loads from /assets/ URLs
- [ ] Verify React JavaScript loads from /assets/ URLs
- [ ] Test image assets load correctly
- [ ] Confirm Django admin static files still work

### 3.3 Test Client-Side Routing
- [ ] Navigate to React routes and verify they work
- [ ] Test browser back/forward navigation
- [ ] Verify React router handles unknown routes
- [ ] Confirm admin/API routes are not intercepted by React

## Phase 4: Development Workflow Updates

### 4.1 Update Development Scripts
- [x] Create unified development startup script
- [x] Update README with new development instructions
- [ ] Document React build requirements
- [ ] Add troubleshooting guide for common issues

### 4.2 Test Development vs Production Modes
- [ ] Test API calls work in development mode
- [ ] Test API calls work in production mode
- [ ] Verify CORS settings work correctly
- [ ] Test image URL resolution in both modes

## Phase 5: Error Handling and Edge Cases

### 5.1 Handle Missing React Build
- [ ] Test behavior when frontend/dist doesn't exist
- [ ] Ensure admin/API still work without React build
- [ ] Add graceful error handling for missing assets

### 5.2 Port Conflict Handling
- [ ] Test behavior when port 3000 is already in use
- [ ] Document alternative port configuration
- [ ] Update CORS settings for alternative ports

### 5.3 Static File Edge Cases
- [ ] Test behavior with empty assets directory
- [ ] Verify Django collectstatic works correctly
- [ ] Test static file serving in production mode

## Phase 6: Documentation and Deployment

### 6.1 Update Documentation
- [ ] Update README with unified server instructions
- [ ] Document new development workflow
- [ ] Add deployment instructions for production
- [ ] Create troubleshooting guide

### 6.2 Production Deployment Preparation
- [ ] Test configuration with DEBUG=False
- [ ] Verify static file collection works
- [ ] Test CORS settings for production domains
- [ ] Document production server requirements