import { revalidatePath } from 'next/cache';
import React from 'react';
import { create } from './actions';

interface CloudinaryResource {
  context?: {
    alt?: string;
    caption?: string;
  };
  public_id: string;
  secure_url: string;
}

export default async function Home() {
  return (
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
  );
}
