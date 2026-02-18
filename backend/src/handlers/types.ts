import { Context, Next } from 'koa';

/**
 * Core routing configuration interface
 */
export interface UnifiedRouterConfig {
  frontendPath: string;
  adminPath: string;
  staticPaths: string[];
  fallbackToFrontend: boolean;
}

/**
 * Route handler function type
 */
export interface RouteHandler {
  (ctx: Context, next: Next): Promise<void>;
}

/**
 * Route configuration model
 */
export interface RouteConfig {
  pattern: RegExp;
  handler: RouteHandler;
  priority: number;
  methods: string[];
}

/**
 * Routing table containing all routes and handlers
 */
export interface RoutingTable {
  routes: RouteConfig[];
  defaultHandler: RouteHandler;
  errorHandler: (ctx: Context, error: Error) => Promise<void>;
}

/**
 * Frontend handler interface
 */
export interface FrontendHandler {
  serveFrontend(ctx: Context): Promise<void>;
  serveStaticAsset(ctx: Context, assetPath: string): Promise<void>;
}

/**
 * Admin handler interface
 */
export interface AdminHandler {
  proxyToAdmin(ctx: Context): Promise<void>;
  rewriteAdminUrls(html: string): string;
}

/**
 * Static asset handler interface
 */
export interface StaticHandler {
  serveAsset(ctx: Context, filePath: string): Promise<void>;
  getContentType(extension: string): string;
  shouldCompress(contentType: string): boolean;
}

/**
 * API handler interface for proxying requests to Strapi API
 */
export interface ApiHandler {
  proxyToApi(ctx: Context): Promise<void>;
  handleCors(ctx: Context): Promise<void>;
  preserveHeaders(ctx: Context): void;
}

/**
 * Extended context with routing information
 */
export interface ExtendedContext extends Context {
  routeInfo: {
    matchedPattern: string;
    handler: string;
    isStatic: boolean;
    originalPath: string;
  };
  frontendConfig: {
    buildPath: string;
    indexFile: string;
    staticPaths: string[];
  };
}

/**
 * Error response structure
 */
export interface ErrorResponse {
  status: number;
  message: string;
  details?: any;
  timestamp: string;
  requestId: string;
}