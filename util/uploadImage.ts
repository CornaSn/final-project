import cloudinary from '../cloudinary.config';

export async function UploadImage(file: string) {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: 'expert-profiles',
      overwrite: true,
    });
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    return null;
  }
}
