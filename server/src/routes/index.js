import { Router } from 'express';
import submissionsRouter from './submissions.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

router.use('/submissions', submissionsRouter);

export default router;
