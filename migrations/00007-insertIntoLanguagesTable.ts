import { Sql } from 'postgres';
import { Language } from './00006-createLanguagesTable';

const languages: Language[] = [
  { id: 1, language: 'Arabic' },
  { id: 1, language: 'Bengali' },
  { id: 1, language: 'Chinese' },
  { id: 1, language: 'Czech' },
  { id: 1, language: 'Danish' },
  { id: 1, language: 'Dutch' },
  { id: 1, language: 'English' },
  { id: 1, language: 'Finnish' },
  { id: 1, language: 'French' },
  { id: 1, language: 'German' },
  { id: 1, language: 'Greek' },
  { id: 1, language: 'Hebrew' },
  { id: 1, language: 'Hindi' },
  { id: 1, language: 'Hungarian' },
  { id: 1, language: 'Indonesian' },
  { id: 1, language: 'Italian' },
  { id: 1, language: 'Japanese' },
  { id: 1, language: 'Javanese' },
  { id: 1, language: 'Korean' },
  { id: 1, language: 'Malay' },
  { id: 1, language: 'Marathi' },
  { id: 1, language: 'Norwegian' },
  { id: 1, language: 'Persian' },
  { id: 1, language: 'Polish' },
  { id: 1, language: 'Portuguese' },
  { id: 1, language: 'Romanian' },
  { id: 1, language: 'Russian' },
  { id: 1, language: 'Slovak' },
  { id: 1, language: 'Spanish' },
  { id: 1, language: 'Swedish' },
  { id: 1, language: 'Swahili' },
  { id: 1, language: 'Thai' },
  { id: 1, language: 'Turkish' },
  { id: 1, language: 'Ukrainian' },
  { id: 1, language: 'Vietnamese' },
];

export async function up(sql: Sql) {
  for (const language of languages) {
    await sql`
      INSERT INTO
        languages (language)
      VALUES
        (
          ${language.language}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const language of languages) {
    await sql`
      DELETE FROM languages
      WHERE
        id = ${language.id}
    `;
  }
}
