import express, { Express } from 'express';
import helloRouter from './routes/hello';
import { notFoundHandler } from './middleware/errorHandler';

const app: Express = express();
const PORT: number = (() => {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  return isNaN(port) ? 3000 : port;
})();

// Mount the hello router at /hello
app.use('/hello', helloRouter);

// Register 404 handler for undefined routes
app.use(notFoundHandler);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle server startup errors
server.on('error', (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') {
    console.error('Unexpected server error:', error);
    process.exit(1);
  }

  const bind = `Port ${PORT}`;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
