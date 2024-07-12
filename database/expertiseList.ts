import { cache } from 'react';
import { sql } from '../database/connect';
import { Expertise } from '../migrations/00008-createExpertiseTable';
import {
  ExpertWithExpertise,
  ExpertWithExpertiseName,
} from '../migrations/00014-createExpertsTableWithExpertise';

// Get whole list of areas
export const getExpertiseListInsecure = cache(async () => {
  const expertise = await sql<Expertise[]>`
    SELECT
      *
    FROM
      expertise
  `;

  return expertise;
});

export const findExpertiseIdInsecure = cache(async (expertiseName: string) => {
  const [expertiseId] = await sql<Pick<Expertise, 'id'>[]>`
    SELECT
      id
    FROM
      expertise
    WHERE
      expertise_name = ${expertiseName}
  `;

  return expertiseId;
});

export const insertExpertExpertiseInsecure = cache(
  async (expertiseId: number, expertUserId: number) => {
    const [c] = await sql<ExpertWithExpertise[]>`
      INSERT INTO
        expert_expertise (expert_user_id, expertise_id)
      VALUES
        (
          ${expertUserId},
          ${expertiseId}
        )
      RETURNING
        expert_expertise.id,
        expert_expertise.expert_user_id,
        expert_expertise.expertise_id
    `;
    return c;
  },
);

export const getExpertExpertiseInsecure = cache(async (id: number) => {
  const expertExpertise = await sql<ExpertWithExpertiseName[]>`
    SELECT
      expert_expertise.expertise_id AS expertiseid,
      expertise.expertise_name AS expertisename
    FROM
      expert_expertise
      INNER JOIN expertise ON expert_expertise.expertise_id = expertise.id
    WHERE
      expert_expertise.expert_user_id = ${id}
  `;

  return expertExpertise;
});

export const getExpertExpertiseByExpertiseIdInsecure = cache(
  async (expertiseId: number) => {
    const expertUsersIdsExpertise = await sql<
      Omit<ExpertWithExpertise, 'id'>[]
    >`
      SELECT
        expertise_id,
        expert_user_id
      FROM
        expert_expertise
      WHERE
        expertise_id = ${expertiseId}
    `;
    return expertUsersIdsExpertise;
  },
);

export const getExpertIdByExpertiseIdInsecure = cache(
  async (expertiseId: number) => {
    const expertUsersIdsExpertise = await sql<
      Pick<ExpertWithExpertise, 'expertUserId'>[]
    >`
      SELECT
        expert_user_id
      FROM
        expert_expertise
      WHERE
        expertise_id = ${expertiseId}
    `;
    return expertUsersIdsExpertise;
  },
);
