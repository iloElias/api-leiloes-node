import pool from './database';

const createTables = async () => {
  const client = await pool.connect();

  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(50) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          password VARCHAR(100) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS items (
          id SERIAL PRIMARY KEY,
          name VARCHAR(100) NOT NULL,
          description TEXT NOT NULL,
          initial_bid NUMERIC NOT NULL,
          highest_bid NUMERIC DEFAULT 0,
          auction_end_time TIMESTAMP NOT NULL,
          seller_id INTEGER REFERENCES users(id)
      );

      CREATE TABLE IF NOT EXISTS bids (
          id SERIAL PRIMARY KEY,
          amount NUMERIC NOT NULL,
          bid_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          item_id INTEGER REFERENCES items(id),
          user_id INTEGER REFERENCES users(id)
      );
    `);
    
    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
  } finally {
    client.release();
  }
};

export default createTables;