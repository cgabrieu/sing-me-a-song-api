import Conflict from '../errors/Conflict.js';
import NotFound from '../errors/NotFound.js';
import * as genreSchema from '../schemas/genreSchema.js';
import * as genreService from '../services/genreService.js';

export async function postGenre(req, res, next) {
  try {
    const { name } = req.body;

    const { error } = genreSchema.postGenre.validate(req.body);
    if (error) {
      return res.status(400).send({
        message: error.message,
      });
    }

    await genreService.post(name);

    return res.status(200).send({
      message: 'Successfully created genre',
    });
  } catch (error) {
    if (error instanceof Conflict) return res.status(409).send(error.message);
    return next(error);
  }
}

export async function getGenres(req, res, next) {
  try {
    const genres = await genreService.getAll();
    return res.status(200).send(genres);
  } catch (error) {
    if (error instanceof NotFound) return res.status(404).send(error.message);
    return next(error);
  }
}

export async function getGenreById(req, res, next) {
  try {
    const { id } = req.params;

    if (!Number.isInteger(Number(id)) || id < 1) {
      return res.status(400).send({
        message: 'Invalid Genre Id',
      });
    }

    const genre = await genreService.getById(id);
    return res.status(200).send(genre);
  } catch (error) {
    if (error instanceof NotFound) return res.status(404).send(error.message);
    return next(error);
  }
}
