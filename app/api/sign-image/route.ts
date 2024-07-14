import { v2 as cloudinary } from 'cloudinary';

export async function POST(request: Request) {
  console.log('api/sign-image');
  const body = (await request.json()) as {
    paramsToSign: Record<string, string>;
  };
  console.log('body', body);
  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string,
  );

  return Response.json({ signature });
}
