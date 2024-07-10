import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
  cloud_name: 'dmntpv6mf',
  secure: true,
  api_key: process.env.CLOUDINARY_API_key,
  api_secret: process.env.CLOUDINARY_API_secrete,
});

export default cloudinary;
