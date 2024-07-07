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

// TODO?? I HAVE NO IDEA
type CountryId = { id: number };

export const findCountryIdInsecure = cache(async (countryName: string) => {
  const [countryID] = await sql<CountryId[]>`
    SELECT
      id
    FROM
      countries
    WHERE
      country_name = ${countryName}
  `;
  return countryID;
});

export const insertExpertCountryInsecure = cache(
  async (countryId: number, userId: number) => {
    const [c] = await sql<ExpertWithCountries[]>`
      INSERT INTO
        expert_countries (expert_id, country_id)
      VALUES
        (
          ${userId},
          ${countryId}
        )
      RETURNING
        expert_countries.id,
        expert_countries.expert_id,
        expert_countries.country_id
    `;
    return c;
  },
);

// export const insertExpertCountries = cache(
//   async (
//     countries: string[],
//     userId: number,
//   ) => {

//     INSERT INTO countries(
//       userId,
//       countries) VALUES ('Country1', 'country2'
//              )
//   }
// )
// export const insertExpertCountries = (CountryList: string, userId: number) => {
//   // here insert in db
//   console.log('Here should be inserting into db...');

//   console.log('UserId: ', userId);
//   console.log('CountryList: ', CountryList);
//   return true;
// };

// export const createExpertWithCountry = () => {};
// cache(
// async (selectedItemsCountries, userId) => {
//   const countries = await sql<Country[]>`
//     SELECT
//       *
//     FROM
//       countries
//   `;

//   return countries;
// },
// ){};
