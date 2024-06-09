import { Schema, model, Document, Types } from 'mongoose';

interface IBid extends Document {
  itemId: Types.ObjectId;
  userId: Types.ObjectId;
  amount: number;
  bidTime: Date;
}

const BidSchema = new Schema<IBid>({
  itemId: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  bidTime: { type: Date, default: Date.now },
});

export default model<IBid>('Bid', BidSchema);
