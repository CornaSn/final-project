'use server';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getAllExpertUserWithChoicesInsecure } from '../../../database/experts';
import { userWithValidSession } from '../../../util/cookies';

// type SearchParamsCookie = {
//   name: string;
//   value: string;
// };

// type MatchResultItem = {
//   expertUserId: number;
//   expertiseIds: number[];
//   matchingPercent: string;
//   matchingCountry: boolean;
// };
// type MatchResult = MatchResultItem[];

export default async function MatchExperts() {
  // Check if user has an valid session
  await userWithValidSession();

  // Get match result from cookies
  const cookie = cookies().get('searchParams');
  if (!cookie) {
    return <div>No matching parameters found</div>;
  }

  const searchParamsCookie = {
    name: cookie.name,
    value: cookie.value,
  };

  const matchResults = JSON.parse(searchParamsCookie.value);
  const allExperts = await getAllExpertUserWithChoicesInsecure();

  // Combine searchParams with data query
  const combinedResults = matchResults.map((matchedExperts) => {
    const experts = allExperts.find(
      (expert) => expert.userId === matchedExperts.expertUserId,
    );
    return {
      ...matchedExperts,
      experts,
    };
  });
  combinedResults.sort(
    (a, b) => Number(b.matchingPercent) - Number(a.matchingPercent),
  );
  combinedResults.sort((a, b) => b.matchingCountry - a.matchingCountry);

  return (
    <div className="flex justify-center p-4 bg-base-200">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 w-full max-w-6xl mt-10">
        <h1 className="text-4xl font-bold text-center mb-4">
          <strong>It's a match !</strong>
        </h1>
        <br />
        {combinedResults.map((matchedExpert) => {
          return (
            <div
              key={`matchedExpert-${matchedExpert.expertUserId}`}
              className="p-6 flex flex-col space-y-4 bg-white border rounded-lg w-full max-w-90% mb-5 shadow-md"
            >
              {matchedExpert.experts ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="avatar mr-4">
                        <div className="w-40 h-40 rounded-full">
                          <img
                            alt="profilepicture"
                            src={
                              typeof matchedExpert.experts.pictureUrl ===
                              'string'
                                ? matchedExpert.experts.pictureUrl
                                : 'https://res.cloudinary.com/dmntpv6mf/image/upload/v1719325127/samples/man-portrait.jpg'
                            }
                            className="rounded-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h2 className="mb-4 mt-4  font-amatic-sc text-6xl font-bold">
                          {matchedExpert.experts.firstName.toUpperCase()}{' '}
                          {matchedExpert.experts.lastName
                            .charAt(0)
                            .toUpperCase()}
                          .
                        </h2>
                        <div className="text-xl text-gray-600">
                          {matchedExpert.experts.age},{' '}
                          {matchedExpert.experts.city}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div
                        className={`w-28 h-28 rounded-full ${matchedExpert.matchingCountry ? 'bg-orange-300' : 'bg-slate-300'} flex items-center justify-center mr-4`}
                      >
                        <span className="text-[24px] font-bold">
                          {matchedExpert.matchingCountry
                            ? Math.round(
                                (Number(matchedExpert.matchingPercent) + 100) /
                                  2,
                              )
                            : Math.round(
                                Number(matchedExpert.matchingPercent) / 2,
                              )}
                          %
                        </span>
                      </div>
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
                        {matchedExpert.experts.expertiseName?.map(
                          (expertiseArea) => (
                            <span
                              key={`expertiseArea-${expertiseArea}`}
                              className="flex items-center mr-2 mb-2"
                            >
                              <i className="fas fa-star text-yellow-500 mr-2 ml-4 " />
                              {expertiseArea}
                            </span>
                          ),
                        )}
                      </ul>
                    </div>
                    <div className="mt-2">
                      <div className="text-xl font-semibold text-gray-800">
                        Global Footprints{' '}
                      </div>
                      <div className="grid grid-cols-5 mt-4 text-gray-600">
                        {matchedExpert.experts.countryName?.map((name) => (
                          <div key={`country-${name}`}>
                            <i className="fas fa-globe text-gray-600 mr-2 ml-4" />
                            {name}
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-gray-600">
                        <p className="text-xl font-semibold text-gray-800">
                          All About Me{' '}
                        </p>
                        <p className="text-base ml-4">
                          {matchedExpert.experts.bio &&
                          matchedExpert.experts.bio.length > 50
                            ? `${matchedExpert.experts.bio.slice(0, 50)}...`
                            : matchedExpert.experts.bio}
                        </p>
                      </div>
                    </div>
                    <div className="flex-grow flex justify-end items-end mt-4">
                      <Link
                        className="btn btn-primary text-base"
                        href={`/experts/${matchedExpert.experts.expertId}`}
                      >
                        See more
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                <p>Loading expert matches...</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
