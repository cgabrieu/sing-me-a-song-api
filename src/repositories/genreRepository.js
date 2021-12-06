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
  const result = await connection.query(
    'SELECT * FROM genres;',
  );
  return result.rows;
}
