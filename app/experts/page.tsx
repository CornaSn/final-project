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
  const areasOfInterest = await getExpertiseListInsecure();
  const areasOfInterestName = areasOfInterest.map((area) => area.expertiseName);

  const countryOfInterest = await getCountriesListInsecure();
  const countryOfInterestName = countryOfInterest.map(
    (country) => country.countryName,
  );
  console.log('countryOfInterestName', countryOfInterestName);

  return (
    <SearchExpertsForm
      areasOfInterestName={areasOfInterestName}
      countryOfInterestName={countryOfInterestName}
    />
  );
}
