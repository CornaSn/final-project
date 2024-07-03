import { cache } from 'react';
import { sql } from '../database/connect';
import { Expert } from '../migrations/00002-createExpertsTable';

// Get whole database information
export const getExpertsInsecure = cache(async () => {
  const users = await sql<Expert[]>`
    SELECT
      *
    FROM
      experts
  `;

  return users;
});

// Get single user information from database
export const getExpertInsecure = cache(async (id: number) => {
  const [user] = await sql<Expert[]>`
    SELECT
      *
    FROM
      experts
    WHERE
      id = ${id}
  `;

  return user;
});

// console.log(getExpertsInsecure());

// Function to get all experts with user information
export const getAllExpertsWithUserInfoInsecure = cache(async () => {
  const experts = await sql<Expert[]>`
    SELECT
      users.first_name,
      users.last_name,
      users.email,
      users.is_expert,
      experts.*
    FROM
      users
      JOIN experts ON (
        users.id = experts.user_id
        AND users.is_expert = TRUE
      )
  `;
  console.log('Query result:', experts);
  return experts;
});

// console.log('getAllExpertWithUserInfo', getAllExpertsWithUserInfoInsecure());

// Function to get a single expert with user information by ID
export const getExpertByIdWithUserInfoInsecure = cache(async (id: number) => {
  const [expert] = await sql<Expert[]>`
    SELECT
      users.first_name,
      users.last_name,
      users.email,
      users.is_expert,
      experts.*
    FROM
      users
      JOIN experts ON (
        users.id = experts.user_id
        AND users.is_expert = TRUE
      )
    WHERE
      experts.id = ${id}
  `;

  console.log('expert', expert);
  return expert;
});

// Example usage
// console.log(await getExpertByIdWithUserInfo(1)); // Get expert with ID 1 and user info

// export const getAllExpertsWithUser = cache(async (sessionToken: string) => {
//   const experts = await sql<Expert[]>`
//     SELECT
//       users.first_name,
//       users.last_name,
//       users.email,
//       users.is_expert,
//       experts.*
//     FROM
//       users
//       INNER JOIN experts ON users.id = experts.user_id
//       INNER JOIN sessions ON users.id = sessions.user_id
//     WHERE
//       sessions.token = ${sessionToken}
//       AND sessions.expiry_timestamp > now()
//       AND users.is_expert = TRUE
//   `;
//   console.log('Query result:', experts);
//   return experts;
// });

// console.log('getAllExpertsWithUserInfo', getAllExpertsWithUserInfoInsecure());

// Function to get user, who is expert and has an valid session
export const getExpertWithUserById = cache(
  async (sessionToken: string, userId: number) => {
    const expert = await sql<Expert[]>`
      SELECT
        users.first_name,
        users.last_name,
        users.email,
        users.is_expert,
        experts.*
      FROM
        users
        INNER JOIN experts ON users.id = experts.user_id
        INNER JOIN sessions ON users.id = sessions.user_id
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND users.is_expert = TRUE
        AND users.id = ${userId}
    `;
    // console.log('Query result ExpertbyId:', expert);
    return expert;
  },
);

export const createExpert = cache(
  async (
    sessionToken: string,
    userId: number,
    newExpert: Omit<Expert, 'id'>,
  ) => {
    try {
      // // Check if an entry with the same user_id already exists
      // const existingExpert = await sql<Expert[]>`
      //   SELECT
      //     *
      //   FROM
      //     experts
      //   WHERE
      //     user_id = ${userId}
      // `;

      // if (existingExpert.length > 0) {
      //   throw new Error('An entry with this user_id already exists');
      // }

      // Proceed with inserting the new expert profile
      const [expert] = await sql<Expert[]>`
        INSERT INTO
          experts (
            age,
            city,
            bio,
            picture_url,
            video_url,
            travel_blog_url,
            user_id
          )
        SELECT
          ${newExpert.age},
          ${newExpert.city},
          ${newExpert.bio},
          ${newExpert.pictureUrl},
          ${newExpert.videoUrl},
          ${newExpert.travelBlogUrl},
          ${userId}
        FROM
          sessions
        WHERE
          token = ${sessionToken}
          AND sessions.expiry_timestamp > now()
        RETURNING
          experts.*
      `;

      console.log('New Expert Created:', expert);

      return expert;
    } catch (error) {
      console.error('Error creating expert:', 'expertProfil already exist');
      throw error; // Rethrow the error for further handling
    }
  },
);
