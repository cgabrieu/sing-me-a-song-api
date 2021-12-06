import { Router } from 'express';
import * as genreController from '../controllers/genreController.js';

const router = new Router();

router.post('', genreController.postGenre);
// router.get('', genreController.postVote);
// router.get('/:id', genreController.getRecommendation);
// router.get('/:id/random', genreController.getTopRecommendations);

export default router;
