'use client';

import { useListBox, useListBoxSection, useOption } from '@react-aria/listbox';
import { Item, Section } from '@react-stately/collections';
import { useListState } from '@react-stately/list';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Select from 'react-select';
import { CreateExpertProfileRequestBody } from '../../api/expertProfile/route';
import Example from '../../components/spezialisations';
import Experts from '../../experts/page';

type Props = {
  userId: number | undefined;
};
export default function CreateExpertProfileForm(props: Props) {
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [travelBlogUrl, setTravelBlogUrl] = useState('');
  const maxOptions = 6;
  const [selectedSpecializations, setSelectedSpecializations] = useState();
  const router = useRouter();
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
          // selectedSpecializations: selectedSpecializations.map(
          //   (option) => option.value,
          // ),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data: CreateExpertProfileRequestBody = await response.json();
      console.log('data', data);
    } catch (error) {
      console.error('An error occurred during profile creation:', error);
    }
    router.push(`/profile/}`);
    router.refresh();
  }

  return (
    <form
      onSubmit={handleProfileCreation}
      className="flex justify-center items-center min-h-screen bg-gray-100"
    >
      <div className="w-full max-w-4xl p-8 bg-white rounded shadow-md space-y-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Create Expert Profile
        </h1>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="flex flex-col space-y-2">
              <span className="text-lg font-medium text-gray-700">Age:</span>
              <input
                className="input input-bordered w-full py-3 px-4"
                placeholder="Age"
                onChange={(event) => setAge(event.currentTarget.value)}
              />
            </label>

            <label className="flex flex-col space-y-2">
              <span className="text-lg font-medium text-gray-700">City:</span>
              <input
                className="input input-bordered w-full py-3 px-4"
                placeholder="City"
                onChange={(event) => setCity(event.currentTarget.value)}
              />
            </label>

            <label className="flex flex-col space-y-2">
              <span className="text-lg font-medium text-gray-700">
                Short Bio:
              </span>
              <textarea
                className="input input-bordered w-full h-48 resize-none py-3 px-4"
                placeholder="Bio"
                maxLength={200}
                onChange={(event) => setBio(event.currentTarget.value)}
              />
            </label>

            <label className="flex flex-col space-y-2">
              <span className="text-lg font-medium text-gray-700">
                Travel Blog:
              </span>
              <input
                className="input input-bordered w-full py-3 px-4"
                placeholder="Link to your travel blog"
                onChange={(event) =>
                  setTravelBlogUrl(event.currentTarget.value)
                }
              />
            </label>
          </div>

          <div className="space-y-4">
            <label className="flex flex-col space-y-2">
              <span className="text-lg font-medium text-gray-700">
                Picture:
              </span>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs py-3 px-4"
                placeholder="Upload a picture"
                onChange={(event) => setPictureUrl(event.currentTarget.value)}
              />
            </label>

            <label className="flex flex-col space-y-2">
              <span className="text-lg font-medium text-gray-700">Video:</span>
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs py-3 px-4"
                placeholder="Upload a video"
                onChange={(event) => setVideoUrl(event.currentTarget.value)}
              />
            </label>

            <Example />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button className="btn w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
            Upload
          </button>
        </div>
      </div>
    </form>
  );
}
