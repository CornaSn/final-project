import React, { Dispatch, SetStateAction, useState } from 'react';
import { Country } from '../../migrations/00004-createCountriesTable';

type Props = {
  expertCountries: Country[];
  setSelectedItemsCountries: Dispatch<SetStateAction<string[] | never[]>>;
  selectedItemsCountries: string[];
};

export default function SelectCountry(props: Props) {
  // const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  const expertCountries = props.expertCountries;

  const countries = expertCountries.map((country) => country.countryName);

  const toggleSelection = (item: string) => {
    if (props.selectedItemsCountries.includes(item)) {
      props.setSelectedItemsCountries(
        props.selectedItemsCountries.filter(
          (selectedItem) => selectedItem !== item,
        ),
      );
    } else {
      props.setSelectedItemsCountries([...props.selectedItemsCountries, item]);
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
        {props.selectedItemsCountries.map((item) => (
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
          className="bg-gray-300 text-gray-700 px-5 py-2 rounded-full w-full text-center"
        >
          <option value="" disabled>
            Choose a country
          </option>
          {countries.map((country) => (
            <option
              key={`country-${country}`}
              value={country}
              disabled={props.selectedItemsCountries.includes(country)}
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
