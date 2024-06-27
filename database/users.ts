import { cache } from 'react';
import { sql } from '../database/connect';
import {
  User,
  UserWithPasswordHash,
} from '../migrations/00000-createUsersTable';

export const getUserInsecure = cache(async (email: string) => {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.first_name,
      users.last_name,
      users.email,
      users.is_expert,
      users.created_at,
      users.updated_at
    FROM
      users
    WHERE
      email = ${email}
  `;
  return user;
});

export const createUserInsecure = cache(
  async (
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (
          first_name,
          last_name,
          email,
          password_hash
        )
      VALUES
        (
          ${firstName},
          ${lastName},
          ${email},
          ${passwordHash}
        )
      RETURNING
        users.id,
        users.email
    `;
    return user;
  },
);

// export const createUserInsecure = cache(async (email: string, passwordHash: string) => {
//   const [user] = await sql<UserWithPasswordHash[]>`
//     SELECT
//       *
//     FROM
//       users
//     WHERE
//       email = ${email}
//   `;
//   return user;
// });
