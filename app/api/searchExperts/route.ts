import { NextRequest, NextResponse } from 'next/server';
import pMap from 'p-map';
import { getExpertCountryByCountryIdInsecure } from '../../../database/countriesList';
import {
  getExpertExpertiseByExpertiseIdInsecure,
  getExpertIdByExpertiseIdInsecure,
} from '../../../database/expertiseList';
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
    const selectedCountry = body.selectedCountry;
    const selectedItemsExpertise = body.selectedItemsExpertise;

    // 2. Check if user has a valid session
    await userWithValidSession();

    // 3. Match Experts where countryID = expert_country_ID
    const expertUsersIdsCountry = await getExpertCountryByCountryIdInsecure(
      Number(selectedCountry),
    );

    // 4. Match Experts where expertiseId = expert_expertise_ID
    const matchedUserId = (
      await pMap(selectedItemsExpertise, async (expertiseId: number) => {
        const result = await getExpertIdByExpertiseIdInsecure(expertiseId);
        const newResult = result.map((object) => {
          return {
            expertUserId: object.expertUserId,
            expertiseIds: expertiseId,
          };
        });
        return newResult;
      })
    ).flat();
    // console.log('matchedUserId+++++++++++++++++++++', matchedUserId);

    // const expertiseMappingResults = await pMap(
    //   selectedItemsExpertise,
    //   async (expertiseId: number) => {
    //     const result =
    //       await getExpertExpertiseByExpertiseIdInsecure(expertiseId);
    //     console.log('===========');
    //     console.log(result);
    //     return {
    //       expertiseId: expertiseId,
    //       expertUserIds: result.map((expert) => expert.expertUserId),
    //     };
    //   },
    // );
    // console.log('expertiseMappingResults', expertiseMappingResults);

    // 5.Grouped expertiseIds by expertUserId and convert result into an array of objects
    const resultMap = new Map();

    matchedUserId.forEach((item) => {
      if (!resultMap.has(item.expertUserId)) {
        resultMap.set(item.expertUserId, []);
      }
      resultMap.get(item.expertUserId).push(item.expertiseIds);
    });

    const resultArray = Array.from(
      resultMap,
      ([expertUserId, expertiseIds]) => ({
        expertUserId,
        expertiseIds,
      }),
    );
    console.log('ExpertIDCountry', expertUsersIdsCountry);

    // 6. Extract expertUserId from each entry in expertUsersIdsCountry and store in a new array
    const expertUsersIdsCountryList = expertUsersIdsCountry.map((entry) => {
      return entry.expertUserId;
    });

    // 7. Map over resultArray to add matching percentage and country match information
    const resultArrayWithPercent = resultArray.map((entry) => {
      return {
        expertUserId: entry.expertUserId,
        expertiseIds: entry.expertiseIds,
        // Calculate matching percentage based on the number of expertiseIds
        matchingPercent:
          (100 * entry.expertiseIds.length) / selectedItemsExpertise.length,
        // Check if expertUserId is in expertUsersIdsCountryList
        matchingCountry: expertUsersIdsCountryList.includes(entry.expertUserId),
      };
    });

    console.log('resultArray', resultArrayWithPercent);

    return NextResponse.json({
      message: 'Its a match',
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
