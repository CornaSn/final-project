import { Sql } from 'postgres';
import { z } from 'zod';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isExpert: boolean;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

export const userSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3),
});

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      first_name varchar(20) NOT NULL,
      last_name varchar(20) NOT NULL,
      email varchar(80) NOT NULL UNIQUE,
      password_hash varchar(80) NOT NULL,
      is_expert boolean NOT NULL DEFAULT FALSE,
      created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}
