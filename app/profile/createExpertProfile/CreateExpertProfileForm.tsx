'use client';

import { CldUploadWidget, CldVideoPlayer } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Country } from '../../../migrations/00004-createCountriesTable';
import { Language } from '../../../migrations/00006-createLanguagesTable';
import { Expertise } from '../../../migrations/00008-createExpertiseTable';
import { CreateOrUpdateExpertProfileRequestBody } from '../../api/expertProfile/route';
import SelectCountry from '../../components/selectCountries';
import SelectExpertise from '../../components/selectExpertise';
import SelectLanguage from '../../components/selectLanguages';
import ErrorMessage from '../../ErrorMessage';

interface UploadedAssetData {
  public_id: string;
  width: number;
  height: number;
  id: string;
}

type Props = {
  userId: number;
  expertAreas: Expertise[];
  expertLanguages: Language[];
  expertCountries: Country[];
};

export default function CreateExpertProfileForm(props: Props) {
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [travelBlogUrl, setTravelBlogUrl] = useState('');
  const [selectedItemsCountries, setSelectedItemsCountries] = useState<
    string[]
  >([]);
  const [selectedItemsLanguages, setSelectedItemsLanguages] = useState<
    string[]
  >([]);
  const [selectedItemsExpertise, setSelectedItemsExpertise] = useState<
    string[]
  >([]);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [resultPicture, setResultPicture] = useState<UploadedAssetData | null>(
    null,
  );
  const [resultVideo, setResultVideo] = useState<UploadedAssetData | null>(
    null,
  );

  // const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleProfileCreation(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    const submitEvent = event.nativeEvent as SubmitEvent;
    const buttonText = (submitEvent.submitter as HTMLButtonElement).innerText;
    // Only trigged if Button Upload is pressed
    if (buttonText === 'Upload') {
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
      const data: CreateOrUpdateExpertProfileRequestBody =
        await response.json();
      if ('errors' in data) {
        setErrors(data.errors);
        return;
      }

      router.push(`/`);
      router.refresh();
    }
  }

  return (
    <div>
      <form
        onSubmit={handleProfileCreation}
        className="flex justify-center items-center min-h-screen bg-gray-100"
      >
        <div className="w-full max-w-4xl p-8 bg-white rounded shadow-md space-y-6">
          <h1 className="text-4xl font-bold text-center font-amatic-sc  mb-8">
            Welcome to Travel Genius! Let's Get Your Profile Set Up{' '}
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
              </label>{' '}
              <SelectCountry
                expertCountries={props.expertCountries}
                setSelectedItemsCountries={setSelectedItemsCountries}
                selectedItemsCountries={selectedItemsCountries}
              />
              <SelectExpertise
                expertAreas={props.expertAreas}
                setSelectedItemsExpertise={setSelectedItemsExpertise}
                selectedItemsExpertise={selectedItemsExpertise}
              />
            </div>

            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <span className="text-lg font-medium text-gray-700">
                  Profile Picture:
                </span>
                {!!pictureUrl && (
                  <div className="relative">
                    <img
                      className="w-48 h-48 rounded-full object-cover"
                      src={pictureUrl}
                      alt="Profile"
                    />
                  </div>
                )}
                <CldUploadWidget
                  signatureEndpoint="/api/sign-image"
                  onSuccess={(res) => {
                    setResultPicture(res.info as UploadedAssetData);
                    try {
                      if (typeof res.info === 'string') {
                        throw new Error('Unexpected string in res.info');
                      }
                      if (typeof res.info === 'undefined') {
                        throw new Error('Unexpected undefined in res.info');
                      }
                      const secureUrl = res.info.secure_url;
                      setPictureUrl(secureUrl);
                    } catch (error) {
                      console.error('Error:', error);
                    }
                  }}
                >
                  {({ open }) => {
                    return (
                      <button
                        onClick={() => open()}
                        className="input input-bordered w-full py-3 px-4 text-left"
                      >
                        Upload an image
                      </button>
                    );
                  }}
                </CldUploadWidget>
              </div>
              <div className="flex flex-col space-y-2">
                <span className="text-lg font-medium text-gray-700">
                  Profile Video:
                </span>
                {!!videoUrl && (
                  <div className="mt-4">
                    <video width="320" height="240" controls>
                      <track default kind="captions" src="" />
                      <source src={videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                <CldUploadWidget
                  signatureEndpoint="/api/sign-image"
                  onSuccess={(res) => {
                    try {
                      if (typeof res.info === 'string') {
                        throw new Error('Unexpected string in res.info');
                      }
                      if (typeof res.info === 'undefined') {
                        console.log('Result is undefined');
                        throw new Error('Unexpected string in res.info');
                      }
                      const secureUrl = res.info.secure_url;
                      setResultVideo(res.info);
                      setVideoUrl(secureUrl);
                    } catch (error) {
                      console.error('Error', error);
                    }
                  }}
                >
                  {({ open }) => {
                    return (
                      <button
                        onClick={() => open()}
                        className="input input-bordered w-full py-3 px-4 text-left"
                      >
                        Upload a Video
                      </button>
                    );
                  }}
                </CldUploadWidget>
              </div>
              <SelectLanguage
                expertLanguages={props.expertLanguages}
                setSelectedItemsLanguages={setSelectedItemsLanguages}
                selectedItemsLanguages={selectedItemsLanguages}
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button className="btn text-base w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
              Upload
            </button>
          </div>
        </div>
        {errors.map((error) => (
          <div key={`error-${error.message}`}>
            <ErrorMessage>{error.message}</ErrorMessage>
          </div>
        ))}
      </form>
    </div>
  );
}
