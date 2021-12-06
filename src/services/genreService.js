import * as genreRepository from '../repositories/genreRepository.js';
import Conflict from '../errors/Conflict.js';
import NotFound from '../errors/NotFound.js';

export async function post(name) {
  const nameExists = await genreRepository.findName(name);
  if (nameExists) throw new Conflict('Genre already exists');

  const addedGenre = await genreRepository.add(name);
  return addedGenre;
}

export async function get() {
  const genres = await genreRepository.getRandom();
  if (!genres) throw new NotFound('No genres');

  return genres;
}
