'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ExpertUserWithChoices } from '../../../migrations/00002-createExpertsTable';
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
  expertUserWithChoices: ExpertUserWithChoices;
};

export default function UpdateExpertProfileForm(props: Props) {
  console.log('props', props.expertUserWithChoices.age);
  const [age, setAge] = useState(props.expertUserWithChoices.age || '');
  const [city, setCity] = useState(props.expertUserWithChoices.city || '');
  const [bio, setBio] = useState(props.expertUserWithChoices.bio || '');
  const [pictureUrl, setPictureUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [travelBlogUrl, setTravelBlogUrl] = useState('');
  const [selectedItemsCountries, setSelectedItemsCountries] = useState<
    string[]
  >(props.expertUserWithChoices.countryName || []);
  const [selectedItemsLanguages, setSelectedItemsLanguages] = useState<
    string[]
  >(props.expertUserWithChoices.languageName || []);
  const [selectedItemsExpertise, setSelectedItemsExpertise] = useState<
    string[]
  >(props.expertUserWithChoices.expertiseName || []);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [result, setResult] = useState<UploadedAssetData | null>(null);

  // const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleProfileCreation(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const submitEvent = event.nativeEvent as SubmitEvent;
    const buttonText = (submitEvent.submitter as HTMLButtonElement).innerText;

    // const buttonText = event.nativeEvent.submitter.innerText;
    //only trigger this if the Button Upload is pressed
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

      router.push(`/experts/${props.expertUserWithChoices.expertId}`);
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
            Hey, {props.expertUserWithChoices.firstName}! <br />
            Nice that you are back, let's change your profile.
          </h1>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="flex flex-col space-y-2">
                <span className="text-lg font-medium text-gray-700">Age:</span>
                <input
                  value={age}
                  className="input input-bordered w-full py-3 px-4"
                  placeholder="Age"
                  onChange={(event) => setAge(event.currentTarget.value)}
                />
              </label>
              <label className="flex flex-col space-y-2">
                <span className="text-lg font-medium text-gray-700">City:</span>
                <input
                  value={city}
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
                  value={bio}
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
                  value={travelBlogUrl}
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
              <div className="flex flex-col space-y-2">
                <span className="text-lg font-medium text-gray-700">
                  Profile Picture:
                </span>
                <CldUploadWidget
                  signatureEndpoint="/api/sign-image"
                  onSuccess={(res) => {
                    setResult(res.info as UploadedAssetData);
                    // console.log('===================res================');
                    // console.log(typeof res.info?.url);
                    // console.log(res.info?.url);
                    setPictureUrl(res.info?.url);
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
                <CldUploadWidget
                  signatureEndpoint="/api/sign-image"
                  onSuccess={(res) => {
                    setResult(res.info as UploadedAssetData);
                    // console.log('===================res================');
                    // console.log(typeof res.info?.url);
                    // console.log(res.info?.url);
                    setVideoUrl(res.info?.url);
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
    </div>
  );
}
