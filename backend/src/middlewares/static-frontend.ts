import type { Core } from '@strapi/strapi';
import type Koa from 'koa';
import * as fs from 'fs';
import * as path from 'path';

interface StaticMiddlewareConfig {
  rootDir: string;
  indexFile: string;
  cacheControl?: string;
}

// MIME type mapping for common file extensions
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

/**
 * Get MIME type based on file extension
 */
function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

/**
 * Check if the request path is an API route that should bypass static serving
 */
function isApiRoute(requestPath: string): boolean {
  const isApi = (
    requestPath === '/admin' ||
    requestPath.startsWith('/admin/') ||
    requestPath.startsWith('/api') ||
    requestPath.startsWith('/api/') ||
    requestPath.startsWith('/uploads') ||
    requestPath.startsWith('/uploads/') ||
    requestPath.startsWith('/_health') ||
    requestPath.startsWith('/i18n') ||
    requestPath.startsWith('/users-permissions') ||
    requestPath.startsWith('/content-manager') ||
    requestPath.startsWith('/content-type-builder') ||
    requestPath.startsWith('/email') ||
    requestPath.startsWith('/upload')
  );
  return isApi;
}

/**
 * Validate and resolve file path to prevent directory traversal attacks
 */
function resolveFilePath(rootDir: string, requestPath: string): string | null {
  // Normalize the request path
  const normalizedPath = path.normalize(requestPath);
  
  // Check for directory traversal attempts
  if (normalizedPath.includes('..')) {
    return null;
  }
  
  // Resolve the full file path
  const filePath = path.resolve(rootDir, normalizedPath.substring(1));
  
  // Ensure the resolved path is within the root directory
  if (!filePath.startsWith(rootDir)) {
    return null;
  }
  
  return filePath;
}

/**
 * Static frontend middleware factory
 */
export default (
  config: StaticMiddlewareConfig,
  { strapi }: { strapi: Core.Strapi }
): Koa.Middleware => {
  const { rootDir, indexFile, cacheControl } = config;
  
  // Log the configuration on startup
  strapi.log.info(`Static Frontend Middleware initialized with rootDir: ${rootDir}`);
  
  return async (ctx: Koa.Context, next: Koa.Next) => {
    const requestPath = ctx.path;
    
    // Skip processing for API routes - let Strapi handle them
    if (isApiRoute(requestPath)) {
      return next();
    }

    // Special handling for root route - serve index.html immediately
    if (requestPath === '/') {
      const indexPath = path.resolve(rootDir, indexFile);
      if (fs.existsSync(indexPath)) {
        try {
          const indexContent = fs.readFileSync(indexPath);
          ctx.type = 'text/html';
          ctx.body = indexContent;
          ctx.status = 200;
          ctx.set('Cache-Control', 'no-cache');
          return;
        } catch (error) {
          strapi.log.error('Error reading index file:', error);
          return next();
        }
      }
    }

    // Try to resolve and serve static file first
    const filePath = resolveFilePath(rootDir, requestPath);
    
    // Log for debugging
    if (requestPath.includes('assets') || requestPath === '/') {
      strapi.log.debug(`Request: ${requestPath}`);
      strapi.log.debug(`Resolved to: ${filePath}`);
      strapi.log.debug(`File exists: ${filePath && fs.existsSync(filePath)}`);
    }
    
    // If path is invalid, continue to next middleware
    if (!filePath) {
      return next();
    }
    
    // Check if file exists
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      try {
        // Read and serve the file
        const fileContent = fs.readFileSync(filePath);
        const mimeType = getMimeType(filePath);
        
        strapi.log.debug(`Serving ${requestPath} as ${mimeType}`);
        
        ctx.type = mimeType;
        ctx.body = fileContent;
        
        // Set cache control headers if configured
        if (cacheControl) {
          ctx.set('Cache-Control', cacheControl);
        }
        
        return;
      } catch (error) {
        // Log error and continue to next middleware
        strapi.log.error('Error reading static file:', error);
        return next();
      }
    }
    
    // If no static file found, let Strapi's router try to handle it
    await next();
    
    // If Strapi didn't handle it (404), serve index.html as SPA fallback
    if (ctx.status === 404 && !ctx.body) {
      const indexPath = path.resolve(rootDir, indexFile);
      if (fs.existsSync(indexPath)) {
        try {
          const indexContent = fs.readFileSync(indexPath);
          ctx.type = 'text/html';
          ctx.body = indexContent;
          ctx.status = 200;
          
          // No caching for index.html to support SPA routing
          ctx.set('Cache-Control', 'no-cache');
          
          return;
        } catch (error) {
          strapi.log.error('Error reading index file:', error);
          // Let the 404 stand
        }
      }
    }
  };
};
