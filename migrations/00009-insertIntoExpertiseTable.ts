import { Sql } from 'postgres';
import { Expertise } from './00008-createExpertiseTable';

const expertise: Expertise[] = [
  { expertiseName: 'Adventure Travel' },
  { expertiseName: 'Agritourism' },
  { expertiseName: 'Archaeological Dig' },
  { expertiseName: 'Archaeological Tour' },
  { expertiseName: 'Backpacking Trip' },
  { expertiseName: 'Beach Vacation' },
  { expertiseName: 'Bicycle Touring' },
  { expertiseName: 'Birdwatching Expedition' },
  { expertiseName: 'Bouldering' },
  { expertiseName: 'Camping Adventure' },
  { expertiseName: 'Canyoning Adventure' },
  { expertiseName: 'City Break' },
  { expertiseName: 'Culinary Tour' },
  { expertiseName: 'Cultural Festival Visit' },
  { expertiseName: 'Cultural Immersion' },
  { expertiseName: 'Cycling Tour' },
  { expertiseName: 'Desert Safari' },
  { expertiseName: 'Downhill Mountain Biking' },
  { expertiseName: 'Eco-Tourism' },
  { expertiseName: 'Farm Stay Experience' },
  { expertiseName: 'Fishing Trip' },
  { expertiseName: 'Food and Wine Tour' },
  { expertiseName: 'Glamping Trip' },
  { expertiseName: 'Golfing Trip' },
  { expertiseName: 'Heritage Tour' },
  { expertiseName: 'Hiking and Trekking' },
  { expertiseName: 'Horseback Riding Expedition' },
  { expertiseName: 'Hot Air Balloon Ride' },
  { expertiseName: 'Houseboat Vacation' },
  { expertiseName: 'Microlight Flight' },
  { expertiseName: 'Motorcycle Touring' },
  { expertiseName: 'Music Festival Travel' },
  { expertiseName: 'Nature and Wildlife Safari' },
  { expertiseName: 'Off-Road Expedition' },
  { expertiseName: 'Photography Tour' },
  { expertiseName: 'Pilgrimage Tour' },
  { expertiseName: 'Rafting and Kayaking' },
  { expertiseName: 'Road Cycling' },
  { expertiseName: 'Rock Climbing' },
  { expertiseName: 'Safari and Wildlife Photography' },
  { expertiseName: 'Sailing and Yachting' },
  { expertiseName: 'Scuba Diving' },
  { expertiseName: 'Skiing and Snowboarding' },
  { expertiseName: 'Skydiving Experience' },
  { expertiseName: 'Snowmobile Safari' },
  { expertiseName: 'Spa and Wellness Retreat' },
  { expertiseName: 'Surfing Trip' },
  { expertiseName: 'Theme Park Visit' },
  { expertiseName: 'Volunteer Travel' },
  { expertiseName: 'Wine Tasting Tour' },
  { expertiseName: 'Yoga and Meditation Retreat' },
];

export async function up(sql: Sql) {
  for (const spezialization of expertise) {
    await sql`
      INSERT INTO
        expertise (expertise_name)
      VALUES
        (
          ${spezialization.expertiseName}
        )
    `;
  }
}

export async function down(sql: Sql) {
  await sql` DELETE FROM expertise `;
}
