import { Sql } from 'postgres';

export type Language = {
  language: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE languages (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      language varchar(20) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE languages`;
}
