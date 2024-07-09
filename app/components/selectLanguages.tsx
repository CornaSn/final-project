import React, { Dispatch, SetStateAction, useState } from 'react';
import { Language } from '../../migrations/00006-createLanguagesTable';

type Props = {
  expertLanguages: Language[];
  setSelectedItemsLanguages: Dispatch<SetStateAction<string[] | never[]>>;
  selectedItemsLanguages: string[];
};

export default function SelectLanguage(props: Props) {
  const [selectedItemsLanguages, setSelectedItemsLanguages] = useState<
    string[]
  >([]);

  const expertLanguages = props.expertLanguages;

  const languages = expertLanguages.map(
    (languageName) => languageName.language,
  );

  const toggleSelection = (item: string) => {
    if (props.selectedItemsLanguages.includes(item)) {
      props.setSelectedItemsLanguages(
        props.selectedItemsLanguages.filter(
          (selectedItem) => selectedItem !== item,
        ),
      );
    } else {
      props.setSelectedItemsLanguages([...props.selectedItemsLanguages, item]);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Select languages you speak</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        {props.selectedItemsLanguages.map((item) => (
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
            className={`bg-gray-300 text-gray-700 px-3 py-1 rounded-full ${selectedItemsLanguages.includes(language) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => toggleSelection(language)}
            disabled={selectedItemsLanguages.includes(language)}
          >
            {language.charAt(0).toUpperCase() + language.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
