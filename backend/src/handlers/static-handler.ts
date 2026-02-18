import { Context } from 'koa';
import { StaticHandler } from './types';
import * as fs from 'fs/promises';
import * as path from 'path';
import { createReadStream, existsSync, statSync } from 'fs';
import { promisify } from 'util';
import { gzip, brotliCompress } from 'zlib';

const gzipAsync = promisify(gzip);
const brotliAsync = promisify(brotliCompress);

/**
 * Static Handler - Efficiently serves static assets with proper caching and compression
 */
export class StaticHandlerImpl implements StaticHandler {
  private mimeTypes: Map<string, string> = new Map([
    // Text files
    ['.html', 'text/html; charset=utf-8'],
    ['.htm', 'text/html; charset=utf-8'],
    ['.css', 'text/css; charset=utf-8'],
    ['.js', 'application/javascript; charset=utf-8'],
    ['.mjs', 'application/javascript; charset=utf-8'],
    ['.json', 'application/json; charset=utf-8'],
    ['.xml', 'application/xml; charset=utf-8'],
    ['.txt', 'text/plain; charset=utf-8'],
    ['.md', 'text/markdown; charset=utf-8'],
    
    // Images
    ['.jpg', 'image/jpeg'],
    ['.jpeg', 'image/jpeg'],
    ['.png', 'image/png'],
    ['.gif', 'image/gif'],
    ['.webp', 'image/webp'],
    ['.svg', 'image/svg+xml'],
    ['.ico', 'image/x-icon'],
    ['.bmp', 'image/bmp'],
    
    // Fonts
    ['.woff', 'font/woff'],
    ['.woff2', 'font/woff2'],
    ['.ttf', 'font/ttf'],
    ['.otf', 'font/otf'],
    ['.eot', 'application/vnd.ms-fontobject'],
    
    // Audio/Video
    ['.mp3', 'audio/mpeg'],
    ['.mp4', 'video/mp4'],
    ['.webm', 'video/webm'],
    ['.ogg', 'audio/ogg'],
    ['.wav', 'audio/wav'],
    
    // Archives
    ['.zip', 'application/zip'],
    ['.pdf', 'application/pdf'],
    
    // Default
    ['', 'application/octet-stream']
  ]);

  private compressibleTypes = new Set([
    'text/html',
    'text/css',
    'application/javascript',
    'application/json',
    'text/plain',
    'text/markdown',
    'application/xml',
    'image/svg+xml'
  ]);

  async serveAsset(ctx: Context, filePath: string): Promise<void> {
    try {
      // Resolve the absolute path and check if file exists
      const absolutePath = path.resolve(filePath);
      
      if (!existsSync(absolutePath)) {
        ctx.status = 404;
        ctx.body = 'File not found';
        return;
      }

      // Get file stats
      const stats = statSync(absolutePath);
      
      if (!stats.isFile()) {
        ctx.status = 404;
        ctx.body = 'Not a file';
        return;
      }

      // Get file extension and content type
      const ext = path.extname(absolutePath).toLowerCase();
      const contentType = this.getContentType(ext);
      
      // Set basic headers
      ctx.set('Content-Type', contentType);
      ctx.set('Content-Length', stats.size.toString());
      ctx.set('Last-Modified', stats.mtime.toUTCString());
      
      // Generate ETag based on file stats
      const etag = `"${stats.size}-${stats.mtime.getTime()}"`;
      ctx.set('ETag', etag);

      // Handle conditional requests
      const ifModifiedSince = ctx.get('If-Modified-Since');
      const ifNoneMatch = ctx.get('If-None-Match');
      
      if (ifNoneMatch === etag || 
          (ifModifiedSince && new Date(ifModifiedSince) >= stats.mtime)) {
        ctx.status = 304;
        return;
      }

      // Set caching headers based on file type
      this.setCacheHeaders(ctx, ext);

      // Handle compression if supported
      const acceptEncoding = ctx.get('Accept-Encoding') || '';
      const shouldCompress = this.shouldCompress(contentType) && stats.size > 1024; // Only compress files > 1KB
      
      if (shouldCompress) {
        if (acceptEncoding.includes('br')) {
          // Brotli compression
          const fileBuffer = await fs.readFile(absolutePath);
          const compressed = await brotliAsync(fileBuffer);
          ctx.set('Content-Encoding', 'br');
          ctx.set('Content-Length', compressed.length.toString());
          ctx.body = compressed;
          return;
        } else if (acceptEncoding.includes('gzip')) {
          // Gzip compression
          const fileBuffer = await fs.readFile(absolutePath);
          const compressed = await gzipAsync(fileBuffer);
          ctx.set('Content-Encoding', 'gzip');
          ctx.set('Content-Length', compressed.length.toString());
          ctx.body = compressed;
          return;
        }
      }

      // Serve file without compression
      ctx.body = createReadStream(absolutePath);
      
    } catch (error) {
      console.error('Error serving static asset:', error);
      ctx.status = 500;
      ctx.body = 'Internal server error';
    }
  }

  getContentType(extension: string): string {
    const contentType = this.mimeTypes.get(extension.toLowerCase());
    return contentType || this.mimeTypes.get('') || 'application/octet-stream';
  }

  shouldCompress(contentType: string): boolean {
    // Extract the main content type (before semicolon)
    const mainType = contentType.split(';')[0].trim();
    return this.compressibleTypes.has(mainType);
  }

  private setCacheHeaders(ctx: Context, extension: string): void {
    // Set different cache policies based on file type
    switch (extension) {
      case '.css':
      case '.js':
      case '.mjs':
        // Cache CSS/JS for 1 year but allow revalidation
        ctx.set('Cache-Control', 'public, max-age=31536000, must-revalidate');
        break;
      
      case '.jpg':
      case '.jpeg':
      case '.png':
      case '.gif':
      case '.webp':
      case '.ico':
      case '.woff':
      case '.woff2':
      case '.ttf':
      case '.otf':
        // Cache images and fonts for 1 year
        ctx.set('Cache-Control', 'public, max-age=31536000, immutable');
        break;
      
      case '.html':
      case '.htm':
        // Don't cache HTML files
        ctx.set('Cache-Control', 'no-cache, must-revalidate');
        break;
      
      default:
        // Default cache for 1 hour
        ctx.set('Cache-Control', 'public, max-age=3600');
        break;
    }
  }
}