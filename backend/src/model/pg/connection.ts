import { Pool, types, type QueryResultRow, type QueryResult } from 'pg'
import camelcaseKeys from 'camelcase-keys'

types.setTypeParser(1114, (str) => str);
types.setTypeParser(1184, (str) => str);

export const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT as string) | 5433
})


async function Query<T extends QueryResultRow = any>(query: string, values?: any[]): Promise<T[]> {
  const result: QueryResult = await pool.query(query, values);
  return camelcaseKeys(result.rows, { deep: true }) as T[];
}

export default Query;