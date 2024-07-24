import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getValidSessionById } from '../../../database/sessions';
import { getUserByIdInsecure } from '../../../database/users';

export default async function UserProfile() {
  // 1. Checking if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');

  // 2. Query the current user with the sessionToken
  const token =
    sessionCookie && (await getValidSessionById(sessionCookie.value));
  const userId = token?.userId;
  let user = null;

  if (userId !== undefined) {
    user = await getUserByIdInsecure(userId);
  } else {
    console.error('userId is undefined');
  }

  // 3️ If user doesn't exist, redirect to login page
  if (!user) {
    redirect(`/login`);
    return <div>Redirecting...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 mt-20">
      <div className="text-center text-black p-8">
        <h1 className="mb-5 text-8xl font-bold font-amatic-sc uppercase mt-10">
          Welcome, {user.firstName}
        </h1>
        {user.isExpert ? (
          <div>
            <p className="text-lg mb-8">
              Let's get started and create your profile page!
            </p>
            <Link
              className="btn btn-primary"
              href="/profile/createExpertProfile"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-lg mb-8">
              Let's get started with finding your perfect expert-travel match
            </p>
            <Link className="btn btn-primary" href="/searchExperts">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
