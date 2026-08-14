import { Pool, types } from 'pg'

types.setTypeParser(1114, (str) => str);
types.setTypeParser(1184, (str) => str);

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT as string) | 5433
})

export default pool;