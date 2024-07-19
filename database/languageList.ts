import { cache } from 'react';
import { sql } from '../database/connect';
import { Language } from '../migrations/00006-createLanguagesTable';
import {
  ExpertWithLanguageName,
  ExpertWithLanguages,
} from '../migrations/00012-createExpertTableWithLanguages';

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
  async (languageId: number, expertUserId: number) => {
    await sql`
      DELETE FROM expert_languages
      WHERE
        expert_languages.expert_user_id = ${expertUserId}
    `;
    const [expertWithLanguages] = await sql<ExpertWithLanguages[]>`
      INSERT INTO
        expert_languages (expert_user_id, language_id)
      VALUES
        (
          ${expertUserId},
          ${languageId}
        )
      RETURNING
        expert_languages.id,
        expert_languages.expert_user_id,
        expert_languages.language_id
    `;
    return expertWithLanguages;
  },
);

export const getExpertLanguagesInsecure = cache(async (id: number) => {
  const expertLanguages = await sql<ExpertWithLanguageName[]>`
    SELECT
      expert_languages.language_id AS languageid,
      languages.language AS languagename
    FROM
      expert_languages
      INNER JOIN languages ON expert_languages.language_id = languages.id
    WHERE
      expert_languages.expert_user_id = ${id}
  `;

  // console.log(
  //   '========================================= expertLanguages',
  //   expertLanguages,
  // );
  return expertLanguages;
});
