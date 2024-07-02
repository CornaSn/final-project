import { NextRequest, NextResponse } from 'next/server';
import { Expert } from '../../../migrations/00002-createExpertsTable';

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
  // 1. Get the user data from the request
  const body = await request.json();
  console.log('body', body);

  return NextResponse.json({ expert: 'something' });
}
