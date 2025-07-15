import mongoose, { Schema, Document } from 'mongoose';

export interface ICard extends Document {
  userId: mongoose.Types.ObjectId;
  cardholderName: string;
  cardNumber: string; // Encrypted
  expiryDate: string;
  cvv: string; // Encrypted
  cardType: string; // e.g., 'Visa', 'MasterCard'
  bankName?: string; // Optional
}

const CardSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cardholderName: { type: String, required: true },
  cardNumber: { type: String, required: true }, // Stored as encrypted
  expiryDate: { type: String, required: true },
  cvv: { type: String, required: true }, // Stored as encrypted
  cardType: { type: String, required: true },
  bankName: { type: String },
}, {
  timestamps: true,
});

export default mongoose.models.Card || mongoose.model<ICard>('Card', CardSchema);