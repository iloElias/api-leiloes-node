import { Schema, model, Document, Types } from 'mongoose';

interface IItem extends Document {
  name: string;
  description: string;
  initialBid: number;
  highestBid: number;
  auctionEndTime: Date;
  sellerId: Types.ObjectId;
  bids: Types.ObjectId[];
}

const ItemSchema = new Schema<IItem>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  initialBid: { type: Number, required: true },
  highestBid: { type: Number, default: 0 },
  auctionEndTime: { type: Date, required: true },
  sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bids: [{ type: Schema.Types.ObjectId, ref: 'Bid' }],
});

export default model<IItem>('Item', ItemSchema);
