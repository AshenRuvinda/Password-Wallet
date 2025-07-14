import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
}

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function verifyToken(token: string): string | object {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || '');
  } catch (err) {
    throw new Error('Invalid token');
  }
}
