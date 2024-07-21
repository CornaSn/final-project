import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { getExpertCountryInsecure } from '../../../database/countriesList';
import { getExpertExpertiseInsecure } from '../../../database/expertiseList';
import { getExpertByIdWithUserInfoInsecure } from '../../../database/experts';
import { getExpertLanguagesInsecure } from '../../../database/languageList';
import { userWithValidSession } from '../../../util/cookies';

type Props = {
  params: {
    expertId: number;
  };
};

export default async function ExpertPage(props: Props) {
  const currentUser = await userWithValidSession();
  const singleExpert = await getExpertByIdWithUserInfoInsecure(
    Number(props.params.expertId),
  );

  if (!singleExpert) {
    notFound();
  }

  // Fetch experts selected choices form Country, Language and Expertise
  const expertCountries = await getExpertCountryInsecure(singleExpert.userId);
  const expertLanguages = await getExpertLanguagesInsecure(singleExpert.userId);
  const expertExpertise = await getExpertExpertiseInsecure(singleExpert.userId);

  const profileImg =
    typeof singleExpert.pictureUrl === 'string'
      ? singleExpert.pictureUrl
      : 'https://res.cloudinary.com/dmntpv6mf/image/upload/v1719325127/samples/man-portrait.jpg';

  const profileVideo =
    typeof singleExpert.videoUrl === 'string'
      ? singleExpert.videoUrl
      : 'https://res.cloudinary.com/dmntpv6mf/video/upload/v1720946788/z0wqijip8qytbipqryzn.mp4';

  const emailLink = `mailto:${singleExpert.email}`;

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6 relative mt-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="relative">
            <img
              className="w-48 h-48 rounded-full object-cover"
              src={profileImg}
              alt="Profile"
            />
          </div>
          <div className="mt-8 lg:mt-0 lg:ml-8 flex-grow">
            <div className="flex justify-between items-center">
              <h2 className="mb-2 mt-10 font-amatic-sc text-6xl font-bold">
                {singleExpert.firstName.toUpperCase()}{' '}
                {singleExpert.lastName.charAt(0).toUpperCase()}.
              </h2>
            </div>

            <p className="text-xl text-gray-600">
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
              <ul className="text-gray-600">
                {expertExpertise.map((expertiseArea) => (
                  <div key={`expertiseArea-${expertiseArea.expertisename}`}>
                    <i className="fas fa-star text-yellow-500" />{' '}
                    {expertiseArea.expertisename}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="absolute right-6 top-20 flex flex-col space-y-2">
          <a className="btn btn-primary text-base" href={emailLink}>
            Get in touch
          </a>

          <Link className="btn btn-primary text-base" href="/">
            My Blog{' '}
          </Link>
        </div>
        <p className="mt-8 text-xl font-semibold text-gray-800">
          All About Me{' '}
        </p>
        <div className="text-gray-600 max-w-full break-words">
          {singleExpert.bio}
        </div>
        <div className="mt-8">
          <div className="text-xl font-semibold text-gray-800">
            Global Footprints{' '}
          </div>
          <div className="grid grid-cols-5 mt-4 text-gray-600">
            {expertCountries.map((country) => (
              <div key={`country-${country.countryname}`}>
                <i className="fas fa-globe text-gray-600 mr-2" />
                {country.countryname}
              </div>
            ))}
          </div>
        </div>
        {currentUser !== singleExpert.userId && (
          <div className="absolute top-6 right-6 text-red-500">
            <i className="far fa-heart text-2xl" />
          </div>
        )}

        {Boolean(singleExpert.videoUrl) && (
          <div className="mt-8 bg-gray-200 w-full h-100 flex items-center justify-center">
            <video
              className="w-full h-full max-w-none max-h-none"
              controls
              preload="auto"
            >
              <track default kind="captions" src="" />
              <source src={profileVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        <div className="text-right mt-4">
          {currentUser === singleExpert.userId && (
            <Link
              href="/profile/updateExpertProfile"
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 hover:text-gray-800 px-4 py-2 rounded transition-colors"
            >
              Edit Profile
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
