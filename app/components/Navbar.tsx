import { cookies } from 'next/headers';
import Link from 'next/link';
import LogoutButton from '../(auth)/logout/LogoutButton';
import { getValidSession } from '../../database/sessions';
import { getUser } from '../../database/users';

export default async function Navbar() {
  const sessionCookie = cookies().get('sessionToken');
  const user = sessionCookie && (await getUser(sessionCookie.value));
  console.log('newUser', user);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          travel
          <br /> genius
        </Link>
      </div>
      <Link className="flex-1 text-center" href="/experts">
        Search Experts
      </Link>{' '}
      <div className="flex-none gap-2">
        {user ? (
          <>
            <Link href={`/profile/${user.firstName}`} />
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">Profile</a>
                </li>
                <li>
                  <a>About</a>
                </li>
                <li>
                  <a>Community</a>
                </li>
                <li>
                  <a>Help</a>
                </li>
                <li>
                  <LogoutButton />
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link href="/register" className="btn btn-outline">
              Register
            </Link>
            <Link className="btn btn-primary" href="/login">
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
