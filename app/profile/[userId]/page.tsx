import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getExpertiseListInsecure } from '../../../database/expertiseList';
import { getValidSessionById } from '../../../database/sessions';
import { getUserByIdInsecure } from '../../../database/users';
import CreateExpertProfileForm from '../createExpertProfile/CreateExpertProfileForm';

export default async function UserProfil() {
  // 1. Checking if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');
  // console.log('sessionCookie', sessionCookie);

  // 2. Query the current user with the sessionToken
  const token =
    sessionCookie && (await getValidSessionById(sessionCookie.value));

  const userId = token?.userId;
  let user = null;

  if (userId !== undefined) {
    user = await getUserByIdInsecure(userId);
    console.log('user', user);
  } else {
    console.error('userId is undefined');
  }

  // 3️ If user doesn't exist, redirect to login page
  if (!user) {
    redirect(`/login`);
  }

  if (user.isExpert) {
    redirect('/profile/createExpertProfile');
    // console.log('expertAreasPage', expertAreas);

    return (
      <CreateExpertProfileForm userId={userId} expertAreas={expertAreas} />
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center text-black p-8">
          <h1 className="mb-5 text-5xl font-bold uppercase">
            Hallo {user.firstName}
          </h1>
          <p className="text-lg mb-8">
            Let's get started with finding your perfect expert-travel match
          </p>
          <button className="bg-black text-white font-semibold py-2 px-4 rounded hover:bg-gray-800 transition duration-300">
            Get Started
          </button>
        </div>
      </div>
    );
  }
}
