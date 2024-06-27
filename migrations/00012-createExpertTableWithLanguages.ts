import { Sql } from 'postgres';

export type ExpertWithLanguages = {
  id: number;
  expertId: number;
  expertLanguages: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE expert_languages (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      expert_id integer NOT NULL REFERENCES experts (id) ON DELETE cascade,
      language_id integer NOT NULL REFERENCES languages (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE expert_languages `;
}
