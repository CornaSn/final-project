import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { getExpertCountryInsecure } from '../../../database/countriesList';
import { getExpertByIdWithUserInfoInsecure } from '../../../database/experts';
import { getExpertLanguagesInsecure } from '../../../database/languageList';

export async function generateMetadata(props: Props) {
  const singleExpert = await getExpertByIdWithUserInfoInsecure(
    Number(props.params.expertId),
  );

  return {
    title: singleExpert?.firstName,
    description: 'Single Expert Page',
  };
}

type Props = {
  params: {
    expertId: number;
  };
};

export default async function ExpertPage(props: Props) {
  const singleExpert = await getExpertByIdWithUserInfoInsecure(
    Number(props.params.expertId),
  );
  console.log('Single expert: ', singleExpert);

  if (!singleExpert) {
    notFound();
  }

  const expertCountries = await getExpertCountryInsecure(singleExpert.userId);
  console.log('expertCountries**********************', expertCountries);

  const expertLanguages = await getExpertLanguagesInsecure(singleExpert.userId);
  console.log('expertLanguages**********************', expertLanguages);

  const singleExpertHardcoded = {
    firstName: 'Cornelia',
    lastName: 'S.',
    age: 31,
    city: 'Vienna',
    languages: ['English', 'German'],
    expertAreas: [
      'Expert Area 1',
      'Expert Area 2',
      'Expert Area 3',
      'Expert Area 4',
    ],
    bio: 'I love to travel',
    countriesVisited: [
      'Country 1',
      'Country 2',
      'Country 3',
      'Country 4',
      'Country 5',
      'Country 6',
      'Country 7',
      'Country 8',
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6 relative">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="relative">
            <img
              className="w-48 h-48 rounded-full object-cover"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="Profile"
            />
          </div>
          <div className="mt-8 lg:mt-0 lg:ml-8 flex-grow">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                {singleExpert.firstName} {singleExpert.lastName}
              </h2>
            </div>
            <p className="mt-2 text-gray-600">
              {singleExpert.age}, {singleExpert.city}
            </p>
            <p className="text-gray-600">
              {expertLanguages.map((language, index) => (
                <React.Fragment key={`language-${language.languagename}`}>
                  {language.languagename}
                  {index !== expertLanguages.length - 1 && ', '}
                  {(index + 1) % 5 === 0 && <br />}{' '}
                </React.Fragment>
              ))}
            </p>

            <div className="mt-4">
              <h3 className="text-gray-600 font-semibold">Expert Areas:</h3>
              <ul className="text-gray-600">
                {singleExpertHardcoded.expertAreas.map((area, index) => (
                  <li key={index}>
                    <i className="fas fa-star text-yellow-500" /> {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="absolute right-6 top-20 flex flex-col space-y-2">
          <Link className="btn btn-primary" href="/">
            Get in touch
          </Link>
          <Link className="btn btn-primary" href="/">
            My Blog{' '}
          </Link>
        </div>
        <p className="mt-6 text-gray-600">{singleExpert.bio}</p>
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800">
            Countries visited
          </h3>
          <div className="grid grid-cols-3 gap-4 mt-4 text-gray-600">
            {expertCountries.map((country) => (
              <div key={`country-${country.countryname}`}>
                <i className="fas fa-globe text-gray-600 mr-2" />
                {country.countryname}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-6 right-6 text-gray-500">
          <i className="fas fa-heart" />
        </div>
        <div className="mt-8 bg-gray-200 w-full h-64 flex items-center justify-center">
          <span className="text-gray-500">Video Placeholder</span>
        </div>
      </div>
    </div>
  );
}
