import { Sql } from 'postgres';

const expertLanguages = [
  { id: 1, expertId: 1, languageId: 4 },
  { id: 2, expertId: 1, languageId: 10 },
  { id: 3, expertId: 5, languageId: 20 },
  { id: 4, expertId: 4, languageId: 15 },
  { id: 5, expertId: 2, languageId: 3 },
];

export async function up(sql: Sql) {
  for (const expertLanguage of expertLanguages) {
    await sql`
      INSERT INTO
        expert_languages (expert_id, language_id)
      VALUES
        (
          ${expertLanguage.expertId},
          ${expertLanguage.languageId}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const expertLanguage of expertLanguages) {
    await sql`
      DELETE FROM expert_languages
      WHERE
        id = ${expertLanguage.id}
    `;
  }
}
