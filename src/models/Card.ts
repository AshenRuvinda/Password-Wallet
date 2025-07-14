import mongoose, { Schema, Document } from 'mongoose';

export interface ICard extends Document {
  _id: string;
  userId: string;
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  bankName: string;
  cardType: string;
}

const CardSchema: Schema = new Schema({
  userId: { type: String, required: true },
  cardholderName: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true },
  bankName: { type: String, required: true },
  cardType: { type: String, required: true },
});

export default mongoose.models.Card || mongoose.model<ICard>('Card', CardSchema);