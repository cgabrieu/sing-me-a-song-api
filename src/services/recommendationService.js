import * as recommendationRepository from '../repositories/recommendationRepository.js';
import * as genreRepository from '../repositories/genreRepository.js';
import Conflict from '../errors/Conflict.js';
import NotFound from '../errors/NotFound.js';

export async function post(name, genresIds, youtubeLink) {
  const linkExists = await recommendationRepository.findYoutubeLink(youtubeLink);
  if (linkExists) throw new Conflict('Recommendation already exists');

  const addedRecommendation = await recommendationRepository.add(name, genresIds, youtubeLink);
  return addedRecommendation;
}

export async function vote(id, type) {
  const recommendationExists = await recommendationRepository.findId(id);
  if (!recommendationExists) throw new NotFound('Recommendation not found');

  const signal = type === 'up' ? '+' : '-';
  const votedRecommendation = await recommendationRepository.vote(id, signal);

  if (votedRecommendation.score < -5) await recommendationRepository.remove(id);

  return votedRecommendation;
}

export async function getRandom() {
  const isPopularRecommendation = Math.floor(Math.random() * 10 + 1) < 8 ? '>' : '<=';

  let recommendation = await recommendationRepository.getFilterRandom(isPopularRecommendation);
  if (!recommendation) {
    recommendation = await recommendationRepository.getRandom(isPopularRecommendation);
    if (!recommendation) throw new NotFound('No recommendations');
  }

  recommendation.genres = await genreRepository.getGenresByRecommendation(recommendation.id);

  return recommendation;
}

export async function getTop(limit) {
  const topRecommendations = await recommendationRepository.getByLimit(limit);
  if (!topRecommendations.length) throw new NotFound('No recommendations');

  for (const recommendation of topRecommendations) {
    recommendation.genres = await genreRepository.getGenresByRecommendation(recommendation.id);
  }

  return topRecommendations;
}

export async function getByGenreId(id) {
  const recommendation = await recommendationRepository.getRandomByGenreId(id);
  if (!recommendation) throw new NotFound('Recommendation not found for this genre');

  recommendation.genres = await genreRepository.getGenresByRecommendation(recommendation.id);

  return recommendation;
}
