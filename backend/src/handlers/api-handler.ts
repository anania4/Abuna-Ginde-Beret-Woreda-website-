import { Context } from 'koa';
import { ApiHandler } from './types';
import axios from 'axios';

// Define axios types locally since they may not be available in all versions
interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}

interface AxiosError extends Error {
  config: any;
  code?: string;
  request?: any;
  response?: AxiosResponse;
  isAxiosError: boolean;
}

/**
 * API Handler - Proxies requests to Strapi's REST API
 * Handles /api/* routes with header preservation and CORS support
 */
export class ApiHandlerImpl implements ApiHandler {
  private strapiBaseUrl: string;
  private timeout: number;

  constructor() {
    // Use Strapi's internal API base URL
    this.strapiBaseUrl = process.env.STRAPI_API_URL || 'http://localhost:1337';
    this.timeout = parseInt(process.env.API_TIMEOUT || '30000', 10); // 30 seconds default
  }

  /**
   * Proxy API requests to Strapi's REST API
   * Preserves headers, authentication tokens, and request data
   */
  async proxyToApi(ctx: Context): Promise<void> {
    // Track request start time for metrics
    ctx.state.startTime = Date.now();
    
    try {
      const { method, path: requestPath, query } = ctx.request;
      const body = (ctx.request as any).body;
      
      // Log API request for monitoring
      console.log(`API proxy: ${method} ${requestPath}`, {
        query,
        timestamp: new Date().toISOString(),
        userAgent: ctx.get('User-Agent'),
        requestId: this.generateRequestId()
      });

      // Preserve headers for the proxied request
      this.preserveHeaders(ctx);

      // Handle CORS preflight requests
      if (method === 'OPTIONS') {
        await this.handleCors(ctx);
        return;
      }

      // Build the target URL for Strapi API
      const targetUrl = `${this.strapiBaseUrl}${requestPath}`;
      
      // Prepare headers for the proxied request
      const headers = this.buildProxyHeaders(ctx);

      // Make the proxied request to Strapi
      const response = await this.makeProxyRequest(method, targetUrl, {
        headers,
        data: body,
        params: query,
        timeout: this.timeout,
        validateStatus: () => true // Accept all status codes
      });

      // Forward the response from Strapi to the client
      await this.forwardResponse(ctx, response);

    } catch (error) {
      await this.handleProxyError(ctx, error);
    }
  }

  /**
   * Handle CORS headers for cross-origin requests
   */
  async handleCors(ctx: Context): Promise<void> {
    const origin = ctx.get('Origin');
    const requestMethod = ctx.get('Access-Control-Request-Method');
    const requestHeaders = ctx.get('Access-Control-Request-Headers');

    // Set CORS headers
    ctx.set('Access-Control-Allow-Origin', origin || '*');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    ctx.set('Access-Control-Allow-Methods', requestMethod || 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    ctx.set('Access-Control-Allow-Headers', requestHeaders || 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
    ctx.set('Access-Control-Max-Age', '86400'); // 24 hours

    // For preflight requests, return 204 No Content
    if (ctx.method === 'OPTIONS') {
      ctx.status = 204;
      ctx.body = null;
    }
  }

  /**
   * Preserve important headers from the original request
   */
  preserveHeaders(ctx: Context): void {
    // Always set CORS headers for API requests
    const origin = ctx.get('Origin');
    if (origin) {
      ctx.set('Access-Control-Allow-Origin', origin);
      ctx.set('Access-Control-Allow-Credentials', 'true');
    }

    // Preserve content type for responses
    const acceptHeader = ctx.get('Accept');
    if (acceptHeader) {
      ctx.set('Accept', acceptHeader);
    }
  }

  /**
   * Build headers for the proxied request to Strapi
   */
  private buildProxyHeaders(ctx: Context): Record<string, string> {
    const headers: Record<string, string> = {};

    // Preserve authentication headers
    const authHeader = ctx.get('Authorization');
    if (authHeader) {
      headers['Authorization'] = authHeader;
    }

    // Preserve JWT token from cookies
    const jwtToken = ctx.cookies.get('jwt') || ctx.cookies.get('strapi_jwt');
    if (jwtToken && !authHeader) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    }

    // Preserve content type
    const contentType = ctx.get('Content-Type');
    if (contentType) {
      headers['Content-Type'] = contentType;
    }

    // Preserve user agent
    const userAgent = ctx.get('User-Agent');
    if (userAgent) {
      headers['User-Agent'] = userAgent;
    }

    // Preserve accept headers
    const accept = ctx.get('Accept');
    if (accept) {
      headers['Accept'] = accept;
    }

    // Preserve accept-language for internationalization
    const acceptLanguage = ctx.get('Accept-Language');
    if (acceptLanguage) {
      headers['Accept-Language'] = acceptLanguage;
    }

    // Preserve custom headers that might be used by Strapi plugins
    const customHeaders = [
      'X-Requested-With',
      'X-Forwarded-For',
      'X-Real-IP',
      'X-Forwarded-Proto',
      'X-Forwarded-Host'
    ];

    customHeaders.forEach(headerName => {
      const headerValue = ctx.get(headerName);
      if (headerValue) {
        headers[headerName] = headerValue;
      }
    });

    return headers;
  }

  /**
   * Make the actual proxy request to Strapi
   */
  private async makeProxyRequest(
    method: string,
    url: string,
    config: any
  ): Promise<AxiosResponse> {
    try {
      return await axios({
        method: method.toLowerCase(),
        url,
        ...config,
        // Ensure we don't follow redirects to maintain response integrity
        maxRedirects: 0,
        // Handle response compression
        decompress: true
      });
    } catch (error: any) {
      // Axios throws errors for non-2xx status codes, but we want to forward them
      if (error.response) {
        return error.response;
      }
      throw error;
    }
  }

  /**
   * Forward the Strapi response to the client
   */
  private async forwardResponse(ctx: Context, response: AxiosResponse): Promise<void> {
    // Set the status code from Strapi
    ctx.status = response.status;

    // Forward response headers from Strapi
    Object.entries(response.headers).forEach(([key, value]) => {
      if (typeof value === 'string') {
        // Skip headers that should not be forwarded
        const skipHeaders = [
          'connection',
          'keep-alive',
          'proxy-authenticate',
          'proxy-authorization',
          'te',
          'trailers',
          'transfer-encoding',
          'upgrade'
        ];

        if (!skipHeaders.includes(key.toLowerCase())) {
          ctx.set(key, value);
        }
      }
    });

    // Ensure CORS headers are set for the response
    await this.handleCors(ctx);

    // Set the response body
    ctx.body = response.data;

    // Log successful proxy response
    console.log(`API proxy response: ${ctx.status} for ${ctx.method} ${ctx.path}`, {
      contentType: ctx.get('Content-Type'),
      contentLength: ctx.get('Content-Length'),
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Handle errors that occur during API proxying
   * Implements proper error response forwarding, timeout handling, and data integrity
   */
  private async handleProxyError(ctx: Context, error: any): Promise<void> {
    console.error('API proxy error:', {
      error: error.message,
      stack: error.stack,
      url: ctx.url,
      method: ctx.method,
      timestamp: new Date().toISOString(),
      requestId: this.generateRequestId()
    });

    // Handle different types of errors with specific error codes and messages
    if (this.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        // Strapi backend is not available
        ctx.status = 503;
        ctx.body = {
          error: 'Service Unavailable',
          message: 'Backend API is currently unavailable. Please try again later.',
          code: 'BACKEND_UNAVAILABLE',
          timestamp: new Date().toISOString(),
          requestId: this.generateRequestId()
        };
      } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
        // Request timeout - handle API timeouts
        ctx.status = 504;
        ctx.body = {
          error: 'Gateway Timeout',
          message: `The request to the backend API timed out after ${this.timeout}ms. Please try again.`,
          code: 'REQUEST_TIMEOUT',
          timestamp: new Date().toISOString(),
          requestId: this.generateRequestId()
        };
      } else if (error.code === 'ENOTFOUND' || error.code === 'EAI_AGAIN') {
        // DNS resolution failed - connection failure
        ctx.status = 502;
        ctx.body = {
          error: 'Bad Gateway',
          message: 'Unable to resolve backend API hostname. Please check your network connection.',
          code: 'DNS_RESOLUTION_FAILED',
          timestamp: new Date().toISOString(),
          requestId: this.generateRequestId()
        };
      } else if (error.code === 'ECONNRESET') {
        // Connection reset - handle connection failures
        ctx.status = 502;
        ctx.body = {
          error: 'Bad Gateway',
          message: 'Connection to backend API was reset. Please try again.',
          code: 'CONNECTION_RESET',
          timestamp: new Date().toISOString(),
          requestId: this.generateRequestId()
        };
      } else if (error.response) {
        // Forward the error response from Strapi while maintaining data integrity
        await this.forwardResponse(ctx, error.response);
        return;
      } else {
        // Network or other axios error
        ctx.status = 502;
        ctx.body = {
          error: 'Bad Gateway',
          message: 'Failed to connect to the backend API.',
          code: 'NETWORK_ERROR',
          timestamp: new Date().toISOString(),
          requestId: this.generateRequestId()
        };
      }
    } else if (error.name === 'AbortError') {
      // Request was aborted
      ctx.status = 499;
      ctx.body = {
        error: 'Client Closed Request',
        message: 'The request was cancelled by the client.',
        code: 'REQUEST_ABORTED',
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId()
      };
    } else {
      // Generic error - maintain response data integrity
      ctx.status = 500;
      ctx.body = {
        error: 'Internal Server Error',
        message: 'An unexpected error occurred while processing the API request.',
        code: 'INTERNAL_ERROR',
        timestamp: new Date().toISOString(),
        requestId: this.generateRequestId(),
        // Only include error details in development
        ...(process.env.NODE_ENV === 'development' && { details: error.message })
      };
    }

    // Ensure CORS headers are set even for error responses
    await this.handleCors(ctx);

    // Set appropriate content type for error responses to maintain data integrity
    ctx.type = 'application/json';

    // Log error metrics for monitoring
    this.logErrorMetrics(ctx, error);
  }

  /**
   * Check if the request is a valid API request
   */
  isApiRequest(path: string): boolean {
    return path.startsWith('/api/') && path.length > 5;
  }

  /**
   * Get API endpoint information for logging and monitoring
   */
  getApiEndpointInfo(path: string): { collection?: string; action?: string } {
    const pathParts = path.split('/').filter(Boolean);
    
    if (pathParts.length >= 2 && pathParts[0] === 'api') {
      return {
        collection: pathParts[1],
        action: pathParts[2] || 'index'
      };
    }

    return {};
  }

  /**
   * Generate a unique request ID for error tracking
   */
  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Log error metrics for monitoring and analytics
   */
  private logErrorMetrics(ctx: Context, error: any): void {
    const endpointInfo = this.getApiEndpointInfo(ctx.path);
    
    console.error('API Error Metrics:', {
      timestamp: new Date().toISOString(),
      method: ctx.method,
      path: ctx.path,
      status: ctx.status,
      collection: endpointInfo.collection,
      action: endpointInfo.action,
      errorCode: error.code || 'UNKNOWN',
      errorType: error.name || 'UnknownError',
      userAgent: ctx.get('User-Agent'),
      origin: ctx.get('Origin'),
      responseTime: Date.now() - (ctx.state.startTime || Date.now())
    });
  }

  /**
   * Check if an error is an Axios error
   */
  private isAxiosError(error: any): error is AxiosError {
    return error && error.isAxiosError === true;
  }
}