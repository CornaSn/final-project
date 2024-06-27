import { cache } from 'react';
import { sql } from '../database/connect';
import {
  User,
  UserWithPasswordHash,
} from '../migrations/00000-createUsersTable';

// Get whole database information
export const getUsersInsecure = cache(async (email: string) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      first_name,
      last_name,
      email,
      is_expert,
      created_at,
      updated_at
    FROM
      users
    WHERE
      email = ${email}
  `;

  return user;
});

export const createUserInsecure = cache(
  async (email: string, passwordHash: string) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (email, password_hash)
      VALUES
        (
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

export const getUserWithPasswordHashInsecure = cache(async (email: string) => {
  const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      email = ${email.toLowerCase()}
  `;
  return user;
});
