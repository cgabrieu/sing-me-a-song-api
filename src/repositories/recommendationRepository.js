import connection from '../database/database.js';

// eslint-disable-next-line import/prefer-default-export
export async function findYoutubeLink(youtubeLink) {
  const result = await connection.query(
    'SELECT * FROM recommendations WHERE "youtubeLink" = $1;',
    [youtubeLink],
  );
  if (!result) return null;
  return result.rows[0];
}

export async function add(name, youtubeLink) {
  const result = await connection.query(
    'INSERT INTO recommendations (name, "youtubeLink") VALUES ($1, $2) RETURNING *',
    [name, youtubeLink],
  );
  return result.rows[0];
}
