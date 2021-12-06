import { Router } from 'express';
import recommendationRouter from './routers/recommendation.router.js';
import genreRouter from './routers/genre.router.js';

const router = new Router();

router.use('/recommendations', recommendationRouter);
router.use('/genres', genreRouter);

export default router;
