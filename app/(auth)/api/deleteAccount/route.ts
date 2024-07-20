import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { deleteSession } from '../../../../database/sessions';
import { deleteUser, getUser } from '../../../../database/users';
import { User } from '../../../../migrations/00000-createUsersTable';

export type UserResponseBodyDelete =
  | {
      user: User;
    }
  | {
      errors: {
        message: string;
      }[];
    };

export async function DELETE(
  request: Request,
): Promise<NextResponse<UserResponseBodyDelete>> {

  const sessionCookie = cookies().get('sessionToken');
  if (sessionCookie !== undefined) {
    const user = await getUser(sessionCookie.value);

    if (user !== undefined) {
      await deleteUser(sessionCookie.value, user.id);
      await deleteSession(sessionCookie.value);

      cookies().delete('sessionToken');
      cookies().delete('searchParams');
    } else {
      console.log('User undefined!');
    }

    if (!user) {
      return NextResponse.json(
        { errors: [{ message: 'Deleting Account failed' }] },
        {
          status: 401,
        },
      );
    }
    return NextResponse.json({ user: user });
  } else {
    return NextResponse.json({
      errors: [{ message: 'Deleting Account failed' }],
    });
  }
}
