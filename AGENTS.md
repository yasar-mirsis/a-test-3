# AGENTS.md — a-test-3

This file describes the project for AI agents working on implementation issues.

## Project Context

# Analysis Document

## Stakeholders
- Developer: Implements and maintains the API
- End User: Consumes the API endpoint
- Operations Team: Deploys and monitors the service

## User Stories
- As a developer, I want a minimal server setup with Express and TypeScript so that I can quickly start and maintain the service.
  - Acceptance Criteria: Server starts without errors, uses TypeScript, and has minimal dependencies.
- As an end user, I want to send a GET request to /hello and receive a JSON response with a greeting message so that I can verify the API is working.
  - Acceptance Criteria: Request to GET /hello returns 200 OK with {"message": "Hello, World!"}.

## Functional Requirements
- Must: Implement a single GET endpoint at /hello
- Must: Return JSON response {"message": "Hello, World!"} with status 200
- Must: Use Node.js with Express and TypeScript
- Must: Server entry point is a single file
- Should: Handle invalid routes with 404 Not Found

## Non-Functional Requirements
- Must: Codebase remains minimal and focused
- Must: Use TypeScript for type safety
- Should: Include basic error handling
- Could: Support HTTPS in production
- Must: Startup time is fast due to minimal setup

## Edge Cases
- Request to non-existent route (e.g., GET /unknown) should return 404
- Server should start successfully on default port
- Server should handle startup errors (e.g., port in use) gracefully

## Assumptions
- The server will run in a Node.js environment with TypeScript support
- Port configuration is handled via environment variables or defaults to 3000
- No authentication or authorization is required for the endpoint
- No additional middleware (logging, parsing, etc.) is needed beyond what Express requires
- The single file approach includes all necessary configuration and routing

## Open Questions
- What port should the server listen on by default?
- Should CORS be enabled?
- Are there specific TypeScript configuration requirements?
- Should the project include a package.json script to start the server?
- Is there a preferred directory structure for TypeScript output?

## Architecture

## System Overview
The system is a minimal REST API server built with Express and TypeScript. It exposes a single GET endpoint at `/hello` that returns a greeting message in JSON format. The architecture prioritizes simplicity, fast startup, and ease of maintenance. The server handles basic routing and error conditions like 404s for undefined routes.

## Components
- **Server**: Entry point and main application controller. Initializes Express app, sets up routing, and starts HTTP server. Interface: starts on a configured port, handles incoming HTTP requests.
- **Hello Router**: Handles all routes under `/hello`. Currently implements only the GET method. Interface: Express router middleware that processes `/hello` requests and sends JSON responses.
- **Error Handler**: Middleware that catches undefined routes and returns 404 responses. Interface: Express error-handling middleware that intercepts 404s and returns standard error format.

## Data Model
- **GreetingResponse**: A simple data structure representing the response from the `/hello` endpoint.
  - `message`: string - The greeting text (e.g., "Hello, World!")

No relationships exist as this is a stateless API with no persistence.

## API Contracts
- **GET /hello**
  - Request: No parameters or body required
  - Response: 200 OK
    - Body: `{"message": "Hello, World!"}`
    - Content-Type: application/json
- **GET /unknown (example)**
  - Response: 404 Not Found
    - Body: `{"error": "Route not found"}`
    - Content-Type: application/json

## Technology Stack
- **Node.js**: Runtime environment for executing JavaScript on the server. Chosen for its lightweight nature, vast ecosystem, and suitability for simple API services.
- **Express**: Minimalist web framework for Node.js. Justification: minimal overhead, excellent TypeScript support, and industry-standard for simple REST APIs.
- **TypeScript**: Typed superset of JavaScript. Justification: provides type safety, improves developer experience, and helps catch errors at compile time—critical for maintainability even in small projects.

## Data Flow
1. User sends HTTP GET request to `/hello`
2. Express server receives request and matches it to the Hello Router
3. Hello Router processes the request and creates a response object with status 200 and JSON body `{"message": "Hello, World!"}`
4. Response is sent back to the user
5. For invalid routes: request falls through to Error Handler middleware
6. Error Handler returns 404 response with JSON error message

## Security Considerations
- No authentication or authorization is implemented as not required
- The API is publicly accessible
- Express defaults are used; no additional security headers are set
- Input validation is not needed as the endpoint accepts no parameters
- Risk is minimal due to simplicity and lack of data processing
- Recommended to deploy behind a reverse proxy with proper TLS termination in production

## Scalability Notes
- The service is stateless and can be scaled horizont

[... truncated for brevity ...]

## Working Guidelines

- Read this file and README.md before starting any work
- Follow existing code patterns and conventions
- Write clean, production-quality code with proper error handling
- Create or update tests if a testing setup exists
- Do NOT run git commands — the pipeline handles commits and pushes
- Do NOT ask questions — you are running in an automated pipeline