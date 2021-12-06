import Conflict from '../errors/Conflict.js';
import NotFound from '../errors/NotFound.js';
import * as recommendationSchema from '../schemas/recommendationSchema.js';
import * as recommendationService from '../services/recommendationService.js';

// eslint-disable-next-line import/prefer-default-export
export async function postRecommendation(req, res, next) {
  try {
    const { name, youtubeLink } = req.body;

    const { error } = recommendationSchema.postRecommendation.validate(req.body);
    if (error) {
      return res.status(400).send({
        message: error.message,
      });
    }

    await recommendationService.post(name, youtubeLink);

    return res.status(200).send({
      message: 'Recommendation created successfully',
    });
  } catch (error) {
    if (error instanceof Conflict) return res.status(409).send(error.message);
    return next(error);
  }
}
