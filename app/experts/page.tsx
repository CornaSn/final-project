import Image from 'next/image';
import {
  getAllExpertsWithUserInfoInsecure,
  getExpertsInsecure,
} from '../../database/experts';

export const metadata = {
  title: 'All_experts',
  description: 'experts',
};

// export default async function ExpertsOverview() {
//   const experts = await getExpertsInsecure();
//   console.log('Experts:', experts);

export default async function Experts() {
  const experts = await getAllExpertsWithUserInfoInsecure();
  console.log('experts with user info', experts);

  return (
    <div className="flex justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 w-full max-w-6xl">
        {experts.map((expert) => (
          <div
            key={`expert-${expert.id}`}
            className="card bg-base-100 shadow-xl p-4 flex"
          >
            <div className="avatar mr-4">
              <div className="w-12 rounded-full">
                <img
                  alt="profilepciture"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-xl mb-2">
                {expert.firstName.toUpperCase()}{' '}
                {expert.lastName.charAt(0).toUpperCase()}. {expert.age}
              </div>

              <div>City: {expert.city}</div>
              <div>Bio: {expert.bio}</div>
              <div>Languages: </div>
              <div>Countries: </div>
              <div>Expert Areas: </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
