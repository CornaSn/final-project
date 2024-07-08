'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ExpertUser } from '../../../migrations/00002-createExpertsTable';
import { Country } from '../../../migrations/00004-createCountriesTable';
import { Expertise } from '../../../migrations/00008-createExpertiseTable';
import SelectExpertise from '../../components/selectExpertise';

type Props = {
  userId: number | undefined;
  expertAreas: Expertise[];
  expertCountries: Country[];
};

export default function ExpertsForm(props: Props) {
  // // console.log('all Props', props);
  // const [selectedCountry, setSelectedCountry] = useState([]);
  // const [selectedItemsExpertise, setSelectedItemsExpertise] = useState<
  //   string[]
  // >([]);

  const router = useRouter();

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full text-center mb-6">
        <h2 className="text-2xl font-bold">
          Match an expert based on your interest!
        </h2>
      </div>
      <div className="w-full max-w-md">
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Choose a country:
          </label>
          <select
            name="country"
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="Albania">Albania</option>
            <option value="Austria">Austria</option>
            <option value="Brazil">Brazil</option>
            <option value="Colombia">Colombia</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="expertArea"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Choose an expert area:
          </label>
          {/* <SelectExpertise
          // selectedExpertise={selectedExpertise}
          // setSelectedExpertise={setSelectedExpertise}
          /> */}
        </div>
      </div>
    </div>
  );
}
