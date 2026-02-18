import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AdminHandlerImpl } from './admin-handler';
import { Context } from 'koa';
import * as fs from 'fs';
import * as path from 'path';

// Mock fs module
vi.mock('fs');
const mockFs = vi.mocked(fs);

describe('AdminHandler', () => {
  let adminHandler: AdminHandlerImpl;
  let mockCtx: Partial<Context>;

  beforeEach(() => {
    adminHandler = new AdminHandlerImpl();
    mockCtx = {
      request: {
        path: '/admin',
        method: 'GET'
      } as any,
      path: '/admin',
      method: 'GET',
      set: vi.fn(),
      get: vi.fn(),
      cookies: {
        get: vi.fn(),
        secure: false
      } as any,
      state: {},
      type: '',
      body: undefined,
      status: 200
    };
  });

  describe('proxyToAdmin', () => {
    it('should serve admin index for /admin path', async () => {
      const mockIndexContent = '<html><head><title>Admin</title></head><body>Admin Interface</body></html>';
      
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(mockIndexContent);
      
      await adminHandler.proxyToAdmin(mockCtx as Context);
      
      expect(mockCtx.type).toBe('text/html');
      expect(mockCtx.body).toBe(mockIndexContent);
      expect(mockCtx.set).toHaveBeenCalledWith('Cache-Control', 'no-cache, no-store, must-revalidate');
    });

    it('should handle missing admin build gracefully', async () => {
      mockFs.existsSync.mockReturnValue(false);
      
      await adminHandler.proxyToAdmin(mockCtx as Context);
      
      expect(mockCtx.status).toBe(503);
      expect(mockCtx.body).toEqual({
        error: 'Admin interface not available',
        message: 'Admin build not found. Please run "npm run build" to build the admin interface.'
      });
    });

    it('should serve admin static assets', async () => {
      mockCtx.request!.path = '/admin/main.js';
      mockCtx.path = '/admin/main.js';
      
      const mockAssetContent = 'console.log("admin script");';
      const mockStat = { size: mockAssetContent.length, mtime: new Date() };
      
      mockFs.existsSync.mockReturnValue(true);
      mockFs.readFileSync.mockReturnValue(mockAssetContent);
      mockFs.statSync.mockReturnValue(mockStat as any);
      
      await adminHandler.proxyToAdmin(mockCtx as Context);
      
      expect(mockCtx.type).toBe('application/javascript');
      expect(mockCtx.body).toBe(mockAssetContent);
      expect(mockCtx.set).toHaveBeenCalledWith('Cache-Control', 'public, max-age=31536000');
    });

    it('should handle admin API calls', async () => {
      mockCtx.request!.path = '/admin/auth/login';
      mockCtx.path = '/admin/auth/login';
      
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      await adminHandler.proxyToAdmin(mockCtx as Context);
      
      expect(mockCtx.set).toHaveBeenCalledWith('X-Admin-Request', 'true');
      expect(consoleSpy).toHaveBeenCalledWith(
        'Admin API call: GET /admin/auth/login',
        expect.objectContaining({
          user: 'anonymous',
          timestamp: expect.any(String)
        })
      );
      
      consoleSpy.mockRestore();
    });
  });

  describe('rewriteAdminUrls', () => {
    it('should return HTML unchanged since no rewriting is needed', () => {
      const html = '<html><body>Test</body></html>';
      const result = adminHandler.rewriteAdminUrls(html);
      expect(result).toBe(html);
    });
  });
});