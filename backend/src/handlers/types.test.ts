import { describe, it, expect } from 'vitest';
import { defaultTestConfig, createMockContext } from '../test-setup';
import type { UnifiedRouterConfig, RouteHandler } from './types';

describe('Core Interfaces Setup', () => {
  it('should have valid default test configuration', () => {
    expect(defaultTestConfig).toBeDefined();
    expect(defaultTestConfig.frontendPath).toBe('/');
    expect(defaultTestConfig.adminPath).toBe('/admin');
    expect(defaultTestConfig.staticPaths).toContain('/assets');
    expect(defaultTestConfig.fallbackToFrontend).toBe(true);
  });

  it('should create mock context with default values', () => {
    const ctx = createMockContext();
    expect(ctx.request.url).toBe('/');
    expect(ctx.request.method).toBe('GET');
    expect(ctx.response.status).toBe(200);
  });

  it('should create mock context with overrides', () => {
    const ctx = createMockContext({
      request: { url: '/admin', method: 'POST' }
    });
    expect(ctx.request.url).toBe('/admin');
    expect(ctx.request.method).toBe('POST');
  });

  it('should validate UnifiedRouterConfig interface', () => {
    const config: UnifiedRouterConfig = {
      frontendPath: '/',
      adminPath: '/admin',
      staticPaths: ['/assets'],
      fallbackToFrontend: true,
    };
    
    expect(config.frontendPath).toBe('/');
    expect(config.adminPath).toBe('/admin');
    expect(config.staticPaths).toHaveLength(1);
    expect(config.fallbackToFrontend).toBe(true);
  });
});