import { cache } from 'react';
import { sql } from '../database/connect';
import { Country } from '../migrations/00004-createCountriesTable';

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
