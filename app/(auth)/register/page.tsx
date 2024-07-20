import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSession } from '../../../database/sessions';
import RegisterForm from './RegisterForm';

export default async function RegisterPage() {
  // 1. Check if sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');

  // 2. Check if the sessionToken is still valid
  const session = sessionCookie && (await getValidSession(sessionCookie.value));

  // 3. If the sessionToken cookie is valid, redirect to home
  if (session) {
    redirect('/');
  }

  return <RegisterForm />;
}
