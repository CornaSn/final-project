import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../../../database/connect';
import { createSessionInsecure } from '../../../../database/sessions';
import {
  createUserInsecure,
  getUserInsecure,
} from '../../../../database/users';
import {
  User,
  userSchema,
} from '../../../../migrations/00000-createUsersTable';
import { secureCookieOptions } from '../../../../util/cookies';

export type RegisterResponseBodyPost =
  | {
      user: User;
    }
  | {
      errors: {
        message: string;
      }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<RegisterResponseBodyPost>> {
  // 1. Get the user data from the request
  const body = await request.json();
  // console.log('body', body);
  // body {
  // role: 'Member',
  // firstName: 'corn',
  // lastName: 'corn',
  // email: 'corn@gmail.com',
  // password: 'corn12345'
  // }

  // 2. Validate the user data with zod Schema
  const result = userSchema.safeParse(body);
  // console.log('result', result);
  // result {
  //   success: true,
  //   data: {
  //     firstName: 'corn',
  //     lastName: 'corn',
  //     email: 'corn@gmail.com',
  //     password: 'corn12345'
  //   }
  // }

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 3. Check if user already exists in the database
  const user = await getUserInsecure(result.data.email);
  if (user) {
    return NextResponse.json(
      {
        errors: [{ message: 'User with this email already exists' }],
      },
      { status: 400 },
    );
  }
  // console.log('user', user);
  // user undefined if it doesn't exists yet

  // Confirm password

  // 4. Hash the plain password from the user
  const passwordHash = await bcrypt.hash(result.data.password, 12);
  // At this stage we don't want to know anymore the users password, only the hashpassword will be saved in the database
  // console.log('Information', result.data.password, passwordHash);

  // 5. Save the user information with the hashed password in the database
  const newUser = await createUserInsecure(
    result.data.firstName,
    result.data.lastName,
    result.data.email,
    passwordHash,
    result.data.role !== 'member',
  );

  if (!newUser) {
    return NextResponse.json(
      { errors: [{ message: 'Registration failed' }] },
      {
        status: 500,
      },
    );
  }
  // console.log('New User', newUser);
  // New User {
  //   firstName: 'test2',
  //   lastName: 'test2',
  //   id: 16,
  //   email: 'test22@gmail.com'
  // }

  // // 6. Determine if the user is an expert
  // const isExpert = result.data.role !== 'member';
  // console.log('isExpert', isExpert);

  // if (isExpert) {
  //   await sql<{ id: number }[]>`
  //     INSERT INTO
  //       experts (user_id)
  //     VALUES
  //       (
  //         ${newUser.id}
  //       )
  //     RETURNING
  //       id
  //   `;
  // }

  // 7. Create a token
  const token = crypto.randomBytes(100).toString('base64');
  // console.log('token', token);

  // 8. Create Session record
  const session = await createSessionInsecure(token, newUser.id);
  if (!session) {
    return NextResponse.json(
      { errors: [{ message: 'Session creation failed' }] },
      {
        status: 401,
      },
    );
  }
  // console.log('session', session);

  //  9. Send new cookie to the header
  cookies().set({
    name: 'sessionToken',
    value: session.token,
    ...secureCookieOptions,
  });

  // console.log('newUser', newUser);
  return NextResponse.json({ user: newUser });
}
