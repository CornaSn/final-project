import Link from 'next/link';
import { getAllExpertUserWithChoicesInsecure } from '../../../database/experts';
import { userWithValidSession } from '../../../util/cookies';

export const metadata = {
  title: 'All_experts',
  description: 'experts',
};

export default async function ExpertsPage() {
  const userId = await userWithValidSession();
  const expertUsers = await getAllExpertUserWithChoicesInsecure();
  console.log(
    'expertUsers#################################################################',
    expertUsers,
  );

  return (
    <div className="flex justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 w-full max-w-6xl">
        {expertUsers.map((expertUser) => (
          <div
            key={`expert-${expertUser.userId}`}
            className="card bg-base-100 shadow-xl p-6 flex flex-col space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="avatar mr-4">
                  <div className="w-24 h-24 rounded-full">
                    <img
                      alt="profilepicture"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      className="rounded-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h2 className="font-amatic-sc text-[40px] font-bold">
                    {expertUser.firstName?.toUpperCase()}{' '}
                    {expertUser.lastName?.charAt(0).toUpperCase()}.
                  </h2>
                  <div className="text-gray-600">
                    {expertUser.age}, {expertUser.city}
                  </div>
                  {/* <div className="mt-2">
                    <div>Languages:</div>
                    <div className="flex flex-wrap mt-1">
                      {expertUser.languageName?.map((name) => (
                        <span
                          key={`language-${name}`}
                          className="badge badge-outline mr-2 mb-2"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                  <span className="text-[24px] font-bold">84%</span>
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
                <div className="ml-4">Countries visited:</div>
                <div className="grid grid-cols-3 gap-4 mt-4 text-gray-600">
                  {expertUser.countryName?.map((name) => (
                    <div key={`country-${name}`}>
                      <i className="fas fa-globe text-gray-600 mr-2 ml-4" />
                      {name}
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-gray-600">
                  <p className="text-lg font-semibold mb-2 ml-4">Bio:</p>
                  <p className="text-base ml-4">
                    {expertUser.bio && expertUser.bio.length > 50
                      ? `${expertUser.bio.slice(0, 50)}...`
                      : expertUser.bio}
                  </p>
                </div>
              </div>
              <div className="flex-grow flex justify-end items-end mt-4">
                <Link
                  className="btn btn-primary"
                  href={`/experts/${expertUser.userId}`}
                >
                  {' '}
                  See more
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
