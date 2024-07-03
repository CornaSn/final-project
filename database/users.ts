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
      email = ${email.toLowerCase()}
  `;
  return user;
});

// export const createUserInsecure = cache(
//   async (
//     firstName: string,
//     lastName: string,
//     email: string,
//     role: string,
//     passwordHash: string,
//   ) => {
//     // Convert isExpert from text to boolean
//     const isExpert = role !== 'member';

//     const [user] = await sql<User[]>`
//       INSERT INTO
//         users (
//           first_name,
//           last_name,
//           email,
//           password_hash,
//           is_expert
//         )
//       VALUES
//         (
//           ${firstName},
//           ${lastName},
//           ${email},
//           ${passwordHash},
//           ${isExpert}
//         )
//       RETURNING
//         users.first_name,
//         users.last_name,
//         users.id,
//         users.email,
//         users.is_expert
//     `;
//     if (!user) {
//       throw new Error('User creation failed');
//     }

//     if (isExpert) {
//       await sql`
//         INSERT INTO
//           experts (user_id)
//         VALUES
//           (
//             ${user.id}
//           )
//         RETURNING
//           id
//       `;
//     }
//     console.log('isExpert', isExpert);
//     console.log('user', user);
//     return user;
//   },
// );

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
