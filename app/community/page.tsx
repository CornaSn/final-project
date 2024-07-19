export default function communityPage() {
  return (
    <div className="bg-base-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-6xl font-bold text-center mb-8 font-amatic-sc">
          Welcome to the Travel Genius Community
        </h1>

        <section className="mb-12 text-center">
          <div className="flex justify-center mb-4" />
          <p className="text-lg leading-7 font-poppins">
            Join our vibrant community of travel enthusiasts and experts.
            Explore blog posts, read success stories, and share your own travel
            experiences. Connect with like-minded individuals who share your
            passion for adventure.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-4 font-amatic-sc text-center">
            Blog Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="./images/europe.webp"
                alt="Blog Post 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 font-poppins">
                  Top 10 Hidden Gems in Europe
                </h3>
                <p className="text-lg leading-7 font-poppins">
                  Discover the best hidden gems in Europe that you must visit on
                  your next trip. From picturesque villages to stunning natural
                  landscapes, these destinations are sure to amaze you.
                </p>
                <a href="/" className="text-blue-500 mt-4 inline-block">
                  Read More
                </a>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="./images/solo.webp"
                alt="Blog Post 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 font-poppins">
                  The Ultimate Guide to Solo Travel
                </h3>
                <p className="text-lg leading-7 font-poppins">
                  Solo travel can be one of the most rewarding experiences. This
                  guide provides tips and advice to help you plan your solo
                  adventure and make the most of your journey.
                </p>
                <a href="/" className="text-blue-500 mt-4 inline-block">
                  Read More
                </a>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="./images/sustainable.webp"
                alt="Blog Post 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 font-poppins">
                  How to Travel Sustainably
                </h3>
                <p className="text-lg leading-7 font-poppins">
                  Learn how to minimize your environmental impact while
                  traveling. From choosing eco-friendly accommodations to
                  reducing waste, this guide covers all aspects of sustainable
                  travel.
                </p>
                <a href="/" className="text-blue-500 mt-4 inline-block">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-4xl font-bold mb-4 font-amatic-sc text-center">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="./images/jane.webp"
                alt="Success Story 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 font-poppins">
                  Jane's Culinary Journey in Italy
                </h3>
                <p className="text-lg leading-7 font-poppins">
                  Jane shares her incredible culinary journey through Italy,
                  where she learned traditional cooking techniques and
                  discovered the country's rich culinary heritage.
                </p>
                <a href="/" className="text-blue-500 mt-4 inline-block">
                  Read More
                </a>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="./images/amazon.webp"
                alt="Success Story 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 font-poppins">
                  Mark's Adventure in the Amazon
                </h3>
                <p className="text-lg leading-7 font-poppins">
                  Mark recounts his thrilling adventure in the Amazon
                  rainforest, where he encountered diverse wildlife, met
                  indigenous communities, and explored the lush jungle.
                </p>
                <a href="/" className="text-blue-500 mt-4 inline-block">
                  Read More
                </a>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img
                src="./images/maldives.webp"
                alt="Success Story 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 font-poppins">
                  Lisa and Tom's Romantic Getaway
                </h3>
                <p className="text-lg leading-7 font-poppins">
                  Lisa and Tom share their romantic getaway to the Maldives,
                  where they enjoyed pristine beaches, luxurious accommodations,
                  and unforgettable sunsets.
                </p>
                <a href="/" className="text-blue-500 mt-4 inline-block">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-4xl font-bold mb-4 font-amatic-sc text-center">
            Share Your Story
          </h2>
          <p className="text-lg leading-7 mb-6 font-poppins">
            Have a travel story to share? We would love to hear from you! Submit
            your story and inspire others with your adventures.
          </p>
          <a href="/" className="btn btn-primary font-poppins text-base">
            Submit Your Story
          </a>
        </section>
      </div>
    </div>
  );
}
