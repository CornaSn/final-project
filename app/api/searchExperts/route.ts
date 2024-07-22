import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import pMap from 'p-map';
import { getExpertCountryByCountryIdInsecure } from '../../../database/countriesList';
import {
  getExpertExpertiseByExpertiseIdInsecure,
  getExpertIdByExpertiseIdInsecure,
} from '../../../database/expertiseList';
import {
  secureCookieOptions,
  userWithValidSession,
} from '../../../util/cookies';

// type SingleResult = {
//   expertUserId: number;
//   expertiseIds: number[];
//   matchingPercent: number;
//   matchingCountry: boolean;
// };
export type SearchExpertsRespondBody =
  | {
      resultArrayWithPercent:
        | {
            expertUserId: number;
            expertiseIds: number[];
            matchingPercent: number;
            matchingCountry: boolean;
          }[]
        | undefined;
    }
  | {
      errors: {
        message: string;
      }[];
    };

export async function GET(
  request: NextRequest,
): Promise<NextResponse<SearchExpertsRespondBody>> {
  let resultArrayWithPercent;
  try {
    // 1. Extract query parameters
    const { searchParams } = new URL(request.url);
    const selectedCountry = searchParams.get('country');
    const expertise = searchParams.get('expertise');
    const selectedItemsExpertise = expertise?.split(',').map((idString) => {
      return Number(idString);
    });

    // 2. Check if user has a valid session
    await userWithValidSession();

    // 3. Match Experts where countryID = expert_country_ID
    const expertUsersIdsCountry = await getExpertCountryByCountryIdInsecure(
      Number(selectedCountry),
    );

    // 4. Match Experts where expertiseId = expert_expertise_ID
    if (typeof selectedItemsExpertise != 'undefined') {
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

      await pMap(selectedItemsExpertise, async (expertiseId: number) => {
        const result =
          await getExpertExpertiseByExpertiseIdInsecure(expertiseId);

        return {
          expertiseId: expertiseId,
          expertUserIds: result.map((expert) => expert.expertUserId),
        };
      });

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

      // 6. Extract expertUserId from each entry in expertUsersIdsCountry and store in a new array
      const expertUsersIdsCountryList = expertUsersIdsCountry.map((entry) => {
        return entry.expertUserId;
      });

      // 7. Map over resultArray to add matching percentage and country match information
      resultArrayWithPercent = resultArray.map((entry) => {
        return {
          expertUserId: Number(entry.expertUserId),
          expertiseIds: Array<number>(entry.expertiseIds),
          // Calculate matching percentage based on the number of expertiseIds
          matchingPercent: Number(
            (100 * entry.expertiseIds.length) / selectedItemsExpertise.length,
          ), // .toFixed(2),
          // Check if expertUserId is in expertUsersIdsCountryList
          matchingCountry: expertUsersIdsCountryList.includes(
            entry.expertUserId,
          ),
        };
      });
    }
    // I was expecting a type matching  { resultArrayWithPercent: { expertUserId: number; expertiseIds: number[]; matchingPercent: number; matchingCountry: boolean; } | undefined; }, but instead you passed                  { resultArrayWithPercent: { expertUserId: any; expertiseIds: any; matchingPercent: string; matchingCountry: boolean; }[] | undefined; }.

    // I was expecting a type matching { resultArrayWithPercent: { expertUserId: number; expertiseIds: number[]; matchingPercent: number; matchingCountry: boolean; } | undefined; }, but instead you passed                 { resultArrayWithPercent: { expertUserId: number; expertiseIds: number[]; matchingPercent: string; matchingCountry: boolean; }[] | undefined; }.

    // I was expecting a type matching { expertUserId: number; expertiseIds: number[]; matchingPercent: number; matchingCountry: boolean; } | undefined, but instead you passed                             { expertUserId: number; expertiseIds: number[]; matchingPercent: number; matchingCountry: boolean; }[] | undefined.
    // 8. Set cookie with searchParams
    cookies().set({
      name: 'searchParams',
      value: JSON.stringify(resultArrayWithPercent),
      ...secureCookieOptions, // Convert to JSON string
    });

    return NextResponse.json({ resultArrayWithPercent });
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
