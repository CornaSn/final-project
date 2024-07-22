import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCountriesListInsecure } from '../../../database/countriesList';
import { getExpertiseListInsecure } from '../../../database/expertiseList';
import { getLanguageListInsecure } from '../../../database/languageList';
import { getValidSessionById } from '../../../database/sessions';
import CreateExpertProfileForm from './CreateExpertProfileForm';

export const metadata = {
  title: {
    default: 'Create Profile | Travel Genius',
    template: '%s | Travel Genius',
  },
  description:
    'Create a new profile on Travel Genius to start connecting with users.',
};

export default async function CreateExpertProfilePage() {
  // 1. Checking if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');

  // 2. Check if the sessionToken cookie is still valid
  const session =
    sessionCookie && (await getValidSessionById(sessionCookie.value));

  // 3. If sessionToken cookie is invalid or doesn't exist, redirect to login with returnTo
  if (!session) {
    return redirect('/login?returnTo=/profile/createExpertProfile');
  }

  const userId = session.userId;

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
