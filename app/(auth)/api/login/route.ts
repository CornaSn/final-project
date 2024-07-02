import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createSessionInsecure } from '../../../../database/sessions';
import { getUserWithPasswordHashInsecure } from '../../../../database/users';
import {
  User,
  userSchema,
} from '../../../../migrations/00000-createUsersTable';
import { secureCookieOptions } from '../../../../util/cookies';

export type LoginResponseBodyPost =
  | {
      user: Pick<User, 'id'>;
    }
  | {
      errors: {
        message: string;
      }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponseBodyPost>> {
  // 1. Get the user data from the request
  const body = await request.json();

  // Convert email to lowercase if it's present in the body
  if (body && body.email) {
    body.email = body.email.toLowerCase();
  }
  //  console.log('body', body);

  // 2. Validate the user data with zod Schema
  const result = userSchema.safeParse(body);
  // console.log('result', result);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 3. verify the user credentials
  const userWithPasswordHash = await getUserWithPasswordHashInsecure(
    result.data.email,
  );
  // console.log('userWithPasswordHash', userWithPasswordHash);

  if (!userWithPasswordHash) {
    return NextResponse.json(
      { errors: [{ message: 'Email or Password not valid' }] },
      {
        status: 500,
      },
    );
  }
  // 4. Validate the user password by comparing with hashed password
  const passwordHash = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );
  if (!passwordHash) {
    return NextResponse.json(
      { errors: [{ message: 'Email or Password not valid' }] },
      {
        status: 500,
      },
    );
  }
  // console.log('passwordHash', passwordHash);

  // 5. Create a token
  const token = crypto.randomBytes(100).toString('base64');
  // console.log('token', token);

  // 6. Create Session record
  const session = await createSessionInsecure(token, userWithPasswordHash.id);
  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'Session creation failed' }] },
      {
        status: 401,
      },
    );
  }
  // console.log('sessions', sessions);

  //  7. Send new cookie to the header
  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  return NextResponse.json({
    user: {
      email: userWithPasswordHash.id,
    },
  });
}
