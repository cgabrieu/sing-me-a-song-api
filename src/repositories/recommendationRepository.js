import connection from '../database/database.js';
import * as genreRepository from './genreRepository.js';

export async function findYoutubeLink(youtubeLink) {
  const result = await connection.query(
    'SELECT * FROM recommendations WHERE "youtubeLink" = $1;',
    [youtubeLink],
  );
  return result?.rows[0];
}

export async function findId(id) {
  const result = await connection.query(
    'SELECT * FROM recommendations WHERE id = $1;',
    [id],
  );
  return result?.rows[0];
}

export async function add(name, genresIds, youtubeLink) {
  const result = await connection.query(
    'INSERT INTO recommendations (name, "youtubeLink") VALUES ($1, $2) RETURNING *;',
    [name, youtubeLink],
  );

  const addedRecommendation = result.rows[0];

  genresIds.forEach(async (genre) => {
    await connection.query(
      'INSERT INTO recommendations_genres (recommendations_id, genres_id) VALUES ($1, $2);',
      [addedRecommendation.id, genre],
    );
  });

  addedRecommendation.genresIds = genresIds;

  return addedRecommendation;
}

export async function vote(id, signal) {
  const result = await connection.query(
    `UPDATE recommendations SET score = score ${signal} 1 WHERE id = $1 RETURNING *;`,
    [id],
  );
  return result.rows[0];
}

export async function getFilterRandom(isPopularRecommendation) {
  const result = await connection.query(
    `SELECT * FROM recommendations WHERE score ${isPopularRecommendation} 10 ORDER BY random() LIMIT 1;`,
  );
  const recommendation = result.rows[0];
  recommendation.genres = await genreRepository.getGenresByRecommendation(recommendation.id);

  return recommendation;
}

export async function getRandom() {
  const result = await connection.query(
    'SELECT * FROM recommendations ORDER BY random() LIMIT 1;',
  );
  // const recommendation = result.rows[0];
  // recommendation.genres = await genreRepository.getGenresByRecommendation(recommendation.id);

  return result.rows[0];
}

export async function getByLimit(amount) {
  const result = await connection.query(
    'SELECT * FROM recommendations ORDER BY score DESC LIMIT $1;',
    [amount],
  );
  return result.rows;
}

export async function remove(id) {
  return connection.query(
    'DELETE FROM recommendations WHERE id = $1;',
    [id],
  );
}
