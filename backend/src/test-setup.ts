/**
 * Test setup and utilities for unified frontend routing tests
 */

import { Context } from 'koa';
import { UnifiedRouterConfig } from './handlers/types';

/**
 * Default test configuration for unified router
 */
export const defaultTestConfig: UnifiedRouterConfig = {
  frontendPath: '/',
  adminPath: '/admin',
  staticPaths: ['/assets', '/uploads', '/css', '/js'],
  fallbackToFrontend: true,
};

/**
 * Mock Koa context for testing
 */
export function createMockContext(overrides: Partial<Context> = {}): Context {
  const mockContext = {
    request: {
      url: '/',
      method: 'GET',
      path: '/',
      query: {},
      headers: {},
      ...overrides.request,
    },
    response: {
      status: 200,
      headers: {},
      body: null,
      ...overrides.response,
    },
    state: {},
    params: {},
    throw: ((message: string, code?: number) => {
      const error = new Error(message);
      (error as any).status = code || 500;
      throw error;
    }) as any,
    set: function(this: any, key: string, value: string) {
      this.response.headers[key] = value;
    },
    get: function(this: any, key: string) {
      return this.response.headers[key] || '';
    },
    ...overrides,
  } as unknown as Context;

  // Ensure status property is accessible
  Object.defineProperty(mockContext, 'status', {
    get() { return this.response.status; },
    set(value) { this.response.status = value; }
  });

  // Ensure body property is accessible
  Object.defineProperty(mockContext, 'body', {
    get() { return this.response.body; },
    set(value) { this.response.body = value; }
  });

  return mockContext;
}

/**
 * Test utilities for property-based testing
 */
export const testUtils = {
  /**
   * Generate valid URL paths for testing
   */
  generateValidPaths: () => ['/', '/admin', '/api/galleries', '/assets/style.css', '/uploads/image.jpg'],
  
  /**
   * Generate invalid URL paths for testing
   */
  generateInvalidPaths: () => ['', '///', '/admin/../', '/api/../../etc/passwd'],
  
  /**
   * Generate HTTP methods for testing
   */
  generateHttpMethods: () => ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
};