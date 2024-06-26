import { Sql } from 'postgres';
import { Country } from './00004-createCountriesTable';

const countries: Country[] = [
  { countryName: 'Albania' },
  { countryName: 'Argentina' },
  { countryName: 'Australia' },
  { countryName: 'Austria' },
  { countryName: 'Bangladesh' },
  { countryName: 'Belarus' },
  { countryName: 'Belgium' },
  { countryName: 'Bolivia' },
  { countryName: 'Brazil' },
  { countryName: 'Canada' },
  { countryName: 'Chile' },
  { countryName: 'China' },
  { countryName: 'Croatia' },
  { countryName: 'Cyprus' },
  { countryName: 'Czech Republic' },
  { countryName: 'Denmark' },
  { countryName: 'Dominican Republic' },
  { countryName: 'Ecuador' },
  { countryName: 'Egypt' },
  { countryName: 'Estonia' },
  { countryName: 'Ethiopia' },
  { countryName: 'Finland' },
  { countryName: 'France' },
  { countryName: 'Germany' },
  { countryName: 'Ghana' },
  { countryName: 'Greece' },
  { countryName: 'Guatemala' },
  { countryName: 'Hungary' },
  { countryName: 'India' },
  { countryName: 'Indonesia' },
  { countryName: 'Iran' },
  { countryName: 'Iraq' },
  { countryName: 'Ireland' },
  { countryName: 'Israel' },
  { countryName: 'Italy' },
  { countryName: 'Japan' },
  { countryName: 'Jordan' },
  { countryName: 'Kenya' },
  { countryName: 'Laos' },
  { countryName: 'Lebanon' },
  { countryName: 'Lithuania' },
  { countryName: 'Malaysia' },
  { countryName: 'Malta' },
  { countryName: 'Mexico' },
  { countryName: 'Morocco' },
  { countryName: 'Myanmar' },
  { countryName: 'Nepal' },
  { countryName: 'Netherlands' },
  { countryName: 'New Zealand' },
  { countryName: 'Nigeria' },
  { countryName: 'Norway' },
  { countryName: 'Panama' },
  { countryName: 'Peru' },
  { countryName: 'Philippines' },
  { countryName: 'Poland' },
  { countryName: 'Portugal' },
  { countryName: 'Romania' },
  { countryName: 'Russia' },
  { countryName: 'Saudi Arabia' },
  { countryName: 'Senegal' },
  { countryName: 'Serbia' },
  { countryName: 'Singapore' },
  { countryName: 'Slovakia' },
  { countryName: 'Slovenia' },
  { countryName: 'South Africa' },
  { countryName: 'South Korea' },
  { countryName: 'Spain' },
  { countryName: 'Sri Lanka' },
  { countryName: 'Sweden' },
  { countryName: 'Switzerland' },
  { countryName: 'Tanzania' },
  { countryName: 'Thailand' },
  { countryName: 'Tunisia' },
  { countryName: 'Turkey' },
  { countryName: 'Ukraine' },
  { countryName: 'United Arab Emirates' },
  { countryName: 'United Kingdom' },
  { countryName: 'United States' },
  { countryName: 'Uruguay' },
  { countryName: 'Uzbekistan' },
  { countryName: 'Venezuela' },
  { countryName: 'Vietnam' },
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
