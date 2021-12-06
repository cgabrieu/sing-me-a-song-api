import { Router } from 'express';
import * as recommendationController from '../controllers/recommendationController.js';

const router = new Router();

router.post('', recommendationController.postRecommendation);
router.post('/:id/upvote', recommendationController.postVote);
router.post('/:id/downvote', recommendationController.postVote);
router.get('/random', recommendationController.getRecommendation);
router.get('/top/:amount', recommendationController.getTopRecommendations);
router.get('/genres/:id/random', recommendationController.getRecommendationByGenreId);

export default router;
