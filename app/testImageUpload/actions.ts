import { revalidatePath } from 'next/cache';
import cloudinary from '../../cloudinary.config';

cloudinary.config({
  cloud_name: 'dmntpv6mf',
  api_key: '995274678669975',
  api_secret: 'LNnWxnQJ4miszCi8SqOW0Iig0KA',
});

export async function create(formData: FormData) {
  'use server';
  const file = formData.get('image') as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const response = await new Promise((resolve, reject) => {
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
          resolve(result);
        },
      )
      .end(buffer);
  });

  revalidatePath('/');

  console.log('url', response.secure_url);
}
