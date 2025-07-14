import mongoose, { Schema, Document } from 'mongoose';

export interface IPassword extends Document {
  _id: string;
  userId: string;
  site: string;
  username: string;
  password: string;
  notes: string;
}

const PasswordSchema: Schema = new Schema({
  userId: { type: String, required: true },
  site: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  notes: { type: String },
});

export default mongoose.models.Password || mongoose.model<IPassword>('Password', PasswordSchema);