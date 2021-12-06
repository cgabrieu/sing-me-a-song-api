import * as genreRepository from '../repositories/genreRepository.js';
import Conflict from '../errors/Conflict.js';
import NotFound from '../errors/NotFound.js';

// eslint-disable-next-line import/prefer-default-export
export async function post(name) {
  const nameExists = await genreRepository.findName(name);
  if (nameExists) throw new Conflict('Genre already exists');

  const addedGenre = await genreRepository.add(name);
  return addedGenre;
}
