export const metadata = {
  title: {
    default: 'About Us | Travel Genius',
    template: '%s | Travel Genius',
  },
  description:
    'Learn more about Travel Genius, our mission, and the team behind the platform. Discover how we’re revolutionizing travel experiences.',
};

export default function About() {
  return (
    <div className="bg-base-200 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl font-bold text-center mb-8 font-amatic-sc">
          About Travel Genius
        </h1>

        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4 font-amatic-sc">
            Our Mission
          </h2>

          <div className="flex justify-center mb-4">
            {/* <img src={missionImg} alt="Our Mission" className="h-48"/> */}
          </div>
          <p className="text-lg leading-7 font-poppins">
            At Travel Genius, our mission is to revolutionize the way you
            discover and connect with travel experts. We believe that
            personalized travel experiences are the key to unforgettable
            journeys. Our platform is designed to match you with experts who can
            provide tailored advice, insider tips, and unique travel itineraries
            that cater to your interests and preferences.
          </p>
        </section>

        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4 font-amatic-sc">
            How It Works
          </h2>
          <div className="flex justify-center mb-4">
            {/* <img src={howItWorksImg} alt="How It Works" className="h-48"/> */}
          </div>
          <p className="text-lg leading-7 mb-4 font-poppins">
            Travel Genius is a user-friendly platform that connects travelers
            with travel experts from around the world. Here's how it works:
          </p>
          <ol className="list-decimal list-inside text-lg leading-7 text-left inline-block font-poppins">
            <li>Sign up and create your profile.</li>
            <li>Specify your travel preferences and interests.</li>
            <li>Browse through a curated list of travel experts.</li>
            <li>Connect with experts who match your criteria.</li>
            <li>
              Receive personalized travel advice and plan your perfect trip.
            </li>
          </ol>
        </section>

        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4 font-amatic-sc">
            Why Choose Travel Genius?
          </h2>
          <div className="flex justify-center mb-4">
            {/* <img src={whyChooseUsImg} alt="Why Choose Us" className="h-48"/> */}
          </div>
          <ul className="list-disc list-inside text-lg leading-7 text-left inline-block font-poppins">
            <li>Access to a diverse network of experienced travel experts.</li>
            <li>Personalized travel recommendations tailored to your needs.</li>
            <li>Easy-to-use platform with seamless navigation.</li>
            <li>Trustworthy and verified expert profiles.</li>
            <li>Comprehensive travel planning tools and resources.</li>
          </ul>
        </section>

        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4 font-amatic-sc">
            Join Our Community
          </h2>
          <div className="flex justify-center mb-4">
            {/* <img src={communityImg} alt="Join Our Community" className="h-48"/> */}
          </div>
          <p className="text-lg leading-7 font-poppins">
            Become a part of the Travel Genius community and unlock the
            potential of your travels. Whether you're a seasoned explorer or
            planning your first adventure, our platform is here to enhance your
            travel experience. Sign up today and start your journey with Travel
            Genius!
          </p>
        </section>

        <section className="text-center">
          <h2 className="text-4xl font-bold mb-4 font-amatic-sc">
            Get In Touch
          </h2>
          <div className="flex justify-center mb-4">
            {/* <img src={getInTouchImg} alt="Get In Touch" className="h-48"/> */}
          </div>
          <p className="text-lg leading-7 font-poppins">
            Have questions or need assistance? Our support team is here to help.
            Reach out to us at{' '}
            <a href="mailto:support@travelgenius.com" className="text-blue-500">
              support@travelgenius_example.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
