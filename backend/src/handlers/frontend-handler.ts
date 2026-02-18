import { Context } from 'koa';
import { FrontendHandler } from './types';
import { StaticHandlerImpl } from './static-handler';
import * as fs from 'fs/promises';
import * as path from 'path';
import { existsSync } from 'fs';

/**
 * Frontend Handler - Serves the community website HTML and handles frontend-specific routing
 */
export class FrontendHandlerImpl implements FrontendHandler {
  private staticHandler: StaticHandlerImpl;
  private frontendBuildPath: string;
  private indexFile: string;
  private isDevelopment: boolean;

  constructor(buildPath?: string, indexFile: string = 'index.html') {
    this.staticHandler = new StaticHandlerImpl();
    this.isDevelopment = process.env.NODE_ENV !== 'production';
    
    // Auto-detect build path based on environment
    if (buildPath) {
      this.frontendBuildPath = path.resolve(buildPath);
    } else {
      // In development, try to use the dist directory if it exists, otherwise fall back to public
      const distPath = path.resolve('dist');
      const publicPath = path.resolve('backend/public');
      
      if (this.isDevelopment && existsSync(distPath) && existsSync(path.join(distPath, indexFile))) {
        this.frontendBuildPath = distPath;
      } else if (existsSync(publicPath) && existsSync(path.join(publicPath, indexFile))) {
        this.frontendBuildPath = publicPath;
      } else {
        // Default fallback
        this.frontendBuildPath = publicPath;
      }
    }
    
    this.indexFile = indexFile;
    
    console.log(`Frontend Handler initialized:
      - Environment: ${this.isDevelopment ? 'development' : 'production'}
      - Build path: ${this.frontendBuildPath}
      - Index file: ${this.indexFile}`);
  }

  /**
   * Serves the main HTML file for the community website
   * Implements SPA fallback routing for client-side routes
   */
  async serveFrontend(ctx: Context): Promise<void> {
    try {
      const indexPath = path.join(this.frontendBuildPath, this.indexFile);
      
      // Check if index.html exists
      if (!existsSync(indexPath)) {
        ctx.status = 404;
        ctx.body = `Frontend application not found at ${indexPath}. Please ensure the frontend is built and deployed.`;
        return;
      }

      // Read and serve the HTML file
      const htmlContent = await fs.readFile(indexPath, 'utf-8');
      
      // Set appropriate headers for HTML content
      ctx.set('Content-Type', 'text/html; charset=utf-8');
      
      // Different caching strategies for dev vs prod
      if (this.isDevelopment) {
        ctx.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        ctx.set('Pragma', 'no-cache');
        ctx.set('Expires', '0');
      } else {
        ctx.set('Cache-Control', 'no-cache, must-revalidate');
      }
      
      // Security headers
      ctx.set('X-Content-Type-Options', 'nosniff');
      ctx.set('X-Frame-Options', 'DENY');
      ctx.set('X-XSS-Protection', '1; mode=block');
      
      ctx.status = 200;
      ctx.body = htmlContent;
      
    } catch (error) {
      console.error('Error serving frontend:', error);
      ctx.status = 500;
      ctx.body = 'Internal server error while serving frontend';
    }
  }

  /**
   * Serves static assets (CSS, JS, images) for the frontend
   * Integrates with the static asset handler
   */
  async serveStaticAsset(ctx: Context, assetPath: string): Promise<void> {
    try {
      // Remove leading slash if present
      const cleanAssetPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;
      
      // Construct full path to asset
      const fullAssetPath = path.join(this.frontendBuildPath, cleanAssetPath);
      
      // Check if asset exists
      if (!existsSync(fullAssetPath)) {
        ctx.status = 404;
        ctx.body = 'Asset not found';
        return;
      }
      
      // Use the static handler to serve the asset
      await this.staticHandler.serveAsset(ctx, fullAssetPath);
      
    } catch (error) {
      console.error('Error serving static asset:', error);
      ctx.status = 500;
      ctx.body = 'Internal server error while serving static asset';
    }
  }

  /**
   * Checks if a path is a static asset based on file extension
   */
  isStaticAsset(pathname: string): boolean {
    if (!pathname || typeof pathname !== 'string') {
      return false;
    }
    
    const staticExtensions = [
      '.js', '.mjs', '.css', '.html', '.htm',
      '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico', '.bmp',
      '.woff', '.woff2', '.ttf', '.otf', '.eot',
      '.mp3', '.mp4', '.webm', '.ogg', '.wav',
      '.zip', '.pdf', '.json', '.xml', '.txt', '.md'
    ];
    
    const ext = path.extname(pathname).toLowerCase();
    return staticExtensions.includes(ext);
  }

  /**
   * Handles SPA routing - serves index.html for non-static routes
   * This enables client-side routing to work properly
   */
  async handleSPARouting(ctx: Context): Promise<void> {
    const pathname = ctx.path;
    
    // If it's a static asset, try to serve it
    if (this.isStaticAsset(pathname)) {
      await this.serveStaticAsset(ctx, pathname);
      return;
    }
    
    // For non-static routes, serve the main HTML file (SPA fallback)
    await this.serveFrontend(ctx);
  }

  /**
   * Gets the current build path (useful for debugging)
   */
  getBuildPath(): string {
    return this.frontendBuildPath;
  }

  /**
   * Checks if the frontend build is available
   */
  isBuildAvailable(): boolean {
    const indexPath = path.join(this.frontendBuildPath, this.indexFile);
    return existsSync(indexPath);
  }

  /**
   * Lists available static paths in the build directory
   */
  async getAvailableStaticPaths(): Promise<string[]> {
    try {
      const paths: string[] = [];
      
      const scanDirectory = async (dir: string, relativePath: string = ''): Promise<void> => {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          const relPath = path.join(relativePath, entry.name).replace(/\\/g, '/');
          
          if (entry.isDirectory()) {
            // Skip node_modules and hidden directories
            if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
              await scanDirectory(fullPath, relPath);
            }
          } else if (entry.isFile() && this.isStaticAsset(entry.name)) {
            paths.push('/' + relPath);
          }
        }
      };
      
      if (existsSync(this.frontendBuildPath)) {
        await scanDirectory(this.frontendBuildPath);
      }
      
      return paths.sort();
    } catch (error) {
      console.error('Error scanning static paths:', error);
      return [];
    }
  }
}