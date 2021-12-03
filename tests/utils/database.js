import connection from '../../src/database/database';

export default async function clearDatabase() {
  await connection.query('TRUNCATE something CASCADE;');
}
