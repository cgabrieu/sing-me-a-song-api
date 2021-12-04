import connection from '../database/database.js';

export async function findYoutubeLink(youtubeLink) {
  const result = await connection.query(
    'SELECT * FROM recommendations WHERE "youtubeLink" = $1;',
    [youtubeLink],
  );
  return result?.rows[0];
}

export async function add(name, youtubeLink) {
  const result = await connection.query(
    'INSERT INTO recommendations (name, "youtubeLink") VALUES ($1, $2) RETURNING *',
    [name, youtubeLink],
  );
  return result.rows[0];
}

export async function findId(id) {
  const result = await connection.query(
    'SELECT * FROM recommendations WHERE id = $1;',
    [id],
  );
  return result?.rows[0];
}

export async function vote(id, signal) {
  const result = await connection.query(
    `UPDATE recommendations SET score = score ${signal} 1 WHERE id = $1 RETURNING *`,
    [id],
  );
  return result.rows[0];
}

export async function getPopularRandom() {

}

export async function getUnpopularRandom() {

}
