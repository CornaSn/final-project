import React, { Dispatch, SetStateAction, useState } from 'react';
import { Expertise } from '../../migrations/00008-createExpertiseTable';

type Props = {
  expertAreas: Expertise[];
  setSelectedItemsExpertise: Dispatch<SetStateAction<string[] | []>>;
  selectedItemsExpertise: string[];
};

export default function SelectExpertise(props: Props) {
  const [selectedExpertise, setSelectedExpertise] = useState('');

  const expertExpertise = props.expertAreas;

  const expertiseName = expertExpertise.map(
    (expertise) => expertise.expertiseName,
  );

  const toggleSelection = (item: string) => {
    if (props.selectedItemsExpertise.includes(item)) {
      props.setSelectedItemsExpertise(
        props.selectedItemsExpertise.filter(
          (selectedItem) => selectedItem !== item,
        ),
      );
    } else {
      props.setSelectedItemsExpertise([...props.selectedItemsExpertise, item]);
    }
  };

  const handleChange = (event: { target: { value: any } }) => {
    const expertise = event.target.value;
    setSelectedExpertise(expertise);
    toggleSelection(expertise);
    setSelectedExpertise('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Select expert areas:</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {props.selectedItemsExpertise.map((item) => (
          <button
            key={`item-${item}`}
            type="button"
            className="bg-blue-500 text-white px-3 py-1 rounded-full"
            onClick={() => toggleSelection(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>
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
              disabled={props.selectedItemsExpertise.includes(expertise)}
            >
              {expertise.charAt(0).toUpperCase() + expertise.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
