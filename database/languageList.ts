import { cache } from 'react';
import { sql } from '../database/connect';
import { Language } from '../migrations/00006-createLanguagesTable';
import { ExpertWithLanguages } from '../migrations/00012-createExpertTableWithLanguages';

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

export const findLanguageIdInsecure = cache(async (languageName: string) => {
  const [languageId] = await sql<Pick<Language, 'id'>[]>`
    SELECT
      id
    FROM
      languages
    WHERE
      language = ${languageName}
  `;
  return languageId;
});

export const insertExpertLanguageInsecure = cache(
  async (languageId: number, userId: number) => {
    const [c] = await sql<ExpertWithLanguages[]>`
      INSERT INTO
        expert_languages (expert_id, language_id)
      VALUES
        (
          ${userId},
          ${languageId}
        )
      RETURNING
        expert_languages.id,
        expert_languages.expert_id,
        expert_languages.language_id
    `;
    return c;
  },
);
