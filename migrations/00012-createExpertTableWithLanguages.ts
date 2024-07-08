import { Sql } from 'postgres';

export type ExpertWithLanguages = {
  id: number;
  expertUserId: number;
  languageId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE expert_languages (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      expert_user_id integer NOT NULL REFERENCES experts (user_id) ON DELETE cascade,
      language_id integer NOT NULL REFERENCES languages (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE expert_languages `;
}
