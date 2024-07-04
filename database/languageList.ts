import { cache } from 'react';
import { sql } from '../database/connect';
import { Language } from '../migrations/00006-createLanguagesTable';

// Get whole list of areas
export const getLanguageListInsecure = cache(async () => {
  const languages = await sql<Language[]>`
    SELECT
      *
    FROM
      languages
  `;

  return languages;
});
