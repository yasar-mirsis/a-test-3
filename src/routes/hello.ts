import { Router, Request, Response } from 'express';

const router = Router();

/**
 * GET /hello
 * Returns a greeting message
 */
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello, World!' });
});

export default router;
