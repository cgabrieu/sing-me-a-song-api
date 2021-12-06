import Conflict from '../errors/Conflict.js';
import NotFound from '../errors/NotFound.js';
import * as recommendationSchema from '../schemas/recommendationSchema.js';
import * as recommendationService from '../services/recommendationService.js';

export async function postRecommendation(req, res, next) {
  try {
    const { name, genresIds, youtubeLink } = req.body;

    const { error } = recommendationSchema.postRecommendation.validate(req.body);
    if (error) {
      return res.status(400).send({
        message: error.message,
      });
    }

    await recommendationService.post(name, genresIds, youtubeLink);

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
    if (error instanceof NotFound) return res.status(404).send(error.message);
    return next(error);
  }
}

export async function getRecommendation(req, res, next) {
  try {
    const recommendation = await recommendationService.getRandom();
    return res.status(200).send(recommendation);
  } catch (error) {
    if (error instanceof NotFound) return res.status(404).send(error.message);
    return next(error);
  }
}

export async function getTopRecommendations(req, res, next) {
  try {
    const { amount } = req.params;

    if (!Number.isInteger(Number(amount)) || amount < 1) {
      return res.status(400).send({
        message: 'Invalid Amount',
      });
    }

    const recommendations = await recommendationService.getTop(amount);

    return res.status(200).send(recommendations);
  } catch (error) {
    if (error instanceof NotFound) return res.status(404).send(error.message);
    return next(error);
  }
}
