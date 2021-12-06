import * as genreRepository from '../repositories/genreRepository.js';
import * as recommendationRepository from '../repositories/recommendationRepository.js';
import Conflict from '../errors/Conflict.js';
import NotFound from '../errors/NotFound.js';

export async function post(name) {
  const nameExists = await genreRepository.findName(name);
  if (nameExists) throw new Conflict('Genre already exists');

  const addedGenre = await genreRepository.add(name);
  return addedGenre;
}

export async function getAll() {
  const genres = await genreRepository.get();
  if (!genres) throw new NotFound('No genres');

  return genres;
}

export async function getById(id) {
  const genre = await genreRepository.getById(id);
  if (!genre) throw new NotFound('Genre not found');

  genre.recommendations = await recommendationRepository.getRecommedationsByGenre(id);

  for (const recommendation of genre.recommendations) {
    recommendation.genres = await genreRepository.getGenresByRecommendation(recommendation.id);
  }

  return genre;
}
