# Implementation Plan: Serve Frontend from Backend

## Overview

This implementation plan enables the Strapi backend to serve the frontend application (index.html and static assets) at the root route while maintaining all existing API functionality. The solution uses Strapi's middleware system to add custom static file serving.

## Tasks

- [x] 1. Create static file serving middleware
  - Create `backend/src/middlewares/` directory
  - Implement `backend/src/middlewares/static-frontend.ts` with:
    - File path resolution and validation (prevent directory traversal)
    - MIME type detection based on file extensions
    - Static file serving logic with proper Content-Type headers
    - SPA fallback (serve index.html for non-API routes)
    - API route detection and bypass (/api/*, /admin/*, /uploads/*)
  - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3_

- [ ] 1.1 Write property test for MIME type resolution

  - **Property 2: Static assets served with correct MIME types**
  - **Validates: Requirements 1.2, 2.4**

- [ ]* 1.2 Write unit tests for static middleware
  - Test root route serves index.html
  - Test specific asset serving (CSS, JS, images)
  - Test API route priority
  - Test invalid path rejection
  - Test SPA fallback for non-existent routes
  - _Requirements: 1.1, 1.2, 1.3, 3.1, 3.2, 3.3_

- [x] 2. Configure middleware in Strapi
  - Update `backend/config/middlewares.ts` to include the custom static middleware
  - Configure middleware with:
    - Root directory path (project root)
    - Index file name (index.html)
    - Cache-Control headers (conditional on NODE_ENV)
  - Position middleware after `strapi::public` in the middleware stack
  - _Requirements: 1.3, 1.4, 4.1, 4.2, 4.3_

- [ ]* 2.1 Write property test for API route priority
  - **Property 3: API routes remain functional**
  - **Validates: Requirements 1.3, 1.4, 3.1**

- [ ]* 2.2 Write property test for production caching headers
  - **Property 6: Production caching headers**
  - **Validates: Requirements 4.3**

- [x] 3. Checkpoint - Test middleware integration
  - Start Strapi backend in development mode
  - Verify root route (/) serves index.html
  - Verify static assets (CSS, JS, images) are served correctly
  - Verify API routes (/api/*) still work
  - Verify SPA fallback works for non-existent routes
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 3.1, 3.2, 3.3_

- [x] 4. Add production optimizations
  - Verify Cache-Control headers are set correctly in production mode
  - Test with NODE_ENV=production
  - Document deployment process in README or deployment guide
  - _Requirements: 4.2, 4.3_

- [ ]* 4.1 Write integration tests for production mode
  - Test caching headers in production
  - Test static file serving in production
  - _Requirements: 4.2, 4.3_

- [x] 5. Final checkpoint - End-to-end validation
  - Build frontend application
  - Start backend with static middleware
  - Verify complete application works through single server
  - Test both development and production modes
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 4.1, 4.2, 4.3_

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The middleware must be positioned correctly in the stack to avoid conflicts with existing Strapi functionality
- Security considerations: validate all file paths to prevent directory traversal attacks
