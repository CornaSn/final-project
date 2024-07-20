import './globals.css';
import Footer from './components/footer';
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
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
      </head>
      <body>
        <div className="flex flex-col min-h-screen bg-base-200">
          <Navbar />
          {children}
          <br />
          <br />
          <br />
          <br />
          <br />
          <Footer />
        </div>
      </body>
    </html>
  );
}
