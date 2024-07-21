import { Sql } from 'postgres';
import { z } from 'zod';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isExpert: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const userSchema = z
  .object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z
      .string()
      .email()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    role: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  });

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      first_name varchar(20) NOT NULL,
      last_name varchar(20) NOT NULL,
      email varchar(80) NOT NULL UNIQUE,
      password_hash varchar(150) NOT NULL,
      is_expert boolean NOT NULL DEFAULT FALSE,
      created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}
