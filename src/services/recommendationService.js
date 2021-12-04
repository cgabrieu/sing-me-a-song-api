import * as recommendationRepository from '../repositories/recommendationRepository.js';
import Conflict from '../errors/Conflict.js';

// eslint-disable-next-line import/prefer-default-export
export async function post(name, youtubeLink) {
  const linkExists = recommendationRepository.findYoutubeLink(youtubeLink);
  if (linkExists) throw new Conflict('Recommendation already exists');

  const addedRecommendation = await recommendationRepository.add(name, youtubeLink);
  return addedRecommendation;
}
