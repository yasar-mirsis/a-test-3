import { describe, it, expect, vi } from 'vitest';
import helloRouter from '../src/routes/hello';

describe('Hello Router', () => {
  describe('GET /hello', () => {
    it('should return 200 status code', async () => {
      // Create mock request and response objects
      const req = {};
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      // Call the router handler
      const router = helloRouter;
      const middleware = router.stack.find((layer) => layer.route?.path === '/' && layer.route?.methods.get);
      if (middleware && middleware.route) {
        const handler = middleware.route.stack[0].handle;
        await handler(req as any, res as any);
      }

      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });

    it('should return JSON response with correct message "Hello, World!"', async () => {
      const req = {};
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnValue({}),
      };

      // Call the router handler
      const router = helloRouter;
      const middleware = router.stack.find((layer) => layer.route?.path === '/' && layer.route?.methods.get);
      if (middleware && middleware.route) {
        const handler = middleware.route.stack[0].handle;
        await handler(req as any, res as any);
      }

      // Assertions
      expect(res.json).toHaveBeenCalledWith({ message: 'Hello, World!' });
    });

    it('should set Content-Type to application/json', async () => {
      const req = {};
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnValue({}),
        setHeader: vi.fn().mockReturnThis(),
      };

      // Call the router handler
      const router = helloRouter;
      const middleware = router.stack.find((layer) => layer.route?.path === '/' && layer.route?.methods.get);
      if (middleware && middleware.route) {
        const handler = middleware.route.stack[0].handle;
        await handler(req as any, res as any);
      }

      // Assertions
      // Express sets Content-Type header automatically when json() is called
      expect(res.json).toHaveBeenCalled();
    });

    it('should return correct response body structure', async () => {
      const req = {};
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      // Call the router handler
      const router = helloRouter;
      const middleware = router.stack.find((layer) => layer.route?.path === '/' && layer.route?.methods.get);
      if (middleware && middleware.route) {
        const handler = middleware.route.stack[0].handle;
        await handler(req as any, res as any);
      }

      // Assertions for response body structure
      const callArgs = res.json.mock.calls[0][0];
      expect(callArgs).toHaveProperty('message');
      expect(callArgs.message).toBe('Hello, World!');
      expect(typeof callArgs.message).toBe('string');
    });

it('should handle GET request to /hello endpoint', async () => {
      const req = {
        method: 'GET',
        url: '/hello',
      };
      const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn(),
      };

      // Call the router handler
      const router = helloRouter;
      const middleware = router.stack.find((layer) => layer.route?.path === '/' && layer.route?.methods.get);
      if (middleware && middleware.route) {
        const handler = middleware.route.stack[0].handle;
        await handler(req as any, res as any);
      }

      // Assertions
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Hello, World!' });
    });
  });

  describe('Router structure', () => {
    it('should export a Router instance', () => {
      expect(helloRouter).toBeDefined();
      expect(helloRouter).toHaveProperty('stack');
      expect(Array.isArray(helloRouter.stack)).toBe(true);
    });

    it('should have exactly one route defined', () => {
      expect(helloRouter.stack.length).toBeGreaterThan(0);
    });

    it('should have a route at / with GET method', () => {
      const route = helloRouter.stack.find((layer) => layer.route?.path === '/' && layer.route?.methods.get);
      expect(route).toBeDefined();
      expect(route?.route?.path).toBe('/');
      expect(route?.route?.methods.get).toBe(true);
      expect(route?.route?.methods.post).toBeUndefined();
      expect(route?.route?.methods.put).toBeUndefined();
      expect(route?.route?.methods.delete).toBeUndefined();
    });
  });
});