import { cookies } from 'next/headers';
import Link from 'next/link';
import LogoutButton from '../(auth)/logout/LogoutButton';
import { getExpertByIdInsecure } from '../../database/experts';
import { getUser } from '../../database/users';

export default async function Navbar() {
  const sessionCookie = cookies().get('sessionToken');
  const user = sessionCookie && (await getUser(sessionCookie.value));
  let profileLink;
  let expert;
  if (typeof user === 'undefined') {
    // no user -> register
    profileLink = '/register';
  } else {
    // must be user or expert
    expert = await getExpertByIdInsecure(user.id);
    if (typeof expert === 'undefined') {
      // must be a normal user
      profileLink = `/profile/${user.id}`;
    } else {
      // must be expert user
      profileLink = `/experts/${expert.id}`;
    }
  }

  return (
    <div className="navbar bg-base-100 flex items-center justify-between px-4 py-2">
      <div>
        <Link
          className="font-amatic-sc font-bold text-4xl px-4 py-2 rounded-full hover:bg-primary transition-colors duration-300"
          href="/"
        >
          travel Genius
        </Link>
      </div>
      <div className="flex flex-1 space-x-4">
        <div className="flex space-x-4 justify-center">
          {user ? (
            <Link
              className="text-lg lg:text-xl font-light font-poppins px-3 py-2 rounded-full hover:bg-primary transition-colors duration-300"
              href="/searchExperts"
            >
              Search Experts
            </Link>
          ) : (
            <>
              <Link
                className="text-lg lg:text-xl font-light font-poppins px-3 py-2 rounded-full hover:bg-primary transition-colors duration-300"
                href="/about"
              >
                About
              </Link>
              <Link
                className="text-lg lg:text-xl font-light font-poppins px-3 py-2 rounded-full hover:bg-primary transition-colors duration-300"
                href="/help"
              >
                Help
              </Link>
              <Link
                className="text-lg lg:text-xl font-light font-poppins px-3 py-2 rounded-full hover:bg-primary transition-colors duration-300"
                href="/community"
              >
                Community
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="flex-none gap-2">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Placeholder Profile-Picture"
                  src={
                    typeof expert?.pictureUrl === 'string'
                      ? expert.pictureUrl
                      : '/images/fotoplaceholder.webp'
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                {user.isExpert ? (
                  <a className="justify-between" href={profileLink}>
                    Profile
                  </a>
                ) : (
                  <a className="justify-between" href={profileLink}>
                    Favorite
                  </a>
                )}
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/community">Community</a>
              </li>
              <li>
                <a href="/help">Help</a>
              </li>
              <li>
                <a href="/setting">Settings</a>
              </li>
              <li>
                <LogoutButton />
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link href="/register" className="btn btn-outline">
              Register
            </Link>
            <Link className="btn btn-primary" href="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
