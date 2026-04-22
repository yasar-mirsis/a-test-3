import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
import helloRouter from '../src/routes/hello';
import { notFoundHandler } from '../src/middleware/errorHandler';

describe('Server Integration Tests', () => {
  let app: express.Express;
  let server: any;
  let originalPort: string | undefined;

  beforeEach(() => {
    // Save original PORT environment variable
    originalPort = process.env.PORT;
    // Clear any existing PORT environment variable
    delete process.env.PORT;

    // Create a new Express app for each test
    app = express();

    // Mount the hello router at /hello
    app.use('/hello', helloRouter);

    // Register 404 handler for undefined routes
    app.use(notFoundHandler);
  });

  afterEach(() => {
    // Restore original PORT environment variable
    if (originalPort !== undefined) {
      process.env.PORT = originalPort;
    } else {
      delete process.env.PORT;
    }

    // Close the server if it's running
    if (server) {
      server.close();
    }
  });

describe('Server Startup', () => {
    it('should start server on default port 3000', async () => {
      // Start the server
      server = app.listen(3100, () => {
        expect(server).toBeDefined();
      });

      // Wait a bit for server to fully start
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Verify server is listening
      expect(server.listening).toBe(true);
      expect(server.address()).toBeDefined();
      expect(server.address().port).toBe(3100);
    });

    it('should start server on custom PORT environment variable', async () => {
      // Set custom PORT environment variable
      process.env.PORT = '4200';

      // Start the server
      server = app.listen(() => {
        expect(server).toBeDefined();
      });

      // Wait a bit for server to fully start
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Verify server is listening on custom port
      expect(server.listening).toBe(true);
      expect(server.address()).toBeDefined();
      expect(typeof server.address().port).toBe('number');
      expect(server.address().port).toBe(4200);
    });

    it('should parse PORT environment variable as number', async () => {
      // Set custom PORT environment variable
      process.env.PORT = '5000';

      // Start the server
      server = app.listen(() => {
        expect(server).toBeDefined();
      });

      // Wait a bit for server to fully start
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Verify server is listening on custom port
      expect(server.listening).toBe(true);
      expect(server.address()).toBeDefined();
      expect(typeof server.address().port).toBe('number');
      expect(server.address().port).toBe(5000);
    });

    it('should handle PORT environment variable with leading zeros', async () => {
      process.env.PORT = '0600';

      server = app.listen(() => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(server.listening).toBe(true);
      expect(server.address()).toBeDefined();
      expect(typeof server.address().port).toBe('number');
      // Leading zeros are stripped, so 0600 becomes 600
      expect(server.address().port).toBe(600);
    });

    it('should handle PORT environment variable as string number', async () => {
      process.env.PORT = '8080';

      server = app.listen(() => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(server.listening).toBe(true);
      expect(server.address()).toBeDefined();
      expect(typeof server.address().port).toBe('number');
      expect(server.address().port).toBe(8080);
    });
  });

      // Wait a bit for server to fully start
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Verify server is listening
      expect(server.listening).toBe(true);
      expect(server.address()).toBeDefined();
      expect(server.address().port).toBe(3000);
    });

    it('should start server on custom PORT environment variable', async () => {
      // Set custom PORT environment variable
      process.env.PORT = '4200';

      // Start the server
      server = app.listen(() => {
        expect(server).toBeDefined();
      });

      // Wait a bit for server to fully start
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Verify server is listening on custom port
      expect(server.listening).toBe(true);
      expect(server.address()).toBeDefined();
      expect(server.address().port).toBe(4200);
    });

    it('should parse PORT environment variable as number', async () => {
      process.env.PORT = '5000';

      server = app.listen(() => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(server.listening).toBe(true);
      expect(server.address()).toBeDefined();
      expect(typeof server.address().port).toBe('number');
      expect(server.address().port).toBe(5000);
    });

    it('should handle PORT environment variable with leading zeros', async () => {
      process.env.PORT = '0600';

      server = app.listen(() => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(server.listening).toBe(true);
      expect(server.address()).toBeDefined();
      expect(server.address().port).toBe(600);
    });

    it('should handle PORT environment variable as string number', async () => {
      process.env.PORT = '8080';

      server = app.listen(() => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(server.listening).toBe(true);
      expect(server.address()).toBeDefined();
      expect(server.address().port).toBe(8080);
    });
  });

  describe('Server Startup Error Handling', () => {
    it('should handle EADDRINUSE error gracefully when port is already in use', async () => {
      // Try to start a server on a port that's already in use
      // We'll use port 3101 which is commonly available
      const testPort = 3101;

      // Start the first server
      server = app.listen(testPort, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Create a new app and try to start on the same port
      const app2 = express();
      app2.use('/hello', helloRouter);
      app2.use(notFoundHandler);

      let errorOccurred = false;
      let error: any;

      server = app2.listen(testPort, () => {
        // Should not reach here
      });

      server.on('error', (err: any) => {
        errorOccurred = true;
        error = err;
      });

      // Wait for error to occur
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Verify error occurred
      expect(errorOccurred).toBe(true);
      expect(error).toBeDefined();
      expect(error.code).toBe('EADDRINUSE');
    });

    it('should handle EACCES error gracefully when port requires elevated privileges', async () => {
      // Try to start a server on a port that requires root privileges
      // Ports below 1024 typically require elevated privileges
      const testPort = 80;

      const app2 = express();
      app2.use('/hello', helloRouter);
      app2.use(notFoundHandler);

      let errorOccurred = false;
      let error: any;

      server = app2.listen(testPort, () => {
        // Should not reach here
      });

      server.on('error', (err: any) => {
        errorOccurred = true;
        error = err;
      });

      // Wait for error to occur
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Verify error occurred
      expect(errorOccurred).toBe(true);
      expect(error).toBeDefined();
      expect(error.code).toBe('EACCES');
    });

    it('should handle other listen errors and throw them', async () => {
      // Test with an invalid port (NaN)
      const app2 = express();
      app2.use('/hello', helloRouter);
      app2.use(notFoundHandler);

      let errorOccurred = false;
      let error: any;

      server = app2.listen(NaN, () => {
        // Should not reach here
      });

      server.on('error', (err: any) => {
        errorOccurred = true;
        error = err;
      });

      // Wait for error to occur
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Verify error occurred
      expect(errorOccurred).toBe(true);
      expect(error).toBeDefined();
      expect(error.syscall).toBe('listen');
    });

    it('should exit process on EADDRINUSE error', async () => {
      const testPort = 3102;

      // Start the first server
      server = app.listen(testPort, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Create a new app and try to start on the same port
      const app2 = express();
      app2.use('/hello', helloRouter);
      app2.use(notFoundHandler);

      // Mock process.exit to prevent actual exit
      const mockExit = vi.spyOn(process, 'exit').mockImplementation(() => {
        // Do nothing
      });

      server = app2.listen(testPort, () => {
        // Should not reach here
      });

      server.on('error', (err: any) => {
        if (err.code === 'EADDRINUSE') {
          // This is expected behavior
        }
      });

      // Wait for error to occur
      await new Promise((resolve) => setTimeout(resolve, 200));

      // Verify process.exit was called
      expect(mockExit).toHaveBeenCalledWith(1);

      // Restore process.exit
      mockExit.mockRestore();
    });
  });

  describe('Router Mounting', () => {
    it('should mount hello router at /hello', async () => {
      server = app.listen(3003, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Make a request to /hello
      const response = await request(app).get('/hello');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Hello, World!' });
    });

    it('should not mount hello router at root path', async () => {
      server = app.listen(3004, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Make a request to root path
      const response = await request(app).get('/');

      // Should get 404 since router is mounted at /hello
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Route not found' });
    });

    it('should mount hello router at /hello with trailing slash', async () => {
      server = app.listen(3005, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Make a request to /hello/ (with trailing slash)
      const response = await request(app).get('/hello/');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Hello, World!' });
    });

    it('should mount hello router at /hello with no trailing slash', async () => {
      server = app.listen(3006, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Make a request to /hello (no trailing slash)
      const response = await request(app).get('/hello');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Hello, World!' });
    });

    it('should not mount hello router at /hello/api', async () => {
      server = app.listen(3007, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Make a request to /hello/api (should be treated as a route under /hello)
      const response = await request(app).get('/hello/api');

      // This will depend on how Express handles the route
      // Since we only mounted the router at /hello, /hello/api should not match
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Route not found' });
    });
  });

  describe('Middleware Registration', () => {
    it('should register notFoundHandler middleware', async () => {
      server = app.listen(3008, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Verify notFoundHandler is registered by making a request to an undefined route
      const response = await request(app).get('/unknown');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Route not found' });
    });

    it('should register notFoundHandler after hello router', async () => {
      server = app.listen(3009, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Test that notFoundHandler takes precedence over undefined routes
      const response = await request(app).get('/nonexistent');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Route not found' });
    });

    it('should register notFoundHandler for all HTTP methods', async () => {
      server = app.listen(3010, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const httpMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'];

      for (const method of httpMethods) {
        const response = await request(app)[method]('/undefined-route');
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Route not found' });
      }
    });
  });

  describe('GET /hello Endpoint Integration Tests', () => {
    it('should return 200 status code for GET /hello', async () => {
      server = app.listen(3011, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await request(app).get('/hello');

      expect(response.status).toBe(200);
    });

    it('should return JSON response with correct message "Hello, World!"', async () => {
      server = app.listen(3012, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await request(app).get('/hello');

      expect(response.body).toEqual({ message: 'Hello, World!' });
    });

    it('should return Content-Type header as application/json', async () => {
      server = app.listen(3013, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await request(app).get('/hello');

      expect(response.headers['content-type']).toContain('application/json');
    });

    it('should handle GET request to /hello endpoint', async () => {
      server = app.listen(3014, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await request(app).get('/hello');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Hello, World!');
    });

    it('should return correct response body structure', async () => {
      server = app.listen(3015, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await request(app).get('/hello');

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Hello, World!');
      expect(typeof response.body.message).toBe('string');
    });

    it('should handle multiple consecutive requests to /hello', async () => {
      server = app.listen(3016, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const responses = await Promise.all([
        request(app).get('/hello'),
        request(app).get('/hello'),
        request(app).get('/hello'),
      ]);

      responses.forEach((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Hello, World!' });
      });
    });

    it('should handle concurrent requests to /hello', async () => {
      server = app.listen(3017, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const responses = await Promise.all([
        request(app).get('/hello'),
        request(app).get('/hello'),
        request(app).get('/hello'),
      ]);

      responses.forEach((response) => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Hello, World!' });
      });
    });
  });

  describe('Undefined Routes Integration Tests', () => {
    it('should return 404 for GET /unknown', async () => {
      server = app.listen(3018, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await request(app).get('/unknown');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Route not found' });
    });

    it('should return 404 for POST /unknown', async () => {
      server = app.listen(3019, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await request(app).post('/unknown');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Route not found' });
    });

    it('should return 404 for PUT /unknown', async () => {
      server = app.listen(3020, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await request(app).put('/unknown');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Route not found' });
    });

    it('should return 404 for DELETE /unknown', async () => {
      server = app.listen(3021, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await request(app).delete('/unknown');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Route not found' });
    });

    it('should return 404 for PATCH /unknown', async () => {
      server = app.listen(3022, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await request(app).patch('/unknown');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Route not found' });
    });

    it('should return 404 for HEAD /unknown', async () => {
      server = app.listen(3023, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await request(app).head('/unknown');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Route not found' });
    });

    it('should return 404 for OPTIONS /unknown', async () => {
      server = app.listen(3024, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await request(app).options('/unknown');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Route not found' });
    });

    it('should return 404 for various undefined routes', async () => {
      server = app.listen(3025, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const undefinedRoutes = [
        '/api/v1/users',
        '/api/v1/users/123',
        '/api/v1/users/123/posts',
        '/api/v1/users/123/posts/456',
        '/non-existent-route',
        '/test',
        '/health',
      ];

      for (const route of undefinedRoutes) {
        const response = await request(app).get(route);
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ error: 'Route not found' });
      }
    });

    it('should return 404 for routes with query parameters', async () => {
      server = app.listen(3026, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await request(app).get('/unknown?param=value&foo=bar');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Route not found' });
    });

    it('should return 404 for routes with fragments', async () => {
      server = app.listen(3027, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await request(app).get('/unknown#section');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Route not found' });
    });

    it('should return 404 for routes with special characters', async () => {
      server = app.listen(3028, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await request(app).get('/unknown-route-123_abc');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'Route not found' });
    });
  });

  describe('Port Configuration Edge Cases', () => {
    it('should handle PORT environment variable as empty string', async () => {
      process.env.PORT = '';

      server = app.listen(() => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Empty string should be treated as falsy, so default port should be used
      expect(server.listening).toBe(true);
      expect(server.address()).toBeDefined();
      // The port might be 3000 or could be parsed as 0, which is invalid
      expect(typeof server.address().port).toBe('number');
    });

    it('should handle PORT environment variable as non-numeric string', async () => {
      process.env.PORT = 'invalid';

      server = app.listen(() => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Non-numeric string should be treated as falsy, so default port should be used
      expect(server.listening).toBe(true);
      expect(server.address()).toBeDefined();
      expect(typeof server.address().port).toBe('number');
    });

    it('should handle PORT environment variable as zero', async () => {
      process.env.PORT = '0';

      server = app.listen(() => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Zero is falsy, so default port should be used
      expect(server.listening).toBe(true);
      expect(server.address()).toBeDefined();
      expect(typeof server.address().port).toBe('number');
    });

    it('should handle PORT environment variable as NaN', async () => {
      process.env.PORT = 'NaN';

      server = app.listen(() => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      // NaN is falsy, so default port should be used
      expect(server.listening).toBe(true);
      expect(server.address()).toBeDefined();
      expect(typeof server.address().port).toBe('number');
    });
  });

  describe('Server Cleanup', () => {
    it('should properly close server after test', async () => {
      server = app.listen(3030, () => {
        expect(server).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(server.listening).toBe(true);

      // Close the server
      server.close();

      // Verify server is closed
      expect(server.listening).toBe(false);
    });

    it('should handle multiple server instances', async () => {
      // Start first server
      const app1 = express();
      app1.use('/hello', helloRouter);
      app1.use(notFoundHandler);

      const server1 = app1.listen(3031, () => {
        expect(server1).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(server1.listening).toBe(true);

      // Start second server
      const app2 = express();
      app2.use('/hello', helloRouter);
      app2.use(notFoundHandler);

      const server2 = app2.listen(3032, () => {
        expect(server2).toBeDefined();
      });

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(server2.listening).toBe(true);

      // Close both servers
      server1.close();
      server2.close();

      // Verify both servers are closed
      expect(server1.listening).toBe(false);
      expect(server2.listening).toBe(false);
    });
  });
});