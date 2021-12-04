import connection from '../database/database.js';

// eslint-disable-next-line import/prefer-default-export
export async function findYoutubeLink(youtubeLink) {
  const result = await connection.query(
    'SELECT * FROM recommendations "youtubeLink" = $1;',
    [youtubeLink],
  );
  return result?.rows[0];
}
