# Design Document: Serve Frontend from Backend

## Overview

This design enables the Strapi backend to serve the frontend application (index.html and static assets) at the root route while maintaining all existing API functionality. The solution uses Strapi's middleware system to add custom static file serving that integrates seamlessly with the existing routing infrastructure.

## Architecture

The solution consists of three main components:

1. **Custom Static Middleware**: A Koa middleware that serves static files from the project root
2. **Middleware Configuration**: Integration into Strapi's middleware stack with proper ordering
3. **Route Priority System**: Ensures API routes take precedence over static file serving

### High-Level Flow

```
Incoming Request
    ↓
Strapi Middleware Stack
    ↓
Is it an API route? (/api/*, /admin/*, /uploads/*)
    ↓ YES → Strapi Router (existing API handling)
    ↓ NO
    ↓
Static File Middleware
    ↓
Does file exist?
    ↓ YES → Serve file with correct MIME type
    ↓ NO
    ↓
Is it a non-API route?
    ↓ YES → Serve index.html (SPA fallback)
    ↓ NO → 404
```

## Components and Interfaces

### 1. Static File Middleware

**Location**: `backend/src/middlewares/static-frontend.ts`

**Purpose**: Serves static files from the project root directory

**Interface**:
```typescript
interface StaticMiddlewareConfig {
  rootDir: string;           // Path to project root
  indexFile: string;         // Name of index file (default: 'index.html')
  cacheControl?: string;     // Cache-Control header for production
}

function staticFrontendMiddleware(
  config: StaticMiddlewareConfig,
  { strapi }: { strapi: Core.Strapi }
): Koa.Middleware
```

**Behavior**:
- Resolves requested paths relative to project root
- Checks if file exists using `fs.existsSync()`
- Serves file with appropriate Content-Type header
- Falls back to index.html for non-API routes (SPA support)
- Skips processing for API routes (/api/*, /admin/*, /uploads/*)

### 2. MIME Type Resolution

**Purpose**: Maps file extensions to Content-Type headers

**Implementation**:
```typescript
const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}
```

### 3. Middleware Configuration

**Location**: `backend/config/middlewares.ts`

**Integration Point**: The static middleware must be added AFTER `strapi::public` but BEFORE the router processes requests.

**Updated Configuration**:
```typescript
const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: { /* existing CORS config */ }
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  // Add custom static middleware here
  {
    name: 'global::static-frontend',
    config: {
      rootDir: path.resolve(__dirname, '../..'),
      indexFile: 'index.html',
      cacheControl: process.env.NODE_ENV === 'production' 
        ? 'public, max-age=31536000' 
        : 'no-cache'
    }
  }
];
```

## Data Models

No new data models are required. This feature only involves serving static files.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Root route serves index.html

*For any* HTTP GET request to the root path ("/"), the server should return a response with status 200, Content-Type "text/html", and body containing the index.html file content.

**Validates: Requirements 1.1**

### Property 2: Static assets served with correct MIME types

*For any* static file request (CSS, JS, images, fonts), the server should return the file with a Content-Type header that matches the file extension.

**Validates: Requirements 1.2, 2.4**

### Property 3: API routes remain functional

*For any* request to an API route pattern (/api/*, /admin/*, /uploads/*), the server should process it through Strapi's routing system and return an API response (not a static file).

**Validates: Requirements 1.3, 1.4, 3.1**

### Property 4: Non-API routes attempt static file serving

*For any* request that doesn't match an API route pattern, the server should first attempt to serve it as a static file from the project root.

**Validates: Requirements 3.2**

### Property 5: SPA fallback for non-existent routes

*For any* request to a non-existent path that is not an API route, the server should return the index.html file (to support client-side routing).

**Validates: Requirements 3.3**

### Property 6: Production caching headers

*For any* static file request in production mode, the server should include appropriate Cache-Control headers in the response.

**Validates: Requirements 4.3**

## Error Handling

### File Not Found
- **Scenario**: Requested static file doesn't exist and path is not an API route
- **Handling**: Serve index.html (SPA fallback)
- **Status Code**: 200 (serving index.html)

### API Route Not Found
- **Scenario**: API route doesn't exist
- **Handling**: Let Strapi's error handler manage it
- **Status Code**: 404 (Strapi default)

### File Read Error
- **Scenario**: File exists but cannot be read (permissions, corruption)
- **Handling**: Log error and return 500
- **Status Code**: 500

### Invalid Path
- **Scenario**: Path contains invalid characters or attempts directory traversal
- **Handling**: Reject request
- **Status Code**: 400

## Testing Strategy

### Unit Tests

Unit tests will verify specific examples and edge cases:

1. **Root route test**: Verify GET "/" returns index.html
2. **Specific asset tests**: Verify CSS, JS, and image files are served correctly
3. **API route test**: Verify /api/sectors returns JSON (not static file)
4. **Invalid path test**: Verify paths with ".." are rejected
5. **Development mode test**: Verify no-cache headers in development
6. **Production mode test**: Verify caching headers in production

### Property-Based Tests

Property-based tests will verify universal properties across many inputs:

1. **MIME type property**: Generate random file extensions and verify correct Content-Type
2. **API route priority property**: Generate random API paths and verify they return API responses
3. **Static file serving property**: Generate random valid file paths and verify they are served
4. **SPA fallback property**: Generate random non-existent paths and verify index.html is returned
5. **Caching header property**: Generate random static file requests in production and verify Cache-Control headers

**Configuration**:
- Minimum 100 iterations per property test
- Use a property-based testing library appropriate for Node.js/TypeScript (e.g., fast-check)
- Each test tagged with: **Feature: serve-frontend-from-backend, Property {number}: {property_text}**

### Integration Tests

1. Start Strapi server with static middleware enabled
2. Make HTTP requests to verify end-to-end behavior
3. Test both development and production modes

## Implementation Notes

### Path Resolution
- Use `path.resolve()` to safely resolve file paths
- Validate paths to prevent directory traversal attacks
- Normalize paths to handle different OS path separators

### Performance Considerations
- Consider adding in-memory caching for frequently accessed files in production
- Use streaming for large files instead of loading entire file into memory
- Set appropriate cache headers to reduce server load

### Security Considerations
- Validate all file paths to prevent directory traversal
- Only serve files from allowed directories (project root)
- Don't expose sensitive files (.env, node_modules, etc.)
- Use Strapi's existing security middleware

### Deployment
- Ensure frontend is built before starting backend in production
- Consider using a reverse proxy (nginx) for better static file performance in production
- Document the single-server deployment process
