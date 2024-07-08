// import {
//   getAllExpertsWithUserInfoInsecure,
//   getExpertWithUserById,
// } from '../../../database/experts';
// import ExpertsForm from './ExpertForm';

// export default async function Experts() {
//   const experts = await getAllExpertsWithUserInfoInsecure();
//   // console.log('users expert', experts);
//   return <ExpertsForm experts={experts} />;
// }

import Link from 'next/link';
import { getAllExpertsWithUserInfoInsecure } from '../../../database/experts';

export const metadata = {
  title: 'All_experts',
  description: 'experts',
};

export default async function Experts() {
  const experts = await getAllExpertsWithUserInfoInsecure();
  // console.log('experts with user info', experts);

  return (
    <div className="flex justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 flex items-start max-w-3xl relative">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="relative">
            <img
              className="w-48 h-48 rounded-full object-cover"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="Profile"
            />
          </div>
        </div>
        <div className="ml-4 flex-grow">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">John Doe</h2>
          </div>
          <p className="mt-2 text-gray-600">30, New York City</p>
          <div className="mt-4">
            <h3 className="text-gray-600 font-semibold">Expert Areas:</h3>

            <ul className="text-gray-600">
              <li>
                <i className="fas fa-star text-yellow-500"></i> Web Development
              </li>
              <li>
                <i className="fas fa-star text-yellow-500"></i> UX/UI Design
              </li>
            </ul>
          </div>
          <p className="mt-4 text-gray-600">
            John Doe is an experienced web developer specializing in front-end
            technologies. He enjoys solving complex problems and creating
            user-friendly interfaces.
          </p>
          <div className="mt-4">
            <h3 className="text-gray-600 font-semibold">Countries visited:</h3>
            <div className="grid grid-cols-3 gap-1 mt-1 text-gray-600">
              <div>
                <i className="fas fa-globe text-gray-600 mr-1"></i>
                USA
              </div>
              <div>
                <i className="fas fa-globe text-gray-600 mr-1"></i>
                Canada
              </div>
              <div>
                <i className="fas fa-globe text-gray-600 mr-1"></i>
                UK
              </div>
            </div>
            <div className="absolute top-2 right-4 text-gray-500">
              <i className="fas fa-heart" />
            </div>
            <div className="absolute top-6 right-4 text-gray-500">
              <span className="text-2xl font-bold">85%</span>
            </div>
            <div className="absolute top-14 right-4 text-gray-500">
              <Link className="btn btn-primary" href="/">
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
