import { Context, Next } from 'koa';
import { UnifiedRouterConfig, RouteHandler, RoutingTable } from '../handlers/types';

/**
 * Unified Router Middleware - Main routing logic that intercepts requests 
 * and directs them to appropriate handlers
 * This will be implemented in task 7
 */
export class UnifiedRouter {
  private config: UnifiedRouterConfig;
  private routingTable: RoutingTable;

  constructor(config: UnifiedRouterConfig) {
    this.config = config;
    this.routingTable = {
      routes: [],
      defaultHandler: this.defaultHandler.bind(this),
      errorHandler: this.errorHandler.bind(this)
    };
  }

  /**
   * Main middleware function
   */
  middleware(): RouteHandler {
    return async (ctx: Context, next: Next) => {
      // Implementation will be added in task 7
      throw new Error('UnifiedRouter.middleware not yet implemented');
    };
  }

  private async defaultHandler(ctx: Context, next: Next): Promise<void> {
    // Implementation will be added in task 7
    throw new Error('UnifiedRouter.defaultHandler not yet implemented');
  }

  private async errorHandler(ctx: Context, error: Error): Promise<void> {
    // Implementation will be added in task 8
    throw new Error('UnifiedRouter.errorHandler not yet implemented');
  }
}

/**
 * Factory function to create unified router middleware
 */
export function createUnifiedRouter(config: UnifiedRouterConfig): RouteHandler {
  const router = new UnifiedRouter(config);
  return router.middleware();
}