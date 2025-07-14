import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Password from '../../../models/Password';
import { verifyToken } from '../../../lib/auth';
import { decryptData } from '../../../lib/crypto';

export async function GET(request: Request) {
  await dbConnect();
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token) as { userId: string };
    const passwords = await Password.find({ userId: decoded.userId });
    const decryptedPasswords = passwords.map(p => ({
      ...p.toObject(),
      password: decryptData(p.password, process.env.JWT_SECRET || ''),
    }));
    return NextResponse.json(decryptedPasswords);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch passwords' }, { status: 500 });
  }
}
