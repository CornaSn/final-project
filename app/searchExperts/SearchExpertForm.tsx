'use client';

import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Country } from '../../migrations/00004-createCountriesTable';
import { Expertise } from '../../migrations/00008-createExpertiseTable';
import { SearchExpertsRequestBody } from '../api/searchExperts/route';
import ErrorMessage from '../ErrorMessage';

type Props = {
  expertAreas: Expertise[];
  expertCountries: Country[];
};

export default function ExpertsForm(props: Props) {
  const [selectedCountry, setSelectedCountry] = useState<number>();
  const [selectedItemsExpertise, setSelectedItemsExpertise] = useState<
    number[]
  >([]);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleSearchExperts(event: { preventDefault: () => void }) {
    event.preventDefault();
    const response = await fetch('/api/searchExperts', {
      method: 'POST',
      body: JSON.stringify({
        selectedCountry,
        selectedItemsExpertise,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: SearchExpertsRequestBody = await response.json();
    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(`/experts/dashboard`);
    router.refresh();
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
    <div className="flex justify-center pt-12 min-h-screen bg-gray-100">
      <form onSubmit={handleSearchExperts}>
        <div className="w-full max-w-6xl p-8 bg-white rounded shadow-md space-y-6">
          <h1 className="text-3xl font-bold text-center mb-4">
            Match an expert based on your interest!
          </h1>

          <div className="text-center">
            <h2 className="text-lg font-bold mb-2">Choose a Country</h2>
            <select
              value={selectedCountry}
              onChange={handleCountryChange}
              className="bg-gray-300 text-gray-700 px-5 py-2 rounded-full w-full max-w-md mx-auto mb-4 text-center"
            >
              <option selected={true}>
                {/* <option value="" disabled> */}
                Choose a country
              </option>
              {props.expertCountries.map((country) => (
                <option key={`country-${country.id}`} value={country.id}>
                  {country.countryName}
                </option>
              ))}
            </select>
          </div>
          <div className="text-center">
            <h2 className="text-lg font-bold mb-2">Selected Areas:</h2>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {selectedItemsExpertise.map((areaId) => (
                <button
                  key={`area-${areaId}`}
                  type="button"
                  className="bg-blue-500 text-white px-3 py-1 rounded-full"
                  onClick={() => toggleSelection(areaId)}
                >
                  {props.expertAreas[areaId - 1]?.expertiseName}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Select areas:</h2>
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

          <div className="flex justify-center mt-4">
            <button
              className="btn w-full md:w-2/3 lg:w-1/2 xl:w-1/3"
              onClick={handleSearchExperts}
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
