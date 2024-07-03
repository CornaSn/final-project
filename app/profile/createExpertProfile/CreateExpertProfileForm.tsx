'use client';

import React, { useState } from 'react';
import Select from 'react-select';

type Props = {
  userId: number | undefined;
};

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function CreateExpertProfileForm(props: Props) {
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [travelBlogUrl, setTravelBlogUrl] = useState('');
  const maxOptions = 6;

  const [selectedSpecializations, setSelectedSpecializations] = useState<
    { value: string; label: string }[]
  >([]);

  async function handleProfileCreation(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    try {
      const response = await fetch('/api/expertProfile', {
        method: 'POST',
        body: JSON.stringify({
          userId: props.userId,
          age,
          city,
          bio,
          pictureUrl,
          videoUrl,
          travelBlogUrl,
          selectedSpecializations: selectedSpecializations.map(
            (option) => option.value,
          ),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('data', data);
    } catch (error) {
      console.error('An error occurred during profile creation:', error);
    }
  }

  const handleTypeSelect = (
    selectedOptions: { value: string; label: string }[],
  ) => {
    setSelectedSpecializations(selectedOptions);
  };

  return (
    <form onSubmit={handleProfileCreation}>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded shadow-md space-y-4">
          <h1 className="text-2xl font-bold text-center mb-6">
            Create Expert Profile
          </h1>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Age:</span>
            <input
              className="input input-bordered grow"
              placeholder="Age"
              onChange={(event) => setAge(event.currentTarget.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">City: </span>
            <input
              className="input input-bordered grow"
              placeholder="City"
              onChange={(event) => setCity(event.currentTarget.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">
              Short Bio:
            </span>
            <textarea
              className="input input-bordered grow h-40 resize-y"
              placeholder="Bio"
              maxLength={200}
              onChange={(event) => setBio(event.currentTarget.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">
              Travel Blog:{' '}
            </span>
            <input
              className="input input-bordered grow"
              placeholder="Link to your travel blog"
              onChange={(event) => setTravelBlogUrl(event.currentTarget.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Picture:</span>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              placeholder="Upload a picture"
              onChange={(event) => setPictureUrl(event.currentTarget.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Video: </span>
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              placeholder="Upload a video"
              onChange={(event) => setVideoUrl(event.currentTarget.value)}
            />
          </label>

          <span className="text-sm font-medium text-gray-700">
            Favorite Flavor:
          </span>
          <Select
            onChange={handleTypeSelect}
            isMulti
            options={
              selectedSpecializations.length === maxOptions ? [] : options
            }
          />
          <div className="flex flex-col gap-1">
            {' '}
            <button className="btn">Upload</button>
          </div>
        </div>
      </div>
    </form>
  );
}
