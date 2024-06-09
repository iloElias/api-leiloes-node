import { Request, Response } from 'express';
import pool from '../config/database';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const client = await pool.connect();
  try {
    const { username, email, password } = req.body;
    const result = await client.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, password],
    );
    res.status(201).json(result.rows[0]);
  } catch (er: any) {
    res.status(500).json({ er: er.message });
  } finally {
    client.release();
  }
};
