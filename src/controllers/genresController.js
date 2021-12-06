import Conflict from '../errors/Conflict.js';
// import NotFound from '../errors/NotFound.js';
import * as genreSchema from '../schemas/genreSchema.js';
import * as recommendationService from '../services/recommendationService.js';

// eslint-disable-next-line import/prefer-default-export
export async function postGenre(req, res, next) {
  try {
    const { name } = req.body;

    const { error } = genreSchema.postRecommendation.validate(req.body);
    if (error) {
      return res.status(400).send({
        message: error.message,
      });
    }

    await recommendationService.post(name);

    return res.status(200).send({
      message: 'Successfully created genre',
    });
  } catch (error) {
    if (error instanceof Conflict) return res.status(409).send(error.message);
    return next(error);
  }
}
