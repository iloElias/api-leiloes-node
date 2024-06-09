// eslint-disable-next-line import/no-extraneous-dependencies
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://postgres:xWpZGvSIWCBofvFoEduKGJeNqlDtrbkh@monorail.proxy.rlwy.net:25125/railway', // Preferi não utilizar um `.env` da vida pra encurtar o trabalho.
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
