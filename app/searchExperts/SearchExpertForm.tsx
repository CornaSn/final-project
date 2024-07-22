'use client';

import { debounce } from 'lodash';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Country } from '../../migrations/00004-createCountriesTable';
import { Language } from '../../migrations/00006-createLanguagesTable';
import { Expertise } from '../../migrations/00008-createExpertiseTable';
import { SearchExpertsRespondBody } from '../api/searchExperts/route';
import ErrorMessage from '../ErrorMessage';

type Props = {
  expertAreas: Expertise[];
  expertCountries: Country[];
};

export default function SearchExpertsForm(props: Props) {
  const [selectedCountry, setSelectedCountry] = useState<number>();
  const [selectedItemsExpertise, setSelectedItemsExpertise] = useState<
    number[]
  >([]);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [searchResults, setSearchResults] =
    useState<SearchExpertsRespondBody | null>(null); // State to store search results

  const router = useRouter();

  // Function to update URL with chosen Options
  const debouncedUpdateUrl = useRef(
    debounce(() => {
      const query = {
        country: selectedCountry ? selectedCountry.toString() : '',
        expertise: selectedItemsExpertise.join(','),
      };
      const searchParams = new URLSearchParams(query);

      router.push(`/searchExperts?${searchParams.toString()}`);
    }, 300),
  ).current; // debounce time in milliseconds

  useEffect(() => {
    debouncedUpdateUrl();
    return debouncedUpdateUrl.cancel;
  }, [selectedCountry, selectedItemsExpertise]);

  async function handleSearchExperts(event: { preventDefault: () => void }) {
    event.preventDefault();
    const query = {
      country: selectedCountry ? selectedCountry.toString() : '',
      expertise: selectedItemsExpertise.join(','),
    };
    const searchParams = new URLSearchParams(query);

    const response = await fetch(
      `/api/searchExperts?${searchParams.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data: SearchExpertsRespondBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
    } else {
      setSearchResults(data); // Save search results in state
      router.push('/searchExperts/match'); // Redirect to match page
    }
  }

  const toggleSelection = (item: number) => {
    if (selectedItemsExpertise.includes(item)) {
      setSelectedItemsExpertise(
        selectedItemsExpertise.filter((selectedItem) => selectedItem !== item),
      );
    } else {
      setSelectedItemsExpertise([...selectedItemsExpertise, item]);
    }
  };

  const handleCountryChange = (event: { target: { value: any } }) => {
    const country = event.target.value;
    setSelectedCountry(country);
  };

  const handleAreaKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    area: number,
  ) => {
    if (event.key === 'Enter') {
      toggleSelection(area);
    }
  };

  return (
    <div className="flex justify-center pt-12 min-h-screen bg-base-200">
      <form onSubmit={handleSearchExperts}>
        <div className="w-full max-w-7xl p-8 bg-white rounded shadow-md space-y-6">
          <h1 className="text-4xl font-bold text-center mb-4">
            <strong>Start your journey to an unforgettable trip</strong>
            <p className="text-base text-gray-600">
              We have hundreds of experts so you receive your perfect-match
            </p>
          </h1>
          <br />
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Choose a Country</h2>
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className="bg-gray-300 text-gray-700 px-5 py-2 rounded-full w-full max-w-md mx-auto mb-4 text-center"
            >
              <option selected={true}>Choose a country</option>
              {props.expertCountries.map((country) => (
                <option key={`country-${country.id}`} value={country.id}>
                  {country.countryName}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="text-center">
            <h2 className="text-lg font-bold mb-2">Selected Areas:</h2>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {selectedItemsExpertise.map((areaId) => (
                <button
                  key={`area-${areaId}`}
                  type="button"
                  className="bg-primary btn px-3 py-1 rounded-full"
                  onClick={() => toggleSelection(areaId)}
                >
                  {
                    props.expertAreas.find((area) => area.id === areaId)
                      ?.expertiseName
                  }
                </button>
              ))}
            </div>
          </div>
          <br />
          <div>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">
                Choose your interest areas:
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {props.expertAreas.map((area) => (
                <div
                  key={`area-${area.expertiseName}`}
                  className={`bg-gray-300 text-gray-700 px-3 py-1 rounded-full ${selectedItemsExpertise.includes(area.id) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => toggleSelection(area.id)}
                  onKeyDown={(e) => handleAreaKeyPress(e, area.id)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Select ${area.expertiseName}`}
                >
                  {area.expertiseName}
                </div>
              ))}
            </div>
          </div>
          <br />
          <div className="flex justify-center mt-4">
            <button
              className="mt-8 btn text-base btn-primary md:w-2/5 lg:w-1/5 xl:w-1/5"
              onClick={handleSearchExperts}
            >
              Search
            </button>
          </div>
          <br />
          <br />
          <br />
          <div className="container mx-auto text-center py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <img
                  src="/images/match.webp"
                  alt="Filter by Interests"
                  className="w-24 h-24 mb-4"
                />
                <strong className="text-4xl font-semibold">
                  Filter by Interests
                </strong>
                <p className="text-base text-gray-600">
                  Discover experts who share your passion.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/video.webp"
                  alt="Watch introductory Video"
                  className="w-24 h-24 mb-4"
                />
                <strong className="text-4xl font-semibold">
                  Watch introductory Video
                </strong>
                <p className="text-base text-gray-600">
                  Get to know them before you connect.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src="/images/text.webp"
                  alt="Chat with an Expert"
                  className="w-24 h-24 mb-4"
                />
                <strong className="text-4xl font-semibold">
                  Chat with an Expert
                </strong>
                <p className=" text-base text-gray-600">
                  Start a conversation with your ideal match today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
