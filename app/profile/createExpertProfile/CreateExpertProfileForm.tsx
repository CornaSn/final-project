'use client';

import { useState } from 'react';

export default function CreateExpertProfileForm() {
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [ptravelBlogUrl, setTravelBlogUrl] = useState('');

  return (
    <form>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded shadow-md space-y-4">
          <h1 className="text-2xl font-bold text-center mb-6">Registration</h1>
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
            <input
              className="input input-bordered grow"
              placeholder="Last name"
              onChange={(event) => setBio(event.currentTarget.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Picture:</span>
            <input
              className="input input-bordered grow"
              placeholder="Upload a picture"
              onChange={(event) => setPictureUrl(event.currentTarget.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-gray-700">Video: </span>
            <input
              className="input input-bordered grow"
              placeholder="Upload a video"
              onChange={(event) => setVideoUrl(event.currentTarget.value)}
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
          <div className="flex flex-col gap-1">
            {' '}
            <button className="btn">Upload</button>
          </div>
        </div>
      </div>
    </form>
  );
}
