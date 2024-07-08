'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Country } from '../../migrations/00004-createCountriesTable';
import { Expertise } from '../../migrations/00008-createExpertiseTable';

type Props = {
  interestedExpertise: Expertise[];
  interestedCountries: Country[];
};

export default function ExpertsForm(props: Props) {
  console.log('all Props', props);
  const [selectedExpertise, setSelectedExpertise] = useState('');

  const interestedExpertise = props.interestedExpertise;
  const expertiseName = interestedExpertise.map(
    (expertise) => expertise.expertiseName,
  );
  console.log('expertiseName***************************', expertiseName);

  const toggleSelection = (item: string) => {
    if (selectedExpertise.includes(item)) {
      setSelectedExpertise(
        selectedExpertise.filter(
          (selectedItem: string) => selectedItem !== item,
        ),
      );
    } else {
      setSelectedExpertise([selectedExpertise, item]);
    }
  };

  const handleChange = (event: { target: { value: any } }) => {
    const expertise = event.target.value;
    setSelectedExpertise(expertise);
    toggleSelection(expertise);
    setSelectedExpertise('');
  };

  const router = useRouter();

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full text-center mb-6">
        <h2 className="text-2xl font-bold">
          Match an expert based on your interest!
        </h2>
      </div>
      <div className="w-full max-w-md">
        <div>
          <h1 className="text-2xl font-bold mb-4">Select expert areas:</h1>
          <div className="mb-4">
            <select
              value={selectedExpertise}
              onChange={handleChange}
              className="bg-gray-300 text-gray-700 px-5 py-2 rounded-full w-full text-center"
            >
              <option value="" disabled>
                Choose an expert area
              </option>
              {expertiseName.map((expertise) => (
                <option
                  key={`expertise-${expertise}`}
                  value={expertise}
                  disabled={props.interestedExpertise.includes(expertise)}
                >
                  {expertise.charAt(0).toUpperCase() + expertise.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
