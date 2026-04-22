import { Request, Response } from 'express';

/**
 * Error handling middleware for undefined routes.
 * Catches all requests to non-existent routes and returns a 404 Not Found response.
 * This middleware should be registered after all routes are defined to ensure
 * it only triggers for unmatched routes.
 *
 * @param req - Express request object
 * @param res - Express response object
 */
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({ error: 'Route not found' });
};
