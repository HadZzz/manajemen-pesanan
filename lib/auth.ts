// lib/auth.ts
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

// Force Node.js runtime
export const runtime = 'nodejs';

interface TokenPayload {
  id: number;
  email: string;
  name: string;
  [key: string]: unknown;
}

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function generateToken(payload: TokenPayload): Promise<string> {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(new TextEncoder().encode(JWT_SECRET));
  
  return token;
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    
    console.log('Token verification result:', verified.payload);
    return verified.payload as TokenPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function getSession(): Promise<TokenPayload | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      console.log('No token found in session');
      return null;
    }

    console.log('Found token in session, verifying...');
    return verifyToken(token.value);
  } catch (error) {
    console.error('Session error:', error);
    return null;
  }
}

export async function validateRequest(request: NextRequest): Promise<TokenPayload | null> {
  try {
    const token = request.cookies.get('token');

    if (!token) {
      console.log('No token found in request');
      return null;
    }

    console.log('Found token in request, verifying...');
    const user = await verifyToken(token.value);
    console.log('Validation result:', user);
    return user;
  } catch (error) {
    console.error('Request validation error:', error);
    return null;
  }
}