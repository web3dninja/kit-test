import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;

function getJwtSecret(): string {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not set');
  }
  return JWT_SECRET;
}

export interface JWTPayload {
  userId: number;
  email: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function signToken(payload: JWTPayload): string {
  const secret = getJwtSecret();
  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const secret = getJwtSecret();
    return jwt.verify(token, secret) as JWTPayload;
  } catch {
    return null;
  }
}
