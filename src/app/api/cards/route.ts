import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Card from '../../../models/Card';
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
    const cards = await Card.find({ userId: decoded.userId });
    const decryptedCards = cards.map(c => ({
      ...c.toObject(),
      cardNumber: decryptData(c.cardNumber, process.env.JWT_SECRET || ''),
      cvv: decryptData(c.cvv, process.env.JWT_SECRET || ''),
    }));
    return NextResponse.json(decryptedCards);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
  }
}
