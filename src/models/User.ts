import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  fullName: string;
  masterPin: string;
  securityQuestion: string;
  securityAnswer: string;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  masterPin: { type: String, required: true },
  securityQuestion: { type: String, required: true },
  securityAnswer: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);