import { cache } from 'react';
import { sql } from '../database/connect';
import { User } from '../migrations/00000-createUserTable';

// Get whole database information
export const getUsersInsecure = cache(async () => {
  const users = await sql<User[]>`
    SELECT
      *
    FROM
      users
  `;

  return users;
});

// Get single user information from database
export const getUserInsecure = cache(async (id: number) => {
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
  `;

  return user;
});

console.log(getUsersInsecure());
