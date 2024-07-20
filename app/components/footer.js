// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content py-6">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col lg:flex-row items-center">
          <Link href="/" className="btn btn-ghost font-amatic-sc text-4xl">
            Travel Genius
          </Link>
          <nav className="flex flex-col lg:flex-row lg:ml-6">
            <Link
              href="/about"
              className="text-lg lg:text-xl font-light font-poppins px-3 py-2"
            >
              About
            </Link>
            <Link
              href="/help"
              className="text-lg lg:text-xl font-light font-poppins px-3 py-2"
            >
              Help
            </Link>
            <Link
              href="/community"
              className="text-lg lg:text-xl font-light font-poppins px-3 py-2"
            >
              Community
            </Link>
          </nav>
        </div>
        <div className="flex space-x-4 mt-4 lg:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg hover:text-gray-600"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg hover:text-gray-600"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg hover:text-gray-600"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg hover:text-gray-600"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="text-base lg:text-lg font-light font-poppins">
          &copy; {new Date().getFullYear()} Travel Genius. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
