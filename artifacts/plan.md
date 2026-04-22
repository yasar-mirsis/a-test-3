## Overview
This project implements a minimal REST API server using Express and TypeScript. The server provides a single GET endpoint at /hello that returns a JSON greeting message. The architecture emphasizes simplicity, fast startup, and maintainability with a focus on minimal dependencies and clear separation of concerns. The implementation will include proper error handling for undefined routes and follow TypeScript best practices for type safety.

### 1. Initialize Project Structure and Dependencies
**Description:** Set up the foundational project structure with package.json, tsconfig.json, and directory layout. Install required dependencies (express) and devDependencies (typescript, ts-node, @types/express). The server must use TypeScript as specified in the architecture. This task creates the minimal viable project setup that enables subsequent implementation tasks.
**Files to create:**
- package.json
- tsconfig.json
- src/index.ts
**Files to modify:**
- None
**Complexity:** Low
**Dependencies:** None

### 2. Implement Hello Router
**Description:** Create a router module that handles requests to the /hello endpoint. Implement a GET route that returns JSON response {"message": "Hello, World!"} with status 200 as specified in the API contract. Use Express Router to define the route. The response Content-Type should be automatically set to application/json by Express's json() method.
**Files to create:**
- src/routes/hello.ts
**Files to modify:**
- None
**Complexity:** Low
**Dependencies:** 1

### 3. Set Up Error Handling Middleware
**Description:** Implement error handling for undefined routes. Create middleware that catches all requests to non-existent routes and returns a 404 Not Found response with JSON body {"error": "Route not found"}. The middleware should be registered after all routes are defined to ensure it only triggers for unmatched routes. Response should have proper Content-Type header.
**Files to create:**
- src/middleware/errorHandler.ts
**Files to modify:**
- None
**Complexity:** Low
**Dependencies:** 1

### 4. Configure and Initialize Express Server
**Description:** Complete the server implementation in src/index.ts by importing and configuring Express. Set up the application to use the Hello Router for /hello routes and register the error handling middleware. Implement server startup logic that listens on port 3000 by default, with port configurable via PORT environment variable. Include basic error handling for server startup failures (e.g., port already in use).
**Files to modify:**
- src/index.ts
**Files to create:**
- None
**Complexity:** Medium
**Dependencies:** 2, 3

## File Structure
/src
  index.ts
  /routes
    hello.ts
  /middleware
    errorHandler.ts
package.json
tsconfig.json

## Testing Strategy
- Unit tests for hello router using Jest and Supertest: verify GET /hello returns 200 status and expected JSON response
- Integration tests for error handling: verify GET /unknown returns 404 status and {"error": "Route not found"}
- Test server startup: verify server starts successfully on default port and handles startup errors gracefully
- Test port configuration: verify server uses PORT environment variable when set
- All tests should run with `npm test` command

## Risks
1. Missing TypeScript configuration could lead to compilation issues - mitigated by including complete tsconfig.json in task 1
2. Middleware order issues could prevent 404 handling - mitigated by clear instructions to register error handler last
3. Port configuration not properly implemented - mitigated by explicit requirement to use PORT environment variable with 3000 fallback
4. Response headers not properly set - mitigated by using Express's res.json() method which automatically sets Content-Type
5. Circular dependencies between modules - mitigated by dependency ordering in tasks and modular design