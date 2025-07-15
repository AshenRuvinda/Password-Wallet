import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import { verifyToken, hashPin, hashSecurityAnswer } from '../../../../lib/auth';

export async function GET(request: Request) {
  await dbConnect();
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById((decoded as any).userId).select('email fullName securityQuestion');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  await dbConnect();
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  const { fullName, masterPin, securityQuestion, securityAnswer } = await request.json();

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token);
    const user = await User.findById((decoded as any).userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (fullName) user.fullName = fullName;
    if (masterPin) user.masterPin = hashPin(masterPin);
    if (securityQuestion) user.securityQuestion = securityQuestion;
    if (securityAnswer) user.securityAnswer = hashSecurityAnswer(securityAnswer);

    await user.save();
    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}