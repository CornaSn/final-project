import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createExpert } from '../../../database/experts';
import {
  Expert,
  expertSchema,
} from '../../../migrations/00002-createExpertsTable';

export type CreateExpertProfileRequestBody =
  | {
      expert: Expert;
    }
  | {
      errors: {
        message: string;
      }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateExpertProfileRequestBody>> {
  try {
    // 1. Get the user data from the request
    const body = await request.json();
    console.log('body', body);

    // 2. Validation schema for request body
    const result = expertSchema.safeParse(body);
    console.log('result', result);

    if (!result.success) {
      return NextResponse.json(
        {
          errors: [
            {
              message: 'Request body validation failed',
              issues: result.error.issues,
            },
          ],
        },
        { status: 400 },
      );
    }

    // 3. Checking if the sessionToken cookie exists
    const sessionCookie = cookies().get('sessionToken');
    if (!sessionCookie) {
      return NextResponse.json(
        {
          errors: [
            {
              message: 'Session token is missing',
            },
          ],
        },
        { status: 401 },
      );
    }

    // 4. Create new expert profile
    const newExpert = await createExpert(sessionCookie.value, {
      age: result.data.age || null,
      city: result.data.city || null,
      bio: result.data.bio || null,
      pictureUrl: result.data.pictureUrl || null,
      videoUrl: result.data.videoUrl || null,
      travelBlogUrl: result.data.travelBlogUrl || null,
    });
    console.log('newExpert', newExpert);
    if (!newExpert) {
      return NextResponse.json(
        {
          errors: [
            {
              message: 'Failed to create expert profile',
            },
          ],
        },
        { status: 500 },
      );
    }

    // 5. Return the created expert profile
    return NextResponse.json({ expert: newExpert });
  } catch (error) {
    console.error('Error in POST /create-expert-profile:', error);
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Internal server error',
          },
        ],
      },
      { status: 500 },
    );
  }
}
