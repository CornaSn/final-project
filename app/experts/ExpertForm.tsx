'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Country } from '../../migrations/00004-createCountriesTable';
import { Expertise } from '../../migrations/00008-createExpertiseTable';
import SelectCountry from '../components/selectCountries';
import SelectExpertise from '../components/selectExpertise';

type Props = {
  expertAreas: Expertise[];
  expertCountries: Country[];
};

export default function ExpertsForm(props: Props) {
  const [selectedItemsCountries, setSelectedItemsCountries] = useState([]);
  const [selectedItemsExpertise, setSelectedItemsExpertise] = useState<
    string[]
  >([]);
  const router = useRouter();

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
              <SelectCountry
                expertCountries={props.expertCountries}
                setSelectedItemsCountries={setSelectedItemsCountries as never}
                selectedItemsCountries={selectedItemsCountries}
              />
            </div>
            <div className="w-1/2">
              <h2 className="text-lg font-bold mb-2">Select expert areas</h2>
              <SelectExpertise
                expertAreas={props.expertAreas}
                setSelectedItemsExpertise={setSelectedItemsExpertise}
                selectedItemsExpertise={selectedItemsExpertise}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="btn w-full md:w-2/3 lg:w-1/2 xl:w-1/3"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
