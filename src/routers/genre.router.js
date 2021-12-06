import { Router } from 'express';
import * as genreController from '../controllers/genreController.js';

const router = new Router();

router.post('', genreController.postGenre);
router.get('', genreController.getGenres);
router.get('/:id', genreController.getGenreById);

export default router;
