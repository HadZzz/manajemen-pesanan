// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword, comparePasswords, generateToken, getSession } from '@/lib/auth';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({ 
      user: {
        id: session.id,
        email: session.email,
        name: session.name || '' // Provide default empty string if null
      }
    });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  // Login handler
  if (request.url.endsWith('/login')) {
    try {
      const { email, password } = await request.json();
      
      const user = await prisma.user.findUnique({ where: { email } });
      
      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 400 }
        );
      }
      
      const isValid = await comparePasswords(password, user.password);
      
      if (!isValid) {
        return NextResponse.json(
          { error: 'Invalid password' },
          { status: 400 }
        );
      }
      
      const token = await generateToken({
        id: user.id,
        email: user.email,
        name: user.name || '' // Provide default empty string if null
      });
      
      const response = NextResponse.json({ 
        user: {
          id: user.id,
          email: user.email,
          name: user.name || '' // Provide default empty string if null
        }
      });
      
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24
      });
      
      console.log('Set cookie token:', token);
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      return NextResponse.json(
        { error: 'Error logging in' },
        { status: 500 }
      );
    }
  }
  
  // Register handler
  if (request.url.endsWith('/register')) {
    try {
      const { email, password, name } = await request.json();
      
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
      
      if (existingUser) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 400 }
        );
      }
      
      const hashedPassword = await hashPassword(password);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name || '' // Provide default empty string if null
        }
      });
      
      const token = await generateToken({
        id: user.id,
        email: user.email,
        name: user.name || '' // Provide default empty string if null
      });
      
      const response = NextResponse.json({ 
        user: {
          id: user.id,
          email: user.email,
          name: user.name || '' // Provide default empty string if null
        }
      });
      
      response.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24
      });
      
      console.log('Set cookie token:', token);
      
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      return NextResponse.json(
        { error: 'Error creating user' },
        { status: 500 }
      );
    }
  }
  
  // Logout handler
  if (request.url.endsWith('/logout')) {
    const response = NextResponse.json({ success: true });
    response.cookies.delete('token');
    return response;
  }
  
  return NextResponse.json(
    { error: 'Route not found' },
    { status: 404 }
  );
}