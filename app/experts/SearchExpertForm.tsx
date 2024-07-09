'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { string } from 'zod';
import { Country } from '../../migrations/00004-createCountriesTable';
import { Expertise } from '../../migrations/00008-createExpertiseTable';

type Props = {
  areasOfInterestName: string[];
  countryOfInterestName: string[];
};

export default function ExpertsForm(props: Props) {
  // console.log('PROOOOOOOOOOOOOOOOOOOOOOOOOPS', props);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedAreas, setSelectedAreas] = useState(['']);

  // const [areasOfInterest, setareasOfInterest] = useState<string[]>([]);
  // const router = useRouter();

  return (
    <form className="flex justify-center pt-12 min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl p-8 bg-white rounded shadow-md space-y-6">
        <h1 className="text-3xl font-bold text-center mb-4">
          Match an expert based on your interest!
        </h1>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-1/2">
              <h2 className="text-lg font-bold mb-2">
                Select countries you have visited
              </h2>
              <select
                value={selectedCountry}
                // onChange={handleCountryChange}
                className="bg-gray-300 text-gray-700 px-5 py-2 rounded-full w-full text-center"
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
            <div className="w-1/2">
              <h1 className="text-2xl font-bold mb-4">Select expert areas:</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                {props.areasOfInterestName.map((area) => (
                  <button
                    key={`area-${area}`}
                    type="button"
                    className={`bg-blue-500 text-white px-3 py-1 rounded-full ${props.areasOfInterestName.includes(area) ? 'bg-blue-700' : ''}`}
                    // onClick={() => ()}
                  >
                    {area}
                  </button>
                ))}
              </div>
              <div className="mb-4">
                <select
                  value=""
                  className="bg-gray-300 text-gray-700 px-5 py-2 rounded-full w-full text-center"
                >
                  <option value="" disabled>
                    Choose an expert area
                  </option>
                  {props.areasOfInterestName.map((area) => (
                    <option
                      key={`area-${area}`}
                      value={area}
                      disabled={props.areasOfInterestName.includes(area)}
                    >
                      {area}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button className="btn w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
