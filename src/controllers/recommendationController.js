import * as recommendationSchema from '../schemas/recommendationSchemas.js';

// eslint-disable-next-line import/prefer-default-export
export async function postRecommendation(req, res) {
  try {
    const { name, youtubeLink } = req.body;

    const { error } = recommendationSchema.postRecommendation.validate(req.body);
    if (error) return res.status(400).send(error.message);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
