import { Sql } from 'postgres';

export type ExpertWithCountries = {
  id: number;
  expertId: number;
  countryId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE expert_countries (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      expert_id integer NOT NULL REFERENCES experts (user_id) ON DELETE cascade,
      country_id integer NOT NULL REFERENCES countries (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE expert_countries `;
}
