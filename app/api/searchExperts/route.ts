import { NextRequest, NextResponse } from 'next/server';
import {
  findCountryIdInsecure,
  getExpertCountryInsecure,
} from '../../../database/countriesList';
import { findExpertiseIdInsecure } from '../../../database/expertiseList';
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
    const userId = await userWithValidSession();
    // console.log('userId', userId);

    // 5. Match Experts with same expert_country ID
    const expertsCountries = await getExpertCountryInsecure(countryId?.id);
    console.log('expertsCountries', expertsCountries);

    // const expertsWithSameCountryID = new Map();

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
