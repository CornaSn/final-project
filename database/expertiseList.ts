import { cache } from 'react';
import { sql } from '../database/connect';
import { Expertise } from '../migrations/00008-createExpertiseTable';
import { ExpertWithExpertise } from '../migrations/00014-createExpertsTableWithExpertise';

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
  async (expertiseId: number, userId: number) => {
    const [c] = await sql<ExpertWithExpertise[]>`
      INSERT INTO
        expert_expertise (expert_id, expertise_id)
      VALUES
        (
          ${userId},
          ${expertiseId}
        )
      RETURNING
        expert_expertise.id,
        expert_expertise.expert_id,
        expert_expertise.expertise_id
    `;
    return c;
  },
);
