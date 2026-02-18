import { Context } from 'koa';
import { AdminHandler } from './types';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Admin Handler - Proxies requests to Strapi's built-in admin interface
 * Handles standard /admin route without URL rewriting and preserves authentication
 */
export class AdminHandlerImpl implements AdminHandler {
  private adminBuildPath: string;

  constructor() {
    // Path to Strapi's built admin interface
    this.adminBuildPath = path.join(process.cwd(), '.strapi', 'client');
  }

  /**
   * Proxy requests to Strapi admin interface
   * Handles standard /admin route without URL rewriting
   * Preserves admin authentication and session state
   */
  async proxyToAdmin(ctx: Context): Promise<void> {
    const { path: requestPath, method } = ctx.request;
    
    // Handle admin root path - serve the admin index.html
    if (requestPath === '/admin' || requestPath === '/admin/') {
      await this.serveAdminIndex(ctx);
      return;
    }

    // Handle admin static assets (CSS, JS, etc.)
    if (requestPath.startsWith('/admin/') && this.isStaticAsset(requestPath)) {
      await this.serveAdminAsset(ctx, requestPath);
      return;
    }

    // Handle admin API calls - these should be proxied to Strapi's internal admin API
    if (this.isAdminApiCall(requestPath)) {
      await this.proxyAdminApiCall(ctx);
      return;
    }

    // For other admin routes, serve the admin SPA (single page application)
    if (requestPath.startsWith('/admin/')) {
      await this.serveAdminIndex(ctx);
      return;
    }
  }

  /**
   * Serve the admin index.html file
   */
  private async serveAdminIndex(ctx: Context): Promise<void> {
    try {
      const indexPath = path.join(this.adminBuildPath, 'index.html');
      
      if (!fs.existsSync(indexPath)) {
        // If admin build doesn't exist, return error
        ctx.status = 503;
        ctx.body = {
          error: 'Admin interface not available',
          message: 'Admin build not found. Please run "npm run build" to build the admin interface.'
        };
        return;
      }

      const indexContent = fs.readFileSync(indexPath, 'utf-8');
      
      // Set appropriate headers for HTML content
      ctx.type = 'text/html';
      ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate');
      ctx.set('Pragma', 'no-cache');
      ctx.set('Expires', '0');
      
      // Preserve session cookies and authentication headers
      this.preserveAuthHeaders(ctx);
      
      ctx.body = indexContent;
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        error: 'Failed to serve admin interface',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Serve admin static assets (CSS, JS, images)
   */
  private async serveAdminAsset(ctx: Context, assetPath: string): Promise<void> {
    try {
      // Remove /admin prefix to get the actual asset path
      const relativePath = assetPath.replace('/admin/', '');
      const fullPath = path.join(this.adminBuildPath, relativePath);
      
      if (!fs.existsSync(fullPath)) {
        ctx.status = 404;
        ctx.body = 'Asset not found';
        return;
      }

      const stat = fs.statSync(fullPath);
      const content = fs.readFileSync(fullPath);
      
      // Set appropriate content type based on file extension
      const ext = path.extname(fullPath).toLowerCase();
      const contentType = this.getContentType(ext);
      
      ctx.type = contentType;
      ctx.set('Content-Length', stat.size.toString());
      
      // Set caching headers for static assets
      ctx.set('Cache-Control', 'public, max-age=31536000'); // 1 year
      ctx.set('ETag', `"${stat.mtime.getTime()}-${stat.size}"`);
      
      ctx.body = content;
    } catch (error) {
      ctx.status = 500;
      ctx.body = {
        error: 'Failed to serve admin asset',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Check if the request is an admin API call
   */
  private isAdminApiCall(requestPath: string): boolean {
    // Admin API endpoints that need special handling
    const adminApiPatterns = [
      '/admin/auth/',
      '/admin/users/',
      '/admin/roles/',
      '/admin/permissions/',
      '/admin/content-manager/',
      '/admin/content-type-builder/',
      '/admin/upload/',
      '/admin/users-permissions/',
      '/admin/webhooks/',
      '/admin/marketplace/',
      '/admin/plugins/',
      '/admin/settings/',
      '/admin/init',
      '/admin/information',
      '/admin/telemetry',
      '/admin/project-settings'
    ];

    return adminApiPatterns.some(pattern => requestPath.startsWith(pattern)) ||
           (requestPath.startsWith('/admin/') && requestPath.includes('/api/'));
  }

  /**
   * Proxy admin API calls to Strapi's internal admin API
   * Preserves authentication tokens and session state
   */
  private async proxyAdminApiCall(ctx: Context): Promise<void> {
    try {
      // Preserve all authentication headers
      this.preserveAuthHeaders(ctx);
      
      // For admin API calls, we need to let Strapi handle them naturally
      // This means we don't intercept the request and let it pass through
      // to Strapi's built-in admin API handlers
      
      // Set headers to indicate this is an admin API call
      ctx.set('X-Admin-Request', 'true');
      
      // Preserve the original request method and body
      const { method, query } = ctx.request;
      const body = (ctx.request as any).body;
      
      // Log admin API access for monitoring
      console.log(`Admin API call: ${method} ${ctx.path}`, {
        user: ctx.state?.user?.id || 'anonymous',
        timestamp: new Date().toISOString()
      });
      
      // Let the request pass through to Strapi's admin handlers
      // by not setting ctx.body or ctx.status
      return;
      
    } catch (error) {
      console.error('Admin API proxy error:', error);
      ctx.status = 500;
      ctx.body = {
        error: 'Admin API proxy failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
  private isStaticAsset(requestPath: string): boolean {
    const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot'];
    const ext = path.extname(requestPath).toLowerCase();
    return staticExtensions.includes(ext);
  }

  /**
   * Get content type based on file extension
   */
  private getContentType(extension: string): string {
    const contentTypes: Record<string, string> = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
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
    
    return contentTypes[extension] || 'application/octet-stream';
  }

  /**
   * Preserve authentication headers and session cookies
   * Enhanced for admin API calls to maintain session state
   */
  private preserveAuthHeaders(ctx: Context): void {
    // Preserve existing cookies (including admin session cookies)
    const existingCookies = ctx.get('Cookie');
    if (existingCookies) {
      // Don't override existing cookies, just ensure they're preserved
      ctx.cookies.secure = false; // Allow cookies over HTTP in development
    }
    
    // Preserve authorization headers (JWT tokens, etc.)
    const authHeader = ctx.get('Authorization');
    if (authHeader) {
      ctx.set('Authorization', authHeader);
    }
    
    // Preserve admin-specific headers
    const adminToken = ctx.get('X-Admin-Token');
    if (adminToken) {
      ctx.set('X-Admin-Token', adminToken);
    }
    
    // Preserve CSRF tokens for admin security
    const csrfToken = ctx.get('X-CSRF-Token');
    if (csrfToken) {
      ctx.set('X-CSRF-Token', csrfToken);
    }
    
    // Set security headers for admin interface
    ctx.set('X-Frame-Options', 'SAMEORIGIN');
    ctx.set('X-Content-Type-Options', 'nosniff');
    ctx.set('X-XSS-Protection', '1; mode=block');
    
    // For admin API calls, ensure proper CORS headers
    if (ctx.get('X-Admin-Request')) {
      ctx.set('Access-Control-Allow-Credentials', 'true');
      ctx.set('Access-Control-Allow-Origin', ctx.get('Origin') || '*');
      ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Token, X-CSRF-Token');
    }
  }

  /**
   * Validate admin session and authentication state
   * This helps preserve admin session state across requests
   */
  private async validateAdminSession(ctx: Context): Promise<boolean> {
    try {
      // Check for admin authentication token in various places
      const authToken = ctx.get('Authorization') || 
                       ctx.get('X-Admin-Token') ||
                       ctx.cookies.get('strapi_jwt') ||
                       ctx.cookies.get('admin_jwt');
      
      if (!authToken) {
        return false;
      }
      
      // For now, we assume the token is valid if it exists
      // In a more robust implementation, we would validate the JWT token
      // against Strapi's admin authentication system
      
      return true;
    } catch (error) {
      console.error('Admin session validation error:', error);
      return false;
    }
  }

  /**
   * Rewrite admin URLs in HTML content (currently not needed for standard /admin path)
   * This method is kept for interface compliance but doesn't perform URL rewriting
   * since we're using the standard /admin path
   */
  rewriteAdminUrls(html: string): string {
    // Since we're using the standard /admin path, no URL rewriting is needed
    // This method is kept for interface compliance
    return html;
  }
}