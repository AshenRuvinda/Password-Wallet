import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import { hashPassword } from '../../../../lib/auth';
import { encryptData } from '../../../../lib/crypto';

export async function POST(request: Request) {
  await dbConnect();
  const { email, password, fullName, masterPin, securityQuestion, securityAnswer } = await request.json();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const encryptedMasterPin = encryptData(masterPin, process.env.JWT_SECRET || '');
    const encryptedSecurityAnswer = encryptData(securityAnswer, process.env.JWT_SECRET || '');

    const user = new User({
      email,
      password: hashedPassword,
      fullName,
      masterPin: encryptedMasterPin,
      securityQuestion,
      securityAnswer: encryptedSecurityAnswer,
    });

    await user.save();
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
