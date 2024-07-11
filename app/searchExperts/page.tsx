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
  console.log('expertAreas', expertAreas);
  // const areasOfInterestName = expertAreas.map((area) => area.expertiseName);

  const expertCountries = await getCountriesListInsecure();
  console.log('expertCountries', expertCountries);
  // const countryOfInterestName = expertCountries.map(
  //   (country) => country.countryName,
  // );

  return (
    <SearchExpertsForm
      expertAreas={expertAreas}
      expertCountries={expertCountries}
    />
  );
}
