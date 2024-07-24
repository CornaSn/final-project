import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import { getExpertCountryInsecure } from '../../../database/countriesList';
import { getExpertExpertiseInsecure } from '../../../database/expertiseList';
import { getExpertByIdWithUserInfoInsecure } from '../../../database/experts';
import { getExpertLanguagesInsecure } from '../../../database/languageList';
import { userWithValidSession } from '../../../util/cookies';

export const metadata = {
  title: {
    default: 'Expert Profile | Travel Genius',
    template: '%s | Travel Genius',
  },
  description:
    'View and manage your profile on Travel Genius. Access your personal details, expertise area, and more.',
};

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
      : '/images/fotoplaceholder.webp';

  const profileVideo =
    typeof singleExpert.videoUrl === 'string'
      ? singleExpert.videoUrl
      : 'https://res.cloudinary.com/dmntpv6mf/video/upload/v1720946788/z0wqijip8qytbipqryzn.mp4';

  const emailLink = `mailto:${singleExpert.email}`;

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-6 relative">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="relative">
            <img
              className="w-56 h-56 rounded-full object-cover"
              src={profileImg}
              alt="Profile"
            />
          </div>
          <div className="mt-8 lg:mt-0 lg:ml-8 flex-grow">
            <div className="flex justify-between items-center">
              <h2 className="mb-4 mt-2 font-amatic-sc text-6xl font-bold">
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
        <div className="outer-container flex items-center justify-center">
          {Boolean(singleExpert.videoUrl) && (
            <div
              className="mt-8 bg-gray-200 flex items-center justify-center"
              style={{ width: '640px', height: '360px' }}
            >
              <video className="w-full h-full" controls preload="auto">
                <track default kind="captions" src="" />
                <source src={profileVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>

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

        <div className="mt-24">
          <div className="text-6xl font-amatic-sc text-gray-800 text-center">
            Rating & Reviews
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="text-4xl font-bold">8.7</div>
                <div className="text-xl text-gray-500">Excellent</div>
              </div>
              <div className="text-gray-500">3 reviews</div>
            </div>
            <a
              href="#leave-feedback"
              className="text-blue-500 text-end hover:text-blue-700"
            >
              Leave a feedback
            </a>
          </div>
          <div className="flex justify-between mt-4 space-x-4">
            <div className="w-1/3">
              <h3 className="text-center">Communication</h3>
              <progress
                className="progress progress-primary w-full h-4"
                value="86"
                max="100"
              />
              <div className="text-right text-sm text-gray-500 mt-1">8.6</div>
            </div>
            <div className="w-1/3">
              <h3 className="text-center">Knowledge</h3>
              <progress
                className="progress progress-primary w-full h-4"
                value="82"
                max="100"
              />
              <div className="text-right text-sm text-gray-500 mt-1">8.2</div>
            </div>
            <div className="w-1/3">
              <h3 className="text-center">Tips and Recommendations</h3>
              <progress
                className="progress progress-primary w-full h-4"
                value="93"
                max="100"
              />
              <div className="text-right text-sm text-gray-500 mt-1">9.3</div>
            </div>
          </div>
          <div className="overflow-x-auto mt-8">
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="text-xl font-semibold">Anna M.</div>
                  <div className="ml-auto text-sm text-gray-500">
                    March 5, 2023
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <div className="thumbs">
                    <i className="fas fa-thumbs-up text-green-500" />
                  </div>
                </div>
                <div className="mt-2 text-gray-600">
                  An exceptional expert in the field! {singleExpert.firstName}
                  's insights and guidance were invaluable to our trip. Highly
                  recommended!
                </div>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="text-xl font-semibold">Clemens K.</div>
                  <div className="ml-auto text-sm text-gray-500">
                    February 19, 2023
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <div className="thumbs">
                    <i className="fas fa-thumbs-up text-green-500" />
                  </div>
                </div>
                <div className="mt-2 text-gray-600">
                  {singleExpert.firstName} was fantastic! She provided
                  incredibly relevant tips, helping me discover hidden gems away
                  from the crowds. As a female solo traveler, I found her
                  guidance and experiences truly inspiring. Her insights made my
                  trip unforgettable and gave me the confidence to explore more
                  freely. Highly recommend!
                </div>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="text-xl font-semibold">Max R.</div>
                  <div className="ml-auto text-sm text-gray-500">
                    January 22, 2023
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <div className="thumbs">
                    <i className="fas fa-thumbs-down text-red-500" />
                  </div>
                </div>
                <div className="mt-2 text-gray-600">
                  {singleExpert.firstName}’s expertise was generally solid, but
                  some of her recommendations didn’t quite align with my needs.
                  There were also times when communication was a bit slow. While
                  I did receive some useful tips, I would have appreciated more
                  detailed guidance and a better alignment with my specific
                  requirements.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
