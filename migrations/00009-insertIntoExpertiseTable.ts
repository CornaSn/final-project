import { Sql } from 'postgres';
import { Expertise } from './00008-createExpertiseTable';

const expertise: Expertise[] = [
  { id: 1, expertiseName: 'Adventure Travel' },
  { id: 1, expertiseName: 'Agritourism' },
  { id: 1, expertiseName: 'Archaeological Dig' },
  { id: 1, expertiseName: 'Archaeological Tour' },
  { id: 1, expertiseName: 'Backpacking Trip' },
  { id: 1, expertiseName: 'Beach Vacation' },
  { id: 1, expertiseName: 'Bicycle Touring' },
  { id: 1, expertiseName: 'Birdwatching Expedition' },
  { id: 1, expertiseName: 'Bouldering' },
  { id: 1, expertiseName: 'Camping Adventure' },
  { id: 1, expertiseName: 'Canyoning Adventure' },
  { id: 1, expertiseName: 'City Break' },
  { id: 1, expertiseName: 'Culinary Tour' },
  { id: 1, expertiseName: 'Cultural Festival Visit' },
  { id: 1, expertiseName: 'Cultural Immersion' },
  { id: 1, expertiseName: 'Cycling Tour' },
  { id: 1, expertiseName: 'Desert Safari' },
  { id: 1, expertiseName: 'Downhill Mountain Biking' },
  { id: 1, expertiseName: 'Eco-Tourism' },
  { id: 1, expertiseName: 'Farm Stay Experience' },
  { id: 1, expertiseName: 'Fishing Trip' },
  { id: 1, expertiseName: 'Food and Wine Tour' },
  { id: 1, expertiseName: 'Glamping Trip' },
  { id: 1, expertiseName: 'Golfing Trip' },
  { id: 1, expertiseName: 'Heritage Tour' },
  { id: 1, expertiseName: 'Hiking and Trekking' },
  { id: 1, expertiseName: 'Horseback Riding Expedition' },
  { id: 1, expertiseName: 'Hot Air Balloon Ride' },
  { id: 1, expertiseName: 'Houseboat Vacation' },
  { id: 1, expertiseName: 'Microlight Flight' },
  { id: 1, expertiseName: 'Motorcycle Touring' },
  { id: 1, expertiseName: 'Music Festival Travel' },
  { id: 1, expertiseName: 'Nature and Wildlife Safari' },
  { id: 1, expertiseName: 'Off-Road Expedition' },
  { id: 1, expertiseName: 'Photography Tour' },
  { id: 1, expertiseName: 'Pilgrimage Tour' },
  { id: 1, expertiseName: 'Rafting and Kayaking' },
  { id: 1, expertiseName: 'Road Cycling' },
  { id: 1, expertiseName: 'Rock Climbing' },
  { id: 1, expertiseName: 'Safari and Wildlife Photography' },
  { id: 1, expertiseName: 'Sailing and Yachting' },
  { id: 1, expertiseName: 'Scuba Diving' },
  { id: 1, expertiseName: 'Skiing and Snowboarding' },
  { id: 1, expertiseName: 'Skydiving Experience' },
  { id: 1, expertiseName: 'Snowmobile Safari' },
  { id: 1, expertiseName: 'Spa and Wellness Retreat' },
  { id: 1, expertiseName: 'Surfing Trip' },
  { id: 1, expertiseName: 'Theme Park Visit' },
  { id: 1, expertiseName: 'Volunteer Travel' },
  { id: 1, expertiseName: 'Wine Tasting Tour' },
  { id: 1, expertiseName: 'Yoga and Meditation Retreat' },
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
