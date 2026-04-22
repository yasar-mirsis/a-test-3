import { describe, it, expect, beforeEach, vi } from 'vitest';
import express from 'express';
import helloRouter from '../src/routes/hello';
import { notFoundHandler } from '../src/middleware/errorHandler';

describe('Error Handler - Console Error and Process Exit', () => {
  let app: express.Express;
  let server: any;
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Save original environment variables
    originalEnv = { ...process.env };

    // Clear all PORT-related environment variables
    delete process.env.PORT;

    // Create a new Express app for each test
    app = express();

    // Mount the hello router at /hello
    app.use('/hello', helloRouter);

    // Register 404 handler for undefined routes
    app.use(notFoundHandler);

    // Mock console.error to prevent actual error output during tests
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // Mock process.exit to prevent actual process termination
    vi.spyOn(process, 'exit').mockImplementation(() => {
      // Do nothing - just return
    });
  });

  afterEach(() => {
    // Restore original environment variables
    Object.keys(originalEnv).forEach((key) => {
      process.env[key] = originalEnv[key];
    });

    // Restore mocks
    vi.restoreAllMocks();

    // Close the server if it's running
    if (server) {
      server.close();
    }
  });

  describe('notFoundHandler - console.error usage', () => {
    it('should NOT call console.error for notFoundHandler', () => {
      const mockRequest = {
        method: 'GET',
        url: '/unknown',
        path: '/unknown',
      };
      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      notFoundHandler(mockRequest, mockResponse);

      // Verify console.error was NOT called
      expect(console.error).not.toHaveBeenCalled();
    });

    it('should NOT call console.error for any HTTP method', () => {
      const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

      httpMethods.forEach((method) => {
        const mockRequest = {
          method,
          url: '/unknown',
          path: '/unknown',
        };
        const mockResponse = {
          status: vi.fn().mockReturnThis(),
          json: vi.fn().mockReturnThis(),
        };

        notFoundHandler(mockRequest, mockResponse);

        expect(console.error).not.toHaveBeenCalled();
      });
    });

    it('should NOT call console.error for any route', () => {
      const routes = ['/unknown', '/api/v1/notfound', '/users/123', '/non-existent'];

      routes.forEach((route) => {
        const mockRequest = {
          method: 'GET',
          url: route,
          path: route,
        };
        const mockResponse = {
          status: vi.fn().mockReturnThis(),
          json: vi.fn().mockReturnThis(),
        };

        notFoundHandler(mockRequest, mockResponse);

        expect(console.error).not.toHaveBeenCalled();
      });
    });
  });

  describe('notFoundHandler - process.exit behavior', () => {
    it('should NOT call process.exit for notFoundHandler', () => {
      const mockRequest = {
        method: 'GET',
        url: '/unknown',
        path: '/unknown',
      };
      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      notFoundHandler(mockRequest, mockResponse);

      // Verify process.exit was NOT called
      expect(process.exit).not.toHaveBeenCalled();
    });

    it('should not call process.exit for any HTTP method', () => {
      const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

      httpMethods.forEach((method) => {
        const mockRequest = {
          method,
          url: '/unknown',
          path: '/unknown',
        };
        const mockResponse = {
          status: vi.fn().mockReturnThis(),
          json: vi.fn().mockReturnThis(),
        };

        notFoundHandler(mockRequest, mockResponse);

        expect(process.exit).not.toHaveBeenCalled();
      });
    });

    it('should not call process.exit for any route', () => {
      const routes = ['/unknown', '/api/v1/notfound', '/users/123', '/non-existent'];

      routes.forEach((route) => {
        const mockRequest = {
          method: 'GET',
          url: route,
          path: route,
        };
        const mockResponse = {
          status: vi.fn().mockReturnThis(),
          json: vi.fn().mockReturnThis(),
        };

        notFoundHandler(mockRequest, mockResponse);

        expect(process.exit).not.toHaveBeenCalled();
      });
    });
  });

  describe('notFoundHandler - integration with console.error and process.exit', () => {
    it('should NOT call console.error and NOT call process.exit together', () => {
      const mockRequest = {
        method: 'GET',
        url: '/unknown',
        path: '/unknown',
      };
      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      notFoundHandler(mockRequest, mockResponse);

      expect(console.error).not.toHaveBeenCalled();
      expect(process.exit).not.toHaveBeenCalled();
    });

    it('should NOT call console.error and NOT call process.exit for multiple requests', () => {
      const requests = [
        { method: 'GET', url: '/unknown1', path: '/unknown1' },
        { method: 'POST', url: '/unknown2', path: '/unknown2' },
        { method: 'PUT', url: '/unknown3', path: '/unknown3' },
      ];

      requests.forEach((req) => {
        const mockRequest = {
          method: req.method,
          url: req.url,
          path: req.path,
        };
        const mockResponse = {
          status: vi.fn().mockReturnThis(),
          json: vi.fn().mockReturnThis(),
        };

        notFoundHandler(mockRequest, mockResponse);
      });

      expect(console.error).not.toHaveBeenCalled();
      expect(process.exit).not.toHaveBeenCalled();
    });
  });

  describe('notFoundHandler - response object interaction', () => {
    it('should NOT call console.error after setting status code', () => {
      const mockRequest = {
        method: 'GET',
        url: '/unknown',
        path: '/unknown',
      };
      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      notFoundHandler(mockRequest, mockResponse);

      // Verify status was called
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      // Verify console.error was NOT called
      expect(console.error).not.toHaveBeenCalled();
    });

    it('should NOT call console.error after sending JSON response', () => {
      const mockRequest = {
        method: 'GET',
        url: '/unknown',
        path: '/unknown',
      };
      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      notFoundHandler(mockRequest, mockResponse);

      // Verify json was called
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Route not found' });
      // Verify console.error was NOT called
      expect(console.error).not.toHaveBeenCalled();
    });

    it('should NOT call console.error after both status and json calls', () => {
      const mockRequest = {
        method: 'GET',
        url: '/unknown',
        path: '/unknown',
      };
      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      notFoundHandler(mockRequest, mockResponse);

      // Verify both methods were called
      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalled();
      // Verify console.error was NOT called
      expect(console.error).not.toHaveBeenCalled();
    });
  });

  describe('notFoundHandler - return value', () => {
    it('should return void (no return value)', () => {
      const mockRequest = {
        method: 'GET',
        url: '/unknown',
        path: '/unknown',
      };
      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      const result = notFoundHandler(mockRequest, mockResponse);

      expect(result).toBeUndefined();
      expect(console.error).not.toHaveBeenCalled();
      expect(process.exit).not.toHaveBeenCalled();
    });

    it('should return void for all HTTP methods', () => {
      const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

      httpMethods.forEach((method) => {
        const mockRequest = {
          method,
          url: '/unknown',
          path: '/unknown',
        };
        const mockResponse = {
          status: vi.fn().mockReturnThis(),
          json: vi.fn().mockReturnThis(),
        };

        const result = notFoundHandler(mockRequest, mockResponse);

        expect(result).toBeUndefined();
        expect(console.error).not.toHaveBeenCalled();
        expect(process.exit).not.toHaveBeenCalled();
      });
    });

    it('should return void for all routes', () => {
      const routes = ['/unknown', '/api/v1/notfound', '/users/123', '/non-existent'];

      routes.forEach((route) => {
        const mockRequest = {
          method: 'GET',
          url: route,
          path: route,
        };
        const mockResponse = {
          status: vi.fn().mockReturnThis(),
          json: vi.fn().mockReturnThis(),
        };

        const result = notFoundHandler(mockRequest, mockResponse);

        expect(result).toBeUndefined();
        expect(console.error).not.toHaveBeenCalled();
        expect(process.exit).not.toHaveBeenCalled();
      });
    });
  });

  describe('notFoundHandler - edge cases', () => {
    it('should handle empty string paths', () => {
      const mockRequest = {
        method: 'GET',
        url: '/unknown',
        path: '',
      };
      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      notFoundHandler(mockRequest, mockResponse);

      expect(console.error).not.toHaveBeenCalled();
      expect(process.exit).not.toHaveBeenCalled();
    });

    it('should handle paths with special characters', () => {
      const mockRequest = {
        method: 'GET',
        url: '/unknown-route-123_abc',
        path: '/unknown-route-123_abc',
      };
      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      notFoundHandler(mockRequest, mockResponse);

      expect(console.error).not.toHaveBeenCalled();
      expect(process.exit).not.toHaveBeenCalled();
    });

    it('should handle paths with encoded characters', () => {
      const mockRequest = {
        method: 'GET',
        url: '/unknown%20route',
        path: '/unknown%20route',
      };
      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      notFoundHandler(mockRequest, mockResponse);

      expect(console.error).not.toHaveBeenCalled();
      expect(process.exit).not.toHaveBeenCalled();
    });
  });

  describe('notFoundHandler - console.error call order', () => {
    it('should NOT call console.error', () => {
      const mockRequest = {
        method: 'GET',
        url: '/unknown',
        path: '/unknown',
      };
      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      notFoundHandler(mockRequest, mockResponse);

      expect(console.error).not.toHaveBeenCalled();
    });

    it('should NOT call console.error at all', () => {
      const mockRequest = {
        method: 'GET',
        url: '/unknown',
        path: '/unknown',
      };
      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      notFoundHandler(mockRequest, mockResponse);

      expect(console.error).not.toHaveBeenCalled();
    });
  });

  describe('notFoundHandler - console.error with different objects', () => {
    it('should NOT call console.error for different mock response objects', () => {
      const differentResponses = [
        { status: vi.fn().mockReturnThis(), json: vi.fn().mockReturnThis() },
        { status: vi.fn().mockReturnThis(), json: vi.fn().mockReturnThis() },
        { status: vi.fn().mockReturnThis(), json: vi.fn().mockReturnThis() },
      ];

      differentResponses.forEach((response) => {
        notFoundHandler(mockRequest, response);
      });

      expect(console.error).not.toHaveBeenCalled();
      expect(process.exit).not.toHaveBeenCalled();
    });

    it('should NOT call console.error for different mock request objects', () => {
      const differentRequests = [
        { method: 'GET', url: '/unknown1', path: '/unknown1' },
        { method: 'POST', url: '/unknown2', path: '/unknown2' },
        { method: 'PUT', url: '/unknown3', path: '/unknown3' },
      ];

      differentRequests.forEach((request) => {
        notFoundHandler(request, mockResponse);
      });

      expect(console.error).not.toHaveBeenCalled();
      expect(process.exit).not.toHaveBeenCalled();
    });
  });

  describe('notFoundHandler - integration with Express', () => {
    it('should work as Express middleware without calling console.error', () => {
      const middleware = notFoundHandler;
      const mockRequest = {
        method: 'GET',
        url: '/unknown',
        path: '/unknown',
      };
      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };
      const nextFunction = vi.fn();

      middleware(mockRequest, mockResponse, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Route not found' });
      expect(nextFunction).not.toHaveBeenCalled();
      expect(console.error).not.toHaveBeenCalled();
      expect(process.exit).not.toHaveBeenCalled();
    });

    it('should not call console.error for multiple consecutive requests', () => {
      const requests = [
        { method: 'GET', url: '/unknown1' },
        { method: 'POST', url: '/unknown2' },
        { method: 'PUT', url: '/unknown3' },
      ];

      requests.forEach((req) => {
        const mockRequest = {
          method: req.method,
          url: req.url,
          path: req.url,
        };
        const mockResponse = {
          status: vi.fn().mockReturnThis(),
          json: vi.fn().mockReturnThis(),
        };

        notFoundHandler(mockRequest, mockResponse);
      });

      expect(console.error).not.toHaveBeenCalled();
      expect(process.exit).not.toHaveBeenCalled();
    });
  });

  describe('notFoundHandler - type safety', () => {
    it('should accept Express Request type', () => {
      const expressRequest = {
        method: 'GET',
        url: '/unknown',
        path: '/unknown',
        headers: {},
        body: {},
        query: {},
        params: {},
      };

      const mockResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
      };

      expect(() => notFoundHandler(expressRequest, mockResponse)).not.toThrow();
      expect(console.error).not.toHaveBeenCalled();
      expect(process.exit).not.toHaveBeenCalled();
    });

    it('should accept Express Response type', () => {
      const mockRequest = {
        method: 'GET',
        url: '/unknown',
        path: '/unknown',
      };

      const expressResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        send: vi.fn(),
        end: vi.fn(),
      };

      expect(() => notFoundHandler(mockRequest, expressResponse)).not.toThrow();
      expect(console.error).not.toHaveBeenCalled();
      expect(process.exit).not.toHaveBeenCalled();
    });
  });
});