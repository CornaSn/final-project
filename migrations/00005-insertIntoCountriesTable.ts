import { Sql } from 'postgres';
import { Country } from './00004-createCountriesTable';

const countries: Country[] = [
  { id: 1, countryName: 'Albania' },
  { id: 1, countryName: 'Argentina' },
  { id: 1, countryName: 'Australia' },
  { id: 1, countryName: 'Austria' },
  { id: 1, countryName: 'Bangladesh' },
  { id: 1, countryName: 'Belarus' },
  { id: 1, countryName: 'Belgium' },
  { id: 1, countryName: 'Bolivia' },
  { id: 1, countryName: 'Brazil' },
  { id: 1, countryName: 'Canada' },
  { id: 1, countryName: 'Chile' },
  { id: 1, countryName: 'China' },
  { id: 1, countryName: 'Croatia' },
  { id: 1, countryName: 'Cyprus' },
  { id: 1, countryName: 'Czech Republic' },
  { id: 1, countryName: 'Denmark' },
  { id: 1, countryName: 'Dominican Republic' },
  { id: 1, countryName: 'Ecuador' },
  { id: 1, countryName: 'Egypt' },
  { id: 1, countryName: 'Estonia' },
  { id: 1, countryName: 'Ethiopia' },
  { id: 1, countryName: 'Finland' },
  { id: 1, countryName: 'France' },
  { id: 1, countryName: 'Germany' },
  { id: 1, countryName: 'Ghana' },
  { id: 1, countryName: 'Greece' },
  { id: 1, countryName: 'Guatemala' },
  { id: 1, countryName: 'Hungary' },
  { id: 1, countryName: 'India' },
  { id: 1, countryName: 'Indonesia' },
  { id: 1, countryName: 'Iran' },
  { id: 1, countryName: 'Iraq' },
  { id: 1, countryName: 'Ireland' },
  { id: 1, countryName: 'Israel' },
  { id: 1, countryName: 'Italy' },
  { id: 1, countryName: 'Japan' },
  { id: 1, countryName: 'Jordan' },
  { id: 1, countryName: 'Kenya' },
  { id: 1, countryName: 'Laos' },
  { id: 1, countryName: 'Lebanon' },
  { id: 1, countryName: 'Lithuania' },
  { id: 1, countryName: 'Malaysia' },
  { id: 1, countryName: 'Malta' },
  { id: 1, countryName: 'Mexico' },
  { id: 1, countryName: 'Morocco' },
  { id: 1, countryName: 'Myanmar' },
  { id: 1, countryName: 'Nepal' },
  { id: 1, countryName: 'Netherlands' },
  { id: 1, countryName: 'New Zealand' },
  { id: 1, countryName: 'Nigeria' },
  { id: 1, countryName: 'Norway' },
  { id: 1, countryName: 'Panama' },
  { id: 1, countryName: 'Peru' },
  { id: 1, countryName: 'Philippines' },
  { id: 1, countryName: 'Poland' },
  { id: 1, countryName: 'Portugal' },
  { id: 1, countryName: 'Romania' },
  { id: 1, countryName: 'Russia' },
  { id: 1, countryName: 'Saudi Arabia' },
  { id: 1, countryName: 'Senegal' },
  { id: 1, countryName: 'Serbia' },
  { id: 1, countryName: 'Singapore' },
  { id: 1, countryName: 'Slovakia' },
  { id: 1, countryName: 'Slovenia' },
  { id: 1, countryName: 'South Africa' },
  { id: 1, countryName: 'South Korea' },
  { id: 1, countryName: 'Spain' },
  { id: 1, countryName: 'Sri Lanka' },
  { id: 1, countryName: 'Sweden' },
  { id: 1, countryName: 'Switzerland' },
  { id: 1, countryName: 'Tanzania' },
  { id: 1, countryName: 'Thailand' },
  { id: 1, countryName: 'Tunisia' },
  { id: 1, countryName: 'Turkey' },
  { id: 1, countryName: 'Ukraine' },
  { id: 1, countryName: 'United Arab Emirates' },
  { id: 1, countryName: 'United Kingdom' },
  { id: 1, countryName: 'United States' },
  { id: 1, countryName: 'Uruguay' },
  { id: 1, countryName: 'Uzbekistan' },
  { id: 1, countryName: 'Venezuela' },
  { id: 1, countryName: 'Vietnam' },
];

export async function up(sql: Sql) {
  for (const country of countries) {
    await sql`
      INSERT INTO
        countries (country_name)
      VALUES
        (
          ${country.countryName}
        )
    `;
  }
}

export async function down(sql: Sql) {
  await sql` DELETE FROM countries `;
}
