import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getExpertiseListInsecure } from '../../../database/expertiseList';
import { getExpertByIdWithUserInfoInsecure } from '../../../database/experts';
import { getValidSessionById } from '../../../database/sessions';
import { getUserByIdInsecure } from '../../../database/users';
import CreateExpertProfileForm from '../createExpertProfile/CreateExpertProfileForm';

export default async function UserProfil() {
  // 1. Checking if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');

  // 2. Query the current user with the sessionToken
  const token =
    sessionCookie && (await getValidSessionById(sessionCookie.value));
  const userId = token?.userId;

  // 3. If no valid session, redirect to login
  if (!userId) {
    redirect('/login');
    return null; // Ensure no further execution and no rendering
  }

  const user = await getUserByIdInsecure(userId);

  // 4. If user doesn't exist, redirect to login page
  if (!user) {
    redirect('/login');
    return null; // Ensure no further execution and no rendering
  }

  // 5. Check if user is an expert
  if (user.isExpert) {
    // Check if the expert already has a profile
    const expertProfile = await getExpertByIdWithUserInfoInsecure(userId);

    // If the expert already has a profile, redirect to the profile page
    if (expertProfile) {
      // redirect(`/profile/${userId}`);
      redirect(`/`);
    } else {
      // If no profile exists, render the create profile form
      const expertAreas = await getExpertiseListInsecure();
      return (
        <CreateExpertProfileForm userId={userId} expertAreas={expertAreas} />
      );
    }
  } else {
    // Render the content for non-expert users
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center text-black p-8">
          <h1 className="mb-5 text-5xl font-bold uppercase">
            Hallo {user.firstName}
          </h1>
          <p className="text-lg mb-8">
            Let's get started with finding your perfect expert-travel match
          </p>
          <button className="btn btn-primary text-white font-semibold py-2 px-4 rounded hover:bg-gray-800 transition duration-300">
            Get Started
          </button>
        </div>
      </div>
    );
  }
}
