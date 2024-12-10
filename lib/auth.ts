import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

// Tambahkan konfigurasi runtime
export const runtime = 'nodejs'; // Force Node.js runtime

// Sisanya tetap sama seperti sebelumnya
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

// Fungsi lainnya tetap sama

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
    return verified.payload as TokenPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<TokenPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  
  if (!token) return null;
  
  return verifyToken(token.value);
}

export async function validateRequest(request: NextRequest): Promise<TokenPayload | null> {
  const token = request.cookies.get('token');
  
  if (!token) return null;
  
  return verifyToken(token.value);
}