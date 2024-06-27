import { Sql } from 'postgres';

export type ExpertWithExpertise = {
  id: number;
  expertId: number;
  expertExpertise: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE expert_expertise (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      expert_id integer NOT NULL REFERENCES experts (id) ON DELETE cascade,
      expertise_id integer NOT NULL REFERENCES expertise (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE expert_expertise `;
}
