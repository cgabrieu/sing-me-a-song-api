import { Router } from 'express';
import * as recommendationController from '../controllers/recommendationController.js';

const router = new Router();

router.post('', recommendationController.postRecommendation);
router.post('/:id/upvote', recommendationController.postVote);
router.post('/:id/downvote', recommendationController.postVote);

export default router;
