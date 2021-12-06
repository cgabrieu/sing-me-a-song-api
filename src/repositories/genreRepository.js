import connection from '../database/database.js';

export async function findName(name) {
  const result = await connection.query(
    'SELECT * FROM genres WHERE name = $1;',
    [name],
  );
  return result?.rows[0];
}

export async function add(name) {
  const result = await connection.query(
    'INSERT INTO genres (name) VALUES ($1) RETURNING *;',
    [name],
  );
  return result.rows[0];
}

export async function get() {
  const result = await connection.query('SELECT * FROM genres;');
  return result.rows;
}

export async function getGenresByRecommendation(recommendationId) {
  const result = await connection.query(
    'SELECT * FROM recommendations_genres WHERE recommendations_id = $1;',
    [recommendationId],
  );

  const genresIds = result.rows.map((genre) => genre.genres_id).join(',');

  console.log(genresIds);

  const genres = await connection.query(
    `SELECT * FROM genres WHERE id in (${(genresIds)});`,
  );

  return genres.rows;
}
