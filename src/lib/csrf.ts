import { cookies } from 'next/headers';
import crypto from 'crypto';

// Generate a CSRF token
export async function generateCsrfToken() {
  const token = crypto.randomBytes(32).toString('hex');
  (await cookies()).set('csrf_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 3600, // 1 hour
  });
  return token;
}

// Verify a CSRF token
export async function verifyCsrfToken(token: string) {
  const storedToken = (await cookies()).get('csrf_token')?.value;
  return token && storedToken && token === storedToken;
}
