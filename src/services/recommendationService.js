import * as recommendationRepository from '../repositories/recommendationRepository.js';
import Conflict from '../errors/Conflict.js';
import NotFound from '../errors/NotFound.js';

export async function post(name, youtubeLink) {
  const linkExists = await recommendationRepository.findYoutubeLink(youtubeLink);
  if (linkExists) throw new Conflict('Recommendation already exists');

  const addedRecommendation = await recommendationRepository.add(name, youtubeLink);
  return addedRecommendation;
}

export async function vote(id, type) {
  const recommendationExists = await recommendationRepository.findId(id);
  if (!recommendationExists) throw new NotFound('Recommendation not found');

  const signal = type === 'up' ? '+' : '-';
  const votedRecommendation = await recommendationRepository.vote(id, signal);
  return votedRecommendation;
}

export async function getRandom() {
  const isPopularRecommendation = Math.floor(Math.random() * 10 + 1) < 8 && true;

  const recommendation = isPopularRecommendation
    ? await recommendationRepository.getPopularRandom()
    : await recommendationRepository.getUnpopularRandom();

  return recommendation;
}
