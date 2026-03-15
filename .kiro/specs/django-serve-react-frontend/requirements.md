# Requirements Document: Django Serve React Frontend

## 1. Functional Requirements

### 1.1 Unified Server Configuration
The system SHALL configure Django to serve both the React frontend and Django admin panel on port 3000.

### 1.2 Route Handling Priority
The system SHALL handle requests in the following priority order:
- `/admin/*` routes to Django admin panel
- `/api/*` routes to Django REST API endpoints  
- `/static/*` routes to Django static files
- `/media/*` routes to Django media files
- `/assets/*` routes to React build assets
- All other routes route to React frontend for client-side routing

### 1.3 React Frontend Serving
The system SHALL serve the React application built files from the `frontend/dist` directory.

### 1.4 Static Asset Management
The system SHALL serve React static assets (CSS, JavaScript, images) from the `/assets/` URL prefix.

### 1.5 API Accessibility
The system SHALL maintain full functionality of all existing Django REST API endpoints at `/api/` prefix.

### 1.6 Admin Panel Access
The system SHALL maintain full functionality of Django admin panel at `/admin/` prefix.

### 1.7 Client-Side Routing Support
The system SHALL serve React's `index.html` for all routes not matching admin, API, static, or media patterns to enable client-side routing.

### 1.8 Development vs Production Configuration
The system SHALL support both development and production modes with appropriate API endpoint configuration.

## 2. Non-Functional Requirements

### 2.1 Performance Requirements
- React static assets SHALL be served efficiently by Django
- Template caching SHALL be disabled for `index.html` in development mode
- API response times SHALL not be degraded by the unified server configuration

### 2.2 Security Requirements
- CORS configuration SHALL restrict origins to authorized domains
- Django admin panel SHALL maintain existing authentication and authorization
- API endpoints SHALL maintain existing security measures
- React build files SHALL not expose sensitive configuration data

### 2.3 Reliability Requirements
- The system SHALL gracefully handle missing React build files
- The system SHALL provide clear error messages for configuration issues
- Admin and API functionality SHALL remain available even if React frontend fails

### 2.4 Compatibility Requirements
- The system SHALL work with existing Django project structure
- The system SHALL work with existing React frontend built with Vite
- The system SHALL maintain compatibility with existing API clients

## 3. Technical Requirements

### 3.1 Django Configuration
- Django settings SHALL include React build directory in TEMPLATES configuration
- Django settings SHALL include React assets in STATICFILES_DIRS
- Django SHALL run on port 3000 instead of default port 8000
- CORS settings SHALL allow requests from localhost:3000

### 3.2 URL Configuration
- URL patterns SHALL be ordered by priority (admin, API, static, media, assets, React fallback)
- React asset serving SHALL use Django's static file serving mechanism
- React fallback pattern SHALL exclude admin, API, static, and media prefixes

### 3.3 React Build Configuration
- React frontend SHALL build to `frontend/dist` directory
- React assets SHALL be placed in `frontend/dist/assets` directory
- React configuration SHALL use relative API URLs in production mode
- React configuration SHALL use absolute API URLs in development mode

### 3.4 Template Configuration
- Django IndexView SHALL serve React's `index.html` template
- Template caching SHALL be disabled for development
- Template directory SHALL point to React build directory

## 4. Acceptance Criteria

### 4.1 Server Startup
- GIVEN Django is configured for unified serving
- WHEN the server starts with `python manage.py runserver 0.0.0.0:3000`
- THEN the server SHALL start successfully on port 3000

### 4.2 React Frontend Access
- GIVEN the server is running on port 3000
- WHEN a user navigates to `http://localhost:3000/`
- THEN the React application SHALL load successfully

### 4.3 Admin Panel Access
- GIVEN the server is running on port 3000
- WHEN a user navigates to `http://localhost:3000/admin/`
- THEN the Django admin panel SHALL load successfully

### 4.4 API Endpoint Access
- GIVEN the server is running on port 3000
- WHEN a request is made to `http://localhost:3000/api/news/`
- THEN the API SHALL return the expected JSON response

### 4.5 Static Asset Loading
- GIVEN the React frontend is loaded
- WHEN the browser requests React assets (CSS, JS, images)
- THEN all assets SHALL load successfully from `/assets/` URLs

### 4.6 Client-Side Routing
- GIVEN the React frontend is loaded
- WHEN a user navigates to a React route (e.g., `/about`)
- THEN the React router SHALL handle the route without server errors

### 4.7 Development Mode Configuration
- GIVEN the system is in development mode
- WHEN React makes API calls
- THEN API calls SHALL work correctly with the configured endpoints

### 4.8 Production Mode Configuration
- GIVEN the system is in production mode
- WHEN React makes API calls
- THEN API calls SHALL use relative URLs and work correctly

## 5. Constraints

### 5.1 Technical Constraints
- The solution SHALL use existing Django and React codebases without major refactoring
- The solution SHALL not require additional web servers or reverse proxies
- The solution SHALL work with Django's built-in development server
- The solution SHALL be compatible with Django's static file handling

### 5.2 Operational Constraints
- React frontend MUST be built before Django can serve it
- Port 3000 MUST be available for Django server
- React build directory MUST exist and contain valid build files
- Django static files MUST be properly configured

### 5.3 Development Constraints
- Developers SHALL be able to run the entire application with a single Django server command
- Hot reloading for React development SHALL be handled separately if needed
- The configuration SHALL support both development and production deployments