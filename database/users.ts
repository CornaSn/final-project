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
        users.id,
        users.first_name,
        users.last_name,
        users.email,
        users.is_expert,
        users.created_at,
        users.updated_at
    `;

    return user;
  },
);

//  TS Error because of Date!!!
export const getUser = cache(async (sessionToken: string) => {
  const [user] = await sql<User[]>`
    SELECT
      users.id AS id,
      users.first_name AS first_name,
      users.last_name AS last_name,
      users.email AS email,
      users.is_expert AS is_expert,
      users.created_at AS created_at,
      users.updated_at AS updated_at
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND users.id = sessions.user_id
        AND expiry_timestamp > now()
      )
  `;
  return user;
});

export const getUserSession = cache(async (sessionToken: string) => {
  const [user] = await sql<Pick<User, 'email'>[]>`
    SELECT
      users.email
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND users.id = sessions.user_id
        AND expiry_timestamp > now()
      )
  `;
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
      id = ${userId}
  `;
  return user;
});

export const deleteUser = cache(
  async (sessionToken: string, userId: number) => {
    try {
      await sql`
        DELETE FROM users USING sessions
        WHERE
          sessions.token = ${sessionToken}
          AND sessions.expiry_timestamp > now()
          AND users.id = ${userId}
      `;

      return true; // Return the true user was deleted
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Could not delete user');
    }
  },
);
