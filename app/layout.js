import './globals.css';
import Link from 'next/link';

// TODO: Add Titel and Description
export const metadata = {
  title: { default: 'Home | travel genius', template: '%s | travel genius' },
  description: 'Travel matching platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="navbar bg-base-100">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </div>
                {/* <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Parent</a>
                    <ul className="p-2">
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a>Item 3</a>
                  </li>
                </ul> */}
              </div>
              <Link className="btn btn-ghost text-xl" href="/">
                travel
                <br /> genius
              </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal px-1">
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
                  <a>Experts</a>
                </li>
              </ul>
            </div>
            <div className="navbar-end">
              <Link href="/login" className="btn mr-2">
                Login
              </Link>
              <Link href="/register" className="btn">
                Register
              </Link>
            </div>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
