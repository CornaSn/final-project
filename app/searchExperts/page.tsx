import Link from 'next/link';
import { getCountriesListInsecure } from '../../database/countriesList';
import { getExpertiseListInsecure } from '../../database/expertiseList';
import { getAllExpertUserWithChoicesInsecure } from '../../database/experts';
import { userWithValidSession } from '../../util/cookies';
import SearchExpertsForm from './SearchExpertForm';

export const metadata = {
  title: 'All_experts',
  description: 'experts',
};

export default async function SearchExperts() {
  await userWithValidSession();
  const expertUsers = await getAllExpertUserWithChoicesInsecure();

  // Fetch select fields for search form
  const expertAreas = await getExpertiseListInsecure();
  const expertCountries = await getCountriesListInsecure();

  return (
    <>
      <SearchExpertsForm
        expertAreas={expertAreas}
        expertCountries={expertCountries}
      />
      <div className="flex justify-center pt-12 min-h-screen bg-base-200">
        <div className="w-full max-w-6xl p-8 space-y-6 ">
          {' '}
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 w-full max-w-6xl ">
            {expertUsers.map((expertUser) => (
              <div
                key={`expert-${expertUser.userId}`}
                className="p-6 flex flex-col space-y-4 bg-white border rounded-lg w-full max-w-90% mb-5 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="avatar mr-4">
                      <div className="w-24 h-24 rounded-full">
                        <img
                          alt="profilepicture"
                          src={
                            typeof expertUser.pictureUrl === 'string'
                              ? expertUser.pictureUrl
                              : 'https://res.cloudinary.com/dmntpv6mf/image/upload/v1719325127/samples/man-portrait.jpg'
                          }
                          className="rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h2 className="mb-2 mt-4 font-amatic-sc text-6xl font-bold">
                        {expertUser.firstName?.toUpperCase()}{' '}
                        {expertUser.lastName?.charAt(0).toUpperCase()}.
                      </h2>
                      <div className="text-xl text-gray-600">
                        {expertUser.age}, {expertUser.city}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="relative right-1 text-red-500">
                        <i className="far fa-heart text-2xl" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-300 pt-4">
                  <div className="mt-2">
                    <ul className="flex flex-wrap mt-1 text-gray-600">
                      {expertUser.expertiseName?.map((expertiseArea) => (
                        <span
                          key={`expertiseArea-${expertiseArea}`}
                          className="flex items-center mr-2 mb-2"
                        >
                          <i className="fas fa-star text-yellow-500 mr-2 ml-4" />

                          {expertiseArea}
                        </span>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-2">
                    <div className="text-xl font-semibold text-gray-800">
                      Global Footprints{' '}
                    </div>
                    <div className="grid grid-cols-5 mt-4 text-gray-600">
                      {expertUser.countryName?.map((name) => (
                        <div key={`country-${name}`}>
                          <i className="fas fa-globe text-gray-600 mr-2 ml-4" />
                          {name}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 text-gray-600 mb-6">
                      <p className="text-xl font-semibold text-gray-800">
                        All About Me{' '}
                      </p>
                      <p className="text-base ml-4">
                        {expertUser.bio && expertUser.bio.length > 50
                          ? `${expertUser.bio.slice(0, 50)}...`
                          : expertUser.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Link
                      className="btn btn-primary text-base"
                      href={`/experts/${expertUser.expertId}`}
                    >
                      See more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
