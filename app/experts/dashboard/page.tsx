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

import { getExpertCountryInsecure } from '../../../database/countriesList';
import { getExpertExpertiseInsecure } from '../../../database/expertiseList';
import {
  getAllExpertsWithUserInfoInsecure,
  getAllExpertUserInformationByUserIdInsecure,
  getExpertWithUserInfoAndChoicesInsecure,
} from '../../../database/experts';
import { getExpertLanguagesInsecure } from '../../../database/languageList';

export const metadata = {
  title: 'All_experts',
  description: 'experts',
};

type Props = {
  params: {
    userId: string;
  };
};

export default async function ExpertsPage(props: Props) {
  const allExpertInfos = await getAllExpertUserInformationByUserIdInsecure(
    Number(props.params.userId),
  );

  console.log(
    '====================allExpertInfos=========================',
    allExpertInfos,
  );

  // const expertUsers = await getAllExpertsWithUserInfoInsecure();

  // const userIds = expertUsers.map((user) => user.userId);

  // const expertWithChoices = await Promise.all(
  //   userIds.map(async (userId) => {
  //     const experts = await getExpertWithUserInfoAndChoicesInsecure(userId);
  //     return experts;
  //   }),
  // );

  // const expertListWithChoices = await Promise.all(
  //   userIds.map(async (userId) => {
  //     const countries = await getExpertCountryInsecure(userId);
  //     const languages = await getExpertLanguagesInsecure(userId);
  //     const expertise = await getExpertExpertiseInsecure(userId);

  //     return { userId, countries, languages, expertise };
  //   }),
  // );
  // console.log('===============expertListWithChoices', expertListWithChoices);

  // // // Fetch experts selected choices form Country, Language and Expertise
  // // const expertCountries = await getExpertCountryInsecure(experts.usersIds);
  // // const expertLanguages = await getExpertLanguagesInsecure(experts.userId);
  // // const expertExpertise = await getExpertExpertiseInsecure(experts.userId);

  return <div>Hello</div>;
}

// return (
//   <div className="flex justify-center p-4">
//     <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 w-full max-w-6xl">
//       {expertUsers.map((expertUser) => (
//         <div
//           key={`expert-${expertUser.id}`}
//           className="card bg-base-100 shadow-xl p-4 flex"
//         >
//           <div className="avatar mr-4">
//             <div className="w-24 h-24 rounded-full">
//               <img
//                 alt="profilepicture"
//                 src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
//                 className="rounded-full object-cover"
//               />
//             </div>
//           </div>
//           <div className="flex flex-col justify-center">
//             <h2 className="font-amatic-sc text-[40px] font-bold">
//               {expertUser.firstName.toUpperCase()}{' '}
//               {expertUser.lastName.charAt(0).toUpperCase()}.
//             </h2>
//             <div className="text-gray-600">
//               <div>
//                 {expertUser.age}, {expertUser.city}
//               </div>
//               <div>Bio: {expertUser.bio}</div>
//               <div>Languages: </div>
//               <div>Countries: </div>
//               <div>Expert Areas: </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>
// );
// }
