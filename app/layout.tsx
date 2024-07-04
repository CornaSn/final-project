import './globals.css';
import Link from 'next/link';
import LogoutButton from './(auth)/logout/LogoutButton';
import Navbar from './components/Navbar';

// TODO: Add Titel and Description
export const metadata = {
  title: { default: 'Home | travel genius', template: '%s | travel genius' },
  description: 'Travel matching platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          {children}
          {/* <Footer  /> */}
        </div>
      </body>
    </html>
  );
}
