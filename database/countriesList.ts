import { cache } from 'react';
import { sql } from '../database/connect';
import { Country } from '../migrations/00004-createCountriesTable';
import {
  ExpertWithCountries,
  ExpertWithCountriesName,
} from '../migrations/00010-createExpertsTableWithCountries';

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
    const [expertWithCountries] = await sql<ExpertWithCountries[]>`
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
    return expertWithCountries;
  },
);

export const getExpertCountryInsecure = cache(
  async (expert_user_id: number) => {
    const expertCountries = await sql<ExpertWithCountriesName[]>`
      SELECT
        expert_countries.country_id AS countryid,
        countries.country_name AS countryname
      FROM
        expert_countries
        INNER JOIN countries ON expert_countries.country_id = countries.id
      WHERE
        expert_countries.expert_user_id = ${expert_user_id}
    `;
    return expertCountries;
  },
);

export const getExpertCountryByCountryIdInsecure = cache(
  async (country_id: number) => {
    const expertUsersIdsCountry = await sql<
      Pick<ExpertWithCountries, 'expertUserId'>[]
    >`
      SELECT
        expert_user_id
      FROM
        expert_countries
      WHERE
        country_id = ${country_id}
    `;
    return expertUsersIdsCountry;
  },
);
