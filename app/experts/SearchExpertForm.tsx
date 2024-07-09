'use client';

// import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  areasOfInterestName: string[];
  countryOfInterestName: string[];
};

export default function ExpertsForm(props: Props) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const toggleSelection = (item: string) => {
    if (selectedAreas.includes(item)) {
      setSelectedAreas(
        selectedAreas.filter((selectedItem) => selectedItem !== item),
      );
    } else {
      setSelectedAreas([...selectedAreas, item]);
    }
  };
  console.log('selectedAreas', selectedAreas);
  console.log(
    'areasOfInterestName##############################################',
    toggleSelection,
  );

  const handleCountryChange = (event: { target: { value: any } }) => {
    const country = event.target.value;
    setSelectedCountry(country);
  };

  const handleAreaKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement>,
    area: string,
  ) => {
    if (event.key === 'Enter') {
      toggleSelection(area);
    }
  };

  return (
    <div className="flex justify-center pt-12 min-h-screen bg-gray-100">
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
            <option value="" disabled>
              Choose a country
            </option>
            {props.countryOfInterestName.map((country) => (
              <option key={`country-${country}`} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold mb-2">Selected Areas:</h2>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {selectedAreas.map((area) => (
              <button
                key={`area-${area}`}
                type="button"
                className="bg-blue-500 text-white px-3 py-1 rounded-full"
                onClick={() => toggleSelection(area)}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Select areas:</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            {props.areasOfInterestName.map((area) => (
              <div
                key={`area-${area}`}
                className={`bg-gray-300 text-gray-700 px-3 py-1 rounded-full ${selectedAreas.includes(area) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => toggleSelection(area)}
                onKeyDown={(e) => handleAreaKeyPress(e, area)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${area}`}
              >
                {area}
              </div>
            ))}
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center mt-4">
          <button className="btn w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
