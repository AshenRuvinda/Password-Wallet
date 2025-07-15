import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Card, { ICard } from '../../../models/Card';
import { verifyToken } from '../../../lib/auth';
import mongoose from 'mongoose';

interface CardWithId extends ICard {
  _id: string;
}

export async function GET(request: Request) {
  await dbConnect();
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    const cards = await Card.find({ userId: (decoded as any).userId }).lean() as (ICard & { _id: mongoose.Types.ObjectId })[];
    // Convert _id to string
    const cardsWithStringId: CardWithId[] = cards.map(card => ({
      ...card,
      _id: card._id.toString(),
    }));
    return NextResponse.json(cardsWithStringId, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
  }
}