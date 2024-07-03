import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({
  cloud_name: 'dmntpv6mf',
  api_key: '275495128522211',
  api_secret: '0NEpXhYMxSxRSenVVVFchFlFnVw',
});

export default cloudinary;

// API environment variable
// CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@dmntpv6mf
