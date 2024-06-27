import { Sql } from 'postgres';

const expertExpertise = [
  { id: 1, expertId: 1, expertiseId: 4 },
  { id: 2, expertId: 1, expertiseId: 37 },
  { id: 3, expertId: 5, expertiseId: 20 },
  { id: 4, expertId: 4, expertiseId: 15 },
  { id: 5, expertId: 2, expertiseId: 50 },
];

export async function up(sql: Sql) {
  for (const expertSpezialisation of expertExpertise) {
    await sql`
      INSERT INTO
        expert_expertise (expert_id, expertise_id)
      VALUES
        (
          ${expertSpezialisation.expertId},
          ${expertSpezialisation.expertiseId}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const expertSpezialisation of expertExpertise) {
    await sql`
      DELETE FROM expert_expertise
      WHERE
        id = ${expertSpezialisation.id}
    `;
  }
}
