import { cache } from 'react';
import { sql } from '../database/connect';
import {
  User,
  UserWithPasswordHash,
} from '../migrations/00000-createUsersTable';

export const createUserInsecure = cache(
  async (
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    isExpert: boolean,
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (
          first_name,
          last_name,
          email,
          password_hash,
          is_expert
        )
      VALUES
        (
          ${firstName},
          ${lastName},
          ${email},
          ${passwordHash},
          ${isExpert}
        )
      RETURNING
        users.first_name,
        users.last_name,
        users.id,
        users.email,
        users.is_expert
    `;

    return user;
  },
);

export const getUser = cache(async (sessionToken: string) => {
  const [user] = await sql<User[]>`
    SELECT
      users.first_name AS firstname,
      users.last_name AS lastname,
      users.is_expert AS isexpert
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND users.id = sessions.user_id
        AND expiry_timestamp > now()
      )
  `;
  // console.log('User', user);
  return user;
});

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
      email = ${email.toLowerCase()}
  `;
  return user;
});

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

export const getUserByIdInsecure = cache(async (userId: number) => {
  const [user] = await sql<User[]>`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${userId}
  `;
  return user;
});
