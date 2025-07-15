import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Card from '../../../../models/Card';
import User from '../../../../models/User';
import { verifyToken, encryptData, deriveEncryptionKey, hashPin } from '../../../../lib/auth';
import { validateCardForm } from '../../../../utils/validators';

export async function POST(request: Request) {
  await dbConnect();
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  const { cardholderName, cardNumber, expiryDate, cvv, masterPin, cardType, bankName } = await request.json();

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById((decoded as any).userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verify masterPin
    const hashedPin = hashPin(masterPin);
    if (user.masterPin !== hashedPin) {
      return NextResponse.json({ error: 'Invalid master PIN' }, { status: 401 });
    }

    // Validate card data
    const validationError = validateCardForm({ cardholderName, cardNumber, expiryDate, cvv, cardType });
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // Encrypt sensitive data
    const encryptionKey = deriveEncryptionKey(hashedPin);
    const encryptedCardNumber = encryptData(cardNumber, encryptionKey);
    const encryptedCvv = encryptData(cvv, encryptionKey);

    // Create card
    await Card.create({
      userId: user._id,
      cardholderName,
      cardNumber: encryptedCardNumber,
      expiryDate,
      cvv: encryptedCvv,
      cardType,
      bankName,
    });

    return NextResponse.json({ message: 'Card added successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add card' }, { status: 500 });
  }
}