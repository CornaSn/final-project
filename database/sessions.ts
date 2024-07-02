import { cache } from 'react';
import { Sessions } from '../migrations/00016-createSessionTable';
import { sql } from './connect';

export const createSessionInsecure = cache(
  async (token: string, userId: number) => {
    const [session] = await sql<Sessions[]>`
      INSERT INTO
        sessions (token, user_id)
      VALUES
        (
          ${token},
          ${userId}
        )
      RETURNING
        sessions.id,
        sessions.token,
        sessions.user_id
    `;

    await sql`
      DELETE FROM sessions
      WHERE
        expiry_timestamp < now()
    `;

    return session;
  },
);

export const deleteSession = cache(async (sessionToken: string) => {
  const [session] = await sql<Pick<Sessions, 'id' | 'token'>[]>`
    DELETE FROM sessions
    WHERE
      sessions.token = ${sessionToken}
    RETURNING
      sessions.id,
      sessions.token
  `;
  return session;
});

export const getValidSession = cache(async (sessionToken: string) => {
  const [session] = await sql<Pick<Sessions, 'id' | 'token'>[]>`
    SELECT
      sessions.id,
      sessions.token
    FROM
      sessions
    WHERE
      sessions.token = ${sessionToken}
      AND expiry_timestamp > now()
  `;
  return session;
});
