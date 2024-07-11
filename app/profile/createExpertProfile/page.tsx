import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCountriesListInsecure } from '../../../database/countriesList';
import { getExpertiseListInsecure } from '../../../database/expertiseList';
import { getLanguageListInsecure } from '../../../database/languageList';
import { getValidSessionById } from '../../../database/sessions';
import CreateExpertProfileForm from './CreateExpertProfileForm';

export default async function CreateExpertProfilePage() {
  // 1. Checking if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');
  // console.log('sessionCookie', sessionCookie);

  // 2. Check if the sessionToken cookie is still valid
  const session =
    sessionCookie && (await getValidSessionById(sessionCookie.value));
  // console.log('session', session);

  // 3. If sessionToken cookie is invalid or doesn't exist, redirect to login with returnTo
  if (!session) {
    return redirect('/login?returnTo=/profile/createExpertProfile');
  }

  const userId = session.userId;

  // Fetch expert details for the logged-in user
  // const expert = await getExpertWithUserById(session.token, userId);
  // const expertId = expert[0]?.id
  // console.log('expert--------------------------------------------', expert);

  // Fetch select fields for user profile
  const expertAreas = await getExpertiseListInsecure();
  const expertLanguages = await getLanguageListInsecure();
  const expertCountries = await getCountriesListInsecure();

  return (
    <CreateExpertProfileForm
      userId={userId}
      // expertId={expert[0]?.id}
      expertAreas={expertAreas}
      expertLanguages={expertLanguages}
      expertCountries={expertCountries}
    />
  );
}
