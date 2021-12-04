import Conflict from '../errors/Conflict.js';
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

export async function postVote(req, res, next) {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || id < 1) {
      return res.status(400).send({
        message: 'Invalid Recommendation Id',
      });
    }

    const type = req.url.includes('upvote') ? 'up' : 'down';

    await recommendationService.vote(id, type);

    return res.status(200).send({
      message: `Voted ${type} Successfully`,
    });
  } catch (error) {
    if (error instanceof Conflict) return res.status(404).send(error.message);
    return next(error);
  }
}
