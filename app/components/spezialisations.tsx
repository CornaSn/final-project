import React, { useState } from 'react';
import type { Selection } from 'react-aria-components';
import { ListBox, ListBoxItem } from 'react-aria-components';

const selected: string[] = ['item1', 'item2', 'item3'];

export default function Example() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Funktion zum Hinzufügen oder Entfernen eines Elements aus der Auswahl
  const toggleSelection = (item: string) => {
    if (selectedItems.includes(item)) {
      // Element entfernen, wenn es bereits ausgewählt ist
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem !== item),
      );
    } else {
      // Element hinzufügen, wenn es noch nicht ausgewählt ist
      setSelectedItems([...selectedItems, item]);
    }
  };

  const sandwichContents = ['cheese', 'lettuce', 'tomato', 'bacon'];

  return (
    <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Select Sandwich Contents</h1>

      {/* Anzeige der ausgewählten Elemente als Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {selectedItems.map((item) => (
          <button
            key={item}
            type="button"
            className="bg-blue-500 text-white px-3 py-1 rounded-full"
            onClick={() => toggleSelection(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>

      {/* Anzeige der verfügbaren Elemente zur Auswahl */}
      <div className="flex flex-wrap gap-2 mb-4">
        {sandwichContents.map((item) => (
          <button
            key={item}
            type="button"
            className={`bg-gray-300 text-gray-700 px-3 py-1 rounded-full ${selectedItems.includes(item) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => toggleSelection(item)}
            disabled={selectedItems.includes(item)} // Deaktiviert den Button, wenn das Element bereits ausgewählt ist
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
