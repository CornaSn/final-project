import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getExpertiseListInsecure } from '../../../database/expertiseList';
import { getExpertWithUserById } from '../../../database/experts';
import { getLanguageListInsecure } from '../../../database/languageList';
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
    return redirect('/login?returnTo=/profile/createExpertProfile');
  }

  const userId = session.userId;

  // Fetch expert details for the logged-in user
  const expert = await getExpertWithUserById(session.token, userId);
  // console.log('hallo expert', expert);

  const expertAreas = await getExpertiseListInsecure();
  // console.log('expertAreasPage', expertAreas);
  const expertLanguages = await getLanguageListInsecure();
  // console.log('expertLanguages', expertLanguages);

  return (
    <CreateExpertProfileForm
      userId={userId}
      expertAreas={expertAreas}
      expertLanguages={expertLanguages}
    />
  );
}
