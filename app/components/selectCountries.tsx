import React, { useState } from 'react';
import { Country } from '../../migrations/00004-createCountriesTable';

type Props = {
  expertCountries: Country[];
};

export default function SelectCountry(props: Props) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  const expertCountries = props.expertCountries;

  const countries = expertCountries.map((country) => country.countryName);

  const toggleSelection = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item),
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleChange = (event: { target: { value: any } }) => {
    const country = event.target.value;
    setSelectedCountry(country);
    toggleSelection(country);
    setSelectedCountry('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Select countries you have visited
      </h1>
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
          value={selectedCountry}
          onChange={handleChange}
          className="bg-gray-300 text-gray-700 px-3 py-1 rounded-full"
        >
          <option value="" disabled>
            Choose a country
          </option>
          {countries.map((country) => (
            <option
              key={`country-${country}`}
              value={country}
              disabled={selectedItems.includes(country)}
            >
              {country.charAt(0).toUpperCase() + country.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

/*
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">
//         Select countries you have visited
//       </h1>
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
//         {countries.map((country) => (
//           <button
//             key={`country-${country}`}
//             type="button"
//             className={`bg-gray-300 text-gray-700 px-3 py-1 rounded-full ${selectedItems.includes(country) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
//             onClick={() => toggleSelection(country)}
//             disabled={selectedItems.includes(country)}
//           >
//             {country.charAt(0).toUpperCase() + country.slice(1)}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// } */
