import { cache } from 'react';
import { sql } from '../database/connect';
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
      user_id = ${id}
  `;

  return user;
});

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
  return experts;
});

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

export const createOrUpdateExpert = cache(
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

      let expert;

      if (existingExpert.length > 0) {
        // Update the existing expert profile
        [expert] = await sql<Expert[]>`
          UPDATE experts
          SET
            age = ${newExpert.age},
            city = ${newExpert.city},
            bio = ${newExpert.bio},
            picture_url = ${newExpert.pictureUrl},
            video_url = ${newExpert.videoUrl},
            travel_blog_url = ${newExpert.travelBlogUrl}
          FROM
            sessions
          WHERE
            experts.user_id = ${userId}
            AND sessions.token = ${sessionToken}
            AND sessions.expiry_timestamp > now()
          RETURNING
            experts.*
        `;
      } else {
        // Insert the new expert profile
        [expert] = await sql<Expert[]>`
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
      }

      return expert;
    } catch (error: any) {
      console.error('Error creating or updating expert:', error.message);
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

  expertChoices.countryName = countryNameList;
  expertChoices.languageName = languageNameList;
  expertChoices.expertiseName = expertiseNameList;

  const expertInfo = await getExpertByIdInsecure(id);

  if (typeof expertInfo?.bio === 'string') {
    expertChoices.bio = expertInfo.bio;
  }
  if (typeof expertInfo?.id == 'number') {
    expertChoices.expertId = expertInfo.id;
  }
  if (typeof expertInfo?.city === 'string') {
    expertChoices.city = expertInfo.city;
  }

  if (typeof expertInfo?.age == 'string') {
    expertChoices.age = expertInfo.age;
  }
  if (typeof expertInfo?.videoUrl == 'string') {
    expertChoices.videoUrl = expertInfo.videoUrl;
  }
  if (typeof expertInfo?.pictureUrl == 'string') {
    expertChoices.pictureUrl = expertInfo.pictureUrl;
  }
  const userInfo = await getUserByIdInsecure(id);
  if (typeof userInfo?.firstName === 'string') {
    expertChoices.firstName = userInfo.firstName;
  }

  if (typeof userInfo?.lastName === 'string') {
    expertChoices.lastName = userInfo.lastName;
  }

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
      const expertUser = await getExpertUserWithChoicesInsecure(entry.userId);
      return expertUser;
    }),
  );
});
