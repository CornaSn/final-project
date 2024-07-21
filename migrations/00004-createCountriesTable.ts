import { Sql } from 'postgres';

export type Country = {
  id: number;
  countryName: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE countries (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      country_name varchar(30) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE countries`;
}
