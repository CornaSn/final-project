import React, { useState } from 'react';
import { Expertise } from '../../migrations/00008-createExpertiseTable';

type Props = {
  expertAreas: Expertise[];
};

export default function SelectExpertise(props: Props) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedExpertise, setSelectedExpertise] = useState('');

  const expertExpertise = props.expertAreas;

  const expertiseName = expertExpertise.map(
    (expertise) => expertise.expertiseName,
  );

  const toggleSelection = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item),
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleChange = (event) => {
    const expertise = event.target.value;
    setSelectedExpertise(expertise);
    toggleSelection(expertise);
    setSelectedExpertise('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Select expert areas:</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedItems.map((item) => (
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
          className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full"
        >
          <option value="" disabled>
            Choose an expert area
          </option>
          {expertiseName.map((expertise) => (
            <option
              key={`expertise-${expertise}`}
              value={expertise}
              disabled={selectedItems.includes(expertise)}
            >
              {expertise.charAt(0).toUpperCase() + expertise.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Select expert area:</h1>

//       <div className="flex flex-wrap gap-2 mb-4">
//         {selectedItems.map((item) => (
//           <button
//             key={`item-${item}`}
//             type="button"
//             className="bg-blue-500 text-white px-3 py-1 rounded-full"
//             onClick={() => toggleSelection(item)}
//           >
//             {item.charAt(0).toUpperCase() + item.slice(1)}
//           </button>
//         ))}
//       </div>

//       <div className="flex flex-wrap gap-2 mb-4">
//         {expertiseName.map((area) => (
//           <button
//             key={`area-${area}`}
//             type="button"
//             className={`bg-gray-300 text-gray-700 px-3 py-1 rounded-full ${selectedItems.includes(area) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
//             onClick={() => toggleSelection(area)}
//             disabled={selectedItems.includes(area)}
//           >
//             {area.charAt(0).toUpperCase() + area.slice(1)}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
