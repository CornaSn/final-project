import { Sql } from 'postgres';
import { Language } from './00006-createLanguageTable';

const languages: Language[] = [
  { language: 'Arabic' },
  { language: 'Bengali' },
  { language: 'Chinese' },
  { language: 'English' },
  { language: 'French' },
  { language: 'German' },
  { language: 'Gujarati' },
  { language: 'Hausa' },
  { language: 'Hindi' },
  { language: 'Indonesian' },
  { language: 'Italian' },
  { language: 'Japanese' },
  { language: 'Javanese' },
  { language: 'Kannada' },
  { language: 'Korean' },
  { language: 'Malay' },
  { language: 'Marathi' },
  { language: 'Oriya' },
  { language: 'Panjabi' },
  { language: 'Persian' },
  { language: 'Portuguese' },
  { language: 'Russian' },
  { language: 'Spanish' },
  { language: 'Swahili' },
  { language: 'Tamil' },
  { language: 'Telugu' },
  { language: 'Turkish' },
  { language: 'Urdu' },
  { language: 'Vietnamese' },
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
  await sql` DELETE FROM languages `;
}
