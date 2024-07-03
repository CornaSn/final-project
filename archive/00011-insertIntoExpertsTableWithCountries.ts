import { Sql } from 'postgres';

const expertCountries = [
  { id: 1, expertId: 1, countryId: 4 },
  { id: 2, expertId: 1, countryId: 2 },
  { id: 3, expertId: 5, countryId: 66 },
  { id: 4, expertId: 4, countryId: 5 },
  { id: 5, expertId: 2, countryId: 20 },
];

export async function up(sql: Sql) {
  for (const expertCountry of expertCountries) {
    await sql`
      INSERT INTO
        expert_countries (expert_id, country_id)
      VALUES
        (
          NULL,
          ${expertCountry.countryId}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const expertCountry of expertCountries) {
    await sql`
      DELETE FROM expert_countries
      WHERE
        id = ${expertCountry.id}
    `;
  }
}
