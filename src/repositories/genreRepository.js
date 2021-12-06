import connection from '../database/database.js';

// eslint-disable-next-line import/prefer-default-export
export async function findName(name) {
  const result = await connection.query(
    'SELECT * FROM genres WHERE name = $1;',
    [name],
  );
  return result?.rows[0];
}
