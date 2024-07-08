import { cache } from 'react';
import { sql } from '../database/connect';
import { Country } from '../migrations/00004-createCountriesTable';
import { ExpertWithCountries } from '../migrations/00010-createExpertsTableWithCountries';

// Get whole list of areas
export const getCountriesListInsecure = cache(async () => {
  const countries = await sql<Country[]>`
    SELECT
      *
    FROM
      countries
  `;

  return countries;
});

export const findCountryIdInsecure = cache(async (countryName: string) => {
  const [countryId] = await sql<Pick<Country, 'id'>[]>`
    SELECT
      id
    FROM
      countries
    WHERE
      country_name = ${countryName}
  `;
  return countryId;
});

export const insertExpertCountryInsecure = cache(
  async (countryId: number, userId: number) => {
    const [c] = await sql<ExpertWithCountries[]>`
      INSERT INTO
        expert_countries (expert_user_id, country_id)
      VALUES
        (
          ${userId},
          ${countryId}
        )
      RETURNING
        expert_countries.id,
        expert_countries.expert_user_id,
        expert_countries.country_id
    `;
    return c;
  },
);

// select expert_id from expert_countries where country_id in (1,15);
