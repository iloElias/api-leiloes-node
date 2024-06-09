import { Request, Response } from 'express';
import pool from '../config/database';

export const createItem = async (req: Request, res: Response): Promise<void> => {
  const client = await pool.connect();
  try {
    const { name, description, initialBid, auctionEndTime, sellerId } = req.body;
    const result = await client.query(
      'INSERT INTO items (name, description, initial_bid, auction_end_time, seller_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, initialBid, auctionEndTime, sellerId],
    );
    res.status(201).json(result.rows[0]);
  } catch (er: any) {
    res.status(500).json({ er: er.message });
  } finally {
    client.release();
  }
};

export const listItem = async (req: Request, res: Response): Promise<void> => {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM items');
    res.status(200).json(result.rows);
  } catch (er: any) {
    res.status(500).json({ er: er.message });
  } finally {
    client.release();
  }
};

export const placeBid = async (req: Request, res: Response): Promise<void> => {
  const client = await pool.connect();
  try {
    const { itemId, userId, amount } = req.body;
    const itemResult = await client.query('SELECT * FROM items WHERE id = $1', [itemId]);
    const item = itemResult.rows[0];
    if (!item) {
      res.status(404).json({ er: 'Item not found' });
      return;
    }

    if (amount <= item.highest_bid) {
      res.status(400).json({ er: 'Bid must be higher than the current highest bid' });
      return;
    }
    const bidResult = await client.query(
      'INSERT INTO bids (amount, item_id, user_id) VALUES ($1, $2, $3) RETURNING *',
      [amount, itemId, userId],
    );
    await client.query('UPDATE items SET highest_bid = $1 WHERE id = $2', [amount, itemId]);

    res.status(201).json(bidResult.rows[0]);
  } catch (er: any) {
    res.status(500).json({ er: er.message });
  } finally {
    client.release();
  }
};
