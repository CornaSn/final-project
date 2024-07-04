import React, { useState } from 'react';
import Select from 'react-dropdown-select';
import { Language } from '../../migrations/00006-createLanguagesTable';

type Props = {
  expertLanguages: Language[];
};

export default function SelectLanguage(props: Props) {
  // console.log('sind das die props mit Languages', props);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const expertLanguages = props.expertLanguages;
  // console.log('expertLanguages', expertLanguages);

  const languages = expertLanguages.map(
    (languageName) => languageName.language,
  );

  console.log('languageName', languages);

  const toggleSelection = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item),
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Select languages you speak</h1>

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

      <div className="flex flex-wrap gap-2 mb-4">
        {languages.map((language) => (
          <button
            key={`language-${language}`}
            type="button"
            className={`bg-gray-300 text-gray-700 px-3 py-1 rounded-full ${selectedItems.includes(language) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => toggleSelection(language)}
            disabled={selectedItems.includes(language)}
          >
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
