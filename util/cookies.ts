import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSessionById } from '../database/sessions';

export const secureCookieOptions = {
  httpOnly: true,
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60 * 24, // Valid 24 hours
  sameSite: 'lax', // For cross site scripting
} as const;

export async function userWithValidSession() {
  // 1. Checking if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');
  // console.log('sessionCookie', sessionCookie);

  // 2. Check if the sessionToken cookie is still valid
  const session =
    sessionCookie && (await getValidSessionById(sessionCookie.value));
  // console.log('session', session);

  // 3. If sessionToken cookie is invalid or doesn't exist, redirect to login with returnTo
  if (!session) {
    return redirect('/');
  }

  const userId = session.userId;

  return userId;
}
