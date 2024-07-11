import { NextRequest, NextResponse } from 'next/server';
import {
  findCountryIdInsecure,
  getExpertCountryByCountryIdInsecure,
  getExpertCountryInsecure,
} from '../../../database/countriesList';
import {
  findExpertiseIdInsecure,
  getExpertExpertiseByExpertiseIdInsecure,
} from '../../../database/expertiseList';
import { Expert } from '../../../migrations/00002-createExpertsTable';
import { userWithValidSession } from '../../../util/cookies';

export type SearchExpertsRequestBody =
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
): Promise<NextResponse<SearchExpertsRequestBody>> {
  try {
    // 1. Get the user data from the request
    const body = await request.json();
    console.log('body-------------', body);
    // body------------- {
    //   selectedItemsCountries: 'Bangladesh',
    //   selectedItemsExpertise: [ 'Cycling Tour', 'Pilgrimage Tour', 'Rock Climbing' ]
    // }

    // 2. Check if user has a valid session
    await userWithValidSession();
    // console.log('userId', userId);

    // 5. Match Experts with same expert_country ID
    const expertUsersIdsCountry = await getExpertCountryByCountryIdInsecure(
      Number(body.selectedCountry),
    );
    console.log('expertUsersIds', expertUsersIdsCountry);

    // 6. Match Experts with same expert_expertise ID
    console.log('body.selectedItemsExpertise', body.selectedItemsExpertise);

    // await Promise.all(
    console.log('Start mappping =============================');
    console.log('Start mappping =============================');
    const arrayOfExpertExpertiseIds = await Promise.all(
      body.selectedItemsExpertise.map(async (expertise: number) => {
        console.log('expertise', expertise);
        const expertId =
          await getExpertExpertiseByExpertiseIdInsecure(expertise);
        console.log('expertId', expertId, expertId.length);

        // const newArrayOfExpertExpertiseIds = [
        //   ...arrayOfExpertExpertiseIds,
        //   expertId,
        // ];
        // console.log(
        //   'newArrayOfExpertExpertiseIds',
        //   newArrayOfExpertExpertiseIds,
        // );
        if (expertId.length > 0) {
          return expertId;
        }
      }),
    );
    console.log('map finished ======================================');
    console.log('map finished ======================================');
    console.log('arrayOfExpertExpertiseIds', arrayOfExpertExpertiseIds);

    return NextResponse.json({
      message: 'Search Experts',
    });
  } catch (error) {
    console.error('Error in GET /search-experts:', error);
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Search experts did not work',
          },
        ],
      },
      { status: 500 },
    );
  }
}
