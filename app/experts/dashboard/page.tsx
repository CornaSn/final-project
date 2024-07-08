import { getAllExpertUserWithChoicesInsecure } from '../../../database/experts';

export const metadata = {
  title: 'All_experts',
  description: 'experts',
};

export default async function ExpertsPage() {
  const expertUsers = await getAllExpertUserWithChoicesInsecure();

  return (
    <div className="flex justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 w-full max-w-6xl">
        {expertUsers.map((expertUser) => (
          <div
            key={`expert-${expertUser.userId}`}
            className="card bg-base-100 shadow-xl p-4 flex"
          >
            <div className="avatar mr-4">
              <div className="w-24 h-24 rounded-full">
                <img
                  alt="profilepicture"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="font-amatic-sc text-[40px] font-bold">
                {expertUser.firstName?.toUpperCase()}{' '}
                {expertUser.lastName?.charAt(0).toUpperCase()}.
              </h2>
              <div className="text-gray-600">
                <div>
                  {expertUser.age}, {expertUser.city}
                </div>
                <div>Bio: {expertUser.bio}</div>
                <div>
                  Languages:
                  {expertUser.languageName?.map((name: string) => (
                    <div key={`country-${name}`}>
                      <i className="fas fa-globe text-gray-600 mr-2" />
                      {name}
                    </div>
                  ))}
                </div>
                <div>
                  Countries:{' '}
                  {expertUser.countryName?.map((name: string) => (
                    <div key={`country-${name}`}>
                      <i className="fas fa-globe text-gray-600 mr-2" />
                      {name}
                    </div>
                  ))}
                </div>
                <div>
                  Expert Areas:
                  {expertUser.expertiseName?.map((name: string) => (
                    <div key={`country-${name}`}>
                      <i className="fas fa-globe text-gray-600 mr-2" />
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
