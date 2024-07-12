import { NextRequest, NextResponse } from 'next/server';
import pMap from 'p-map';
import { getExpertCountryByCountryIdInsecure } from '../../../database/countriesList';
import { getExpertExpertiseByExpertiseIdInsecure } from '../../../database/expertiseList';
import { Expert } from '../../../migrations/00002-createExpertsTable';
import { userWithValidSession } from '../../../util/cookies';

export type SearchExpertsRequestBody =
  | {
      selectedCountry: number[];
      selectedItemsExpertise: number[];
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
    // body------------- { selectedCountry: '4', selectedItemsExpertise: [ 9, 6, 34, 37, 48 ] }

    // 2. Check if user has a valid session
    await userWithValidSession();

    // 5. Match Experts with same expert_country ID
    const expertUsersIdsCountry = await getExpertCountryByCountryIdInsecure(
      Number(body.selectedCountry),
    );
    console.log('expertUsersIdsCountry', expertUsersIdsCountry);
    // expertUsersIdsCountry Result(3) [
    //   { expertUserId: 7 },
    //   { expertUserId: 11 },
    //   { expertUserId: 12 }
    // ]

    const sites = body.selectedItemsExpertise;
    // console.log('sites', sites);

    const result = await pMap(sites, async (site: number) => {
      const expertId = await getExpertExpertiseByExpertiseIdInsecure(site);
      return expertId;
    });
    // console.log('result', result);

    //  Hardcoded in order to work with it and see if data structure is working
    const expertiseMappingResults = [
      { expertiseId: 9, expertUserIds: [3, 12] },
      { expertiseId: 6, expertUserIds: [4] },
      { expertiseId: 45, expertUserIds: [] },
      { expertiseId: 50, expertUserIds: [11] },
    ];

    return NextResponse.json({
      expertUsersIdsCountry,
      result,
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
