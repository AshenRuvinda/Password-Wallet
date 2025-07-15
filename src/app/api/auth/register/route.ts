import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import { hashPassword } from '../../../../lib/auth';

export async function POST(request: Request) {
  await dbConnect();
  const { email, password, fullName, masterPin, securityQuestion, securityAnswer } = await request.json();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = hashPassword(password);
    await User.create({
      email,
      password: hashedPassword,
      fullName,
      masterPin,
      securityQuestion,
      securityAnswer,
    });

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}