import { cache } from 'react';
import { sql } from '../database/connect';
import { Users } from '../migrations/00000-createUserTable';

// Get whole database information
export const getUsersInsecure = cache(async () => {
  const users = await sql<Users[]>`
    SELECT
      *
    FROM
      users
  `;

  return users;
});
