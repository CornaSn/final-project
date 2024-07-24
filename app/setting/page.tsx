import DeleteAccountButton from '../(auth)/delete/DeleteAccountButton';
import { userWithValidSession } from '../../util/cookies';

export const metadata = {
  title: {
    default: 'Settings | Travel Genius',
    template: '%s | Travel Genius',
  },
  description:
    'Manage your account settings, notifications, and more on Travel Genius.',
};

export default async function Settings() {
  await userWithValidSession();

  return (
    <div className="bg-base-200 py-10 mt-20">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl font-bold text-center mb-8 font-amatic-sc">
          Settings
        </h1>

        <div className="space-y-12">
          <section className="text-center p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-4xl font-bold mb-4 font-amatic-sc">
              Notifications
            </h2>
            <p className="text-lg leading-7 font-poppins mb-4">
              Manage your notification settings.
            </p>
            <button className="btn btn-primary mb-4 mr-2">
              E-mail notifications
            </button>
            <button className="btn btn-primary">Push-notifications</button>
          </section>

          <section className="text-center p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-4xl font-bold mb-4 font-amatic-sc">
              Data protection and security
            </h2>
            <p className="text-lg leading-7 font-poppins mb-4">
              Manage your privacy and security settings.
            </p>
            <button className="btn btn-primary mb-4 mr-2">
              Set up two-factor authentication
            </button>
            <button className="btn btn-primary">Show session activity</button>
          </section>

          <section className="text-center p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-4xl font-bold mb-4 font-amatic-sc">
              Sprachen und Regionen
            </h2>
            <p className="text-lg leading-7 font-poppins mb-4">
              Manage your language settings and regions.
            </p>
            <button className="btn btn-primary mb-4 mr-2">
              Set preferred language
            </button>
            <button className="btn btn-primary">Set time zone</button>
          </section>

          <section className="text-center p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-4xl font-bold mb-4 font-amatic-sc">
              Delete Account
            </h2>
            <p className="text-lg leading-7 font-poppins mb-4">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <DeleteAccountButton />
          </section>
        </div>
      </div>
    </div>
  );
}
