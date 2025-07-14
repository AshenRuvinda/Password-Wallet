import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import { verifyToken, hashPassword } from '../../../../lib/auth';
import { encryptData } from '../../../../lib/crypto';

export async function GET(request: Request) {
  await dbConnect();
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token) as { userId: string };
    const user = await User.findById(decoded.userId).select('fullName securityQuestion');
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json({
      fullName: user.fullName,
      securityQuestion: user.securityQuestion,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  await dbConnect();
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = verifyToken(token) as { userId: string };
    const { fullName, masterPin, securityQuestion, securityAnswer } = await request.json();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (fullName) user.fullName = fullName;
    if (masterPin) user.masterPin = encryptData(masterPin, process.env.JWT_SECRET || '');
    if (securityQuestion) user.securityQuestion = securityQuestion;
    if (securityAnswer) user.securityAnswer = encryptData(securityAnswer, process.env.JWT_SECRET || '');

    await user.save();
    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
} 
