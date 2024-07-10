'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import cloudinary from '../../../cloudinary.config';
import { Country } from '../../../migrations/00004-createCountriesTable';
import { Language } from '../../../migrations/00006-createLanguagesTable';
import { Expertise } from '../../../migrations/00008-createExpertiseTable';
import { CreateExpertProfileRequestBody } from '../../api/expertProfile/route';
import SelectCountry from '../../components/selectCountries';
import SelectExpertise from '../../components/selectExpertise';
import SelectLanguage from '../../components/selectLanguages';
import ErrorMessage from '../../ErrorMessage';
import { create } from './actions';

type Props = {
  userId: number;
  // expertId: number;
  expertAreas: Expertise[];
  expertLanguages: Language[];
  expertCountries: Country[];
};

interface CloudinaryResource {
  context?: {
    alt?: string;
    caption?: string;
  };
  public_id: string;
  secure_url: string;
}

export default async function CreateExpertProfileForm(props: Props) {
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [travelBlogUrl, setTravelBlogUrl] = useState('');
  const [selectedItemsCountries, setSelectedItemsCountries] = useState([]);
  const [selectedItemsLanguages, setSelectedItemsLanguages] = useState([]);
  const [selectedItemsExpertise, setSelectedItemsExpertise] = useState<
    string[]
  >([]);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  // const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { resources } = await cloudinary.api.resources_by_tag(
    'expert_profile_images',
    {
      context: true,
    },
  );

  async function handleProfileCreation(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
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
        selectedItemsCountries,
        selectedItemsLanguages,
        selectedItemsExpertise,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: CreateExpertProfileRequestBody = await response.json();
    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(`/experts/dashboard`);
    router.refresh();
  }

  return (
    <div>
      <form
        onSubmit={handleProfileCreation}
        className="flex justify-center items-center min-h-screen bg-gray-100"
      >
        <div className="w-full max-w-4xl p-8 bg-white rounded shadow-md space-y-6">
          <h1 className="text-3xl font-bold text-center mb-8">
            Welcome, to travel genius!
          </h1>
          <h3 className="text-s font-bold text-center mb-8">
            Let's create your profile.
          </h3>
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
              </label>{' '}
              <SelectCountry
                expertCountries={props.expertCountries}
                // TODO****
                // Change this as never part - THIS IS NOT allowed!
                setSelectedItemsCountries={setSelectedItemsCountries as never}
                selectedItemsCountries={selectedItemsCountries}
              />
              <SelectExpertise
                expertAreas={props.expertAreas}
                setSelectedItemsExpertise={setSelectedItemsExpertise}
                selectedItemsExpertise={selectedItemsExpertise}
              />
            </div>

            <div className="space-y-4">
              <label className="flex flex-col space-y-2">
                <span className="text-lg font-medium text-gray-700">
                  Picture:
                </span>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-s py-3 px-4"
                  onChange={(event) => setPictureUrl(event.currentTarget.value)}
                />
              </label>

              <label className="flex flex-col space-y-2">
                <span className="text-lg font-medium text-gray-700">
                  Video:
                </span>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full max-w-s py-3 px-4"
                  onChange={(event) => setVideoUrl(event.currentTarget.value)}
                />
              </label>
              <SelectLanguage
                expertLanguages={props.expertLanguages}
                // TODO****
                // Change this as never part - THIS IS NOT allowed!
                setSelectedItemsLanguages={setSelectedItemsLanguages as never}
                selectedItemsLanguages={selectedItemsLanguages}
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button className="btn w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
              Upload
            </button>
          </div>
        </div>
      </form>

      <div>
        <h2 className="text-xl font-bold mb-4">Add a New Image</h2>
        <form
          action={create}
          className="bg-white border border-slate-200 dark:border-slate-500 rounded p-6 mb-6"
        >
          <p className="mb-6">
            <label htmlFor="image" className="block font-semibold text-sm mb-2">
              Select an Image to Upload
            </label>
            <input
              id="image"
              className="block w-full border-slate-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              type="file"
              name="image"
              required
            />
          </p>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
