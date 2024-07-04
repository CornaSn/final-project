import { cache } from 'react';
import { sql } from '../database/connect';
import { Expertise } from '../migrations/00008-createExpertiseTable';

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
