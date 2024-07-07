import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  findCountryIdInsecure,
  insertExpertCountryInsecure,
} from '../../../database/countriesList';
import {
  findExpertiseIdInsecure,
  insertExpertExpertiseInsecure,
} from '../../../database/expertiseList';
import { createExpert } from '../../../database/experts';
import {
  findLanguageIdInsecure,
  insertExpertLanguageInsecure,
} from '../../../database/languageList';
import { getValidSessionById } from '../../../database/sessions';
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
    // console.log('sessionCookie', sessionCookie);

    const sessionToken = sessionCookie.value;
    // console.log('sessionToken', sessionToken);
    const session = await getValidSessionById(sessionToken);
    // console.log('session', session);

    if (!session) {
      // Handle case where session is invalid or expired
      return NextResponse.json(
        { errors: [{ message: 'Invalid session token' }] },
        { status: 401 }, // Unauthorized status
      );
    }

    // 4. Create new expert profile
    const newExpert = await createExpert(sessionCookie.value, session.userId, {
      age: result.data.age || null,
      city: result.data.city || null,
      bio: result.data.bio || null,
      pictureUrl: result.data.pictureUrl || null,
      videoUrl: result.data.videoUrl || null,
      travelBlogUrl: result.data.travelBlogUrl || null,
      userId: session.userId,
    });
    console.log('newExpert', newExpert);

    console.log(
      'result.data.selectedItemsCountries',
      result.data.selectedItemsCountries,
    );

    // 5. Create expert with Countries
    await Promise.all(
      result.data.selectedItemsCountries.map(async (country) => {
        const countryId = await findCountryIdInsecure(country);

        if (typeof countryId?.id === 'number') {
          try {
            const returnFromExpertCountryInsert =
              await insertExpertCountryInsecure(countryId.id, session.userId);

            console.log(returnFromExpertCountryInsert);
          } catch (error) {
            console.error('Error while inserting into DB', error);
          }
        }
      }),
    );

    // 6. Create expert with Languages
    await Promise.all(
      result.data.selectedItemsLanguages.map(async (language) => {
        const languageId = await findLanguageIdInsecure(language);
        if (typeof languageId?.id === 'number') {
          try {
            const returnFromExpertLanguageInsert =
              await insertExpertLanguageInsecure(languageId.id, session.userId);

            console.log(returnFromExpertLanguageInsert);
          } catch (error) {
            console.error('Error while inserting into DB', error);
          }
        }
      }),
    );

    console.log(
      ' result.data.selectedItemsExpertise',
      result.data.selectedItemsExpertise,
    );

    // 7. Create expert with Expertise
    await Promise.all(
      result.data.selectedItemsExpertise.map(async (expertise) => {
        const expertiseId = await findExpertiseIdInsecure(expertise);
        console.log('=======================================');
        console.log('expertiseId', expertiseId);
        if (typeof expertiseId?.id === 'number') {
          try {
            const returnFromExpertExpertiseInsert =
              await insertExpertExpertiseInsecure(
                expertiseId.id,
                session.userId,
              );

            console.log(returnFromExpertExpertiseInsert);
          } catch (error) {
            console.error('Error while inserting into DB', error);
          }
        }
      }),
    );

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
            message: 'Expert Profile already exists',
          },
        ],
      },
      { status: 500 },
    );
  }
}
