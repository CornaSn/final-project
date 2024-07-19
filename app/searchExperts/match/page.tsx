'use server';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { getAllExpertUserWithChoicesInsecure } from '../../../database/experts';
import { userWithValidSession } from '../../../util/cookies';

type SearchParamsCookie = {
  name: string;
  value: string;
};

export default async function MatchExperts() {
  // Check if user has an valid session
  await userWithValidSession();

  // Get match result from cookies
  const cookie = cookies().get('searchParams');
  if (!cookie) {
    // console.log('searchParamsCookie is not found');
    return <div>No matching parameters found</div>;
  }

  const searchParamsCookie: SearchParamsCookie = {
    name: cookie.name,
    value: cookie.value,
  };
  // console.log('searchParamsCookie', searchParamsCookie);

  const matchResults = JSON.parse(searchParamsCookie.value);
  // console.log('matchResult', matchResults);

  const allExperts = await getAllExpertUserWithChoicesInsecure();
  // console.log('allExperts', allExperts);

  // Combine searchParams with data query
  const combinedResults = matchResults.map(
    (matchedExperts: { expertUserId: number | null }) => {
      const experts = allExperts.find(
        (expert) => expert.userId === matchedExperts.expertUserId,
      );
      return {
        ...matchedExperts,
        experts,
      };
    },
  );
  // console.log('combinedResults', combinedResults);
  return (
    <div className="flex justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 w-full max-w-6xl">
        {combinedResults.map((matchedExpert: any) => {
          // console.log('Rendering matchedExpert:', matchedExpert);
          return (
            <div
              key={`matchedExpert-${matchedExpert.expertUserId}`}
              className="card bg-base-100 shadow-xl p-6 flex flex-col space-y-4"
            >
              {matchedExpert.experts ? (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="avatar mr-4">
                        <div className="w-24 h-24 rounded-full">
                          <img
                            alt="profilepicture"
                            src={
                              typeof matchedExpert.experts.pictureUrl ===
                              'string'
                                ? matchedExpert.experts.pictureUrl
                                : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'
                            }
                            className="rounded-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h2 className="font-amatic-sc text-[40px] font-bold">
                          {matchedExpert.experts.firstName.toUpperCase()}{' '}
                          {matchedExpert.experts.lastName
                            .charAt(0)
                            .toUpperCase()}
                          .
                        </h2>
                        <div className="text-gray-600">
                          {matchedExpert.experts.age},{' '}
                          {matchedExpert.experts.city}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                        <span className="text-[24px] font-bold">
                          {matchedExpert.matchingPercent}%
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="absolute top-6 right-6 text-gray-500">
                          <i className="fas fa-heart" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-300 pt-4">
                    <div className="mt-2">
                      <div className="ml-4">Expert Areas:</div>
                      <ul className="flex flex-wrap mt-1 text-gray-600">
                        {matchedExpert.experts.expertiseName?.map(
                          (expertiseArea: string) => (
                            <span
                              key={`expertiseArea-${expertiseArea}`}
                              className="flex items-center mr-2 mb-2"
                            >
                              <i className="fas fa-star text-yellow-500 mr-2 ml-4" />
                              {expertiseArea}
                            </span>
                          ),
                        )}
                      </ul>
                    </div>
                    <div className="mt-2">
                      <div className="ml-4">Countries visited:</div>
                      <div className="grid grid-cols-3 gap-4 mt-4 text-gray-600">
                        {matchedExpert.experts.countryName?.map(
                          (name: string) => (
                            <div key={`country-${name}`}>
                              <i className="fas fa-globe text-gray-600 mr-2 ml-4" />
                              {name}
                            </div>
                          ),
                        )}
                      </div>
                      <div className="mt-6 text-gray-600">
                        <p className="text-lg font-semibold mb-2 ml-4">Bio:</p>
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
                        className="btn btn-primary"
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
