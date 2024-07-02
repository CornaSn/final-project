import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getValidSession } from '../../../database/sessions';
import { getSafeReturnToPath } from '../../../util/validation';
import LoginForm from './LoginForm';

type Props = {
  searchParams: {
    returnTo?: string | string[];
  };
};

export default async function LoginPage(props: Props) {
  // 1. Check if sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');
  console.log('sessionCookie', sessionCookie);

  // 2. Check if the sessionToken is still valid
  const session = sessionCookie && (await getValidSession(sessionCookie.value));
  console.log('sessionIsValid?', session);

  // 3. If the sessionToken cookie is valid, redirect to home
  if (session) {
    redirect(getSafeReturnToPath(props.searchParams.returnTo) || '/');
  }

  return <LoginForm returnTo={props.searchParams.returnTo} />;
}
