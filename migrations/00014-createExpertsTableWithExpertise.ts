import { Sql } from 'postgres';

export type ExpertWithExpertise = {
  id: number;
  expertUserId: number;
  expertiseId: number;
};

export type ExpertWithExpertiseName = {
  expertiseid: number;
  expertisename: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE expert_expertise (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      expert_user_id integer NOT NULL REFERENCES experts (user_id) ON DELETE cascade,
      expertise_id integer NOT NULL REFERENCES expertise (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE expert_expertise `;
}
