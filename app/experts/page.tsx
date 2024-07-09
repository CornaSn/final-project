import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCountriesListInsecure } from '../../database/countriesList';
import { getExpertiseListInsecure } from '../../database/expertiseList';
import {
  getAllExpertsWithUserInfoInsecure,
  getExpertWithUserById,
} from '../../database/experts';
import { getLanguageListInsecure } from '../../database/languageList';
import { getValidSessionById } from '../../database/sessions';
import ExpertsForm from './ExpertForm';

export const metadata = {
  title: 'All_experts',
  description: 'experts',
};

export default async function Experts() {
  // 1. Checking if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');
  // console.log('sessionCookie', sessionCookie);

  // 2. Check if the sessionToken cookie is still valid
  const session =
    sessionCookie && (await getValidSessionById(sessionCookie.value));
  // console.log('session', session);

  // 3. If sessionToken cookie is invalid of doesn't exist, redirect to login with returnTo
  if (!session) {
    return redirect('/login?returnTo=/experts');
  }
  const userId = session.userId;

  // Fetch select fields for user profile
  const expertAreas = await getExpertiseListInsecure();
  const expertCountries = await getCountriesListInsecure();

  return (
    <ExpertsForm expertAreas={expertAreas} expertCountries={expertCountries} />
  );
}
