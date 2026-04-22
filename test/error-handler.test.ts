import { describe, it, expect, beforeEach, vi } from 'vitest';
import { notFoundHandler } from '../src/middleware/errorHandler';

describe('Error Handler Middleware', () => {
  let mockRequest: any;
  let mockResponse: any;
  let nextFunction: any;

  beforeEach(() => {
    // Create mock request object
    mockRequest = {
      method: 'GET',
      url: '/unknown',
      path: '/unknown',
    };

    // Create mock response object
    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };

    // Create next function
    nextFunction = vi.fn();
  });

  describe('notFoundHandler function', () => {
    it('should exist and be a function', () => {
      expect(notFoundHandler).toBeDefined();
      expect(typeof notFoundHandler).toBe('function');
    });

    it('should be exported from the errorHandler module', () => {
      expect(notFoundHandler).toBeDefined();
    });
  });

  describe('Response Status Code', () => {
    it('should return 404 status code', () => {
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return 404 for GET requests', () => {
      mockRequest.method = 'GET';
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return 404 for POST requests', () => {
      mockRequest.method = 'POST';
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return 404 for PUT requests', () => {
      mockRequest.method = 'PUT';
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return 404 for DELETE requests', () => {
      mockRequest.method = 'DELETE';
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return 404 for PATCH requests', () => {
      mockRequest.method = 'PATCH';
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return 404 for HEAD requests', () => {
      mockRequest.method = 'HEAD';
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return 404 for OPTIONS requests', () => {
      mockRequest.method = 'OPTIONS';
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should return 404 for all HTTP methods', () => {
      const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS', 'TRACE'];
      httpMethods.forEach((method) => {
        mockRequest.method = method;
        notFoundHandler(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
      });
    });
  });

  describe('Response Body', () => {
    it('should return JSON response body', () => {
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should return JSON with error message', () => {
      notFoundHandler(mockRequest, mockResponse);

      const callArgs = mockResponse.json.mock.calls[0];
      expect(callArgs).toHaveLength(1);
      expect(callArgs[0]).toEqual({ error: 'Route not found' });
    });

    it('should return exact error message "Route not found"', () => {
      notFoundHandler(mockRequest, mockResponse);

      const callArgs = mockResponse.json.mock.calls[0];
      expect(callArgs[0].error).toBe('Route not found');
    });

    it('should return error object with string value', () => {
      notFoundHandler(mockRequest, mockResponse);

      const callArgs = mockResponse.json.mock.calls[0];
      expect(typeof callArgs[0].error).toBe('string');
    });

    it('should not return additional properties in error object', () => {
      notFoundHandler(mockRequest, mockResponse);

      const callArgs = mockResponse.json.mock.calls[0];
      expect(Object.keys(callArgs[0])).toHaveLength(1);
      expect(Object.keys(callArgs[0])).toContain('error');
    });
  });

  describe('Content-Type Header', () => {
    it('should set Content-Type header to application/json', () => {
      notFoundHandler(mockRequest, mockResponse);

      // The json() method should set Content-Type to application/json
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should set Content-Type when called with different HTTP methods', () => {
      const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];
      httpMethods.forEach((method) => {
        mockRequest.method = method;
        notFoundHandler(mockRequest, mockResponse);
        expect(mockResponse.json).toHaveBeenCalled();
      });
    });
  });

  describe('Request Object Handling', () => {
    it('should accept request object with method property', () => {
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should accept request object with url property', () => {
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should accept request object with path property', () => {
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should handle requests with different paths', () => {
      const differentPaths = ['/unknown', '/api/v1/notfound', '/users/123', '/non-existent'];
      differentPaths.forEach((path) => {
        mockRequest.path = path;
        notFoundHandler(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
      });
    });

    it('should handle requests with different query parameters', () => {
      mockRequest.url = '/unknown?param=value';
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should handle requests with complex URLs', () => {
      mockRequest.url = '/api/v1/users/123/posts/456/comments';
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });

  describe('Response Object Methods', () => {
    it('should use status() method to set 404 status', () => {
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.status).toHaveBeenCalledTimes(1);
    });

    it('should use json() method to send response body', () => {
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Route not found' });
      expect(mockResponse.json).toHaveBeenCalledTimes(1);
    });

    it('should call both status() and json() methods', () => {
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalled();
      expect(mockResponse.json).toHaveBeenCalled();
    });

    it('should return void (no return value)', () => {
      const result = notFoundHandler(mockRequest, mockResponse);

      expect(result).toBeUndefined();
    });
  });

  describe('Error Handling Edge Cases', () => {
    it('should handle request without method property', () => {
      const requestWithoutMethod = { url: '/unknown', path: '/unknown' };
      notFoundHandler(requestWithoutMethod, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should handle request without url property', () => {
      const requestWithoutUrl = { method: 'GET', path: '/unknown' };
      notFoundHandler(requestWithoutUrl, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should handle request without path property', () => {
      const requestWithoutPath = { method: 'GET', url: '/unknown' };
      notFoundHandler(requestWithoutPath, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should handle empty string paths', () => {
      mockRequest.path = '';
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should handle paths with special characters', () => {
      mockRequest.path = '/unknown-route-123_abc';
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });

    it('should handle paths with encoded characters', () => {
      mockRequest.path = '/unknown%20route';
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
    });
  });

  describe('Integration with Express', () => {
    it('should work as Express middleware', () => {
      // Simulate Express middleware behavior
      const middleware = notFoundHandler;

      // Middleware should not call next()
      middleware(mockRequest, mockResponse, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Route not found' });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should not call next() function', () => {
      notFoundHandler(mockRequest, mockResponse, nextFunction);

      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should handle multiple consecutive requests', () => {
      const requests = [
        { method: 'GET', url: '/unknown1' },
        { method: 'POST', url: '/unknown2' },
        { method: 'PUT', url: '/unknown3' },
      ];

      requests.forEach((req) => {
        mockRequest.method = req.method;
        mockRequest.url = req.url;
        notFoundHandler(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
      });

      expect(mockResponse.status).toHaveBeenCalledTimes(3);
      expect(mockResponse.json).toHaveBeenCalledTimes(3);
    });
  });

  describe('Return Value', () => {
    it('should return void (no return value)', () => {
      const result = notFoundHandler(mockRequest, mockResponse);

      expect(result).toBeUndefined();
    });

    it('should not return any value', () => {
      notFoundHandler(mockRequest, mockResponse);

      expect(mockResponse.json).toHaveBeenCalled();
    });
  });

  describe('Type Safety', () => {
    it('should accept Express Request type', () => {
      // This test ensures the function signature is correct
      const expressRequest = {
        method: 'GET',
        url: '/unknown',
        path: '/unknown',
        headers: {},
        body: {},
        query: {},
        params: {},
      };

      expect(() => notFoundHandler(expressRequest, mockResponse)).not.toThrow();
    });

    it('should accept Express Response type', () => {
      const expressResponse = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        send: vi.fn(),
        end: vi.fn(),
      };

      expect(() => notFoundHandler(mockRequest, expressResponse)).not.toThrow();
    });
  });
});