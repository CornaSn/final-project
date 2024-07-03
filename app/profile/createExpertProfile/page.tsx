import { redirect } from 'next/dist/server/api-utils';
import { cookies } from 'next/headers';
import { getExpertWithUserById } from '../../../database/experts';
import { getValidSessionById } from '../../../database/sessions';
import CreateExpertProfileForm from './CreateExpertProfileForm';

export default async function CreateExpertProfilePage() {
  // 1. Checking if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');
  console.log('sessionCookie', sessionCookie);

  // 2. Check if the sessionToken cookie is still valid
  const session =
    sessionCookie && (await getValidSessionById(sessionCookie.value));
  console.log('session', session);

  // 3. If sessionToken cookie is invalid of doesn't exist, redirect to login with rerutnTo
  if (!session) {
    return redirect(307, '/login?returnTo=/profile/createExpertProfile');
  }

  // Ensure user_Id is defined, here assuming it is part of the session data
  const userId = session.userId;
  console.log('userId', userId);

  // Fetch expert details for the logged-in user
  const expert = await getExpertWithUserById(session.token, userId);

  // Check if the expert data was fetched successfully
  // if (!expert) {
  //   // Handle case where expert details are not found
  //   return <div>Error: Expert details not found.</div>;
  // }

  return <CreateExpertProfileForm userId={userId} />;
}
