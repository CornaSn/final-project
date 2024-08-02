import { Sql } from 'postgres';

export type UserWithFavoriteExperts = {
  id: number;
  userId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE favorites (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer NOT NULL REFERENCES experts (user_id) ON DELETE cascade
    )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE favorites`;
}
