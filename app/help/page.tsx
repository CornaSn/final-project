export const metadata = {
  title: { default: 'Help | Travel Genius', template: '%s | Travel Genius' },
  description:
    'Find answers to your questions and get assistance on Travel Genius. Explore our help resources and support options.',
};

export default function Help() {
  return (
    <div className="bg-base-200 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl font-bold text-center mb-8 font-amatic-sc">
          Help & Support{' '}
        </h1>

        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4 font-amatic-sc">FAQs</h2>
          <div className="flex justify-center mb-4">
            {/* <img src={faqImg} alt="FAQs" className="h-48" /> */}
          </div>
          <div className="text-center">
            <details className="mb-4">
              <summary className="font-semibold text-lg font-poppins cursor-pointer">
                How do I create an account?
              </summary>
              <p className="pl-4 text-lg font-poppins">
                To create an account, click on the "Register" button at the top
                of the page, fill in your details, and follow the instructions
                to complete the registration process.
              </p>
            </details>
            <details className="mb-4">
              <summary className="font-semibold text-lg font-poppins cursor-pointer">
                How do I reset my password?
              </summary>
              <p className="pl-4 text-lg font-poppins">
                Click on the "Login" button and then select "Forgot Password."
                Enter your email address, and we'll send you instructions on how
                to reset your password.
              </p>
            </details>
            <details className="mb-4">
              <summary className="font-semibold text-lg font-poppins cursor-pointer">
                How can I contact travel experts?
              </summary>
              <p className="pl-4 text-lg font-poppins">
                Once logged in, navigate to the "Search Experts" page, browse
                through the list of available experts, and click on their
                profile to send a message.
              </p>
            </details>
          </div>
        </section>

        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4 font-amatic-sc">
            Contact Support
          </h2>
          <div className="flex justify-center mb-4">
            {/* <img src={contactSupportImg} alt="Contact Support" className="h-48" /> */}
          </div>
          <p className="text-lg leading-7 mb-6 font-poppins">
            If you need further assistance, our support team is here to help.
            Reach out to us via the contact form, or email us at{' '}
            <a href="mailto:support@travelgenius.com" className="text-blue-500">
              support@travelgenius.com
            </a>
            .
          </p>
          <a href="/" className="btn btn-primary font-poppins">
            Contact Support
          </a>
        </section>

        <section className="text-center">
          <h2 className="text-4xl font-bold mb-4 font-amatic-sc">
            Useful Resources
          </h2>
          <div className="flex justify-center mb-4">
            {/* <img src={resourcesImg} alt="Resources" className="h-48" /> */}
          </div>
          <p className="text-lg leading-7 font-poppins mb-4">
            Explore our collection of resources to help you make the most of
            your travel planning. From travel guides to expert tips, you'll find
            everything you need to prepare for your next adventure.
          </p>
          <a href="/" className="btn btn-primary font-poppins">
            Explore Resources
          </a>
        </section>
      </div>
    </div>
  );
}
