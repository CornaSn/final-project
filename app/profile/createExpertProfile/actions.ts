'use server';

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config({
  cloud_name: 'dmntpv6mf',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type CloudinaryResource = {
  context?: {
    alt?: string;
    caption?: string;
  };
  public_id: string;
  secure_url: string;
};

export async function create(formData: FormData) {
  const file = formData.get('image') as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const response: CloudinaryResource = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          tags: ['expert_profile_images'],
          upload_preset: 'expert_profile_images',
        },
        function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          if (!result) {
            reject(new Error('No result from Cloudinary'));
            return;
          }
          resolve(result);
        },
      )
      .end(buffer);
  });

  revalidatePath('/');

  console.log('url', response.secure_url);
}
