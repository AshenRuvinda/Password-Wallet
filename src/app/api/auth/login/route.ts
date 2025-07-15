import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import { hashPassword } from '../../../../lib/auth';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  await dbConnect();
  const { email, password } = await request.json();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const hashedPassword = hashPassword(password);
    if (user.password !== hashedPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}