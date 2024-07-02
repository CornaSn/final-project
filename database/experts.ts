import { cache } from 'react';
import { sql } from '../database/connect';
import { Expert } from '../migrations/00002-createExpertsTable';

// Get whole database information
export const getExpertsInsecure = cache(async () => {
  const users = await sql<Expert[]>`
    SELECT
      *
    FROM
      experts
  `;

  return users;
});

// Get single user information from database
export const getExpertInsecure = cache(async (id: number) => {
  const [user] = await sql<Expert[]>`
    SELECT
      *
    FROM
      experts
    WHERE
      id = ${id}
  `;

  return user;
});

console.log(getExpertsInsecure());

// SELECT users.first_name, users.last_name, users.email, users.is_expert
// FROM users
// JOIN experts ON (users.id = experts.user_id AND users.is_expert = TRUE);
// --WHERE users.email = 'david.j@example.com';

// Function to get all experts with user information
export const getAllExpertsWithUserInfoInsecure = cache(async () => {
  const experts = await sql<Expert[]>`
    SELECT
      users.first_name,
      users.last_name,
      users.email,
      users.is_expert,
      experts.*
    FROM
      users
      JOIN experts ON (
        users.id = experts.user_id
        AND users.is_expert = TRUE
      )
  `;
  console.log('Query result:', experts);
  return experts;
});

console.log('getAllExpertWithUserInfo', getAllExpertsWithUserInfoInsecure());

// Function to get a single expert with user information by ID
export const getExpertByIdWithUserInfoInsecure = cache(async (id: number) => {
  const [expert] = await sql<Expert[]>`
    SELECT
      users.first_name,
      users.last_name,
      users.email,
      users.is_expert,
      experts.*
    FROM
      users
      JOIN experts ON (
        users.id = experts.user_id
        AND users.is_expert = TRUE
      )
    WHERE
      experts.id = ${id}
  `;

  return expert;
});

// Example usage
// console.log(await getExpertByIdWithUserInfo(1)); // Get expert with ID 1 and user info
