import { getCountriesListInsecure } from '../../database/countriesList';
import { getExpertiseListInsecure } from '../../database/expertiseList';
import { userWithValidSession } from '../../util/cookies';
import SearchExpertsForm from './SearchExpertForm';

export const metadata = {
  title: 'All_experts',
  description: 'experts',
};

export default async function SearchExperts() {
  const userId = await userWithValidSession();

  // Fetch select fields for user profile
  const expertAreas = await getExpertiseListInsecure();
  const expertCountries = await getCountriesListInsecure();

  return (
    <SearchExpertsForm
      expertAreas={expertAreas}
      expertCountries={expertCountries}
    />
  );
}
