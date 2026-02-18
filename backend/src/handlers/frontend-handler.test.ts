import { describe, it, expect, beforeEach } from 'vitest';
import { FrontendHandlerImpl } from './frontend-handler';
import { createMockContext } from '../test-setup';
import * as path from 'path';

describe('FrontendHandler Integration Tests', () => {
  let handler: FrontendHandlerImpl;
  
  beforeEach(() => {
    // Use the correct relative path from the backend directory
    handler = new FrontendHandlerImpl('./public');
  });

  it('should serve frontend HTML when index.html exists', async () => {
    const ctx = createMockContext({
      request: { url: '/', method: 'GET', path: '/' }
    });

    await handler.serveFrontend(ctx);

    expect(ctx.status).toBe(200);
    expect(ctx.get('Content-Type')).toContain('text/html');
    expect(ctx.body).toContain('<!doctype html>');
  });

  it('should handle SPA routing for non-static paths', async () => {
    const ctx = createMockContext({
      request: { url: '/about', method: 'GET', path: '/about' }
    });

    await handler.handleSPARouting(ctx);

    // Should serve the main HTML file for SPA routing
    expect(ctx.status).toBe(200);
    expect(ctx.get('Content-Type')).toContain('text/html');
  });

  it('should serve static assets correctly', async () => {
    const ctx = createMockContext({
      request: { url: '/vite.svg', method: 'GET', path: '/vite.svg' }
    });

    await handler.serveStaticAsset(ctx, '/vite.svg');

    // Should serve the static asset
    expect(ctx.status).toBe(200);
    expect(ctx.get('Content-Type')).toContain('image/svg+xml');
  });

  it('should detect static assets correctly', () => {
    expect(handler.isStaticAsset('/assets/style.css')).toBe(true);
    expect(handler.isStaticAsset('/assets/script.js')).toBe(true);
    expect(handler.isStaticAsset('/image.png')).toBe(true);
    expect(handler.isStaticAsset('/about')).toBe(false);
    expect(handler.isStaticAsset('/contact')).toBe(false);
  });

  it('should check if build is available', () => {
    expect(handler.isBuildAvailable()).toBe(true);
  });

  it('should return correct build path', () => {
    const buildPath = handler.getBuildPath();
    expect(buildPath).toContain('public');
    expect(path.isAbsolute(buildPath)).toBe(true);
  });

  it('should handle missing assets gracefully', async () => {
    const ctx = createMockContext({
      request: { url: '/nonexistent.css', method: 'GET', path: '/nonexistent.css' }
    });

    await handler.serveStaticAsset(ctx, '/nonexistent.css');

    expect(ctx.status).toBe(404);
    expect(ctx.body).toBe('Asset not found');
  });
});