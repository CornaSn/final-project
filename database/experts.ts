import { cache } from 'react';
import { sql } from '../database/connect';
import { User } from '../migrations/00000-createUsersTable';
import {
  Expert,
  ExpertUser,
  ExpertUserWithChoices,
} from '../migrations/00002-createExpertsTable';
import { getExpertCountryInsecure } from './countriesList';
import { getExpertExpertiseInsecure } from './expertiseList';
import { getExpertLanguagesInsecure } from './languageList';
import { getUserByIdInsecure } from './users';

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

  // console.log('expert', expert);
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

export const getExpertUserWithChoicesInsecure = cache(async (id: number) => {
  const expertChoices = {} as ExpertUserWithChoices;

  const countryList = await getExpertCountryInsecure(id);
  const countryNameList: string[] = countryList.map((entry) => {
    return entry.countryname;
  });

  const languageList = await getExpertLanguagesInsecure(id);
  const languageNameList: string[] = languageList.map((entry) => {
    return entry.languagename;
  });

  const expertiseList = await getExpertExpertiseInsecure(id);
  const expertiseNameList: string[] = expertiseList.map((entry) => {
    return entry.expertisename;
  });

  expertChoices.userId = id;
  console.log('#############################################');
  console.log('#############################################');
  console.log('#############################################');
  console.log('test userId', id);
  console.log('#############################################');
  console.log('#############################################');
  console.log('#############################################');

  expertChoices.countryName = countryNameList;
  expertChoices.languageName = languageNameList;
  expertChoices.expertiseName = expertiseNameList;
  console.log('*********expertChoices', expertChoices);

  const expertInfo = await getExpertByIdInsecure(id);
  if (typeof expertInfo?.bio === 'string') {
    expertChoices.bio = expertInfo.bio;
  }
  console.log('test1 expertInfo BIO------------------------', expertInfo);

  if (typeof expertInfo?.city === 'string') {
    expertChoices.city = expertInfo.city;
  }
  // console.log('test1 expertInfo city------------------------', expertInfo);

  if (typeof expertInfo?.age == 'string') {
    expertChoices.age = expertInfo.age;
  }
  console.log('test1 expertInfo Age------------------------', expertInfo);

  const userInfo = await getUserByIdInsecure(id);
  if (typeof userInfo?.firstName === 'string') {
    expertChoices.firstName = userInfo.firstName;
    console.log(
      'test1 expertInfo firstname------------------------',
      expertInfo,
    );
  }

  if (typeof userInfo?.lastName === 'string') {
    expertChoices.lastName = userInfo.lastName;
  }
  // console.log('test1 expertInfo lastname------------------------', expertInfo);

  // console.log(
  //   'test1 expertInfo expertChoices------------------------',
  //   expertChoices,
  // );

  return expertChoices;
});

type AllExpertListType = { userId: number };

export const getAllExpertUserWithChoicesInsecure = cache(async () => {
  const allExpertIds = await sql<AllExpertListType[]>`
    SELECT
      experts.user_id
    FROM
      experts
  `;

  return Promise.all(
    allExpertIds.map(async (entry) => {
      console.log('entry####################################', entry);
      console.log('typeof entry.userId', typeof entry.userId);
      return await getExpertUserWithChoicesInsecure(entry.userId);
    }),
  );
});

// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************
// *****************************************************************************

type AllExpertUserInfoWithAllChoices = {
  firstName: string;
  lastName: string;
  email: string;
  isExpert: boolean;
  createdAt: Date;
  updatedAt: Date;
  expertId: number;
  // age: string | null;
  // city: string | null;
  // bio: string | null;
  // pictureUrl: string | null;
  // videoUrl: string | null;
  // travelBlogUrl: string | null;
  countriesId: number[];
  // countryNames: string[];
  // languagesId: number[];
  // languageNames: string[];
  // expertiseAreasId: number[];
  // expertiseNames: string[];
};

// export const getAllExpertInfosWithChoicesInsecure = cache(
//   async (id: number) => {
//     const [user] = await sql<AllExpertUserInfoWithAllChoices[]>`
//       SELECT
//         users.id AS user_id,
//         users.first_name AS user_first_name,
//         users.last_name AS user_last_name,
//         users.email AS user_email,
//         users.is_expert AS user_is_expert,
//         users.created_at AS user_created_at,
//         users.updated_at AS user_updated_at,
//         coalesce(
//           json_agg(countries.*) FILTER (
//             WHERE
//               country_id IS NOT NULL
//           ),
//           '[]'
//         ) AS expert_user_country_ids
//       FROM
//         users
//         LEFT JOIN expert_countries ON users.id = expert_countries.expert_user_id
//         LEFT JOIN countries ON countries.id = expert_countries.country_id
//       WHERE
//         users.id = ${id}
//       GROUP BY
//         users.id,
//         users.first_name
//     `;

//     console.log(
//       '--------------------------------------USER---------------------------------',
//     );
//     console.log(
//       '--------------------------------------USER---------------------------------',
//     );
//     console.log(
//       '--------------------------------------USER---------------------------------',
//     );
//     console.log(user);

//     return user;
//   },
// );
