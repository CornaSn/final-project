import { cache } from 'react';
import { sql } from '../database/connect';
import {
  Expert,
  ExpertUser,
  ExpertUserWithChoices,
} from '../migrations/00002-createExpertsTable';

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
export const getExpertByIdInsecure = cache(async (id: number) => {
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
  const experts = await sql<ExpertUser[]>`
    SELECT
      users.first_name,
      users.last_name,
      users.email,
      users.is_expert,
      users.created_at,
      users.updated_at,
      experts.*
    FROM
      users
      JOIN experts ON (
        users.id = experts.user_id
        AND users.is_expert = TRUE
      )
  `;
  // console.log('Query result:', experts);
  return experts;
});

// console.log('getAllExpertWithUserInfo', getAllExpertsWithUserInfoInsecure());

// Function to get a single expert with user information by ID
export const getExpertByIdWithUserInfoInsecure = cache(async (id: number) => {
  const [expert] = await sql<ExpertUser[]>`
    SELECT
      users.first_name AS "firstName",
      users.last_name AS "lastName",
      users.email,
      users.is_expert AS "isExpert",
      users.created_at AS "createdAt",
      users.updated_at AS "updatedAt",
      experts.id,
      experts.age,
      experts.city,
      experts.bio,
      experts.picture_url AS "pictureUrl",
      experts.video_url AS "videoUrl",
      experts.travel_blog_url AS "travelBlogUrl",
      experts.user_id AS "userId"
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

// Function to get user, who is expert and has an valid session
export const getExpertWithUserById = cache(
  async (sessionToken: string, userId: number) => {
    const expert = await sql<Expert[]>`
      SELECT
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
      // Check if an entry with the same user_id already exists
      const existingExpert = await sql<Expert[]>`
        SELECT
          *
        FROM
          experts
        WHERE
          user_id = ${userId}
      `;

      if (existingExpert.length > 0) {
        throw new Error('!!!=====> An entry with this user_id already exists');
      }

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
      return expert;
    } catch (error: any) {
      // console.error(error.message);
      // console.error(error);
      // console.error('Error creating expert:', 'expert profile already exist');
      throw error; // Rethrow the error for further handling
    }
  },
);

// export const getExpertWithUserInfoAndChoicesInsecure = cache(
//   async (userId: number) => {
//     const experts = await sql<ExpertUserWithChoices[]>`
//       SELECT
//         users.first_name,
//         users.last_name,
//         users.email,
//         users.is_expert,
//         users.created_at,
//         users.updated_at,
//         experts.bio,
//         expert_countries.country_id,
//         countries.country_name,
//         expert_languages.language_id,
//         languages.language,
//         expert_expertise.expertise_id,
//         expertise.expertise_name
//       FROM
//         users
//         JOIN experts ON users.id = experts.user_id
//         LEFT JOIN expert_countries ON experts.user_id = expert_countries.expert_user_id
//         LEFT JOIN countries ON expert_countries.country_id = countries.id
//         LEFT JOIN expert_languages ON experts.user_id = expert_languages.expert_user_id
//         LEFT JOIN languages ON expert_languages.language_id = languages.id
//         LEFT JOIN expert_expertise ON experts.user_id = expert_expertise.expert_user_id
//         LEFT JOIN expertise ON expert_expertise.expertise_id = expertise.id
//       WHERE
//         users.id = ${userId}
//         AND users.is_expert = TRUE
//     `;
//     console.log('========================================= experts', experts);
//     return experts;
//   },
// );

export const getAllExpertUserInformationByUserIdInsecure = cache(
  async (id: number) => {
    const [expert] = await sql<ExpertUserWithChoices[]>`
      SELECT
        USER.id AS user_id,
        USER.first_name AS user_first_name,
        USER.last_name AS USER.last_name
        -- Return empty array instead of [null] if no country is found
        coalesce(
          json_agg(countries.*) FILTER (
            WHERE
              country.id IS NOT NULL
          ),
          '[]'
        ) AS expert_countries
      FROM
        users
        LEFT JOIN expert_countries ON experts.user_id = expert_countries.expert_user_id
        LEFT JOIN countries ON expert_countries.country_id = countries.id
      WHERE
        users.id = ${id}
      GROUP BY
        users.first_name,
        users.last_name,
        users.id
    `;
    console.log(
      '================================================EXPERT',
      expert,
    );
    return expert;
  },
);
